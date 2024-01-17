import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const errorMessage = ({ messages }) => {


    if (typeof messages === "object" && Object.keys(messages).length > 0) {
        const arrayItems = Object.entries(messages).map(([key, value]) => (
            <li>
               . {value}
            </li>
        ));

        return (
            <div id="alert-border-2"
                 className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                 role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div className="ms-3 text-sm font-medium">
                    Une ou plusieurs erreur(s) a/ont été constaté:
                    <ul>{arrayItems}</ul>
                </div>
            </div>
        );
    }

    // Handle other cases or provide a default return
    return null;
};

export default errorMessage;
