import { useState, useEffect } from 'react';
import axios from 'axios';
import FrontContext from './FrontContext';
import List from './List';
import Nav from './Nav';

function Front({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [sritys, setSritys] = useState(null);
    const [savivaldybes, setSavivaldybes] = useState(null);
    const [addCom, setAddCom] = useState(null);
    // const [filter, setFilter] = useState(0); // value='0'

    // const [sritis, setEditSritis] = useState(0);
    
    // READ SAVIVALDYBĖS
    useEffect(() => {
        axios
        .get("http://localhost:3003/savivaldybes")
        .then((res) => setSavivaldybes(res.data));
    }, []);
    
    // READ SRITYS
    useEffect(() => {
        axios
        .get("http://localhost:3003/sritys")
        .then((res) => setSritys(res.data));
    }, []);

    // CREATE COMMENT
    useEffect(() => {
    if (null === addCom) return;
    axios
      .post("http://localhost:3003/komentarai", addCom)
      .then((res) => {
        setLastUpdate(Date.now()); // irasymas, update;
      })
  }, [addCom]);

    return (
        <FrontContext.Provider value={{
            savivaldybes,
            sritys,
            setSritys,
            setAddCom
        }}>
            {
                show === 'front' ? 
                    <>
                        <Nav />
                        <div className="hello">
                            <h1><i>SVEIKI, PRISIJUNGĘ!</i></h1>
                        </div>
                    </> : 
                show === 'pateikti' ? 
                    <>
                        <Nav />
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <List />
                                </div>
                            </div>
                        </div>
                    </> : 
                show === 'pasiulymai' ? 
                    <>
                        <Nav />
                        <h1>PASIŪLYMAI</h1>
                    </> : null
            }
        </FrontContext.Provider>
    )
}

export default Front;