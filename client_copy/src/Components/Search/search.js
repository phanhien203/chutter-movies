import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";

import Item from "../Item/item";
import './search.scss';

const cookies = new Cookies();

export default function Search(props) {
    const [items, setItems] = useState([]);
    const isLoad = props.isLoad;
    const search = props.search;
    const setLoad = props.setLoad;
    const [item, setItem] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();

    useEffect(() => {
        console.log('use effect', isLoad)
        if (isLoad === true) {
            getAPI(search, page)
            document.querySelector("body").scrollIntoView();
        }
    }, [isLoad])

    useEffect(() => {
        console.log('use effect', isLoad)
        setPage(1)
    }, [search])

    const getAPI = async (key, page) => {
        let url = "https://api.themoviedb.org/3/search/movie?api_key=74d06b087582f0c1aea4867c70dc9f2f&language=en-US&page=" +
            page +
            "&include_adult=false&query=" +
            key.replace(" ", "+");
        await axios.get(url)
            .then(response => {
                let data = response.data.results;
                let newData = data.map(res => {
                    return {
                        id: res.id,
                        text: res.title,
                        image: "https://image.tmdb.org/t/p/w1280" + res.poster_path,
                        rated: res.vote_average
                    };
                });
                setItems(newData);
                setLoad(false)
                setMaxPage(response.data.total_pages)
                console.log('get api', items, response.data.total_pages)
            })
            .catch(error => console.log(error));
    }

    async function onSetPage() {
        console.log('click set page')
        setPage(page + 1);
        setLoad(true);
    }

    console.log('render', items, maxPage)
    if (items.length !== 0)
        return (
            <div className="baselist">
                <div className="items-content">
                    {items.map((item, index) => {
                        return (
                            <Link to={`/movie/${item.id}`} >
                                <div className="item-movies" key={index}>
                                    <a href="#" className="poster-hover" >
                                        <img className="background" src="/video.svg" />
                                        <img className="poster index" src={item.image} />
                                    </a>
                                    <div className="rated">{item.rated}</div>
                                    <div key={item.text} className="item-data-list">
                                        <Item item={item.text} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="numpage">
                    Page {page}
                    <button className="page" onClick={onSetPage}>
                        {">"}
                    </button>
                </div>
            </div>
        )
    else return (
        <div></div>
    )
}