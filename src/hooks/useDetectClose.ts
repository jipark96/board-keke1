import { useEffect, useState, useRef } from "react";

const useDetectClose = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  // ref: 모달 또는 특정 DOM 엘리먼트를 참조하기 위한 Ref 객체
  const ref = useRef<HTMLElement | null>(null);

  // 모달을 닫는 함수
  const removeHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClick = (e: any) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return [isOpen, ref, removeHandler];
};

export default useDetectClose;
