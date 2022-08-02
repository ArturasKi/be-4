import Nav from "../Nav";
import CreateSav from "./Create";

function Crud() {
    return (
        <>
            <Nav/>
                <div className="container">
                <div className="row">
                    <div className="col-4">
                    <CreateSav />
                    </div>
                    <div className="col-8">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crud;