import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from "../../../Functions/getBase64";

function Edit() {

  const { modalSav, setEditSav, setModalSav, setDeletePhoto } = useContext(BackContext);

  const [title, setTitle] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  // paspaudus edit, modal data is null gauna objekta, pasikeicia modal data ir persirenderina viskas;
  useEffect(() => {
    if (null === modalSav) {
      return;
    }
    setTitle(modalSav.title);
    setPhotoPrint(modalSav.photo);
  }, [modalSav]);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }

  const handleEdit = () => {
    const data = { 
        title, 
        id: modalSav.id,
        photo: photoPrint 
    }; // edit'e ID nesiredaguoja, paimamas toks koks buvo gautas kuriant;
    setEditSav(data);
    setModalSav(null); // uždaromas modal langas;
  };

  if (modalSav === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Redaguoti savivaldybę</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalSav(null)}
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
              <label>Photo</label>
              <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
              <small className="form-text text-muted">Upload photo</small>
            </div>
              {
                photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
              }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalSav(null)}>Uždaryti</button>
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Išsaugoti</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;