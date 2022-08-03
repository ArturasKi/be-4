import { useContext } from "react";
import Line from "./Line";
import BackContext from "../BackContext";


function List() {

    const {savivaldybes} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>Savivaldybių sarašas</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    savivaldybes ? savivaldybes.map(sav => <Line key={sav.id} line={sav}></Line>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;