import { useState, useEffect } from 'react';

//드롭다운 메뉴를 구성하기 위한 기능
const useDetectClose = (ref, initialState) => {
        //isOpen은 boolean값으로 이에 따라 사용자가 클릭한 요소 안의 요소인지 확인
        const [isOpen, setIsOpen] = useState(initialState);

        useEffect(() => {
            const pageClickEvent = e => {
                if(ref.current && !ref.current.contains(e.target)) {
                    setIsOpen(!isOpen);
                }
            };

            if(isOpen) {
                window.addEventListener('click', pageClickEvent);
            }

            return () => {
                window.removeEventListener('click', pageClickEvent);
            };
        }, [isOpen, ref]);
        return [isOpen, setIsOpen];
}

export default useDetectClose;