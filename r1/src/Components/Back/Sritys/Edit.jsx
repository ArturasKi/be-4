import { useEffect, useState, useContext, useRef } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Edit() {

  const { modalSritis, setEditSritis, setModalSritis, savivaldybes, setDeletePhoto } = useContext(BackContext);

  const [title, setTitle] = useState("");
  const [sav, setSav] = useState("0");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  // paspaudus edit, modal data is null gauna objekta, pasikeicia modal data ir persirenderina viskas;
  useEffect(() => {
    if (null === modalSritis) {
      return;
    }
    setTitle(modalSritis.title);
    setSav(savivaldybes.filter(sav => sav.title === modalSritis.sav)[0].id);
    setPhotoPrint(modalSritis.photo)
  }, [modalSritis, savivaldybes]);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }

  const handleEdit = () => {
    const data = { 
        title: title, 
        id: modalSritis.id,
        sav: parseInt(sav),
        photo: photoPrint
    }; // edit'e ID nesiredaguoja, paimamas toks koks buvo gautas kuriant;
    console.log(data);
    setEditSritis(data);
    setModalSritis(null); // uždaromas modal langas;
  };

  const handleDeletePhoto = () => {
    setDeletePhoto({id: modalSritis.id});
    setModalSritis(p => ({...p, photo: null}));
    setPhotoPrint(null);
}

  if (modalSritis === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Redaguoti sritį</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalSritis(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Pavadinimas</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <small className="form-text text-muted">
                Įveskite naują pavadinimą.
              </small>
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
              <label>Photo</label>
              <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
              <small className="form-text text-muted">Upload photo</small>
            </div>
              {
                photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
              }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Išsaugoti</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove photo</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalSritis(null)}>Uždaryti</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;