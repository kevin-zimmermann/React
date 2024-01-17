import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faPlus, faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useAuth} from "../security/user";
import ErrorMessage from "./errorMessage";
import Button from "./Button";


const ButtonAddQuote = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {userStatusInfo} = useAuth();
    const [quoteValue, setQuoteValue] = useState("")
    const [errors, setErrors] = useState([]);
    const handleClickModal = (e) => {
        e.preventDefault()
        setIsModalVisible(!isModalVisible);
        setErrors([])
        console.log(isModalVisible)
// Makes the pop-up appear
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (quoteValue !== "") {
            const formData = {'quote' : quoteValue, 'page': 'createQuote'};

            fetch('http://127.0.0.1/ReactApi-/traitement.php', {
                method: 'POST', headers: {'Content-Type': 'application/json', Authorization: token}, // Modifier l'en-tête Content-Type
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.sucess !== "") {
                        setIsModalVisible(false)
                    }else{
                     setErrors(data.err)
                    }
                })
                .catch(error => {
                    // Gérez les erreurs
                    console.log(error);
                });
            setQuoteValue("")
        }else{
            setErrors(["Vous n'avez pas écrit de citation"]);
            console.log("ici")
        }

    }
    const handleQuoteValueChange = (event) => {
        setQuoteValue(event.target.value);
    };

    return (
        <div>
            {userStatusInfo && userStatusInfo.is_user === true ? (
                <div className={"z-0 absolute right-5 bottom-5"}>
                    <button
                        data-modal-target="crud-modal" data-modal-toggle="crud-modal"
                        className={"text-blue-700 border border-blue-700 bg-blue-700 hover:bg-white hover:text-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"}
                        onClick={handleClickModal}><FontAwesomeIcon className={'text-white'} icon={faPlus}/>
                    </button>
                    {isModalVisible ? (
                        <div id="popup-modal" tabIndex="-1"
                             className="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-400 bg-opacity-25  max-h-full flex">
                            <div className="relative p-4 w-full align-middle justify-center flex">
                                <div className="relative rounded-lg shadow bg-gray-700 w-9/12">
                                    <button type="button"
                                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-hide="popup-modal" onClick={() => setIsModalVisible(false)}>
                                        <FontAwesomeIcon icon={faXmarkCircle}/>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-4 md:p-5 text-center">
                                        <form onSubmit={handleSubmit}>
                                            <label htmlFor="description"
                                                   className="block mb-2 text-sm font-medium  dark:text-white text-white">Votre
                                                citation</label>
                                            <textarea id="description" rows="4"
                                                      className="block p-2.5 w-full text-sm mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      placeholder="Écrivez vos citations préférées..."
                                                      value={quoteValue}
                                                      onChange={handleQuoteValueChange}></textarea>
                                            <ErrorMessage messages={errors}/>
                                            <Button
                                                className={"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded justify-center "}
                                                type="submit" innerHTML={"Envoyez vos inspirations"}></Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : null}

                </div>
            ) : null}
        </div>
    );
};

export default ButtonAddQuote;
