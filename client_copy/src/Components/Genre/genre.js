import React from "react";
import axios from "axios";
import Item from "../Item/item";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import './genre.scss';

const cookies = new Cookies();
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount = async () => {
        console.log('page top rated')
        this.setState({ items: await this.getAPI(this.props.genre) });
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
        return (newData)
    }

    render() {
        return (
            <div className="baselist">
                <div className="items-content-genre">
                    <div className="genres">{this.props.genre.replace("_", " ")}</div>
                    <div className="items-content">
                        {this.state.items.map((item, index) => {
                            return (
                                <Link to={`/movie/${item.id}`} >
                                    <div className="item-movies" key={index}
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