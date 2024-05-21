
import React, { useState, useEffect } from 'react';

interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

interface Error {
    status: boolean;
    msg: string;
}

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Index: React.FC = () => {
    const [drinksData, setDrinksData] = useState<Drink[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<Error>({ status: false, msg: "" });

    const fetchDrink = async (apiURL: string): Promise<void> => {
        setLoading(true);
        setIsError({ status: false, msg: "" });

        try {
            const response = await fetch(apiURL);
            const { drinks }: { drinks: Drink[] } = await response.json();
            setDrinksData(drinks);
            setLoading(false);
            if (!drinks || drinks.length === 0) {
                throw new Error("Data not found");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setIsError({ status: true, msg: "Something went wrong..." });
        }
    };

    useEffect(() => {
        const correctURL = `${URL}${searchTerm}`;
        fetchDrink(correctURL);
    }, [searchTerm]);

    return (
        <div>
            <form>
                <input
                    type="text"
                    name='search'
                    id='search'
                    placeholder='Search something new...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            <hr />

            {loading && !isError.status && <h3>Loading...</h3>}

            {!isError.status && <h3 style={{ color: "red" }}>{isError.msg}</h3>}

            {!loading && !isError.status && (
                <ul className="cocktail-data">
                    {drinksData.map((eachDrink) => {
                        const { idDrink, strDrink, strDrinkThumb } = eachDrink;
                        return (
                            <li key={idDrink}>
                                <div>
                                    <img src={strDrinkThumb} alt={strDrink} />
                                </div>
                                <div className='text'>
                                    <h3>{strDrink}</h3>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Index;
