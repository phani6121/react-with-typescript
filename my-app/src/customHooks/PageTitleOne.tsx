import React, { useState } from 'react';
import usePageTitle from './usePageTitle';

const PageTitleOne: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    usePageTitle(count);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>count-{count}</button>
        </div>
    );
};

export default PageTitleOne;
