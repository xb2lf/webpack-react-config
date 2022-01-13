import React, { Component } from 'react'
import vuePic from '@/assets/images/vue.png';
import './index.less';

export default class Main extends Component {
  render() {
    return (
      <div className='main-container'>
         <img src={vuePic} alt="vue" />
         <div className="react-bg"></div>
      </div>
    )
  }
}
