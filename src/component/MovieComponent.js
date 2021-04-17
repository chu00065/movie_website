import React from 'react';
import { Row, Col, Pagination, Radio, Spin, Button, Modal } from 'antd';
import MovieListItemComponent from './MovieListItemComponent';

export default class MovieComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            movieType: 'now_playing',
            pageSize: 20,
            pageIndex: 1,
            totalPages: 0,
            isLoading: false,
        }
    }

    onChange = page => {
        console.log(page);
        this.setState({
            pageIndex: page,
        }, () => {
            this.refreshData(this.state.movieType, this.state.pageIndex)
        }
        );
        // this.refreshData(this.state.movieType, page)
    };

    onChange1 = e => {
        console.log('radio1 checked', e.target.value);
        this.setState({
            movieType: e.target.value,
        }, () => {
            this.refreshData(this.state.movieType, this.state.pageIndex)
        });
    };


    render() {
        return <div>
            <Row justify={'center'}>
                <Col span={20}>
                    <Radio.Group onChange={this.onChange1} value={this.state.movieType}>
                        <Radio value={'now_playing'}>Now Playing</Radio>
                        <Radio value={'popular'}>popular</Radio>
                        <Radio value={'top_rated'}>Top rated</Radio>
                        <Radio value={'upcoming'}>Upcoming</Radio>
                    </Radio.Group>
                    <Pagination current={this.state.pageIndex} total={this.state.totalPages} onChange={this.onChange} />
                </Col>
            </Row>
            <Spin spinning={this.state.isLoading}>  
                    {this.getMoviesList()} 
            </Spin>
            <Row justify={'center'}>
                <Col span={20}>
                    <Pagination current={this.state.pageIndex} total={this.state.totalPages} onChange={this.onChange} />
                </Col>
            </Row>
        </div>

    }


    getMoviesList = () => {
        console.log('this.state.movies', this.state.movies);
        let movieDiv = [];
        let movieDivList = [];
        let results = [];
        //what is map mean?
        if (this.state.movies) {
            for (let i = 0; i < this.state.movies.length; i++) {
                console.log("length", this.state.movies.length);
                if (movieDiv.length === 4) {
                    movieDivList.push(movieDiv);
                    movieDiv = [];
                }
                movieDiv.push(
                    <MovieListItemComponent key={this.state.movies[i].id}{...this.state.movies[i]} />
                )
            }
            console.log("row", movieDiv);
            movieDivList.push(movieDiv);
            for (let i = 0; i < movieDivList.length; i++) {
                results.push(
                    <Row justify="center">
                        {movieDivList[i]}
                    </Row>
                );

            }
            console.log("result!!!", movieDivList);
            return results;
        } else {
            return null;
        }
    }

    refreshData = (type, page) => {
        this.setState({ isLoading: true, movies: null })
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=04b256f451c0e618b5735841206fdedc&page=${page}`)
            .then(response => { return response.json(); })
            .then(data => {
                console.log("data!!", data);
                this.setState({
                    isLoading: false,
                    movies: data.results,
                    totalPages: data.total_pages,
                    pageIndex: data.page,
                })
            })
    }

    componentDidMount() {
        this.refreshData(this.state.movieType, this.state.pageIndex)
    }
} 