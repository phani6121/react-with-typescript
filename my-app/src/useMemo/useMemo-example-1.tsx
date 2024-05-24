import React, { useState, useMemo, useEffect } from 'react';

interface Theme {
    backgroundColor: string;
    color: string;
}

const Index: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [dark, setDark] = useState<boolean>(false);

    const doubleNumber: number = useMemo(() => {
        return slowFunction(number);
    }, [number]);

    const themeChange: Theme = useMemo(() => {
        return {
            backgroundColor: dark ? "black" : "white",
            color: dark ? "white" : "black"
        };
    }, [dark]);

    useEffect(() => {
        console.log("theme changed");
    }, [themeChange]);

    return (
        <>
            <div>
                <input type="number" name='number' id='number' value={number} onChange={(e) => setNumber(Number(e.target.value))} />
            </div>
            <br />
            <div>
                <button onClick={() => setDark(!dark)}>change theme</button>
            </div>
            <h2 style={themeChange}>The Number: {doubleNumber}</h2>
        </>
    );
};

const slowFunction = (number: number): number => {
    for (let index = 0; index < 100000000; index++) { } // Simulating heavy computation
    console.log("slow running");
    return number * 2;
};

export default Index;
