import React from 'react';
import { Image, Col } from 'antd';


export default class CarouselItemComponent extends React.Component {
    render() {
        return (
            
            <Col>
                <Image
                    src={this.props.src}
                />
                <div>
                    <h1>
                        {this.props.title}
                    </h1>
                </div>
            </Col> 
        )
        }
    }
