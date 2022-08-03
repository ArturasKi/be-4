import { useContext } from "react";
import BackContext from "../BackContext";

function Line({line}) {

    const { setDeleteSritis } = useContext(BackContext);

    // kai paspaudžiamas mygtukas, pasileidžia f-ja handleDelete, kuri paset'iną 'line' (id, title);
    // po paspaudimo setDeleteSav pakeis deleteSav state'ą, kurio pasikeitimą stebės useEffect;
    const handleDelete = () => {
        setDeleteSritis(line);
    }
    
    const handleEdit = () => {
        // setModalSav(line);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>Sritis: <i>{line.title}</i></b>
                    <b>Savivaldybė: <i>{line.sav}</i></b>
                    {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt='nice'/></div> : null
                    }
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Line;



// Create click => Create data => UseEffect() => localStorage => perkrovus puslapį update useEffect (List) => localStorage Read => List Ex.map

// Ex kolkas nustatytas ant useEffect, kuris veikia tada kai update'inasi puslapis;
// 