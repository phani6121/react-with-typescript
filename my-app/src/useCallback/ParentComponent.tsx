import React, { useState, useCallback } from "react";
import Button from "./Button";
import Title from "./Title";
import Count from "./Count";

const ParentComp: React.FC = () => {
    const [age, setAge] = useState<number>(0);
    const [salary, setSalary] = useState<number>(7000);

    const incrementAge = useCallback(() => {
        setAge(age + 1);
    }, [age]);

    // useCallback is used to memoize the function and prevent unnecessary re-renders when passing the function as a prop.

    const incrementSalary = useCallback(() => {
        setSalary(salary + 1000);
    }, [salary]);

    return (
        <>
            <Title />
            <Count text={"age"} number={age} />
            <Button clickHandler={incrementAge}>increment age</Button>
            <Count text={"salary"} number={salary} />
            <Button clickHandler={incrementSalary}>increment salary</Button>
        </>
    );
};

export default ParentComp;
