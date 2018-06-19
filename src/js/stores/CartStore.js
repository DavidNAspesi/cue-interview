import { EventEmitter } from "events";
import dispatcher from "shared/dispatcher";
import Cookies from 'js-cookie';

class CartStore extends EventEmitter {
  constructor() {
    super();
    this.cart = {
      userCount: Cookies.get('userCount') || 1,
      billingType: Cookies.get('billingType') || "MONTHLY",
      chosenProducts: Cookies.getJSON('chosenProducts') || [],
      coupon: Cookies.getJSON('coupon') || null
    };
    this.updateSolution = Cookies.getJSON('updateSolution') || {};
    this.partner = Cookies.getJSON('partner') || null;
    this.banner = Cookies.getJSON('banner') || null;
    this.addedProd = null;
    this.removedProd = null;
  }

  setSolutionUpdate(newProduct, action) {
    this.updateSolution = {
      product: newProduct,
      action: ""
    }
    Cookies.set('updateSolution', this.updateSolution, { expires: 2 });
  }

  clearSolutionUpdate() {
    Cookies.set('updateSolution', {}, { expires: 2 })
  }

  updateUserCount(userCount) {
    var userCountVal = userCount.length < 0 || userCount === "" ? 1 : userCount;
    this.cart.userCount = userCount;
    Cookies.set('userCount', userCountVal, { expires: 7 });
    this.emit("user-count-change");
  }

  updateBillingType(billingType) {
    this.cart.billingType = billingType;
    Cookies.set('billingType', billingType, { expires: 7 });
    this.emit("billing-type-change");
  }

  addChosenProduct(product, price_key) {
    const foundProd = this.cart.chosenProducts.find(currProd => {return currProd.product_key === product.key});
    var priceOption = product.price_options.find(currOpt => {return currOpt.key === price_key});
    if(!priceOption) {
      priceOption = product.price_options[0];
    }
    if(!foundProd)  {
      const newProd = {
        product_key: product.key,
        product_name: product.name,
        pricing_option_key: priceOption.key,
        pricing_option_name: priceOption.name,
        price: priceOption.price,
        price_type: product.price_type
      }
      this.addedProd = newProd;
      this.cart.chosenProducts.push(newProd);
    } else {
      foundProd.pricing_option_key = priceOption.key;
      foundProd.pricing_option_name = priceOption.name;
      foundProd.price = priceOption.price;
      this.addedProd = foundProd;
    }
    this.removedProd = null;
    Cookies.set('chosenProducts', this.cart.chosenProducts, { expires: 7 });
  }

  addProductList(products) {
    for (var i = 0; i < products.length; i++) {
      if (!this.cartHasProduct(products[i].product_key)) {
        this.cart.chosenProducts.push(products[i]);
      }
    }
    Cookies.set('chosenProducts', this.cart.chosenProducts, { expires: 7 });
  }

  removeChosenProduct(key) {
    var chosenProducts = this.cart.chosenProducts;
    this.removedProd = chosenProducts.find(value => {return value.product_key === key;});
    this.cart.chosenProducts = chosenProducts.filter(value => {return value.product_key !== key;});
    this.addedProd = null;
    Cookies.set('chosenProducts', this.cart.chosenProducts, { expires: 7 });
  }

  cartHasProduct(productKey) {
    return this.cart.chosenProducts.find(prod => {
      return prod.product_key === productKey;
    });
  }

  cartHasOption(productKey, optionKey) {
    return this.cart.chosenProducts.find(prod => {
      return prod.pricing_option_key === optionKey && prod.product_key === productKey;
    });
  }

  addCoupon(coupon) {
    this.cart.coupon = coupon;
    Cookies.set('coupon', this.cart.coupon, { expires: 7 });
    this.emit("coupon-updated");
  }

  removeCoupon(code) {
    if (this.cart.coupon.code === code) {
      this.cart.coupon = null;
      Cookies.remove('coupon');
      this.emit("coupon-updated");
    }
  }

  addPartner(id) {
    this.partner = id;
    Cookies.set('partner', this.partner, { expires: 7});
  }

  addBanner(banner) {
    this.banner = banner;
    Cookies.set('banner', this.banner, { expires: 7});
  }

  clearPartner() {
    this.partner = null;
    Cookies.remove('partner');
  }

  clearBanner() {
    this.banner = null;
    Cookies.remove('banner');
  }

  defaultCart(billingType, userCount, coupon) {
    this.cart.billingType = billingType;
    Cookies.set('billingType', billingType, { expires: 7 });
    this.cart.userCount = userCount;
    Cookies.set('userCount', userCount, { expires: 7 });
    this.cart.coupon = coupon || null;
    if (coupon) {
      Cookies.set('coupon', coupon, { expires: 7 });
    } else {
      Cookies.remove('coupon');
    }
  }

  clearCart(emitChange) {
    Object.keys(Cookies.get()).forEach(cookie => {Cookies.remove(cookie);});
    this.cart = {userCount: 1,billingType: "MONTHLY",chosenProducts: [],coupon: null};
    this.partner = null;
    this.banner = null;
    this.addedProd = null;
    this.removedProd = null;
    if (emitChange) {
      this.emit("chosen-solutions-change");
    }
  }

  getCart() {
    return this.cart;
  }

  getUpdateSolution() {
    return this.updateSolution;
  }

  getPartner() {
    return this.partner;
  }

  getBanner() {
    return this.banner;
  }

  getAddedProd() {
    return this.addedProd;
  }

  getRemovedProd() {
    return this.removedProd;
  }
}

const cartStore = new CartStore();
dispatcher.register(cartStore.handleActions.bind(cartStore));
//window.cartStore = cartStore;
export default cartStore;
