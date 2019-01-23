import React from "react";

import { UserApi } from "../../api/UserApi";
import { ProfileApi } from "../../api/ProfileApi";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  handleSubmit = async () => {
    const res = await UserApi.signInUser({
      email: this.state.email,
      password: this.state.password
    });
    const data = await res.json();
    if (data.userId && data.success) {
      this.saveAuthTokenInSession(data.token);
      const res = await ProfileApi.getProfile(data.userId);

      const user = await res.json();
      if (user && user.email) {
        this.props.loadUser(user);
        this.props.handleRouteChange("home");
      }
    } else {
      //prompt error using modal
      console.log("Failed to signin because of wrong email or password");
    }
  };

  render() {
    const { handleRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.handleEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.handlePasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.handleSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <div
                onClick={() => handleRouteChange("signup")}
                className="f6 link dim black db"
              >
                Sign up
              </div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
