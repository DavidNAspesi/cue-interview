import Dispatcher from "./dispatcher";
import Settings from 'Settings';
import CompanyStore from "stores/CompanyStore";

export function triggerChat(e) {
  e.preventDefault();
  if ($(window)[0].SnapEngage) {
    $(window)[0].SnapEngage.startLink();
  }
}
export function calculateProductGrossPrice(product, payment_type, num_employees) {
  if (product.price_type === "ONE_TIME") {
    return product.price;
  } else {
    var monthly_price = product.price * (product.price_type === "USER" ? num_employees : 1);
    return monthly_price * (payment_type === "YEARLY" ? 12 : 1);
  }
}
export function calculateProductCouponDiscount(product, coupon, payment_type, num_employees) {
  var savings = 0;
  if (product.price_type === "ONE_TIME") {
    if (coupon && coupon.discount != 0) {
      var price = calculateProductGrossPrice(product, payment_type, num_employees);
      if (coupon.products && coupon.products.length > 0) {
        if (coupon.products.includes(product.product_key)) {
          savings = price * coupon.discount;
        }
      } else {
        savings = price * coupon.discount;
      }
    }
  }
  return Math.round(savings/100.0);
}
export function calculateProductTrialDiscount(product, payment_type, num_employees) {
  var savings = 0;
  if (product.price_type !== "ONE_TIME") {
    savings = calculateProductGrossPrice(product, payment_type, num_employees);
    if (payment_type === "YEARLY") {
      savings = Math.round(savings/12);
    }
  }
  return savings;
}
export function calculateProductYearlyDiscount(product, coupon, payment_type, num_employees) {
  var savings = 0;
  if (payment_type === "YEARLY") {
    savings = (calculateProductGrossPrice(product, payment_type, num_employees) - calculateProductCouponDiscount(product, coupon, payment_type, num_employees)) * 10;
  }
  return Math.round(savings/100.0);
}
export function getTotals(products, coupon, userCount, billingType, applyTrial=true) {
  var subTotal = 0, yearlySavings = 0, couponSavings = 0, trialSavings = 0;
  products.forEach( product => {
    subTotal      += calculateProductGrossPrice(product, billingType, userCount);
    trialSavings  += applyTrial ? calculateProductTrialDiscount(product, billingType, userCount) : 0;
    couponSavings += calculateProductCouponDiscount(product, coupon, billingType, userCount);
    yearlySavings += calculateProductYearlyDiscount(product, coupon, billingType, userCount);
  });
  return {
    subTotal,
    couponSavings,
    yearlySavings,
    trialSavings,
    total: subTotal - yearlySavings - trialSavings - couponSavings
  };
}
export function calculateUpdateCharge(leftPercentage, lastPay, newAmount) {
  const proratedCreditAmount = lastPay * leftPercentage,
        proratedAmount = newAmount * leftPercentage;
  return proratedAmount - proratedCreditAmount;
}
export function firstName(name) {
  return name.split(' ').slice(0, -1).join(' ');
}
export function lastName(name) {
  return name.split(' ').slice(-1).join(' ');
}
export function isTrial(fbd, nbd) {
  if (fbd && nbd) {
    if (moment().isBefore(fbd) || moment(fbd).isSame(nbd)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export function trialLeft(fbd) {
  if (fbd) {
    const now = moment().startOf('day');
    if (now.isBefore(fbd)) {
      return moment(fbd).diff(now, 'days');
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

export function companyHasProduct(key) {
  const company = CompanyStore.getCompany();
  return company ? company.products.find(elem => elem.product_key === key) : false;
}

export function companyHasActiveTrial(key) {
  const company = CompanyStore.getCompany();
  const product = company ? company.products.find(elem => elem.product_key === key) : null;
  return company && product ? this.isTrial(product.first_billing_date, company.next_billing_date) : false;
}

export function companyHasExpiredTrial(key) {
  const company = CompanyStore.getCompany();
  const trial = company ? (company.trials ? company.trials.find(elem => elem.product_key === key) : null) : null;
  const product = company ? company.products.find(elem => elem.product_key === key) : null;
  return trial && !product
}

export function getCompanyProduct(key) {
  const company = CompanyStore.getCompany();
  return company ? company.products.find(elem => elem.product_key === key) : null;
}

export function getCompanyTrial(key) {
  const company = CompanyStore.getCompany();
  return company ? (company.trials ? company.trials.find(elem => elem.product_key === key) : null) : null;
}

export function isSubscribedToProduct(key) {
  return this.companyHasProduct(key) || this.companyHasActiveTrial(key) || this.companyHasExpiredTrial(key);
}

export function restCall(url, method, data, startType, successType, errorType, authType, dataType, contentType) {
  if (startType) {
    Dispatcher.dispatch( {type: startType} );
  }
  $.ajax({
    url: Settings.restEngine + url,
    method: method || 'GET',
    dataType: dataType || 'json',
    contentType: contentType,
    data: data || {}
  }).done(function(data) {
    Dispatcher.dispatch( {type: successType, data: data} );
  }).fail(function(xhr, textStatus, errorThrown) {
    switch(xhr.status) {
      case 401:
        Dispatcher.dispatch( {type: authType || errorType, xhr, textStatus, errorThrown} );
        break;
      default:
        Dispatcher.dispatch( {type: errorType, xhr, textStatus, errorThrown} );
    }
  });
}
export function getPartnerSettings(company) {
  return null;
}
export function setSEOSettings(location) {
  if (location && Settings.seo[location]) {
    const seoSettings = Settings.seo[location];
    document.title=seoSettings.title;
    $('meta[name=description]').attr('content', seoSettings.description);
    if (seoSettings.keywords) {
      $('meta[name=keywords]').attr('content', seoSettings.keywords);
    }
    return true;
  } else {
    return false;
  }
}
export function setDynamicSEOSettings(type, key) {
  if (location && Settings.seo[type][key]) {
    const seoSettings = Settings.seo[type][key];
    document.title=seoSettings.title;
    $('meta[name=description]').attr('content', seoSettings.description);
    if (seoSettings.keywords) {
      $('meta[name=keywords]').attr('content', seoSettings.keywords);
    }
    return true;
  } else {
    return false;
  }
}
export function formatDate(date, format) {
  return moment(date).format(format);
}
export function daysDiff(date1, date2) {
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
export function isToday(date) {
  return moment(date).isSame(moment(), 'd');
}
export function hashToObject(str) {
  return str.split('&').reduce(function (result, item) {
    var parts = item.split('=');
    result[parts[0]] = parts[1];
    return result;
  }, {});
}
