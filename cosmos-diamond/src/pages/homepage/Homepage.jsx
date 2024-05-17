import React from 'react'
import WeddingRingsBanner from '../../components/weddingRingsBanner/WeddingRingsBanner'
import FashionRingsBanner from '../../components/fashionRingsBanner/FashionRingsBanner'
import { Col, Image, Row } from 'antd'
import './Homepage.scss'
import EngagementRingsBanner from '../../components/engagementRingsBanner/EngagementRingsBanner'
import ExploreDiamond from './../../components/exploreDiamondBanner/ExploreDiamond';
import ReviewBanner from './../../components/reviewsBanner/ReviewBanner';

function Homepage() {
    return (
        <div className='homepage'>
            <WeddingRingsBanner />
            <ExploreDiamond/>
            <EngagementRingsBanner/>
            <div className='homepage__education'>
                <div className='homepage__education__inform'>
                    <h1>Become An Expert.</h1>
                    <h5>Cosmos Diamonds Education And Guidance</h5>
                </div>
                <Row className='homepage__education__pic'>
                    <Col span={7}>
                        <Row>
                            <Image src='https://dam.bluenile.com/images/public/4695/STACKABLE_RINGS.webp' height={400} width={400} />
                            <h5>Engagement Ring Guide</h5>
                        </Row>
                        <Row>
                            <Image src='https://dam.bluenile.com/images/public/4701/PETITE_TWIST_RINGS.webp' height={400} width={400} />
                            <h5>Wedding Ring Guide</h5>
                        </Row>
                    </Col>
                    <Col>
                        <Image src='https://ecommo--ion.bluenile.com/static-dyo-bn/dyo-ring.3ead9.jpg' width={880} height={849} />
                        <h5>Diamond Education And Guidance</h5>
                    </Col>
                </Row>
            </div>
            <ReviewBanner/>
            <FashionRingsBanner />
        </div>
    )
}

export default Homepage