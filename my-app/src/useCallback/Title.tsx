import React from 'react';

const Title: React.FC = () => {
    console.log("title rendered");
    return (
        <h3>useCallback demo and react.memo</h3>
    );
};

export default React.memo(Title);


//react.memo is solution for the app performance basically components with out react.memo one component render remaining components also render so we are used to react.memo to when ever the component state or props will change in that time only will render the component.