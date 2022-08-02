import { useContext, useState } from "react";
import BackContext from "../BackContext";

function Create() {
  const { setCreateSav } = useContext(BackContext);

  const [title, setTitle] = useState("");

  const handleCreate = () => {
    const data = { title };
    setCreateSav(data);
    setTitle('');
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Pridėti naują savivaldybę</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Savivaldybes pavadinimas</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įvesti pavadinimą.</small>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary with-loader"
          onClick={handleCreate}>Pridėti</button>
      </div>
    </div>
  );
}

export default Create;