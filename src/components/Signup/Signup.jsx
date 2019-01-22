import React from 'react';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    handleConfirmPasswordChange = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }


    //https://keithscode.com/tutorials/javascript/3-a-simple-javascript-password-validator.html
    checkPassword = () => {
        // //Store the password field objects into variables ...
        let pass1 = document.getElementById('pass1');
        let pass2 = document.getElementById('pass2');
        //Store the Confimation Message Object ...
        let message = document.getElementById('confirmMessage');
        //Set the colors we will be using ...
        let goodColor = "#66cc66";
        let badColor = "#ff6666";
        //Compare the values in the password field 
        //and the confirmation field
        if (this.isValidPassword(pass1.value)) {
            if (this.isEqualPassword(pass1.value, pass2.value)) {
                //The passwords match. 
                //Set the color to the good color and inform
                //the user that they have entered the correct password 
                pass2.style.backgroundColor = goodColor;
                message.style.color = goodColor;
                message.innerText = "Passwords Match!";
            } else {
                //The passwords do not match.
                //Set the color to the bad color and
                //notify the user.
                pass2.style.backgroundColor = badColor;
                message.style.color = badColor;
                message.innerText = "Passwords Do Not Match!"
            }
        } else {
            pass2.style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerText = "Passwords must contain at least 8 characters"
        }
    }

    isValidPassword = (pass) => {
        return pass.length >= 8 && pass.length <= 64;
    }

    isEqualPassword = (pass1, pass2) => {
        return pass1 === pass2;
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem("token", token);
    };

    handleSubmit = async () => {
        const {
            name,
            email,
            password,
            confirmPassword } = this.state;
        if (this.isValidPassword(password) &&
            this.isEqualPassword(password, confirmPassword)) {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/users/signup`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await res.json();
            if (data.userId && data.success) {
                this.saveAuthTokenInSession(data.token);
                const res = await fetch(
                    `${process.env.REACT_APP_SERVER}/profile/${data.userId}`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: data.token
                        }
                    }
                );

                const user = await res.json();
                if (user && user.email) {
                    this.props.loadUser(user);
                    this.props.handleRouteChange("home");
                }
            }
        } else {
            console.log('passwords do not match!')
            //show the prompt using modal
        }
    }

    render() {
        const { handleRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 center">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    onChange={this.handleNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="name"
                                    name="name"
                                    id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.handleEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onKeyUp={this.checkPassword}
                                    onChange={this.handlePasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="pass1"
                                    id="pass1" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                <input
                                    onKeyUp={this.checkPassword}
                                    onChange={this.handleConfirmPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="pass2"
                                    id="pass2" />
                            </div>
                            <span id="confirmMessage" className="confirmMessage"></span>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.handleSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign up" />
                        </div>
                        <div className="lh-copy mt3">
                            <div onClick={() => handleRouteChange('signin')} className="f6 link dim black db">Sign in</div>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default Signup;