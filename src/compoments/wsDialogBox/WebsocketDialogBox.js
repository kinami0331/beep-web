import React, { Component } from "react";
import "./WebsocketDialogBox.css";

function ConnectionFlag(props) {
  return <p>{props.connectionFlag}</p>;
}

class WebsocketDialogBox extends Component {
  constructor(props) {
    super(props);
    this.websocket = null;
    this.wsID = props.wsID;
    this.state = {
      infoList: Array(0),
      connectionFlag: "等待连接",
      sendingMsg: "",
    };
  }

  render() {
    const msgList = this.state.infoList;
    const msgMap = msgList.map((msg, index) => {
      return <tr key={index}><td>{msg}</td></tr>;
    });

    return (
      <div className="websocketDialogBox">
        <div className="basicInfo">
          <h2>{this.wsID}</h2>
          <p hidden={true}>
            服务器地址：
            <input
              id="host"
              type="text"
              defaultValue={"ws://localhost:8844/ws/"}
            />
            <br />
          </p>
          <button onClick={() => this.createWebSocket()}>创建链接</button>{" "}
          <br />
          <button onClick={() => this.closeWebSocket()}>关闭连接</button>
          <br />
          <button onClick={() => this.setState({ infoList: Array(0) })}>
            清空记录
          </button>
          <br />
          <ConnectionFlag connectionFlag={this.state.connectionFlag} />
        </div>
        {/* 数据显示区域 */}
        <div className="chatBox">
          <h3>会话信息：</h3>
          <div
            className="chatRecordBox"
            ref={(e) => {
              this.chatBox = e;
            }}
          >
            <table><tbody>{msgMap}</tbody></table>
          </div>
          <input
            type="text"
            value={this.state.sendingMsg}
            onChange={(e) => this.setState({ sendingMsg: e.target.value })}
          />
          <button onClick={() => this.sendMsg()}>发送消息</button>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.closeWebSocket();
  }

  // 创建连接
  createWebSocket() {
    // let host = "ws://localhost:5000/websocket/mac-detect";
    let host = document.getElementById("host").value;

    var tar_host;
    tar_host = host + this.props.wsID;
    console.log(tar_host);

    if (this.websocket != null) this.websocket.close();

    if ("WebSocket" in window) {
      this.websocket = new WebSocket(tar_host);
    } else {
      alert("该浏览器不支持WebSocket！");
      return;
    }

    //连接发生错误的回调方法
    this.websocket.onerror = () => {
      console.log("连接出错");
      //setMessageInnerHTML("连接出错");
    };

    //连接成功建立的回调方法
    this.websocket.onopen = (event) => {
      console.log("连接成功");
      this.setState({ connectionFlag: "连接成功！" });
      //setMessageInnerHTML("已连接服务器！");
    };

    //接收到消息的回调方法
    this.websocket.onmessage = (event) => {
      const curInfoList = this.state.infoList;
      console.log(event.data);
      console.log(curInfoList);
      this.setState({
        infoList: curInfoList.concat(Array(1).fill(event.data)),
      });
      this.chatBox.scrollTop = this.chatBox.scrollHeight;
    };

    //连接关闭的回调方法
    this.websocket.onclose = () => {
      console.log("连接关闭");
      this.setState({ connectionFlag: "等待连接！" });
      // setMessageInnerHTML("连接关闭");
    };
  }

  //关闭连接
  closeWebSocket() {
    if (this.websocket != null) {
      this.websocket.close();
      this.websocket = null;
    }
  }

  sendMsg() {
    if (this.websocket == null) alert("请先连接！");
    else {
      this.websocket.send(this.state.sendingMsg);
    }
  }
}

export default WebsocketDialogBox;
