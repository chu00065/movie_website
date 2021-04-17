import React from 'react';
import { Rate } from 'antd';

export default class ListItemComponent extends React.Component {
    render() {
        return (
            <div className='searchInput'>
                {
                    this.props.poster_path ?
                        //alt displays error message
                        <img src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`} alt="" ></img>

                        : null

                }

                <div className='playListContent'>
                    <h3>Name: {this.props.title}</h3>
                    <h3>Release date: {this.props.release_date}</h3>
                    <h3>Review : <Rate disabled allowHalf defaultValue={this.props.vote_average / 2} /></h3>
                </div>
            </div>
        )
    }
}