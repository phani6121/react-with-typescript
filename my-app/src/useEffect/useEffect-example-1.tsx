import React, { useEffect, useState } from 'react';

// Define type for user data
interface User {
    id: number;
    name: string;
    email: string;
    // Add other properties as needed
}

const URL = "https://jsonplaceholder.typicode.com/users";

const Index: React.FC = () => {
    // Define state types
    const [userData, setUserData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<{ status: boolean; msg: string }>({ status: false, msg: "" });

    // Fetch user data function
    const fetchUserData = async (apiURL: string): Promise<void> => {
        setLoading(true);
        setIsError({ status: false, msg: "" });

        try {
            const response = await fetch(apiURL);
            const data = await response.json() as User[]; // Type assertion for user data
            setUserData(data);
            setLoading(false);
            setIsError({ status: false, msg: "" });

            if (response.status === 404) {
                throw new Error("data not found");
            }
        } catch (error) {
            setLoading(false);
            setIsError({ status: true, msg: "something went wrong, please try again!" });
        }
    };

    useEffect(() => {
        fetchUserData(URL);
    }, []);

    // Render loading state
    if (loading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        );
    }

    // Render error state
    if (isError?.status) {
        return (
            <div>
                <h3 style={{ color: "red" }}>{isError?.msg}</h3>
            </div>
        );
    }

    // Render user data
    return (
        <div>
            <h1>useEffect example</h1>
            <ul>
                {userData.map((eachUser) => (
                    <li key={eachUser.id}>
                        <div>{eachUser.name}</div>
                        <div>{eachUser.email}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;

// I defined a type 'User' for the user data fetched from the API.
// I provided type annotations for state variables(useState<User[]>, useState<boolean>, and useState<{ status: boolean; msg: string }>).
// I added type annotations to function parameters and return types.
// I used type assertion (as User[]) when parsing JSON response to ensure TypeScript understands the shape of the data.
// I specified the React.FC type for the functional component 'Index'

