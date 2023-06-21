import React from "react";

interface ScreenWithTextProps{
    text:string;
}

const ScreenWithText = ({text}:ScreenWithTextProps) => {


    return(
        <div>
            <p>{text}</p>
        </div>
        
    )
}

export default ScreenWithText;