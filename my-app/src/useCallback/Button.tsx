import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    clickHandler: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, clickHandler }) => {
    console.log(`${children} rendered`);
    return <button onClick={clickHandler}>{children}</button>;
};

export default React.memo(Button);

//react.memo is solution for the app performance basically components with out react.memo one component render remaining components also render so we are used to react.memo to when ever the component state or props will change in that time only will render the component.