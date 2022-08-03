import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import BackContext from './BackContext';
import Nav from './Nav';
import SavivaldybesCrud from './Savivaldybes/Crud';
import SritysCrud from './Sritys/Crud';

function Back({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [messages, setMessages] = useState([]);

    const [savivaldybes, setSavivaldybes] = useState(null); 
    const [createSav, setCreateSav] = useState(null);
    const [deleteSav, setDeleteSav] = useState(null);
    const [editSav, setEditSav] = useState(null);
    const [modalSav, setModalSav] = useState(null);

    const [sritys, setSritys] = useState(null);
    const [createSritis, setCreateSritis] = useState(null);

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

      // CREATE SRITIS => useEffect viduje paduodama funkcija, kuri kreipiasi (POST) į serverį ir siunčia į jį createSav informaciją;
    useEffect(() => {
      if (null === createSritis) return;
      axios
        .post("http://localhost:3003/admin/sritys", createSritis)
        .then((res) => {
          showMessage(res.data.msg);
          setLastUpdate(Date.now()); // irasymas, update;
        })
        .catch((error) => {
          showMessage({ text: error.message, type: "success" });
        });
    }, [createSritis]);

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

     // EDIT SAV => useEffect viduje paduodama funkcija, kuri kreipiasi (PUT) į serverį paduodama elemento id, kurį norime redaguoti;
     useEffect(() => {
      if (null === editSav) return; // pasikeitus deleteSav, jeigu jis nėra null;
      axios
        .put("http://localhost:3003/admin/savivaldybes/" + editSav.id, editSav) // siunčiama užklausa su editSav.id (kokiam id skirta nurodoma URL) + editSav papildomai, nes title perdavinėsim per objektą;
        .then((res) => {
          showMessage(res.data.msg);
          setLastUpdate(Date.now()); // irasymas, update;
        })
        .catch((error) => {
          showMessage({ text: error.message, type: "danger" }); // jei ateina klaida, rodoma danger message;
        });
    }, [editSav]);

  // showMessage objektas ateina { text: error.message, type: "danger" };
  const showMessage = (m) => {
    const id = uuidv4();  // random id;
    m.id = id;  // random id pridedamas į objektą kaip id;
    setMessages(msg => [...msg, m]); // [...msg - messeges, prie kurių pridedamas naujas message m];
    setTimeout(() => {
      setMessages((mess) => mess.filter((ms) => ms.id !== id)); // filtruojam, kurie nelygus palieka, kurie lygus duoda false;
    }, 5000); // po 5s message dingsta;
  }

    return (
        <BackContext.Provider value={{
            setCreateSav,
            savivaldybes,
            setDeleteSav,
            messages,
            setEditSav,
            modalSav,
            setModalSav,
            setCreateSritis
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