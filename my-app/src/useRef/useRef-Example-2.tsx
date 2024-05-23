import React, { useState, useRef } from "react";

const Index: React.FC = () => {
    // State to manage the value of the input field
    const [firstName, setFirstName] = useState<string>("");

    // Ref to access the input DOM element
    const inputDom = useRef<HTMLInputElement>(null);

    // Function to focus on the input field
    const focus = () => {
        // Ensure the ref is not null before accessing its current property
        if (inputDom.current) {
            inputDom.current.focus();
        }
    };

    return (
        <>
            {/* Input field with ref attached */}
            <input
                ref={inputDom}
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {/* Display the value of the input field */}
            <h5>Typing: {firstName}</h5>
            {/* Button to trigger focusing on the input field */}
            <button onClick={focus}>Focus</button>
        </>
    );
};

export default Index;

