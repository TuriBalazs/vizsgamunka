import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from './context/UserContext';
import { FaShoppingCart } from 'react-icons/fa/index';

function Navbar() {
    const { refresh, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('usertoken');
    const user = useContext(UserContext);
    
    return (
        <div className="navbar bg-navcolor border-b-2 border-fuchsia-300 rounded-b-lg text-black">
            <div className="text-center flex-1">
                <ul>
                    <Link to='/' className="btn btn-ghost w-24 text-base font-normal normal-case hover:font-bold hover:bg-fuchsia-300"><image src="Images/image.png"/></Link>
                </ul>
                <ul>
                    <Link to='/termekek' className="btn btn-ghost text-base font-normal normal-case hover:font-bold hover:bg-fuchsia-300">Termékek</Link>
                </ul>
            </div>
            <div className="hidden md:flex">
                <div className="ml-auto">
                    <ul className="menu menu-horizontal px-1">
                        <li className="rounded-md hover:font-bold hover:bg-fuchsia-300 hover:text-white"><Link to='/kosar'><FaShoppingCart /></Link></li>
                        {
                            !token

                                ? (<><li className="rounded-md hover:font-bold hover:bg-fuchsia-300 text-center"><p><Link to='/login' className="w-20 ">Belépés</Link></p></li>
                                    <li className="rounded-md hover:font-bold hover:bg-fuchsia-300 text-center"><p><Link to='/regist' className="w-24">Regisztráció</Link></p></li></>)
                                : user.userdata.admin == null
                                    ?
                                    <><li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><Link to='/profile'>Profil</Link></li>
                                        <li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><a onClick={() => { logout(); navigate('/') }}>Logout</a></li></>
                                    : <><li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><Link to='/termekfelvitel'>Termék Felvitel</Link></li>
                                    <li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><Link to='/termekmodosit'>Termék Modosítása</Link></li>
                                        <li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><a onClick={() => { logout(); navigate('/') }}>Logout</a></li></>
                        }
                    </ul>
                </div>
            </div>
            <div className="dropdown dropdown-end text-center">
                <label tabIndex={0} className="btn btn-ghost md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-cyan-300 hover:stroke-emerald-500 focus:stroke-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content p-3 shadow bg-sky-300 rounded-box w-32">
                    <li className="rounded-md hover:font-bold hover:bg-fuchsia-300 hover:text-white"><Link to='/kosar'><FaShoppingCart /></Link></li>
                    {
                        !token
                            ? (<><li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><Link to='/login'>Belépés</Link></li>
                                <li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><Link to='/regist'>Regisztráció</Link></li></>)
                            : (<><li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><Link to='/profile'>Profil</Link></li>
                                <li className="rounded-md hover:font-bold hover:bg-fuchsia-300"><a onClick={() => { logout(); navigate('/') }}>Logout</a></li></>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar