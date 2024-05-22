import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

const URL = "https://jsonplaceholder.typicode.com/users";

const Index: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<{ status: boolean; msg: string }>({ status: false, msg: "" });

    const fetchUserData = async (apiURL: string) => {
        setLoading(true);
        setIsError({ status: false, msg: "" });

        try {
            const response = await fetch(apiURL);

            if (!response.ok) {
                throw new Error("data not found");
            }

            const data: User[] = await response.json();
            setUserData(data);
        } catch (error) {
            setIsError({ status: true, msg: "something went wrong, pls try again!" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(URL);
    }, []);

    //

    if (loading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        );
    }

    if (isError.status) {
        return (
            <div>
                <h3 style={{ color: "red" }}>{isError.msg}</h3>
            </div>
        );
    }

    return (
        <div>
            <h1>useEffect example</h1>
            <ul>
                {userData.map((eachUser) => {
                    const { id, name, email } = eachUser;
                    return (
                        <li key={id}>
                            <div>{name}</div>
                            <div>{email}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Index;
