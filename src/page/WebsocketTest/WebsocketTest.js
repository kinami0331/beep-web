import React from "react";
import WebsocketDialogBox from "../../compoments/wsDialogBox/WebsocketDialogBox";
import "./WebsocketTest.css";

class WebsocketTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="websocketTest">
        <div id="device1">
          <WebsocketDialogBox wsID="device 1" />
        </div>
        <div id="device2">
          <WebsocketDialogBox wsID="device 2" />
        </div>
      </div>
    );
  }
}

export default WebsocketTest;
