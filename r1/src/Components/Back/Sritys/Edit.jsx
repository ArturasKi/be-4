import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {

  const { modalSritis, setEditSritis, setModalSritis } = useContext(BackContext);

  const [title, setTitle] = useState("");

  // paspaudus edit, modal data is null gauna objekta, pasikeicia modal data ir persirenderina viskas;
  useEffect(() => {
    if (null === modalSritis) {
      return;
    }
    setTitle(modalSritis.title);
  }, [modalSritis]);

  const handleEdit = () => {
    const data = { 
        title: title, 
        id: modalSritis.id,
    }; // edit'e ID nesiredaguoja, paimamas toks koks buvo gautas kuriant;
    console.log(data);
    setEditSritis(data);
    setModalSritis(null); // uždaromas modal langas;
  };

  if (modalSritis === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Redaguoti paslaugų sritį</h5>
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Išsaugoti</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalSritis(null)}>Uždaryti</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;