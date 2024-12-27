import React from "react"
import NavBar from "./NavBar";
import UploadButton from "./UploadButton";
import BoardArea from "./BoardArea";
import Button from "./Button";
import { ws } from "./WebServer"

export default class MainArea extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isUploadVideo:false,
            isCheckPost:false,
            isCheckType:false,
            response:"",
            videoPath:""
        }
    }

    PostHandler()
    {
        ws.send(JSON.stringify({
            flag: "Post",
        }));

        ws.onmessage = (result) => {
            let msg = JSON.parse(result.data)
            
            alert(msg['detail'])
            this.setState({
                isCheckPost:true,
                isCheckType:false,
                response:msg['response']
            })
            return ()=>{
                ws.onmessage=null
            }
        }

        console.log('post')
    }
    
    TypeHandler()
    {
        ws.send(JSON.stringify({
            flag: "Type",
        }));

        ws.onmessage = (result) => {
            let msg = JSON.parse(result.data)
            
            alert(msg['detail'])
            this.setState({
                isCheckPost:false,
                isCheckType:true,
                response:msg['response']
            })
            return ()=>{
                ws.onmessage=null
            }
        }

        console.log('type')
    }

    UploadHandler(e)
    {
        this.setState({
            isUploadVideo:true,
            videoPath:e,
        })
    }

    UploadVideo()
    {
        return(
            <>
                <NavBar></NavBar>
                <UploadButton uploadHandler={(e)=>this.UploadHandler(e)}></UploadButton>
            </>
        )
    }

    reset()
    {
        this.setState({
            isCheckPost:false,
            isCheckType:false
        })
    }

    Board()
    {
        return(
            <>
                <NavBar></NavBar>
                <BoardArea response={this.state.response} isCheckPost={this.state.isCheckPost} isCheckType={this.state.isCheckType} reset={()=>this.reset()}></BoardArea> 
                <Button description="球種" action={()=>this.TypeHandler()}></Button>
                <Button description="姿勢" action={()=>this.PostHandler()}></Button>     
            </>
        )
    }


    render()
    {
        if(this.state.isUploadVideo===false)
        {
            return(
                <>
                    {this.UploadVideo()}
                </>
            ) 
                
        }
        else
        {
            return this.Board()
        }

    }
}


