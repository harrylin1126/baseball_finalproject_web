import { useEffect, useState } from "react";
import { ws } from "./WebServer"
import { Result } from "./Result";

export default function BoardArea({ response, isCheckPost, isCheckType, reset }) {
    const [imgPath, setImgPath] = useState("/background.png"); // Initial path

    useEffect(() => {
        if (isCheckPost || isCheckType) {
          setImgPath("/output.jpg");
          const timer = setTimeout(() => {
            setImgPath("/output.jpg");
          }, 50);
    
          return () => clearTimeout(timer);
        }
      }, [isCheckPost, isCheckType]);

   
    if (isCheckType === true || isCheckPost=== true) {
        return (
            <div style={{
                backgroundImage: `url('/background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%', // 填滿寬度
                height: '100vh', // 填滿高度
                display: 'flex', // 使用 Flexbox 對齊內容
                flexDirection: 'column', // 讓內容垂直排列
                justifyContent: 'center', // 垂直置中
                alignItems: 'center', // 水平置中 

            }}>

                <Result response={response} isCheckPost={isCheckPost} isCheckType={isCheckType} reset={reset}></Result>

            </div>
        )
    }
    else {
        return (
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
                <div style={{
                    position: 'absolute',
                    height: '50vh',
                    width: '50%',
                    marginTop: '-45vh',
                    backgroundColor: 'rgba(0,32,81,1.0)',
                }}>
                    <img  src={imgPath} alt="Dynamic" style={{
                        height: '100%',
                        width: '50%'
                    }} ></img>
                </div>
            </div>
        )
    }


}
