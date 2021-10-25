import React from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

import './login.scss';
const cookies = new Cookies();
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmailChanges = this.handleEmailChanges.bind(this);
        this.handlePasswordChanges = this.handlePasswordChanges.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.state = {
            typingE: '',
            typingP: '',
            redirect: false,
            button: false,
            email: cookies.get('user'),
            isLogin: cookies.get('isLogin')
        }
    }

    shouldComponentUpdate(nextState) {
        if ((this.state.button === true) || (this.state.redirect === true))
            return true;
        else if ((nextState.typingE !== this.state.typingE) || (nextState.typingP !== this.state.typingP))
            return false;
    }

    componentDidMount = async () => {
        document.querySelector('.button-login').style.display = 'none';
        this.checkAuth(this.state.isLogin);
    }

    login = async (user, pass) => {
        let account_login = {
            email: user,
            password: pass
        };
        await axios.post("http://localhost:8000/login", account_login)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({ redirect: true })
                    this.setState({ isLogin: true })
                    cookies.set('isLogin', true, { path: '/' });
                    document.querySelector('.button-login').style.display = 'none';
                    document.querySelector('.user-profile').style.display = 'block';
                } else {
                    alert("Client: Sai thong tin");
                    console.log("401")
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    checkAuth = async (islogin) => {
        if (islogin === "true") {
            const user = {
                email: this.state.email
            }
            await axios.post("http://localhost:8000/checkLogin", user)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ redirect: true })
                        this.setState({ isLogin : true})
                    } else {
                        // if(response.status === 401)
                    }

                })
                .catch(error => {
                    console.log(error);
                });

        }
    }

    handleEmailChanges(e) {
        this.setState({ typingE: e.target.value })
    }

    handlePasswordChanges(e) {
        this.setState({ typingP: e.target.value })
    }

    handleSubmitLogin(e) {
        e.preventDefault();
        this.setState({ email: this.state.typingE });
        this.setState({ password: this.state.typingP });
        this.setState({ button: true });
        cookies.set('user', this.state.email);
        this.login(this.state.email, this.state.password);
    }


    render() {
        if (this.state.redirect === true) {
            return (<Redirect to='/' />)
        } else return (
            <div className="login">
                <img className="back-ab" src="/pattern.png" />
                <ul className="form-login">                
                    <li className="pic-profile">
                        <img className="img-login" src='profile.svg' />
                    </li>
                    <li>
                        <h1 className="text-login">LOGIN</h1>
                        <div>
                            <label for="email"></label>
                            <input
                                onChange={this.handleEmailChanges}
                                id="email" type="email" placeholder="Email address" required
                            />
                        </div>
                        <div>
                            <label for="password"></label>
                            <input
                                onChange={this.handlePasswordChanges}
                                id="password" type="password" placeholder="Password" required
                            />

                        </div>

                        <div className="login-bottom">

                            <button className="sign-in" onClick={this.handleSubmitLogin}>Login</button>

                        </div>

                    </li>
                </ul>
            </div>
        )
    }
}
