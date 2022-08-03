import Nav from "../Nav";
import CreateSav from "./Create";
import EditSav from "./Edit";
import ListSav from "./List";

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
                        <ListSav />
                    </div>
                </div>
            </div>
            <EditSav />
        </>
    )
}

export default Crud;