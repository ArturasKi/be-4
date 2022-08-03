import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";

function Line({line}) {

    const { doFilter, setAddCom, savivaldybes, sritys } = useContext(FrontContext);  
    const [title, setTitle] = useState(null);
    const [sav, setSav] = useState('0');
    const [sritis, setSritis] = useState('0');

    const [com, setCom] = useState('');

    const addComment = () => {
        setAddCom({product_id: line.id, com});
        setCom('');
    }

    return (
        <li className="list-group-item">
            <div className="item front">
                <div className="content">
                    {/* <b>{line.title}</b> */}
                    
                    {/* {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt='nice'/></div> : null
                    } */}
                </div>
                <div className="form-group">
                    <label>Savivaldybė</label>
                    <select
                        className="form-control"
                        value={sav}
                        onChange={(e) => setSav(e.target.value)}
                    >
                        <option value="0">Pasirinkti savivaldybę</option>
                        {savivaldybes ? savivaldybes.map((sav) => (<option key={sav.id} value={sav.id}>{sav.title}</option>)) : null}
                    </select>
                </div>
                <div className="form-group">
                    <label>Paslaugų sritis</label>
                    <select
                        className="form-control"
                        value={sritis}
                        onChange={(e) => setSritis(e.target.value)}
                    >
                        <option value="0">Pasirinkti sritį</option>
                        {sritys ? sritys.map((sritis) => (<option key={sritis.id} value={sritis.id}>{sritis.title}</option>)) : null}
                    </select>
                </div>
                <div className="comments">
                    <h5>Komentarai</h5>
                    {/* <ul className="list-group">
                        {
                            line.com.map(c => <li key={c.id} className="list-group-item">{c.com}</li>)
                        }
                    </ul> */}
                    <div className="form-group">
                        <label>Pridėti komentarą</label>
                        <textarea value={com} className="form-control" rows="3" onChange={e => setCom(e.target.value)}></textarea>
                    </div>
                    <button type="button" className="btn btn-outline-primary with-loader" onClick={addComment}>Komentuoti</button>
                </div>
            </div>
        </li>
    );
}

export default Line;
