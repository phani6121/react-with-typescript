import React, { useState, useEffect, useRef } from "react";

const Index = () => {
    // useState hook to manage the state of firstName
    const [firstName, setFirstName] = useState("");
    // useRef hook to keep track of component render count
    const renderCount = useRef(1);

    // useEffect hook to update the render count
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    return (
        <>
            {/* Input field to capture the first name */}
            <input
                type="text"
                name="firstName"
                id="firstName"
                // onChange event handler to update firstName state
                onChange={(e) => { setFirstName(e.target.value); }}
            />
            {/* Display the value being typed */}
            <h5>Typing: {firstName}</h5>
            {/* Display the component render count */}
            <h5>Component render {renderCount.current} times</h5>
        </>
    );
};

export default Index;
