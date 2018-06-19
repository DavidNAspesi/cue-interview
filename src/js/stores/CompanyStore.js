import { EventEmitter } from 'events'
import dispatcher from 'shared/dispatcher'

class CompanyStore extends EventEmitter {
  constructor () {
    super()
    this.companies = [{
      '_id': '5a31a2a57a80cd3f53af6a1c',
      'payment_type': 'MONTHLY',
      'num_employees': 2,
      'setup_products': [],
      'name': 'CUE Test',
      'industry': 'Software',
      'address': {
        'address1': '2595 Canyon Blvd',
        'address2': 'Suite 400',
        'city': 'Boulder',
        'state': 'CO',
        'zip': '80302',
        'country': 'US'
      },
      'u_at': '2018-04-25T19:23:13.429Z',
      'c_at': '2017-12-13T21:59:01.137Z',
      'products': [
        {
          'product_key': 'webroot',
          'product_name': 'Webroot SecureAnywhere® Business Endpoint Protection',
          'pricing_option_key': 'base',
          'pricing_option_name': 'Base',
          'price': 199,
          'price_type': 'USER',
          'product_logo': 'https://d3jz5yl8ad4hn8.cloudfront.net/products/logos/webroot.png',
          'first_billing_date': '2018-03-23T00:00:00.000Z',
          '_id': '5ae0d5a17a80cd18e453a1e7'
        }, {
          'product_key': 'carbonite',
          'product_name': 'Carbonite',
          'pricing_option_key': 'core',
          'pricing_option_name': 'Core',
          'price': 1999,
          'price_type': 'COMPANY',
          'product_logo': 'https://d3jz5yl8ad4hn8.cloudfront.net/products/logos/carbonite.png',
          'first_billing_date': '2018-03-23T00:00:00.000Z',
          '_id': '5ae0d5a17a80cd18e453a1e8'
        }, {
          'product_key': 'constant-contact',
          'product_name': 'Constant Contact',
          'pricing_option_key': 'email-0-to-500',
          'pricing_option_name': 'Email 0-500',
          'price': 2000,
          'price_type': 'COMPANY',
          'product_logo': 'https://d3jz5yl8ad4hn8.cloudfront.net/products/logos/constant-contact.png',
          'first_billing_date': '2018-04-02T00:00:00.000Z',
          '_id': '5ae0d5a17a80cd18e453a1e9'
        }, {
          'product_key': 'duda-website',
          'product_name': 'Duda',
          'pricing_option_key': 'business_basic',
          'pricing_option_name': 'Business Basic',
          'price': 1999,
          'price_type': 'COMPANY',
          'product_logo': 'https://d3jz5yl8ad4hn8.cloudfront.net/products/logos/duda.png',
          'first_billing_date': '2018-04-02T00:00:00.000Z',
          '_id': '5ae0d5a17a80cd18e453a1ea'
        }, {
          '_id': '5ae0d5a17a80cd18e453a1e2',
          'price_type': 'COMPANY',
          'price': 2500,
          'pricing_option_key': 'plus',
          'pricing_option_name': 'Plus',
          'product_key': 'freshbooks',
          'product_name': 'FreshBooks',
          'first_billing_date': '2018-06-15T00:00:00.000Z',
          'u_at': '2018-04-25T19:23:13.406Z',
          'c_at': '2018-04-25T19:23:13.406Z'
        }, {
          '_id': '5ae0d5be7a80cd18e453a1eb',
          'price_type': 'COMPANY',
          'price': 5900,
          'pricing_option_key': 'business',
          'pricing_option_name': 'Business',
          'product_key': 'live-chat',
          'product_name': 'LiveChat',
          'first_billing_date': '2018-06-15T00:00:00.000Z',
          'u_at': '2018-04-25T19:23:42.544Z',
          'c_at': '2018-04-25T19:23:42.544Z'
        }
      ],
      'next_billing_date': '2018-05-25T00:00:00.000Z',
      'braintree_customer_id': '172151094',
      'current_card_type': 'Visa',
      'current_card_last_four': '1111',
      'employees': [
        {
          '_id': '5ab3d66e7a80cd1a7182ba01',
          'name': 'Jovi Jovanelly',
          'email': 'steve.jovanelly@gmail.com',
          'u_at': '2018-03-22T16:14:38.457Z',
          'c_at': '2018-03-22T16:14:38.457Z'
        }
      ],
      'phone': '720-552-8918',
      'active': true,
      'trials': [
        {
          '_id': '5ae0d5a17a80cd18e453a1e3',
          'product_key': 'freshbooks',
          'pricing_option_key': 'plus'
        }, {
          '_id': '5ae0d5be7a80cd18e453a1ec',
          'product_key': 'live-chat',
          'pricing_option_key': 'business'
        }
      ]
    }]
    this.company = null
    this.error = {}
  }

  getError () {
    return this.error
  }

  getCompany () {
    return this.company
  }

  getCompanies () {
    return this.companies
  }

  handleActions (action) {
    switch (action.type) {
      case 'RECEIVE_COMPANY': {
        this.company = this.companies.find(value => { return value._id === action.data })
        this.emit('company_change')
        break
      }
      case 'UPDATE_COMPANY': {
        //todo
        this.emit('company_change')
        break
      }
    }
  }
}

const companyStore = new CompanyStore()
dispatcher.register(companyStore.handleActions.bind(companyStore))
export default companyStore
