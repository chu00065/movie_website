import React from 'react';
import {Col } from 'antd';

export default class MovieListItemComponent extends React.Component {
    render() {
        return (
            <Col span={4} className='MovieListItem'>
                {
                    this.props.poster_path ?
                        //alt displays error message
                        <img
                            src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`}
                            alt=""
                            height="400"
                            width="300"
                        ></img>
                        : <img
                            src={``}
                            alt=""
                            height="400"
                            width="300"
                        ></img>
                }
                <h5 style={{ color: "black" }}>Name: {this.props.name}</h5>
                <h5 style={{ color: "black" }}>Release date: {this.props.first_air_date}</h5>
                <h5 style={{ color: "black" }}>Review : {this.props.vote_average / 2}</h5>
            </Col>
        )
    }
}