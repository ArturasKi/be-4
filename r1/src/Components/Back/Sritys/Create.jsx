import { useContext, useState } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/getBase64.js';
import { useRef } from "react";

function Create() {
  const { savivaldybes, setCreateSritis } = useContext(BackContext);

  const [title, setTitle] = useState("");
  const [sav, setSav] = useState('0');
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }

  const handleCreate = () => {
    const data = { 
      title,
      sav: parseInt(sav),
      photo: photoPrint
    };
    setCreateSritis(data);
    setTitle('');
    setSav('0');
    setPhotoPrint(null);
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Pridėti naują sritį</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Srities pavadinimas</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įvesti pavadinimą.</small>
        </div>
        <div className="form-group">
          <label>Savivaldybės</label>
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
          <label>Herbo paveiksliukas</label>
          <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
          <small className="form-text text-muted">Įkelti nuotrauką</small>
        </div>
          {
            photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
          }
        <button
          type="button"
          className="btn btn-outline-primary with-loader"
          onClick={handleCreate}>Pridėti</button>
      </div>
    </div>
  );
}

export default Create;