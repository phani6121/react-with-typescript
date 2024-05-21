import React, { useReducer } from 'react';

// Define types for state and action
type Person = {
    id: string;
    firstName: string;
    email: string;
};

type State = {
    data: Person[];
    length: number;
};

type Action =
    | { type: "DELETE_PERSON"; payload: string }
    | { type: "UPDATE_PERSON"; payload: string };

// Reducer function
const reducer = (state: State, action: Action): State => {
    if (action.type === "DELETE_PERSON") {
        const newPersons = state.data.filter((eachPerson) => {
            return eachPerson.id !== action.payload;
        });
        return {
            ...state,
            data: newPersons,
            length: state.length - 1,
        };
    }
    return state;
};

// Component
const Index: React.FC = () => {
    const initialState: State = {
        data: [
            { id: "1", firstName: "Phanindra", email: "phanindra@gmail.com" },
            { id: "2", firstName: "srinu", email: "srinu@gmail.com" },
        ],
        length: 2,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDelete = (id: string) => {
        dispatch({
            type: "DELETE_PERSON",
            payload: id,
        });
    };

    const handleEdit = (id: string) => {
        dispatch({
            type: "UPDATE_PERSON",
            payload: id,
        });
    };

    return (
        <div>
            <h1>Current users length : {state.length}</h1>
            {state.data.map((eachItem) => {
                const { id, firstName, email } = eachItem;
                return (
                    <div key={id}>
                        <h3>{firstName}</h3>
                        <p>{email}</p>
                        <button onClick={() => handleDelete(id)}>delete</button>
                        <button onClick={() => handleEdit(id)}>Edit</button>
                    </div>
                );
            })}
        </div>
    );
};

export default Index;
