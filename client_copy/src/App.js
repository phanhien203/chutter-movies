import React from "react";
import axios from 'axios';
import { Cookies } from "react-cookie";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import NavBar from "./Components/NavBar/navbar";
import Greeting from "./Components/Greeting/greeting";
import Login from "./Components/Login/login";
import Home from "./Components/Home/home";
import Search from "./Components/Search/search";
import User from "./Components/User/user";
import Footer from "./Components/Footer/footer";
import Movie from "./Components/Movie/movie";
import Genre from "./Components/Genre/genre";
import About from "./Components/About/about";
import LoginAdmin from "./Components/Admin/login";
import Edit from "./Components/Admin/edit";
import Add from "./Components/Admin/add";

import './App.css';

const cookies = new Cookies();
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleTyping = this.handleTyping.bind(this);
        this.state = {
            search: '',
            isLoad: false,
            id: 0
        }
    }

    shouldComponentUpdate() {
        console.log('should update app', this.state.isLoad, this.state.id)
        if ((this.state.isLoad === true)
            ||
            (this.handleTyping))
            return true;

        if (this.state.item != 0) return false
    }

    componentDidUpdate() {
        console.log('did update app', this.state)
        if (this.state.isLoad === true) this.setLoad(false)
    }

    componentDidMount() {
        console.log('did mount app', this.state)
    }

    handleTyping(e) {
        this.setState({ search: e.target.value })
        e.preventDefault();
        console.log('handle', this.state.search)
    }

    onSubmit = () => {
        console.log('click')
        this.setLoad(true)
    }

    setLoad = async (e) => {
        console.log('set load', this.state.isLoad)
        this.setState({ isLoad: e })

    }

    render() {
        console.log("item", this.state.item)
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path='/'>
                        <NavBar
                            search={this.state.search}
                            handleTyping={this.handleTyping}
                            onSubmit={this.onSubmit}
                        />
                    </Route>
                    <div className="container">
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/' >
                            <Greeting />
                            <Home/>
                        </Route>
                        <Route exact path='/search' >
                            <Greeting />
                            <Search
                                search={this.state.search}
                                isLoad={this.state.isLoad}
                                setLoad={this.setLoad}                            
                            />
                        </Route>
                        < Route exact path="/top_rated" >
                            <Greeting />
                            <Genre genre={'top_rated'}
                            />
                        </Route>
                        < Route exact path="/popular" >
                            <Greeting />
                            <Genre genre={'popular'}
                            />
                        </Route>
                        < Route exact path="/now_playing" >
                            <Greeting />
                            <Genre genre={'now_playing'}
                            />
                        </Route>
                        < Route exact path="/upcoming" >
                            <Greeting />
                            <Genre genre={'upcoming'}
                            />
                        </Route>
                        <Route exact path={"/movie/:id"} component={Movie}/>
                        <Route exact path="/about" component={About} />
                        <Route exact path={"/user/:id"} component={User} />
                        <Route exact path="/admin" component={LoginAdmin} />
                        <Route exact path={'/admin/edit/:id'} component={Edit}/>
                        <Route exact path={'/admin/add'} component={Add}/>
                    </div>
                    
                    <Route path='/' component={Footer} />
                    
                </div>
            </BrowserRouter>
        );
    }
}