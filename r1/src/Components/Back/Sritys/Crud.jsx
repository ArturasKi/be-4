import Nav from "../Nav";
import CreateSritis from '../Sritys/Create';
import ListSritys from '../Sritys/List';

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
        </>
    )
}

export default Crud;