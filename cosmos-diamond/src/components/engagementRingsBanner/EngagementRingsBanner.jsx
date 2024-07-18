import { Button, ConfigProvider } from 'antd'
import React from 'react'
import './EngagementRingsBanner.scss'
import { useNavigate } from 'react-router-dom'

export default function EngagementRingsBanner() {
    const nav = useNavigate()
    return (
        <div>

            <div className='erContent'>
                <div className='erContent__inform'>
                    <h5 className='erContent__inform__intro'>your journey begins here ~
                    </h5>
                    <h1 className='erContent__inform__title'>Engagement ring</h1>
                    <h5 className='erContent__inform__subtitle'>Find handcrafted engagement rings featuring ethical diamonds,<br /> gems and custom designs.
                        Easily shop high-quality gemstone, natural  <br /> diamond  or lab diamond rings online with settings for any budget and style.
                        <br />We'll help you make your moment.</h5>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultHoverBg: '#F0EBE3',
                                    defaultHoverBorderColor: 'black',
                                    defaultHoverColor: 'black'
                                },
                            },
                        }}
                    >
                        <Button className='erContent__button' onClick={()=> nav('/diamond-search')}>Shop Diamonds</Button>
                        <Button className='erContent__button'  onClick={()=> nav('/engagement-rings/catalog')}>Shop Engagement Rings</Button>

                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
}
