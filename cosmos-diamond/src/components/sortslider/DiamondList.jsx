import React, { useEffect, useRef } from 'react';

import './DiamondList.scss'
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

function DiamondList() {
    // const heartRef = useRef(null)

    
    return ( 
        <>
            <div className="list">
                <div className="list__sort">
                    <div className="list__left">
                        <span>Sort By: </span>
                        <div className="list__dropdown">

                        </div>
                    </div>
                    <div className="list__right">
                        <div className="list__result">
                            <span>1</span> of <span>100</span> Result
                        </div>
                        <div className="list__layout">
                            <div className="list__layout--default">
                                <i class="fa-solid fa-table-cells-large"></i>
                            </div>
                            <div className="list__layout--table">
                                <i class="fa-solid fa-table-list"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list__product">
                    <Row gutter={[13, 21]}>
                        <Col span={6} style={{height: '100px'}} className='product__container'>
                            <Link to={`/diamond-detail`} className="product__wrapper">
                                <div className="product__img">
                                    <img src="https://ion.bluenile.com/sgmdirect/photoID/33770493/Diamond/21363707/nl/Diamond-round-1-Carat_3_first_.jpg" alt="" />
                                    <i class="fa-regular fa-heart list__wishlist"></i>
                                    
                                </div>
                                <div className="product__info">
                                    <div className="product__name">1.00 Carat H-VS2 Princess Cut Diamond</div>
                                    <div className="product__price">$2570</div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
     );
}

export default DiamondList;