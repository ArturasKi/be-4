import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {

  const { modalSav, setEditSav, setModalSav } = useContext(BackContext);

  const [title, setTitle] = useState("");

  // paspaudus edit, modal data is null gauna objekta, pasikeicia modal data ir persirenderina viskas;
  useEffect(() => {
    if (null === modalSav) {
      return;
    }
    setTitle(modalSav.title);
  }, [modalSav]);

  const handleEdit = () => {
    const data = { 
        title, 
        id: modalSav.id 
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