import React from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Link, Redirect } from "react-router-dom";

import './user.scss';


const cookies = new Cookies();

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);
        this.handleChangePhonenumber = this.handleChangePhonenumber.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.onSubmitProfile = this.onSubmitProfile.bind(this);

        this.state = {
            profile: {},
            id: '',
            user: cookies.get('user'),
            fullName: '',
            age: '',
            synopsis: '',
            phoneNumber: '',
            avatar: null
        };

        this.inputOpenFileRef = React.createRef();
    }

    componentDidMount = async () => {
        this.getUserProfile();
        document.querySelector('.btt').style.display = 'none';
        document.querySelector('.update-avt').style.display = 'none';
    }

    getUserProfile = async () => {
        let user = {
            email: this.state.user
        };

        await axios.post("http://localhost:8000/user", user)
            .then(response => {
                this.setState({ profile: response.data[0] })
                let profile = {
                    id: response.data[0].id,
                    email: response.data[0].email,
                    fullName: response.data[0].fullName,
                    synopsis: response.data[0].synopsis,
                    age: response.data[0].age,
                    phoneNumber: response.data[0].phoneNumber,
                    avatar: 'http://localhost:8000' + response.data[0].avatar
                }
                this.setState(profile);
                console.log(this.state)
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChangeFullname(e) {
        this.setState({ fullName: e.target.value });
    }

    handleChangeAge(e) {
        this.setState({ age: e.target.value });
    }

    handleChangeSynopsis(e) {
        this.setState({ synopsis: e.target.value });
    }

    handleChangePhonenumber(e) {
        this.setState({ phoneNumber: e.target.value });
    }

    handleChangeImage = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ avatar: reader.result });
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    updateAvt = async (e) => {
        console.log("click")
        if (this.state.profile.avatar !== this.state.avatar.slice(21)) {
            let profileEdit = {
                id: this.state.profile.id,
                avatar: this.state.avatar,
                email: this.state.profile.email,
                fullName: this.state.profile.fullName,
                synopsis: this.state.profile.synopsis,
                age: this.state.profile.age,
                phoneNumber: this.state.profile.phoneNumber
            };
            await axios.post("http://localhost:8000/updateprofile", profileEdit)
                .then(response => {
                    console.log('update anh')
                    alert('You have successfully updated your avatar!')
                })
                .catch(error => {
                    console.log(error);
                });
        }
        e.preventDefault();

    }

    onSubmitProfile = async (e) => {
        console.log("click")
        if (this.state.fullName !== '') {
            let profileEdit = {
                id: this.state.id,
                avatar: this.state.profile.avatar,
                email: this.state.user,
                fullName: this.state.fullName,
                synopsis: this.state.synopsis,
                age: this.state.age,
                phoneNumber: this.state.phoneNumber
            };
            console.log('test 2', profileEdit)
            await axios.post("http://localhost:8000/updateprofile", profileEdit)
                .then(response => {
                    alert('You have successfully updated your information!')
                })
                .catch(error => {
                    console.log(error);
                });
        }
        e.preventDefault();
    }

    onLogout = async () => {
        console.log("click");
        await cookies.remove('user');
        await cookies.remove('isLogin');
        document.querySelector('.user-profile').style.display = 'none';
        document.querySelector('.button-login').style.display = 'block';
        let user = {
            email: this.state.profile.email
        };

        await axios.post("http://localhost:8000/logout", user)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }

    showOpenFile = () => {
        this.inputOpenFileRef.current.click();
    }

    handleProfile() {
        document.querySelector('.btt').style.display = 'none';
        document.querySelector('.update-avt').style.display = 'none';
        document.querySelector('.profile').style.color= 'rgb(39, 140, 180)';
        document.querySelector('.profile').style.background= 'rgba(1, 1, 65, 0.26)';
        document.querySelector('.settings').style.color= '#ffffff';
        document.querySelector('.settings').style.background= 'rgba(255, 255, 255, 0)';
    }

    handleSetting() {
        document.querySelector('.btt').style.display = 'block';
        document.querySelector('.update-avt').style.display = 'block';
        document.querySelector('.settings').style.color= 'rgb(39, 140, 180)';
        document.querySelector('.settings').style.background= 'rgba(1, 1, 65, 0.26)';
        document.querySelector('.profile').style.color= '#ffffff';
        document.querySelector('.profile').style.background= 'rgba(255, 255, 255, 0)';
    }

    render() {
        const picture = this.state.avatar;
        console.log("cdscds",cookies.get('user'),(cookies.get('user') !== ''))
        if ((cookies.get('isLogin') === "true")
            && (cookies.get('user') !== undefined))
        return (
            <div className="panel">
                <div className="panel-left">
                    <Link to='/'>
                        <img src="/back.svg" className="back-img" />
                    </Link>
                    <div className="profile" onClick={()=> this.handleProfile()}>
                        <img src="/avatar.png" />
                        <b>Profile</b>
                    </div>
                    <div className="settings"onClick={()=> this.handleSetting()}>
                        <img src="/setting.svg" />
                        <b>Settings</b>
                    </div>
                    <Link to='/' onClick={() => this.onLogout()}>
                        <div className="Logout" >

                            <img src="/logout.svg" />
                            <b>Logout</b>

                        </div>
                    </Link>
                </div>
                <div className="panel-contain">
                    <div className="general-inf">
                        <h2>General information</h2>
                        <div className="full-name qw">
                            <h4>Full-name: </h4>
                            <input className="in ip-full-name" type='text' placeholder="Full-name" value={this.state.fullName} onChange={this.handleChangeFullname} required />
                        </div>
                        <div className="Age qw">
                            <h4>Age: </h4>
                            <input className="in ip-age" type='number' placeholder="Age" value={this.state.age} onChange={this.handleChangeAge} required />
                        </div>
                        <div className="synopsis qw">
                            <h4>Synopsis: </h4>
                            <input className="in ip-synopsis" type='text' placeholder="Sysnopsis" value={this.state.synopsis} onChange={this.handleChangeSynopsis} required />
                        </div>
                        <div className="phone qw">
                            <h4>Phone-number: </h4>
                            <input className="in ip-phone" type='number' placeholder="+84 " value={this.state.phoneNumber} onChange={this.handleChangePhonenumber} required />
                        </div>
                    </div>
                    <div className="account">
                        <h2>Account</h2>
                        <div className="email qh">
                            <h4>Email address: </h4>
                            <p>{this.state.email}</p>
                        </div>
                        <div className="id qh">
                            <h4>Id account: </h4>
                            <p>{this.state.id}</p>
                        </div>
                        <div className="language qh">
                            <h4>Language: </h4>
                            <p>English (United States)</p>
                        </div>
                    </div>
                    <div className="save btt">
                        <button className="bt-save" onClick={this.onSubmitProfile}>
                            Save All
                        </button>
                    </div>
                </div>
                <div className="panel-right">
                    <div className="img-prof">
                        <img className="back-img" src="/pattern.png" />
                        <div className="avt-img">
                            <img className="avt-img" src={picture} />
                            <input ref={this.inputOpenFileRef} type="file" style={{ display: "none" }} name="myImage" accept="image/*" onChange={this.handleChangeImage} />
                            <img className="camrera" src="/photo-camera.svg" onClick={this.showOpenFile} />
                        </div>

                    </div>
                    <div className="name">
                        <h2>{this.state.profile.fullName}</h2>
                        <p><i>{this.state.profile.email}</i></p>
                        <h4><i>{this.state.profile.synopsis}</i></h4>
                    </div>
                    <div className="update-avt btt">
                        <button className="btt" onClick={this.updateAvt}>
                            Change avatar
                        </button>
                    </div>
                </div>
            </div>
        )
    else return(<Redirect to="/"/>)
    }
}