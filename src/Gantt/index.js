import React, { Component } from 'react';

import Itme from './item'
import Bgtable from './Bgtable'

class Gantt extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      // canvas 时间
      canvasTime:[
        {time:'00:30'},
        {time:'01:00'},
        {time:'01:30'},
        {time:'02:00'},
        {time:'02:30'},
        {time:'03:00'},
        {time:'03:30'},
        {time:'04:00'},
        {time:'04:30'},
        {time:'05:00'},
        {time:'05:30'},
        {time:'06:00'},
        {time:'06:30'},
        {time:'07:00'},
        {time:'07:30'},
        {time:'08:00'},
        {time:'08:30'},
        {time:'09:00'},
        {time:'09:30'},
        {time:'10:00'},
        {time:'10:30'},
        {time:'11:00'},
        {time:'11:30'},
        {time:'12:00'},
        {time:'12:30'},
        {time:'13:00'},
        {time:'13:30'},
        {time:'14:00'},
        {time:'14:30'},
        {time:'15:00'},
        {time:'15:30'},
        {time:'16:00'},
        {time:'16:30'},
        {time:'17:00'},
        {time:'17:30'},
        {time:'18:00'},
        {time:'18:30'},
        {time:'19:00'},
        {time:'19:30'},
        {time:'20:00'},
        {time:'20:30'},
        {time:'21:00'},
        {time:'21:30'},
        {time:'22:00'},
        {time:'23:00'},
        {time:'23:30'},
        {time:'00:00'},
      ],
      // canvas 配置
      canvasConfig:{
        width:800,
        tableWidth:50,
        tableHeight:30,
        tableBorder:1,
        // 表格总宽度
        tableNumWidth:0,
      },
      canvas:[
        {
          // 右边文字距离左边偏移位置
          left:10,
          // 初始宽度
          canWidth:204,
          x:102,
          y:0,
          width:51,
          height:30,
          l:0,
        },
        {
          // 右边文字距离左边偏移位置
          left:10,
          // 初始宽度
          canWidth:204,
          x:102,
          y:0,
          width:51,
          height:30,
          l:0,
        }
      ]
    }
  }
  componentWillMount()
  {
    var datas = this.props.data;
    if(datas.length > 0)
    {
      var canvasConfig = this.state.canvasConfig;
      // 表格默认宽度
      var tableWidth = canvasConfig.tableWidth;
      // 表格边框宽度
      var tableBorder = canvasConfig.tableBorder;
      // 表格总宽度
      canvasConfig.tableNumWidth = this.TableWidth(this.state.canvasTime.length, tableWidth, tableBorder);
      // 轴数据初始化
      var canvas = this.state.canvas;
      var canvasG = [];

      for(var i = 0; i < datas.length; i++)
      {
        var data = datas[i];
        var canvas = [];
        for (var c = 0; c < data.length; c++) {
          var canva = data[c];
          // 开始时间的基数
          var js_start_time = this.shiJianJiShu(canva.start_time);
          // 结束时间的基数
          var js_end_time = this.shiJianJiShu(canva.end_time);
          // 轴宽度
          var zhou_kuan_du = js_end_time-js_start_time;

          if(js_start_time > null && js_end_time > null && zhou_kuan_du > 0)
          {
            // 右边文字距离左边偏移位置
            canva.left = 10;
            canva.canWidth = this.TableWidth(zhou_kuan_du, tableWidth, tableBorder);
            canva.x = this.TableWidth(js_start_time, tableWidth, tableBorder);
            canva.y = 0;
            canva.width = this.TableWidth(zhou_kuan_du, tableWidth, tableBorder);
            canva.height = 30;
            canva.l = 0;
            canvas[c] = canva;
          }
          canvasG[i] = canvas;
        }


      }
      this.setState({
        canvasConfig:canvasConfig,
        canvas:canvasG
      })
    }

  }

  // 得到时间对应的基数
  shiJianJiShu(str)
  {
    var data = this.state.canvasTime;
    for(var i = 0; i < data.length; i++)
    {
      if(str == data[i].time)
      {
        return i;
      }
    }
    return null;
  }

  // 计算表格宽度
  TableWidth(num, tableWidth, tableBorder)
  {
    return (num*tableWidth)+(num*tableBorder);
  }

  // Canvas 初始化
  initCanvas(key, key1)
  {
    this.state.canvas.map((v, k) => {
      v.map((v1, k1) => {
        if(v1.width > 0)
        {
          // 初始化设置
          if(key == '' && key1 == '')
          {
            this.CancasSheZhi(k, k1, v1)
          }
          // 轴移动设置
          else if(key == k && key1 == k1)
          {
            this.CancasSheZhi(k, k1, v1)
          }
        }
      })
    })
  }

  // canvas设置
  CancasSheZhi(k, k1, v)
  {
    // 当宽度移动到最后时，默认更改到倒数第二个
    var daoShu = this.state.canvasConfig.tableWidth+this.state.canvasConfig.tableBorder;
    // 23：59：59 的宽度
    var canvasTimeLen = (this.state.canvasConfig.tableNumWidth-daoShu);
    if((v.x+v.width) >= canvasTimeLen)
    {
      v.width = canvasTimeLen-v.x;
    }
    var c = document.getElementById("myCanvas"+k+k1);
    // console.log(v.width);
    // c.width = v.width;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(v.x, v.y, v.width, v.height);
    // 设置左边图标位置
    var Left = document.getElementById("myCanvasLeft"+k+k1);
    Left.style.left = (v.x)+'px';

    // 设置右边图标位置
    var Right = document.getElementById("myCanvasRight"+k+k1);
    Right.style.left = (v.x+v.width-v.left)+'px';

  }

  // canvas存储
  CanvasCunChu(key, key1, canva)
  {
    var canvas = this.state.canvas;
    canvas[key][key1] = canva
    this.setState({
      canvas:canvas
    })
  }
  // 点击
  mDown(event, k, k1, leftRight)
  {
    console.log(event);
    // 销毁标识
    var xiaoHui = false;
    var that = this;
    var v = that.state.canvas[k][k1];
    var width = v.width;
    var x = v.x;
    //
    var target = event.target;
    var disX = event.pageX - target.offsetLeft;
    var disY = event.pageY - target.offsetTop;
    document.onmousemove = function(event){
        event.preventDefault();
        xiaoHui = true;
        var l = event.pageX - disX;
        var t = event.pageY - disY;
        v.l = l;
        if(leftRight == '左')
        {
          if(l > x)
          {
            v.x = l;
            v.width = width-(l-x)
            v.canWidth = v.width
          }
          else if(l <= x && l > 0)
          {
            v.x = l;
            v.width = width+(x-l)
            v.canWidth = v.width
          }
          else
          {
            chuli();
          }
        }
        else if(leftRight == '右')
        {
          v.width = width+l-v.canWidth-x+v.left;
        }
        // 存储
        that.CanvasCunChu(k, k1, v);
        // 改变拖拽轴位置
        that.initCanvas(k, k1);
    }

    // 计算吸附
    var jiSuanXiFu = function()
    {
      // 单个格子宽度
      var widthc = that.state.canvasConfig.tableWidth+that.state.canvasConfig.tableBorder;
      // 整除后有多少
      var yue = v.width%widthc;
      // 判断是大于还是小于
      var heJiWidth = v.width;

      // 计算总宽度
      if(yue > (widthc/2))
      {
        heJiWidth = heJiWidth-yue+widthc;
      }
      else
      {
        heJiWidth = heJiWidth-yue
      }

      if(leftRight == '左')
      {
        // 计算轴距离左边的长度
        if(yue > (widthc/2))
        {
          v.x = v.x-(widthc-yue);
        }
        else
        {
          v.x = v.x+yue;
        }
      }
      v.width = heJiWidth;
      // 更改对应组件默认宽度
      v.canWidth = v.width
    }

    // 计算开始时间,结束时间
    var StartEndTime = function()
    {
      var daoShu = that.state.canvasConfig.tableWidth+that.state.canvasConfig.tableBorder;
      // x基数
      var x_js = v.x/daoShu;
      var start_time = that.state.canvasTime[x_js].time;
      if(start_time != null)
      {
        v.start_time = start_time
      }
      var w_js = (v.x+v.width)/daoShu;
      var end_time = that.state.canvasTime[w_js].time;
      if(end_time != null)
      {
        v.end_time = end_time
      }
    }

    // 鼠标 离开元素,释放处理
    var chuli = function()
    {
      // 计算吸附
      jiSuanXiFu()
      // 计算开始时间,结束时间
      StartEndTime()
      // 存储
      that.CanvasCunChu(k, k1, v);
      // 改变拖拽轴位置
      that.initCanvas(k, k1);
      // 回调
      that.props.huidiao(k, k1, v);

      document.onmousemove = null;
      target.onmouseup = null;
      xiaoHui = false;
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

  // 添加轴
  tianJia(e, k)
  {
    console.log(k);
  }
  componentDidMount()
  {
    this.initCanvas('', '');
  }
  render() {
    return (
      <div>
        <h1>Gantt</h1>
        {/* 添加按钮 */}
        <div style={{
          width:'51px',
          height:'auth',
          float:'left',
          paddingTop:'50px',
        }}>
          {
            this.state.canvas.map((v, k) =>
            (
              v.map((v1, k1) => {
                  return (
                    <div key={k+k1} style={{
                      width:this.state.canvasConfig.tableWidth+'px',
                      borderRight:this.state.canvasConfig.tableBorder+'px solid #ccc',
                      height:this.state.canvasConfig.tableHeight+'px',
                      paddingTop:'5px',
                      paddingBottom:'5px'
                    }} onClick={(e) => this.tianJia(e, k)}>添加</div>
                  )
              })
            ))
          }
        </div>

        {/* Gantt */}
        <div style={{
          width:this.state.canvasConfig.width+'px',
          height:'auth',
          overflowX:'scroll',
          padding:'20px',
          float:'left'
        }}>
          {/* 表头 */}
          <div style={{width:this.state.canvasConfig.tableNumWidth+'px',height:'auto'}}>
            {
              this.state.canvasTime.map((v, k) => {
                return (
                  <div key={k} style={{
                    width:this.state.canvasConfig.tableWidth+'px',
                    borderRight:this.state.canvasConfig.tableBorder+'px solid #ccc',
                    height:this.state.canvasConfig.tableHeight+'px',
                    display:'inline-flex'
                  }}>{v.time}</div>
                )
              })
            }
          </div>
          <div style={{width:this.state.canvasConfig.tableNumWidth+'px',height:'auto',position:'relative',zIndex:'9999'}}>
            {/* 背景表格 */}
            <Bgtable data={this.state}/>

            {/* 拖动轴 */}
            <Itme data={this.state} mDown={(event, k, k1, leftRight) => this.mDown(event, k, k1, leftRight)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Gantt;
