import React from "react";
import axios from "axios";
import { Cookies } from 'react-cookie';
import { Link, Redirect } from "react-router-dom";

const cookies = new Cookies();
export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);
        this.handleChangePhonenumber = this.handleChangePhonenumber.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.onAdd = this.onAdd.bind(this);

        this.state = {
            id: '',
            email: '',
            fullName: '',
            age: '',
            synopsis: '',
            phoneNumber: '',
            avatar: '',
            password: ''
        };

        this.inputOpenFileRef = React.createRef();
    }

    componentDidMount() {
        document.querySelector('.nav-bar-center').style.display = 'none';
        document.querySelector('.nav-bar-right').style.display = 'none';
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

    handleChangePass(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangeImage = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ avatar: reader.result });
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        console.log("did1", this.inputOpenFileRef.current.files.length)
    };

    showOpenFile = () => {
        this.inputOpenFileRef.current.click();
    }

    onAdd = async (e) => {
        console.log("click")
        if ((this.state.password !== '') && (this.state.email !== '')) {
            let account;
            if (this.inputOpenFileRef.current.files.length === 0) {
                account = {
                    id: Math.random(),
                    avatar: this.state.avt,
                    email: this.state.email,
                    fullName: this.state.fullName,
                    synopsis: this.state.synopsis,
                    age: this.state.age,
                    phoneNumber: this.state.phoneNumber,
                    password: this.state.password
                };
            } else {
                account = {
                    id: Math.random(),
                    avatar: this.state.avatar,
                    email: this.state.email,
                    fullName: this.state.fullName,
                    synopsis: this.state.synopsis,
                    age: this.state.age,
                    phoneNumber: this.state.phoneNumber,
                    password: this.state.password
                };
            }
            console.log('test 2', account)
            await axios.post("http://localhost:8000/admin/add", account)
                .then(response => {
                    console.log('test 3', response)
                    alert('You have successfully add a new account!')
                    
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        if ((cookies.get('isLogin') === 'true') && (cookies.get('ad') === 'y')) return (
            <div className="form">
                <div className="panel-contain">
                    <div className="id qh">
                        <h2>ID: {this.state.id} </h2>
                        <Link to="/admin"> 
                        <img className="cancel" src="/cancel.svg" />
                        </Link>
                    </div>
                    <div className="general-inf">
                        <h3>Add a account:</h3>
                        <div className="full-name qw">
                            <h4>Full-name: </h4>
                            <input className="in ip-full-name" type='text' placeholder="Full-name" value={this.state.fullName}  onChange={this.handleChangeFullname} required />
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
                        <div className="email qw">
                            <h4>Email: </h4>
                            <input className="in ip-email" type='email' placeholder="@gmail.com " value={this.state.email} onChange={this.handleChangeEmail} required />
                            <h4>Password: </h4>
                            <input className="in ip-email" type='password' placeholder="Password" value={this.state.password} onChange={this.handleChangePass} required />
                        </div>
                        <div className="avatar qw">
                            <h4>Avatar: </h4>
                            <div className="img-prof">
                                <div className="avt-img">
                                    <img className="avt-img" src={this.state.avatar} />
                                    <input ref={this.inputOpenFileRef} type="file" style={{ display: "none" }} name="myImage" accept="image/*" onChange={this.handleChangeImage} />
                                    <img className="camrera" src="/photo-camera.svg" onClick={this.showOpenFile} />

                                </div>

                            </div>


                        </div>
                    </div>
                    <div className="save">
                        <button className="bt-save" onClick={()=>this.onAdd()}>
                           Add
                        </button>
                    </div>
                </div>
            </div>
        );
        else return(<Redirect to='/admin'/>)
    }
};
