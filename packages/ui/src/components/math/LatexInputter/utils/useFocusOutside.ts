import { useEffect } from 'react';

export const useFocusOutside = (ref: React.RefObject<HTMLDivElement>, handleAction: Function) => {
  const handleFocusOut = (e: MouseEvent) => {
    if (!ref.current) return;
    if (!ref.current.contains(e.target as Node) && !(e.target as Element).className.includes('latex-inputter')) {
      handleAction();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleFocusOut);
    return () => {
      document.removeEventListener('click', handleFocusOut);
    };
  }, [ref]);
};
