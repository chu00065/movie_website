import React from 'react';
import { Row, Col, Carousel, Spin, List, Image, Divider } from 'antd'
import CarouselItemComponent from './CarouselItemComponent'
import ListItemComponent from './ListItemComponent';
export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            isLoading: false,
        }
    }

    render() {
        return <div className='Home'>
            <Spin spinning={this.state.isLoading}>
                <Row justify={"center"}>
                    <Col sm={20} xs={20} lg={10}>

                        <Carousel
                            autoplay
                            //what is dots??
                            dots={{ className: 'CarouseIdot' }}
                        >
                            {
                                this.getMovies()
                            }

                        </Carousel>
                    </Col>
                </Row>
            </Spin>

            <Row justify={'center'}>
                <Col sm={20} xs={20} lg={10} className='Nowplaying'>
                    <h1 style={{ color: "yellow" ,fontSize:"150%"}}>Now Playing List</h1>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.movies}
                        renderItem={movieItem => (
                            <List.Item>
                                
                                <ListItemComponent {...movieItem}/>
                            </List.Item>
                        )}
                    />,
                </Col>
                
            </Row>
        </div>
    }




    getMovies = () => {
        console.log('this.state.movies', this.state.movies);
        //what is map mean?
        //if movies is null
        if (this.state.movies) {
            const result = this.state.movies.map(x => {
                return <CarouselItemComponent
                    key={x.id}
                    //what is x.backdrop_path???
                    src={`https://image.tmdb.org/t/p/original${x.backdrop_path}`}
                    title={x.title}
                />
            })
            console.log("result!!!", result);
            return result;
        } else {
            return null;
        }
    }

    getMoviesList = () => {
        console.log('this.state.movies', this.state.movies);
        //what is map mean?
        if (this.state.movies) {
            const result = this.state.movies.map(x => {
                return <div><Image
                    key={x.id}
                    width={1000}
                    src={`https://image.tmdb.org/t/p/original${x.backdrop_path}`}

                />
                    <Divider />
                </div>
            })

            console.log("result!!!", result);

            return result;
        } else {
            return null;
        }

    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=04b256f451c0e618b5735841206fdedc&page=1`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("data!!" , data);
                this.setState({
                    isLoading: false,
                    movies: data.results,
                });
            });
    }
}