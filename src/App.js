import React, { Component } from 'react'

import 'reset-css'
import router from './routes'
import axios from 'axios'

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      rows: []
    }
  }

  certTimer = () => {
    
  }

  componentDidMount(){
    console.log('mainDisplay')
    axios.get('/api/all/doctor/certification').then(res => {
      this.setState(res.data)
    })
  }
  render() {
    return (
      <div>
        {router}
      </div>
    )
  }
}
