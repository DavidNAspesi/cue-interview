import Dispatcher from "shared/dispatcher"

export function login (email, password) {
  setTimeout(() => {
    Dispatcher.dispatch({type: 'LOGIN_COMPLETE',
                         data: { '_id': 'abc123',
                                 'auth_token': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjp7IiRvaWQiOiI1Y…Tk1fQ.bT-uujTQAzHJMHYnri8JvyvCrdrZ9dPpN0KQVEC-ht8',
                                 'name': 'CUE User',
                                 'email': 'cue-user@cuemarketplace.com',
                                 'company_id': '5a31a2a57a80cd3f53af6a1c'} })
  }, 1000)
}

export function logout () {
  setTimeout(() => {
    Dispatcher.dispatch({type: 'LOGOUT_COMPLETE', data: null})
  }, 1000)
}

export function updateUser (id, name, email) {
  setTimeout(() => {
    // Dispatcher.dispatch( {type: 'RECEIVE_USER',
    //                       data:
    //                     } )
  }, 1000)
}
