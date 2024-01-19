import {useEffect, useState} from "react";
import {faPen, faTrash, faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../security/user";
import ErrorMessage from "./errorMessage";
import Button from "./Button";
import {useNavigate} from "react-router-dom";

const Quotes = ({quotes}) => {
    const {userStatusInfo} = useAuth();
    const [arrayItems, setArrayItems] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [quoteValue, setQuoteValue] = useState("")
    const [quoteIdClicked, setQuoteIdClicked] = useState(null);
    const navigate = useNavigate();

    const [color, setColor] = useState('');
    const arrayColor = ['red', 'blue', 'green', 'yellow', 'pink'];

    useEffect(() => {
        if (Array.isArray(quotes) && quotes.length > 0) {
            setArrayItems(quotes);
        }
    }, [quotes]);
    const handleQuoteValueChange = (event) => {
        setQuoteValue(event.target.value);
    };
    const handleClickModal = (id, type, quoteValue) => {
        // Makes the pop-up appear
        if (type === "delete") {
            setIsModalDeleteVisible(!isModalDeleteVisible);
        }
        if (type === "edit") {
            setIsModalEditVisible(!isModalEditVisible);
            setQuoteValue(quoteValue)
        }
        setQuoteIdClicked(id)
        setErrors([])
    }

    const deleteQuote = (event, id) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = {'idQuoteToDelete': id, 'page': 'deleteQuote'};

        fetch('http://127.0.0.1/ReactApi-/traitement.php', {
            method: 'POST', headers: {'Content-Type': 'application/json', Authorization: token}, // Modifier l'en-tête Content-Type
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success !== "") {
                    setIsModalDeleteVisible(false)
                    window.location.reload()
                } else {
                    setErrors(data.err)
                }
            })
            .catch(error => {
                // Gérez les erreurs
                console.log(error);
            });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = {'idQuoteToEdit': quoteIdClicked, 'quote': quoteValue, 'page': 'editQuote'};

        fetch('http://127.0.0.1/ReactApi-/traitement.php', {
            method: 'POST', headers: {'Content-Type': 'application/json', Authorization: token}, // Modifier l'en-tête Content-Type
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success !== "") {
                    setIsModalEditVisible(false)
                    window.location.reload()
                } else {
                    setErrors(data.err)
                }
            })
            .catch(error => {
                // Gérez les erreurs
                console.log(error);
            });


    }


    return (<div className={"my-9"}>
        {arrayItems.length > 0 ? (arrayItems.map((quote) => (
            <div key={quote.id} className="flex items-start justify-center gap-2.5 mb-7">
                <div
                    className="flex flex-col w-7/12 leading-1.5 p-4 border-gray-200 bg-pink-500 rounded-e-3xl rounded-es-3xl dark:bg-blue-500">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {quote.username}
                            </span>
                        <span className="text-sm font-semibold text-gray-200 dark:text-gray-200">
                                {new Date(quote.date * 1000).toLocaleDateString("fr-FR")} - {`${String(new Date(quote.date * 1000).getHours()).padStart(2, "0")}:${String(new Date(quote.date * 1000).getMinutes()).padStart(2, "0")}`}
                            </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-black">
                                {quote.is_modified ? "Modifié" : ""}
                            </span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white italic">
                        "{quote.quote}"
                    </p>
                    {userStatusInfo && userStatusInfo.is_user === true && userStatusInfo.infoUser.user_id === quote.user_id ? (
                        <div className={"grid align-bottom justify-items-end"}>
                            <FontAwesomeIcon
                                className={"text-red-600 text-2xl m-3"}
                                icon={faTrash}
                                onClick={() => handleClickModal(quote.id, "delete", "")}
                            />
                            <FontAwesomeIcon
                                className={"text-red-600 text-2xl m-3"}
                                icon={faPen}
                                onClick={() => handleClickModal(quote.id, "edit", quote.quote)}
                            />
                            {isModalDeleteVisible ? (<div
                                    id="popup-modal"
                                    tabIndex="-1"
                                    className="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-400 bg-opacity-25  max-h-full flex"
                                >
                                    <div className="relative p-4 w-full align-middle justify-center flex">
                                        <div className="relative rounded-lg shadow bg-gray-700 w-9/12">
                                            <button type="button"
                                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    data-modal-hide="popup-modal"
                                                    onClick={() => setIsModalDeleteVisible(false)}>
                                                <FontAwesomeIcon icon={faXmarkCircle}
                                                                 className={'text-2xl text-white'}/>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-4 md:p-5 text-center">
                                                <form>
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Etes-vous
                                                        sûr(e) de vouloir supprimer votre citation ?</h3>
                                                    <button data-modal-hide="popup-modal" type="button"
                                                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                                            onClick={(event) => {
                                                                deleteQuote(event, quoteIdClicked)
                                                            }}
                                                    >
                                                        Oui, je suis sûr(e) !
                                                    </button>
                                                    <button data-modal-hide="popup-modal" type="button"
                                                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                            onClick={() => setIsModalDeleteVisible(false)}>Non
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>) : null}
                            {isModalEditVisible ? (<div id="popup-modal" tabIndex="-1"
                                                        className="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-400 bg-opacity-25  max-h-full flex">
                                    <div className="relative p-4 w-full align-middle justify-center flex">
                                        <div className="relative rounded-lg shadow bg-gray-700 w-9/12">
                                            <button type="button"
                                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    data-modal-hide="popup-modal"
                                                    onClick={() => setIsModalEditVisible(false)}>
                                                <FontAwesomeIcon icon={faXmarkCircle}
                                                                 className={'text-2xl text-white'}/>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-4 md:p-5 text-center">
                                                <form onSubmit={handleSubmit}>
                                                    <label htmlFor="description"
                                                           className="block mb-2 text-sm font-bold
                                                                                                dark:text-white text-white">Votre
                                                        citation</label>
                                                    <textarea id="description" rows="4"
                                                              className="block p-2.5 w-full text-sm mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                              placeholder="Écrivez vos citations préférées..."
                                                              value={quoteValue}
                                                              onChange={handleQuoteValueChange}></textarea>
                                                    <ErrorMessage messages={errors}/>
                                                    <Button
                                                        className={"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded justify-center "}
                                                        type="submit"
                                                        innerHTML={"Envoyez vos inspirations"}></Button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                            ) : null}
                                        </div>
                                        ) : null}
                                    </div>
                                </div>))
                                ) : (
                                <div className="flex items-start justify-center gap-2.5 mb-7">
                                <div
                                className="flex flex-col w-7/12 leading-1.5 p-4 border-gray-200 bg-pink-500 rounded-e-3xl rounded-es-3xl dark:bg-blue-500">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white italic">
                                "Aucune citation n'est disponible !"
                                </p>
                                </div>
                                </div>
                                </div>
                                )}
                        </div>);};

                    export default Quotes;


