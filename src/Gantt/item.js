import React, { Component } from 'react';

class Item extends Component {
  constructor(props, context){
    super(props, context);
    this.state = this.props.data;
  }
  mDown(event, k, k1, leftRight)
  {
    this.props.mDown(event, k, k1, leftRight)
  }
  FumDown(event)
  {
    var xiaoHui = false;
    var target = event.target;
    var disX = event.pageX - target.offsetLeft;
    var disY = event.pageY - target.offsetTop;
    document.onmousemove = function(event){
        event.preventDefault();
        xiaoHui = true;
        var l = event.pageX - disX;
        var t = event.pageY - disY;

    }


    // 鼠标 离开元素,释放处理
    var chuli = function()
    {
      document.onmousemove = null;
      target.onmouseup = null;
    }

    // 鼠标离开
    target.onmouseout = function()
    {
      if(xiaoHui)
      {
        chuli();
      }
    }
    // 鼠标释放
    target.onmouseup = function()
    {
      if(xiaoHui)
      {
        chuli();
      }
    }
  }
  render() {
    return (
      <div>
        {/* 拖动轴 */}
        <div style={{position:'absolute',top:'0'}}>
          {
            this.state.canvas.map((v, k) => (
              v.map((v1, k1) => {
                var style = '';
                if(k1 > 0)
                {
                  console.log(k1);
                  style = 'inline-flex';
                }
                return (
                  <div
                    style={{
                    // width:this.state.canvasConfig.tableNumWidth+'px',
                    width:'auth',
                    height:v1.height+'px',
                    display:'inline-block',
                    position: 'relative',
                  }} key={k+k1}>
                      <canvas
                        width={this.state.canvasConfig.tableNumWidth}
                        height={v1.height}
                        id={"myCanvas"+k+k1}></canvas>
                      <div id={"myCanvasRight"+k+k1} style={{
                        position:'relative',
                        width:'10px',
                        display:'inline-block',
                        top:'-'+v1.height+'px',
                        height:v1.height+'px',
                        textAlign:'right'}} onMouseDown={(e)=>this.mDown(e, k, k1, '右')}>R</div>
                      <div id={"myCanvasLeft"+k+k1} style={{
                        position:'relative',
                        top:'-'+(v1.height*2)+'px',
                        // display:'inline-block',
                        height:v1.height+'px',
                        width:'10px'}} onMouseDown={(e)=>this.mDown(e, k , k1, '左')}>L</div>
                  </div>
                )
              })
            ))
          }
        </div>
      </div>
    );
  }
}

export default Item;
