import Dispatcher from "shared/dispatcher";

export function updateCompany(companyId, data) {
  //todo
}

export function loadCompany(companyId) {
  setTimeout(() => {
    Dispatcher.dispatch({type: 'RECEIVE_COMPANY', data: companyId})
  }, 1000)
}
