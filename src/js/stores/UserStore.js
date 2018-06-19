import { EventEmitter } from 'events'
import dispatcher from 'shared/dispatcher'

class UserStore extends EventEmitter {
  constructor () {
    super()
    this._user = sessionStorage.userObject ? JSON.parse(sessionStorage.userObject) : null
    this._error = {}
  }

  getError () {
    return this._error
  }

  getUser () {
    return this._user
  }

  isSignedIn () {
    return !!this._user
  }

  isAdmin () {
    return this._user.admin
  }

  handleActions(action) {
    switch (action.type) {
      case 'RECEIVE_USER': {
        this._error = {}
        sessionStorage.setItem('userObject', JSON.stringify(action.data))
        this._user = action.data
        this.emit('user_change')
        break
      }
      case 'LOGIN_COMPLETE': {
        this._error = {}
        sessionStorage.setItem('userObject', JSON.stringify(action.data))
        this._user = action.data
        this.emit('login_complete')
        break
      }
      case 'LOGOUT_COMPLETE': {
        this._error = {}
        sessionStorage.clear()
        this._user = null
        this.emit('logout_complete')
        break
      }
    }
  }
}

const userStore = new UserStore()
dispatcher.register(userStore.handleActions.bind(userStore))
export default userStore
