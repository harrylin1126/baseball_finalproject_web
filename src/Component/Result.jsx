import React from "react";

export class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        
            return (
                <div style={{
                    position: 'absolute',
                    width: "50%",
                    height: "400px",
                    margin: 'auto',
                    display: 'flex',
                    // backgroundColor:"rgba(0,10,4,0.5)",
                    padding: '30px',
                    left: '50%',
                    transform: 'translate(-50%,-20%)'
                }}>
                    <div style={{
                        width: "100%",
                        textAlign: "center",
                        boxShadow: "0 0 50px 20px rgba(189,178,187,0.5)",
                        backgroundColor: "rgba(0,32,81,1.0)",
                        borderRadius: "10px",
                        padding: "20px"
                    }}>
                        <h1 style={{ color: 'white'}}>辨識結果</h1>
                        <button type="button" class="btn-close position-absolute top-0 end-0" aria-label="Close" onClick={() => this.props.reset()}></button>
                        {response_factor(this.props.response)}
                    </div>
                </div>
            )
    }
}

function response_factor(response) {
    
    try {
        return response.map((x, index) => (
            <div key={index} style={{fontSize:'20px', textAlign: 'left', color: 'white' }}>{x}<br /></div>
        ));
    } catch (error) {
        console.error("Error rendering response:", error);
        return <div>發生錯誤</div>;
    }
}


