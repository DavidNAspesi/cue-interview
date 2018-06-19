import React from "react";
import CompanyStore from "stores/CompanyStore";
import * as CompanyActions from "actions/CompanyActions";
import UserStore from "stores/UserStore";
import * as UserActions from "actions/UserActions";
import Loading from "shared/Loading";
import LoadingError from "shared/LoadingError";
import Settings from "Settings";

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {
    constructor() {
      super();

      this.companyStart = this.companyStart.bind(this);
      this.companyError = this.companyError.bind(this);
      this.getCompany = this.getCompany.bind(this);
      this.userStart = this.userStart.bind(this);
      this.userError = this.userError.bind(this);
      this.getUser = this.getUser.bind(this);

      const user = UserStore.getUser();
      if (user) {
        this.setAJAXAuthHeader(user);

        if (user.company_id) {
          var company = CompanyStore.getCompany();
          if (!company) {
            CompanyActions.loadCompany(user.company_id);
          }
        } else if (user.admin === true) {
          window.location = "/admin";
        } else {
          UserActions.logout();
        }
      }
      this.state = {user,    userLoading: false,    userLoadingError: false,   userUpdated: false,
                    company, companyLoading: false, companyLoadingError: null, companyUpdated: false};
    }

    componentWillMount() {
      CompanyStore.on("company_service_start", this.companyStart);
      CompanyStore.on("company_service_error", this.companyError);
      CompanyStore.on("company_change", this.getCompany);
      CompanyStore.on("company_payment_update", this.getCompany);
      UserStore.on("user_service_start", this.userStart);
      UserStore.on("user_service_error", this.userError);
      UserStore.on("user_change", this.getUser);
    }

    componentWillUnmount() {
      CompanyStore.removeListener("company_service_start", this.companyStart);
      CompanyStore.removeListener("company_service_error", this.companyError);
      CompanyStore.removeListener("company_change", this.getCompany);
      CompanyStore.removeListener("company_payment_update", this.getCompany);
      UserStore.removeListener("user_service_start", this.userStart);
      UserStore.removeListener("user_service_error", this.userError);
      UserStore.removeListener("user_change", this.getUser);
    }

    companyStart() {
      this.setState({companyLoading: true, companyLoadingError: null, companyUpdated: false});
    }

    companyError() {
      const error = CompanyStore.getError();
      console.error(error);
      this.setState({companyLoading: false, companyLoadingError: error, companyUpdated: false});
    }

    getCompany() {
      setTimeout(() => {
        const isUpdated = this.state.company !== null;
        this.setState({
          company: CompanyStore.getCompany(),
          companyLoading: false,
          companyLoadingError: null,
          companyUpdated: isUpdated,
          userUpdated: false
        });
      }, 10);
    }

    userStart() {
      this.setState({userLoading: true, userLoadingError: null, userUpdated: false});
    }

    userError() {
      const error = UserStore.getError();
      console.error(error);
      this.setState({userLoading: false, userLoadingError: error, userUpdated: false});
    }

    getUser() {
      this.setState({user: UserStore.getUser(),
                     userLoading: false,
                     userLoadingError: false,
                     userUpdated: true,
                     companyUpdated: false});
    }

    setAJAXAuthHeader(user) {
      if(user){
        $(document).ajaxSend(( event, jqxhr, requestSettings ) => {
          if(requestSettings.url.indexOf(Settings.restEngine) != -1) {
            jqxhr.setRequestHeader("Authorization", user.auth_token);
          }
        });
      }
    }

    render() {
      return (
        <div>
          { this.state.companyLoadingError ?
              <LoadingError />
            :
              !this.state.company ?
                <Loading />
              :
                <ComposedComponent
                  {...this.props}
                  {...this.state} />
          }
        </div>
      );
    }
  }
};
