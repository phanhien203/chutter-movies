import React from "react";

import './about.scss';

export default function About() {
    return (
        <div className="about">
            <img className="back-ab" src="/pattern.png" />
            <div className="header-ab">
                <div>
                    <h1><i>Hi there,</i></h1>
                    <img className="backgnd-movie" src="/backgnd-movie.png" />
                    <h2>Let's talk about Chutter</h2>
                    <p>Chutter is a community-built movie and TV show website.
                    Database based on The Movie Database (TMDb). Every piece 
                    of data has been added by our amazing community dating back 
                    to 2008. TMDb's strong international focus and breadth of 
                    data is largely unmatched and something we're incredibly 
                    proud of. Put simply, we live and breathe community and 
                    that's precisely what makes us different.
                    </p>
                </div>
                <iframe
                    id="video-ab"
                    src="https://www.youtube.com/embed/058Hkf_L6Zk?&amp;autoplay=1&rel=0&loop=1"
                    title="Chutter Movie"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
            </div>

            <div className="container-ab">

            </div>

            <div className="footer-ab">

            </div>
        </div>
    );
};
