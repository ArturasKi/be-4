import { NavLink, Link } from "react-router-dom";

function Nav() {

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="nav">
                        <NavLink to="/" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Pagrindinis</NavLink>
                        <NavLink to="/pateikti" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Pateikti pasiūlymą</NavLink>
                        <NavLink to="/pasiulymai" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Pasiūlymai</NavLink>
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </nav>
                </div>
            </div>
        </div>
        </>
    )
}

export default Nav;