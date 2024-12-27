import React, { useState } from "react";
import { ws } from './WebServer';
export default function UploadButton({ uploadHandler }) {

    const CHUNK_SIZE = 1024 * 1024;
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = () => {
        if (ws && selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
                let currentChunk = 0;

                const reader = new FileReader();

                reader.onload = function (e) {
                    const fileBuffer = e.target.result;
                    try{

                        ws.send(JSON.stringify({
                            flag: "Upload",
                            filename: file.name,
                            chunk: currentChunk,
                            totalChunks: totalChunks,
                            filebuffer: btoa(new Uint8Array(fileBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                        }));
                    }
                    catch(e)
                    {
                        console.error(e)
                    }

                    currentChunk++;
                    if (currentChunk < totalChunks) {
                        sendNextChunk();  // 傳送下一個塊
                    } else {
                        console.log(`${file.name} 上傳完成`);
                        ws.onmessage = (e) => {
                            let msg = JSON.parse(e.data)
                            uploadHandler(msg['videoPath'])
                            alert(msg['detail'])
                    
                            return ()=>{
                                ws.onmessage=null;
                            }
                    
                        }
                    }
                };

                function sendNextChunk() {
                    const start = currentChunk * CHUNK_SIZE;
                    const end = Math.min(start + CHUNK_SIZE, file.size);
                    const chunk = file.slice(start, end);
                    reader.readAsArrayBuffer(chunk);  // 讀取每個塊為 ArrayBuffer
                }

                sendNextChunk();  // 開始傳送第一個塊
            }
        } else {
            alert("沒有選擇檔案");
        }
    };

    return (
        <div style={{
            width: '80%',
        }}>
            <div className="mb-3">
                <div style={{
                    backgroundImage: `url('/background.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw', // 填滿寬度
                    height: '100vh', // 填滿高度
                    display: 'flex', // 使用 Flexbox 對齊內容
                    flexDirection: 'column', // 讓內容垂直排列
                    justifyContent: 'center', // 垂直置中
                    alignItems: 'center', // 水平置中 
                }}>

                    <h1 for="formFileMultiple" className="form-label" style={{ color: 'white', marginTop: '-40vh' }}>選擇影片</h1>
                    <input className="form-control" type="file" id="formFileMultiple" multiple onChange={(e) => handleFileChange(e)} style={{ width: '50%', marginTop: '5vh' }} />
                    <button style={{ margin: '30px', color: 'white', backgroundColor: 'rgba(0,32,81,1.0)', }} type="button" className="btn btn-light" onClick={() => handleUpload()}>上傳</button>
                    <h1 style={{ color: 'white' }}>上傳影片注意事項</h1>
                    <h4 style={{ color: 'white' }}>1.請上傳投手後方視角並使用mp4格式之影片</h4>
                    <h4 style={{ color: 'white' }}>2.請上傳解析度1920*1080之影片</h4>
                </div>
            </div>
        </div>
    )
}