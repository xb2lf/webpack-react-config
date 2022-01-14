import React, { Component } from 'react'
import './inex.less';
export default class Footer extends Component {
  state = {
    title:'This is Footer content'
  }
  render() {
    const {title} = this.state;
    return (
      <div className='footer-container'>
        {title}
      </div>
    )
  }
}
