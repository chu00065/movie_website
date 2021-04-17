import React from 'react';
import { Row, Col, Radio, Input, Pagination } from 'antd';
import MovieListItemComponent from './MovieListItemComponent';
import TvListItemComponent from './TvListItemComponent';

const options = [
    { label: 'Movies', value: 'movie' },
    { label: 'TV Show', value: 'tv' },
]

const { Search } = Input;


export default class MovieComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            searchType: 'movie',
            pageIndex: 1,
            isLoading: false,
            totalPages: 0,
            searchValue: ''
        }
    }

    changeOfCatogory = e => {
        console.log('radio1 checked', e.target.value);
        this.setState({
            searchType: e.target.value,
        }, () => {
            this.refreshData(this.state.searchType, this.state.searchValue, this.state.pageIndex)
        });
    };

    handleSearch = (value) => {
        if (value) {
            this.refreshData(this.state.searchType, value, 1);
        }
    }

    handleSearchOnChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    pageChange = page => {
        console.log(page);
        this.setState({
            pageIndex: page,
        }, () => {
            this.refreshData(this.state.searchType, this.state.searchValue, this.state.pageIndex)
        }
        );
        // this.refreshData(this.state.movieType, page)
    };

    render() {
        return <div>
            <Row justify={'center'}>
                <Col span={2} >
                    <Radio.Group onChange={this.changeOfCatogory} value={this.state.searchType}>
                        <Radio value={'movie'}>Movies</Radio>
                        <Radio value={'tv'}>Tv_shows</Radio>
                    </Radio.Group>
                </Col>
                <Col span={12} >
                    <Search
                        placeholder="input search text"
                        onSearch={this.handleSearch}
                        style={{ width: 200 }}
                        value={this.state.searchValue}
                        onChange={this.handleSearchOnChange}
                    />
                </Col>
            </Row>

            {this.getMovie()}


        </div>
    }


    getMovie = () => {
        console.log('this.state.movies', this.state.movies);
        let movieDiv = [];
        let movieDivList = [];
        let results = [];

        if (this.state.movies) {
            if (this.state.searchType === 'movie') {
                for (let i = 0; i < this.state.movies.length; i++) {
                    if (movieDiv.length === 4) {
                        movieDivList.push(movieDiv);
                        movieDiv = [];
                    }
                    movieDiv.push(
                        <MovieListItemComponent key={this.state.movies[i].id}{...this.state.movies[i]} />
                    )
                }
                movieDivList.push(movieDiv)
                results.push(
                    <Row justify={"center"}>
                        <Pagination current={this.state.pageIndex} total={this.state.totalPages} onChange={this.pageChange} />
                    </Row>
                )
                for (let i = 0; i < movieDivList.length; i++) {
                    results.push(
                        <Row justify="center">
                            {movieDivList[i]}
                        </Row>
                    );
                }
                console.log("result!!!", movieDivList);
                results.push(
                    <Row justify={"center"}>
                        <Pagination current={this.state.pageIndex} total={this.state.totalPages} onChange={this.pageChange} />
                    </Row>
                )
                return results;
            }else{
                for (let i = 0; i < this.state.movies.length; i++) {
                    if (movieDiv.length === 4) {
                        movieDivList.push(movieDiv);
                        movieDiv = [];
                    }
                    movieDiv.push(
                        <TvListItemComponent key={this.state.movies[i].id}{...this.state.movies[i]} />
                    )
                }
                movieDivList.push(movieDiv)
                results.push(
                    <Row justify={"center"}>
                        <Pagination current={this.state.pageIndex} total={this.state.totalPages} onChange={this.pageChange} />
                    </Row>
                )
                for (let i = 0; i < movieDivList.length; i++) {
                    results.push(
                        <Row justify="center">
                            {movieDivList[i]}
                        </Row>
                    );
                }
                console.log("result!!!", movieDivList);
                results.push(
                    <Row justify={"center"}>
                        <Pagination current={this.state.pageIndex} total={this.state.totalPages} onChange={this.pageChange} />
                    </Row>
                )
                return results;
            }
        } else {
            return null;
        }
    }

    refreshData = (type, value, page) => {
        this.setState({ isLoading: true, movies: null });
        // ('https://api.themoviedb.org/3/search/movie?api_key=04b256f451c0e618b5735841206fdedc&query=code&page=1')
        fetch(`https://api.themoviedb.org/3/search/${type}?api_key=04b256f451c0e618b5735841206fdedc&query=${value}&page=${page}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    isLoading: false,
                    movies: data.results,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    pageIndex: data.page,
                });
            });
    }
    componentDidMount() {
        console.log('running');
        console.log('search type', this.state.searchType);
        console.log('search value', this.state.searchValue);
        console.log('search page index', this.state.pageIndex);

        this.refreshData(this.state.searchType, this.state.searchValue, this.state.pageIndex)
    }


}

