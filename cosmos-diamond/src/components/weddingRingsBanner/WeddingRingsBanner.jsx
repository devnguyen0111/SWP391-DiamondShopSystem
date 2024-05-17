import React from 'react'
import './WeddingRingsBanner.scss'
import { Button, ConfigProvider } from 'antd'

export default function WeddingRingsBanner() {
  return (
    
      <div className='wdrbContent'>
        <div className='wdrbContent__inform'>
          <h1 className='wdrbContent__inform__title'>Design Your Own Wedding Ring</h1>
          <h5 className='wdrbContent__inform__subtitle'>Bring your love to life with a handcrafted design
            that perfectly suits your<br /> relationship, budget and style. Our expert artisans will pour their passion<br />
            into every detail of your beautiful custom engagement ring.</h5>
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
          <Button className='wdrbContent__button'>Shop Diamonds</Button>
          <Button className='wdrbContent__button'>Shop Wedding Rings</Button>

        </ConfigProvider>
      </div>
  )
}
