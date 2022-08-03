import { useContext } from "react";
import Line from "./Line";
import BackContext from "../BackContext";


function List() {

    const {sritys} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>Sričių sarašas</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    sritys ? sritys.map(sritis => <Line key={sritis.id} line={sritis}></Line>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;