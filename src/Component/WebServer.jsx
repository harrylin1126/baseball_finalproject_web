
export var ws


export const initializeWebSocket = () => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket("ws://localhost:9999/socket");

    ws.onopen = function (e) {
      console.log("WebSocket connected");
    };
    
    ws.onmessage = (result) => {
        alert("asd")
      let msg = JSON.parse(result.data)
      alert(msg['detail'])
      return ()=>{
        ws.onmessage = null;
      }
  }

    ws.onclose = function (e) {
      console.log("WebSocket closed");
      ws.close(1000, "success");
    };
  }
};