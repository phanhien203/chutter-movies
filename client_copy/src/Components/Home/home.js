import React from "react";
import axios from "axios";
import Item from "../Item/item";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import './home.scss';

const cookies = new Cookies();
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top_rated: [],
            now_playing: [],
            popular: []
        }
    }

    componentDidMount = async () => {
        if ((cookies.get('isLogin') === "true") && (cookies.get('user') !== undefined)) {
            document.querySelector('.button-login').style.display = 'none';
            document.querySelector('.user-profile').style.display = 'block';
        } else if ((cookies.get('isLogin') !== "true") || (cookies.get('user') == undefined)){
            document.querySelector('.button-login').style.display = 'block';
            document.querySelector('.user-profile').style.display = 'none';

        }
        this.setState({ top_rated: await this.getAPI('top_rated') });
        this.setState({ now_playing: await this.getAPI('now_playing') });
        this.setState({ popular: await this.getAPI('popular') });
        console.log('genrn', this.state)
        
    }

    getAPI = async (key) => {
        let url = "https://api.themoviedb.org/3/movie/" + key + "?api_key=74d06b087582f0c1aea4867c70dc9f2f&language=en-US&page=1";
        let newData;
        await axios.get(url)
            .then(response => {
                let data = response.data.results;
                newData = data.map((res) => {
                    return {
                        id: res.id,
                        text: res.title,
                        image: "https://image.tmdb.org/t/p/w1280" + res.poster_path,
                        rated: res.vote_average
                    };
                });
            })
            .catch(error => console.log(error));
        newData.splice(10, 10);
        return (newData)
    }

    render() {
        return (
            <div className="baselist">
                <div className="items-content-genre">
                    <div className="genres">Top Rated</div>
                    <div className="items-content">
                        {this.state.top_rated.map((item, index) => {
                            return (<div key={item.id}>
                                <Link to={`/movie/${item.id}`} >
                                    <div className="item-movies" 
                                    >
                                        <Baselist item={item} />
                                    </div>
                                </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="items-content-genre">
                    <div className="genres">Now Playing</div>
                    <div className="items-content">
                        {this.state.now_playing.map((item, index) => {
                            return (
                                <Link to={`/movie/${item.id}`} >
                                    <div className="item-movies" key={item.id}
                                    >
                                        <Baselist item={item} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="items-content-genre">
                    <div className="genres">Popular</div>
                    <div className="items-content">
                        {this.state.popular.map((item, index) => {
                            return (
                                <Link to={`/movie/${item.id}`} >
                                    <div className="item-movies" key={item.id}
                                    >
                                        <Baselist item={item} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function Baselist(props) {
    return (
        <div>
            <a href="#" className="poster-hover">
                <img className="poster index" src={props.item.image} />
            </a>
            <div className="rated">{props.item.rated}</div>
            <div key={props.item.text} className="item-data-list">
                <Item item={props.item.text} />
            </div>
        </div>
    )
}

{/* <div className="item-movies" key={index}>
<a href="#" className="poster-hover">
    <img className="background" src="/video.svg" />
    <img className="poster index" src={item.image} />
</a>
<div className="rated">{item.rated}</div>
<div key={item.text} className="item-data-list">
    <Item item={item.text} />
</div>

</div> */}