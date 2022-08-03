import Nav from "../Nav";
import CreateSav from "./Create";
import List from "./List";

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
                        <List />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crud;