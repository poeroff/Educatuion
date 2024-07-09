import { useRef, useState } from 'react';

type Props = {
  onLongTab: () => void;
};

export const useLongTab = ({ onLongTab }: Props) => {
  const [isLongTab, setIsLongTab] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setIsLongTab(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (isLongTab) {
      onLongTab();
    }
    setIsLongTab(false);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLongTab(false);
  };

  return { handleMouseDown, handleMouseUp, handleMouseLeave };
};
