import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// 注册serviceWorker
// 处理兼容性问题
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("serviceworker注册成功了~");
      })
      .catch(() => {
        console.log("serviceworker注册失败了~");
      });
  });
}
