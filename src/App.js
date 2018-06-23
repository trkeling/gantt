import React, { Component } from 'react';

import Gantt from './Gantt'

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      data:[
        [
          {id:1,start_time:'12:00',end_time:'13:00'},
          {id:1,start_time:'09:00',end_time:'11:30'},
        ],
        [
          {id:2,start_time:'11:00',end_time:'14:00'},
        ],
        [
          {id:3,start_time:'12:00',end_time:'23:30'},
        ]
      ]
    }
    console.log(this.state.datas);
  }
  huidiao(k, k1, v)
  {
    console.log(k+"|"+k1);
    console.log(v);
  }
  render() {
    return (
      <div>
        <Gantt data={this.state.data} huidiao={(k, k1, v)=>this.huidiao(k, k1, v)}/>
      </div>
    );
  }
}

export default App;
