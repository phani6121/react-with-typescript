import React, { useReducer, useEffect, useState } from 'react';
import { Dispatch } from 'react';


interface User {
    id: number;
    name: string;
    email: string;
}

interface Error {
    status: boolean;
    msg: string;
}

interface EditingState {
    status: boolean;
    id: number | string;
    name: string;
    email: string;
}

interface State {
    usersData: User[];
    isLoading: boolean;
    isError: Error;
    isEditing: EditingState;
}

type Action =
    | { type: "UPDATE_USERS_DATA"; payload: User[] }
    | { type: "LOADING"; payload: boolean }
    | { type: "DELETE_USER"; payload: number }
    | { type: "ONCLICK_EDIT"; payload: EditingState }
    | { type: "UPDATE_USER"; payload: User };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "UPDATE_USERS_DATA":
            return {
                ...state,
                usersData: action.payload,
            };
        case "LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        case "DELETE_USER":
            const newUsers = state.usersData.filter((eachUser) => eachUser.id !== action.payload);
            return {
                ...state,
                usersData: newUsers,
            };
        case "ONCLICK_EDIT":
            return {
                ...state,
                isEditing: action.payload,
            };
        case "UPDATE_USER":
            const updatedUsers = state.usersData.map((eachUser) =>
                eachUser.id === action.payload.id
                    ? {
                        ...eachUser,
                        name: action.payload.name,
                        email: action.payload.email,
                    }
                    : eachUser
            );
            return {
                ...state,
                usersData: updatedUsers,
            };
        default:
            return state;
    }
};

const Index: React.FC = () => {


    interface ErrorPayload {
        status: boolean;
        msg: string;
    }

    const fetchUsersData = async (URL: string, dispatch: Dispatch<any>) => {

        dispatch({ type: "LOADING", payload: true });
        dispatch({ type: "ERROR", payload: { status: false, msg: "" } });
        try {
            const response = await fetch(URL);
            const data = await response.json();
            dispatch({ type: "UPDATE_USERS_DATA", payload: data });
            dispatch({ type: "LOADING", payload: false });
            dispatch({ type: "ERROR", payload: { status: false, msg: "" } });
        } catch (error: any) {
            console.log(error);
            dispatch({ type: "LOADING", payload: false });
            dispatch({
                type: "ERROR",
                payload: { status: true, msg: error.message },
            } as { type: string; payload: ErrorPayload });
        }
    };




    useEffect(() => {
        fetchUsersData("https://jsonplaceholder.typicode.com/users", dispatch);
    }, []);

    const initialState: State = {
        usersData: [],
        isLoading: false,
        isError: { status: false, msg: "" },
        isEditing: { status: false, id: "", name: "", email: "" },
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDelete = (id: number) => {
        dispatch({ type: "DELETE_USER", payload: id });
    };

    const updateData = (id: number, name: string, email: string) => {
        dispatch({
            type: "UPDATE_USER",
            payload: {
                id,
                name,
                email,
            },
        });
        dispatch({
            type: "ONCLICK_EDIT",
            payload: { status: false, id: "", name: "", email: "" },
        });
    };

    if (state.isLoading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <div>
            <h2>Users Information</h2>
            {state.isEditing?.status && (
                <EditFormContainer
                    id={state.isEditing.id}
                    comingTitle={state.isEditing.name}
                    comingEmail={state.isEditing.email}
                    updateData={updateData}
                />
            )}
            {state.usersData.map((eachUser) => {
                const { id, name, email } = eachUser;
                return (
                    <div key={id}>
                        <h3>{name}</h3>
                        <p>{email}</p>
                        <button onClick={() => handleDelete(id)}>delete</button>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "ONCLICK_EDIT",
                                    payload: { status: true, id: id, name: name, email },
                                })
                            }
                        >
                            edit
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

const EditFormContainer: React.FC<{
    id: number | string;
    comingTitle: string;
    comingEmail: string;
    updateData: (id: number, name: string, email: string) => void;
}> = ({ id, comingTitle, comingEmail, updateData }) => {
    const [title, setTitle] = useState(comingTitle || "");
    const [email, setEmail] = useState(comingEmail || "");

    return (
        <>
            <form>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => updateData(id as number, title, email)}>update data</button>
            </form>
        </>
    );
};

export default Index;
