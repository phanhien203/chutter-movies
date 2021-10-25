import React from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from 'axios';

import './navbar.scss';

const cookies = new Cookies();
export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleTyping = this.handleTyping.bind(this);
        this.state = {
            search: '',
            email: cookies.get('user'),
            isLogin: cookies.get('isLogin'),
            profile: {}
        }
    }

    componentDidMount = async() => {
        await this.checkAuth(this.state.isLogin);
        await this.getUserProfile()
    
        if ((cookies.get('isLogin') === "true") && (cookies.get('user') !== undefined)) {
            document.querySelector('.button-login').style.display = 'none';
            document.querySelector('.user-profile').style.display = 'block';
        } else if ((cookies.get('isLogin') !== "true") || (cookies.get('user') == undefined)){
            document.querySelector('.button-login').style.display = 'block';
            document.querySelector('.user-profile').style.display = 'none';

        }
    }

    handleTyping(e) {
        this.setState({ search: e.target.value })
        e.preventDefault();
    }

    onSubmit = async () => {
        await cookies.set('search', this.state.search);
    }

    checkAuth = async (islogin) => {
        console.log("check")
        if (islogin === "true") {
            const user = {
                email: this.state.email
            }
            await axios.post("http://localhost:8000/checkLogin", user)
                .then(response => {
                    console.log("check", response)
                    if (response.status === 200) {
                        this.setState({ isLogin : true})
                        document.querySelector('.button-login').style.display = 'none';
                        document.querySelector('.user-profile').style.display = 'block';
                    } else {
                        this.setState({ isLogin : false})
                        document.querySelector('.button-login').style.display = 'block';
                        document.querySelector('.user-profile').style.display = 'none';
                    }

                })
                .catch(error => {
                    console.log(error);
                });

        } else {
            this.setState({ isLogin : false})
            document.querySelector('.button-login').style.display = 'block';
            document.querySelector('.user-profile').style.display = 'none';
        }
    }

    getUserProfile = async () => {
        let user = {
            email: cookies.get('user')
        };

        await axios.post("http://localhost:8000/user", user)
            .then(response => {                
                let profile = {
                    fullName: response.data[0].fullName,
                    avatar: 'http://localhost:8000' + response.data[0].avatar,
                    id: response.data[0].id
                }
                this.setState({profile: profile});
                console.log("get avt", this.state.profile)
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="nav-bar" id="nav-bar">
                <Link to="/" className="nav-bar-left">
                    <img className="logo" id="logo" src="/logo.jpg" />
                    <h id="chutter">HUTTER</h>
                </Link>

                <div className="nav-bar-center">
                    <ul className="menu">
                        <li> <Link to="/" className="menu-item">Home</Link>
                        </li>
                        <li><Link to="/about" className="menu-item">About</Link></li>
                        <li>
                            <div className="menu-item drop" id="menu-item-dropt">Movies
                                <ul className="dropdown movies-type" id="dropdown-movies">
                                    <li className="dropdown item">
                                        <Link to="/popular" className="type">Poppular</Link>
                                    </li>
                                    <li className="dropdown item">
                                        <Link to="/now_playing" className="type">Now Playing</Link>
                                    </li>
                                    <li className="dropdown item">
                                        <Link to="/upcoming" className="type">Upcoming</Link>
                                    </li>
                                    <li className="dropdown item">
                                        <Link to="/top_rated" className="type">Top Rates</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <form className="nav-bar-form-search">
                        <div className="search-wrap">
                            <input type="text" className="input-search" placeholder="Search for a movie, tv show, person..."
                                value={this.props.search}
                                onChange={this.props.handleTyping}
                            />
                        </div>
                        <Link to="/search">
                            <button type="submit" className="button-search" onClick={this.props.onSubmit} >
                                <div className="gg-search"></div>
                            </button>
                        </Link>
                    </form>
                </div>
                <div className="nav-bar-right">
                    <Link to='/login'><button className="button-login"  >
                        Login
                    </button>
                    </Link>
                    <Link to={`/user/${this.state.profile.id}`}><div className="user-profile"  >
                        <b>{this.state.profile.fullName} </b>                        
                        <img src={this.state.profile.avatar}/>
                    </div>
                    </Link>
                </div>
            </div>
        )
    }
}