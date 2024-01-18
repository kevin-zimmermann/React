import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReact} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div>
            <footer className="bg-white  shadow dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://kevin-zimmermann.students-laplateforme.io/"
                                                                                          className="hover:underline">Ke20™</a>. All Rights Reserved.
    </span>
                    <Link to="/"><FontAwesomeIcon icon={faReact} className={'text-5xl text-white'} /> </Link>
                </div>
            </footer>

        </div>
    );
};

export default Footer;
