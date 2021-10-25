import React from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";

import Item from "../Item/item";
import './movie.scss';

const cookies = new Cookies();

export default class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                genres: [],
                production_companies: [],
                production_countries: [],
                spoken_languages: [{}],
                release_date: ''
            },
            title: '',
            upcoming: [],
            id: this.props.match.params.id,
            load: false

        }
    }

    shouldComponentDidMout() {
        if (this.state.load === true) return true
    }



    componentDidMount = async () => {
        document.querySelector("body").scrollIntoView();
        await this.getAPI();

        if (this.state.load === true) await this.setState({ load: false })
    }

    getAPI = async () => {
        let id = this.state.id;
        let url = "https://api.themoviedb.org/3/movie/" +
            id +
            "?api_key=74d06b087582f0c1aea4867c70dc9f2f";
        await axios.get(url)
            .then(response => {
                console.log('url1', url)
                this.setState({ movie: response.data })
                if (response.data.original_title !== response.data.title) {
                    this.setState({ title: response.data.title })
                } else {
                    this.setState({ title: '' })
                }
            })
            .catch(error => console.log(error));

        let url2 = "https://api.themoviedb.org/3/movie/upcoming?api_key=74d06b087582f0c1aea4867c70dc9f2f&language=en-US&page=1";
        await axios.get(url2)
            .then(response => {
                let data = response.data.results;
                let newData = data.map((res) => {
                    return {
                        id: res.id,
                        text: res.title,
                        image: "https://image.tmdb.org/t/p/w1280" + res.poster_path,
                        vote: res.vote_average,
                        vote_count: res.vote_count,
                        release_date: res.release_date,
                        popularity: res.popularity
                    };
                });
                newData.splice(7, 13);
                this.setState({ upcoming: newData })
            })
            .catch(error => console.log(error));
        console.log('data', this.state)
        await this.setState({ load: true })
    }

    clickMovie = async (key) => {
        document.querySelector("body").scrollIntoView();
        this.setState({ id: key })
        await this.setState({ load: true })
        console.log("cl", key)
        await this.getAPI();

    }

    render() {
        let data = this.state.movie;
        return (
            <div className="movies">
                <div className="movie">
                    <div className="top-contain">
                        <div className="left-contain">
                            <div className="pt">
                                <img className="poster-film"
                                    src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}
                                />
                            </div>
                            <div className="information">
                                <div className="release_date dp">
                                    <b><i>Release date: </i></b>
                                    {data.release_date}
                                </div>
                                <div className="runtime dp">
                                    <b><i>Runtime: </i></b> {data.runtime} min
                                </div>
                                <div className="genres dp">
                                    <b><i>Genres: </i></b>
                                    {data.genres.map((value) => {
                                        return (
                                            <div>{value.name}</div>
                                        )
                                    })}
                                </div>
                                <div className="spoken_languages dp">
                                    <b><i>Original Language: </i></b>
                                    {data.spoken_languages[0].english_name}
                                </div>
                                <div className="popularity dp">
                                    <b><i>Popularity: </i></b> {data.popularity}
                                </div>
                                <div className="vote_average dp">
                                    <b><i>Vote: </i></b> {data.vote_average}/10

                                </div>
                                <div className="vote_count dp">
                                    <b><i>Vote count: </i></b> {data.vote_count}
                                </div>
                            </div>
                        </div>


                        <div className="center-contain">
                            <h1 className="original_title">
                                {data.original_title}{` (${data.release_date.slice(0, 4)})`}
                            </h1>
                            <h1 className="original_title">{this.state.title}</h1>
                            <i>{data.tagline}</i>
                            <div className="overview"> <h4>OVERVIEW</h4>
                                <p>{data.overview}</p>
                            </div>
                            <img className="backdrop"
                                src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
                            />

                        </div>
                    </div>
                    <div className="bottom-contain">
                        <h3><i>This movie was producted by</i></h3>
                        <div className="production_companies">
                            {data.production_companies.map((item, index) => {
                                return (
                                    <div className="item-production_companies" key={index} title={item.name}>

                                        <div className="logo-companies">
                                            <img src={`https://image.tmdb.org/t/p/w1280${item.logo_path}`} className="view" />
                                        </div>
                                        <i>{item.name}</i>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="watch">
                            <a href={data.homepage} className="click-watch">
                                <img src="/video-cr.png" />
                                Click here to watch trailer movie
                            </a>
                        </div>
                    </div>
                </div>


                <div className="right-contain">
                    <div className="video-intro">
                        <iframe
                            src="https://www.youtube.com/embed/058Hkf_L6Zk?&amp;autoplay=1&rel=0&loop=1"
                            title="Chutter Movie"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                        </iframe>
                    </div>
                    <div className="items-upcoming">
                        {this.state.upcoming.map((item, index) => {
                            return (
                                <Link to={`/movie/${item.id}`} onClick={() => this.clickMovie(item.id)}>
                                    <div className="item-movies" key={item.id}>
                                        <a href="#" className="poster-hover" >
                                            <img className="background" src="/video.svg" />
                                            <img className="poster index" src={item.image} />
                                        </a>
                                        <div key={item.text} className="item-data-list">
                                            <Item item={item.text} />
                                            {` (${item.release_date.slice(0, 4)})`}
                                            <div className="views">
                                                <img src="/view.svg" className="view" />
                                                {item.popularity}
                                            </div>
                                            <div>{item.vote} &#10032; </div>
                                            <div>{item.vote_count} vote</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                </div>
            </div>
        )
    }
}
