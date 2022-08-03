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

  const showMessage = () => {

  }
  





    return (
        <BackContext.Provider value={{
            setCreateSav,
            savivaldybes
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