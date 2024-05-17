import { Button, ConfigProvider } from 'antd'
import React from 'react'
import './EngagementRingsBanner.scss'

export default function EngagementRingsBanner() {
    return (
        <div>

            <div className='erContent'>
                <div className='erContent__inform'>
                    <h5 className='erContent__inform__intro'>Your journey begins here ~
</h5>
                    <h1 className='erContent__inform__title'>engagement ring</h1>
                    <h5 className='erContent__inform__subtitle'>Find handcrafted engagement rings featuring ethical diamonds,<br/> gems and custom designs.
                        Easily shop high-quality gemstone, natural  <br/> diamond  or lab diamond rings online with settings for any budget and style.
                        <br/>We'll help you make your moment.</h5>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
                        <Button className='erContent__button'>Shop Diamonds</Button>
                        <Button className='erContent__button'>Shop Engagement Rings</Button>

                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
}
