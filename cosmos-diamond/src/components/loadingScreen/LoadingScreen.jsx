import React from 'react'
import './LoadingScreen.scss'
import { LoadingOutlined } from '@ant-design/icons'
export default function LoadingScreen({text}) {
  return (
    <div className='loading-screen'>
        <LoadingOutlined style={{fontSize: '32px'}}/>
        <div className="loading-text">{text}</div>
    </div>
  )
}
