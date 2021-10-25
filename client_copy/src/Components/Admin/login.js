import React from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './login.scss';

const cookies = new Cookies();
export default class LoginAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.handleUserChanges = this.handleUserChanges.bind(this);
        this.handlePasswordChanges = this.handlePasswordChanges.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleColumn = this.handleColumn.bind(this);
        this.state = {
            isLogin: cookies.get('isLogin'),
            user: '',
            password: '',
            data: []
        }
    }

    componentDidMount() {
        document.querySelector('.nav-bar-center').style.display = 'none';
        document.querySelector('.nav-bar-right').style.display = 'none';
        if (this.state.isLogin === 'true') this.getAPI()
    }

    login = async (user, pass) => {
        console.log("login admin")
        let account_login = {
            email: user,
            password: pass
        };
        await axios.post("http://localhost:8000/admin/auth", account_login)
            .then(response => {
                if (response.status === 200) {
                    console.log("200")
                    cookies.set('isLogin', 'true')
                    cookies.set('ad', 'y')
                    this.setState({ isLogin: 'true' })
                    this.getAPI();
                } else {
                    alert("Client: Sai thong tin");
                    console.log("401")
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    getAPI = async () => {
        await axios.get("http://localhost:8000/admin/display")
            .then(response => {
                console.log("display", response)
                this.setState({ data: response.data })

            })
            .catch(error => {
                console.log(error);
            });

    }

    handleLogin = async () => {
        this.login(this.state.user, this.state.password)
    }

    handleUserChanges(e) {
        this.setState({ user: e.target.value })
        console.log("this.state.email", this.state.typingE)
    }

    handlePasswordChanges(e) {
        this.setState({ password: e.target.value })
    }

    handleDelete = async (key) => {
        console.log("delete", this.state.data[key].email)
        let user = {
            email: this.state.data[key].email
        }
        await axios.post("http://localhost:8000/admin/delete", user)
            .then(response => {
                console.log("delete", response)
                this.handleColumn(key)
                // this.setState({ data: response.data})

            })
            .catch(error => {
                console.log(error);
            });
    }

    handleEdit() {
        document.querySelector('.form').style.display = 'block';
    }

    handleColumn(n) {
        let newData = this.state.data;
        newData.splice(n,1);
        console.log('slice', newData.slice(n))
        this.setState({ data: newData });
    }

    render() {
        if ((cookies.get('isLogin') !== 'true') && (cookies.get('ad') !== 'y'))
            return (
                <div class="admin">
                    <div class="row">
                        <div class="col-lg-3 col-md-2"></div>
                        <div class="col-lg-6 col-md-8 login-box">
                            <div class="col-lg-12 login-key">
                                <img src="/key.svg" />
                            </div>
                            <div class="col-lg-12 login-title">
                                ADMIN PANEL
                            </div>
                            <div class="col-lg-12 login-form">
                                <div class="col-lg-12 login-form">
                                    <div>
                                        <div class="form-group">
                                            <label class="form-control-label">USERNAME</label>
                                            <input type="text" class="form-control"
                                                onChange={this.handleUserChanges} />
                                        </div>
                                        <div class="form-group">
                                            <label class="form-control-label">PASSWORD</label>
                                            <input type="password" class="form-control"
                                                onChange={this.handlePasswordChanges} />
                                        </div>

                                        <div class="col-lg-12 loginbttm">
                                            <div class="col-lg-6 login-btm login-button">
                                                <button class="btn btn-outline-primary"
                                                    onClick={this.handleLogin}
                                                >LOGIN</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-2"></div>
                        </div>
                    </div>

                </div>
            )

        else if ((cookies.get('isLogin') === 'true') && (cookies.get('ad') === 'y')) return (
            <div className="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-xs-5">
                            <h2> <b>User Management</b></h2>
                        </div>
                        <div class="col-xs-7">
                            <Link to="/admin/add" >Add a new member</Link>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover" >
                    <thead>
                        <tr className="tilte" cellspacing="0" cellpadding="0">
                            <th>#</th>
                            <th>Full Name <i class="fa fa-sort"></i></th>
                            <th>Email Address</th>
                            <th>Id Account</th>
                            <th>Password<i class="fa fa-sort"></i></th>
                            <th>Phone Number</th>
                            <th>Age<i class="fa fa-sort"></i></th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.state.data.map((value, index) => {
                            return (
                                <tr>
                                    <td className="aww">{index + 1}</td>
                                    <td className="name"><img className="avatar" src={`http://localhost:8000${value.avatar}`} /> {value.fullName}</td>
                                    <td>{value.email}</td>
                                    <td className="aww">{value.id}</td>
                                    <td>{value.password}</td>
                                    <td>{value.phoneNumber}</td>
                                    <td className="aww">{value.age}</td>
                                    <td className="aww"><span class={[
                                        'status',
                                        `${value.isLogin ? 'green' : 'red'}`
                                    ].join(' ')} >&bull;</span></td>
                                    <td className="actions">
                                        <Link to={`/admin/edit/${index}`}><img src="/pencil.svg" />Edit</Link>
                                        <button className="btn-delete" onClick={() => this.handleDelete(index)}><img src="/delete.svg" />Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}