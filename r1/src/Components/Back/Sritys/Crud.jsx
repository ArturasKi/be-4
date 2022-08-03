import Nav from "../Nav";
import CreateSritis from './Create';
import ListSritys from './List';
import EditSritys from './Edit';

function Crud() {
    return (
        <>
            <Nav />
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <CreateSritis />
                    </div>
                    <div className="col-8">
                        <ListSritys />
                    </div>
                </div>
            </div>
            <EditSritys />
        </>
    )
}

export default Crud;