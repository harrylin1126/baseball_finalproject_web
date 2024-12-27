export default function Button({action,description})
{   
    
    return(
        <div style={{
            width:'100%',
            alignContent:'center'

        }}>
            <button style={{
                backgroundColor:'rgba(0,32,81,1.0)',
                width:'200px',
                marginTop:'-80vh',
                color:'white',
                border:'none',
                borderRadius:"10px"
                }} className="btn btn-light"
                 onClick={()=>action()}>{description}</button>
        </div>
    )
}