import {Link} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {AuthProvider, useAuth} from "../security/user";
import {Navbar} from "../components/navbar";
import ButtonAddQuote from "../components/ButtonAddQuote";
import Quotes from "../components/Quotes";
import ErrorMessage from "../components/errorMessage";
import Button from "../components/Button";
import Footer from "../components/Footer";
// ['red','blue','green','yellow','pink']
// ['rounded-s-xl', 'rounded-se-xl', 'rounded-e-xl',' rounded-es-xl']
const Index = () => {
    const {userStatusInfo} = useAuth();
    const [quotes, setQuotes] = useState([]);
    const [quoteValue, setQuoteValue] = useState("")
    const [errors, setErrors] = useState([]);

    const getQuotes = async () => {
        try {
            const formData = {page: 'getOneDayQuotes'};
            const response = await fetch('http://127.0.0.1/ReactApi-/traitement.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const dataResponse = await response.json();
            setQuotes(dataResponse);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getQuotes();
        };

        fetchData(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchData();
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (quoteValue !== "") {
            const formData = {'quote': quoteValue, 'page': 'createQuote'};

            fetch('http://127.0.0.1/ReactApi-/traitement.php', {
                method: 'POST', headers: {'Content-Type': 'application/json', Authorization: token}, // Modifier l'en-tête Content-Type
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.sucess === "") {
                        setErrors(data.err)
                    }
                })
                .catch(error => {
                    // Gérez les erreurs
                    console.log(error);
                });
            setQuoteValue("")
        } else {
            setErrors(["Vous n'avez pas écrit de citation"]);
        }

    }
    const handleQuoteValueChange = (event) => {
        setQuoteValue(event.target.value);
    };


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <ButtonAddQuote />
            <main className="flex-grow">
                {userStatusInfo && userStatusInfo.is_user === true ? (
                    <div className="flex w-full items-start justify-center gap-2.5 mb-7">
                        <form className={""} onSubmit={handleSubmit}>
            <textarea
                id="description"
                rows="4"
                className="block w-full resize-none p-2.5 text-sm my-6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Écrivez vos citations préférées..."
                value={quoteValue}
                onChange={handleQuoteValueChange}
            ></textarea>
                            <ErrorMessage messages={errors} />
                            <Button
                                className={
                                    "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded justify-center "
                                }
                                type="submit"
                                innerHTML={"Envoyez vos inspirations"}
                            ></Button>
                        </form>
                    </div>
                ) : null}
                <h3 className={"font-bold text-center text-5xl my-9"}>
                    Citations des 24 dernières heures
                </h3>
                <Quotes quotes={quotes} />
            </main>
            <Footer />
        </div>
    );

};

export default Index;
