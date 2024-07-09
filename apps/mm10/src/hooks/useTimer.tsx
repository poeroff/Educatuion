import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { durationTimer, isRunningTimer } from '@/stores';

export const useTimer = () => {
  const setTime = useSetRecoilState(durationTimer);
  const isRunning = useRecoilValue(isRunningTimer);

  useEffect(() => {
    let timerInterval: any = null;
    if (isRunning)
      timerInterval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [setTime, isRunning]);
};
