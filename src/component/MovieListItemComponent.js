import React from 'react';
import { Col, Modal, Button } from 'antd';


export default class MovieListItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    };

    handleOk = () => {
        this.setState({
            visible: false
        })
    };

    handleCancel = () => {
        this.setState({
            visible: false
        })
    };

    render() {
        return (
            <Col span={4} className='MovieListItem'>



                {
                    this.props.poster_path
                        ?
                        //alt displays error message]

                        <img
                            src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`}
                            alt=""
                            height="400"
                            width="300"
                        ></img>
                        :
                        <img
                            src={``}
                            alt=""
                            height="400"
                            width="300"
                        ></img>
                }

                <Button type="link" onClick={this.showModal}>
                    more detail
                </Button>
                <Modal title={this.props.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
                {
                    this.props.poster_path
                        ?
                        //alt displays error message]
                        <img
                            src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`}
                            alt=""
                            height="400"
                            width="300"
                        ></img>
                        :
                        <img
                            src={``}
                            alt=""
                            height="400"
                            width="300"
                        ></img>
                }
                    <h5 style={{ color: "black" }}>Name: {this.props.title}</h5>
                    <h5 style={{ color: "black" }}>Release date: {this.props.release_date}</h5>
                    <h5 style={{ color: "black" }}>Review : {this.props.vote_average / 2}</h5>
                </Modal>
                <h5 style={{ color: "black" }}>Name: {this.props.title}</h5>
                <h5 style={{ color: "black" }}>Release date: {this.props.release_date}</h5>
                <h5 style={{ color: "black" }}>Review : {this.props.vote_average / 2}</h5>
            </Col>
        )
    }
}