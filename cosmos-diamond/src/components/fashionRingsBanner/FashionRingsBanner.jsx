import React from 'react'
import './FashionRingsBanner.scss'
import { Button, ConfigProvider } from 'antd'


function FashionRingsBanner() {
    return (
            <div className='fsrContent'>
                <div className='fsrContent__inform'>
                    <h3 className='fsrContent__inform__intro'>fashion rings</h3>
                    <h1 className='fsrContent__inform__title'>Outshines in Every Setting</h1>
                    <h5 className='fsrContent__inform__subtitle'>Superior brilliance is in the cut. Discover the brightest diamonds in our collection, <br/> crafted by highly skilled artisans to outshine the rest.
                    </h5>
                </div>

                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultHoverBg: '#240750',
                                defaultHoverBorderColor: '#240750',
                                defaultHoverColor: '#240750'
                            },
                        },
                    }}
                >
                    <Button className='fsrContent__button'>shop now</Button>

                </ConfigProvider>
            </div>
    
    )
}

export default FashionRingsBanner