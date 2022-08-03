import { useContext } from "react";
import BackContext from "./BackContext";

function Message() {

    const { messages } = useContext(BackContext);

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