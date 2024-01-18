import {Link} from "react-router-dom";
import {Deconnexion} from "./deconnexion";
import {useAuth} from "../security/user";
import {faHouse, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReact} from "@fortawesome/free-brands-svg-icons";

const Header = () => {
    const { userStatusInfo } = useAuth();
    return (
        <div>
            <header>
                <nav className="bg-white border-gray-200 dark:bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link to="/"><FontAwesomeIcon icon={faReact} className={'text-5xl text-white'} /> </Link>
                        <button data-collapse-toggle="navbar-default" type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                        </button>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {userStatusInfo && userStatusInfo.is_user === true ? (
                                    <nav className={"text-white"}>
                                        <Link to="/"><FontAwesomeIcon icon={faHouse} className={'text-xl text-white'}/> </Link>
                                        <Link to="/profil" className={"mx-1"}><FontAwesomeIcon icon={faUser} className={'text-xl text-white'}/></Link>
                                        <Link to="/" className={"mx-1"} onClick={Deconnexion}><FontAwesomeIcon
                                            icon={faRightFromBracket} className={'text-xl text-white'}/></Link>
                                    </nav>
                                ) : (
                                    <nav className={"text-white font-bold"}>
                                        <Link to="/"><FontAwesomeIcon icon={faHouse} className={'text-xl text-white'}/> </Link>
                                        <Link to="/Register" className={"mx-1"}>Register </Link>
                                        <Link to="/Login" className={"mx-1"}>Login </Link>
                                    </nav>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
