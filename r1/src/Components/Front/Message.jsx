import { useContext } from "react";
import FrontContext from "./FrontContext";

function Message() {

    const { messages } = useContext(FrontContext);

    return (
        <>
            <div className="show-message">
            {
            messages.map(message => (
                <div key={message.id} className={'alert alert-' + message.type} role="alert">
                    {message.text}
                </div>
            )) 
            }
            </div>
        </>
    );
}

export default Message;