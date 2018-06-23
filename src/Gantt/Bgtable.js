import React, { Component } from 'react';

class Bgtable extends Component {
  constructor(props, context){
    super(props, context);
    this.state = this.props.data;
  }
  render() {
    return (
      // 背景表格
      <div>
        {
          this.state.canvas.map((v, k) => (
            v.map((v2, k2) => {
              return (
                <div key={k2+k} style={{width:this.state.canvasConfig.tableNumWidth+'px',height:'auto'}}>
                  {
                    this.state.canvasTime.map((v1, k1) => {
                      return (
                        <div
                          key={k1+k+k2}
                          style={{
                          width:this.state.canvasConfig.tableWidth+'px',
                          borderRight:this.state.canvasConfig.tableBorder+'px solid #ccc',
                          height:this.state.canvasConfig.tableHeight+'px',
                          display:'inline-flex',
                          paddingTop:'5px',
                          paddingBottom:'5px'
                          }}>
                          </div>
                      )
                    })
                  }
                </div>
              )
            })
          ))
        }
      </div>
    );
  }
}

export default Bgtable;
