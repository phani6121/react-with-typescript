import { useEffect } from 'react';

const usePageTitle = (count: number): void => {
    useEffect(() => {
        document.title = `count-${count}`;
    }, [count]);
};

export default usePageTitle;
