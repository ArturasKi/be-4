import { useState, useEffect } from 'react';
import axios from 'axios';
import BackContext from './BackContext';
import Nav from './Nav';
import SavivaldybesCrud from './Savivaldybes/Crud';
import SritysCrud from './Sritys/Crud';

function Back({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [savivaldybes, setSavivaldybes] = useState(null); 
    const [createSav, setCreateSav] = useState(null);
    const [deleteSav, setDeleteSav] = useState(null);

  // READ SAV => useEffect viduje paduodama funkcija, kuri kreipiasi (GET) į serverį ir paima informaciją iš atitinkamo URL;
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/savivaldybes")
      .then((res) => setSavivaldybes(res.data));
  }, [lastUpdate]);

    // CREATE SAV => useEffect viduje paduodama funkcija, kuri kreipiasi (POST) į serverį ir siunčia į jį createSav informaciją;
    // URL - adresas kurio pagalba naršyklė gali pasiekti resursą internete. 
  useEffect(() => {
    if (null === createSav) return;
    axios
      .post("http://localhost:3003/admin/savivaldybes", createSav)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "success" });
      });
  }, [createSav]);

   // DELETE SAV => useEffect viduje paduodama funkcija, kuri kreipiasi (DELETE) į serverį paduodama elemento id, kurį nori ištrinti;
  useEffect(() => {
    if (null === deleteSav) return; // pasikeitus deleteSav, jeigu jis nėra null;
    axios
      .delete("http://localhost:3003/admin/savivaldybes/" + deleteSav.id) // siunčiama užklausa su id;
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" }); // jei ateina klaida, rodoma danger message;
      });
  }, [deleteSav]);

  const showMessage = () => {

  }
  





    return (
        <BackContext.Provider value={{
            setCreateSav,
            savivaldybes,
            setDeleteSav
        }}>
            {
                show === 'admin' ? 
                    <>
                        <Nav />
                        <h1>Back</h1>
                    </> :
                    show === 'savivaldybes' ? 
                        <SavivaldybesCrud /> : 
                    show === 'sritys' ? 
                        <SritysCrud /> : null
            }
        </BackContext.Provider>
    )

    // if (show === 'admin') {
    //     return (
    //         <>
    //             <Nav />
    //             <h1>Back</h1>
    //         </>
    //     )
    // }
    // if (show === 'savivaldybes') {
    //     return (
    //         <SavivaldybesCrud />
    //     )
    // }
    // if (show === 'sritys') {
    //     return (
    //         <SritysCrud />
    //     )
    // }
}

export default Back;