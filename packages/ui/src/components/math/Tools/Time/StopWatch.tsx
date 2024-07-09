import style from './StopWatch.style';
import { useEffect, useState, useRef } from 'react';

enum Status {
  Init = 'init',
  Run = 'run',
  Pause = 'pause',
}

interface IStopWatchProps {
  cancelClassName: string;
}

export const StopWatch = ({ cancelClassName }: IStopWatchProps) => {
  const [milliseconds, setMilliseconds] = useState(0);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);
  const [status, setStatus] = useState<Status>(Status.Init);

  const resetTimer = () => {
    setMilliseconds(0);
    elapsedTimeRef.current = 0;
    setStatus(Status.Init);
  };

  const pauseTimer = () => {
    elapsedTimeRef.current = milliseconds;
    setStatus(Status.Pause);
  };

  const startTimer = () => {
    setStatus(Status.Run);
  };

  const ButtonRender = (status: Status) => {
    switch (status) {
      case Status.Init:
        return (
          <style.Button
            className={cancelClassName}
            aria-label='시작'
            onClick={() => startTimer()}
            borderColor={COLOR_MAPPER.BLUE}
            fontColor={COLOR_MAPPER.WHITE}
            bgColor={COLOR_MAPPER.BLUE}
            width='60px'
          >
            시작
          </style.Button>
        );
      case Status.Run:
        return (
          <style.Button
            className={cancelClassName}
            aria-label='일시정지'
            onClick={pauseTimer}
            borderColor={COLOR_MAPPER.RED}
            fontColor={COLOR_MAPPER.WHITE}
            bgColor={COLOR_MAPPER.RED}
            width='88px'
          >
            일시정지
          </style.Button>
        );
      case Status.Pause:
        return (
          <>
            <style.Button
              className={cancelClassName}
              aria-label='초기화'
              onClick={resetTimer}
              borderColor={COLOR_MAPPER.RED}
              fontColor={COLOR_MAPPER.RED}
              bgColor={COLOR_MAPPER.WHITE}
              width='80px'
            >
              초기화
            </style.Button>
            <style.Button
              className={cancelClassName}
              aria-label='계속'
              onClick={startTimer}
              borderColor={COLOR_MAPPER.BLUE}
              fontColor={COLOR_MAPPER.BLUE}
              bgColor={COLOR_MAPPER.WHITE}
              width='80px'
            >
              계속
            </style.Button>
          </>
        );
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = () => {
      if (status === Status.Run) {
        const now = Date.now();
        const delta = now - startTimeRef.current;
        if (elapsedTimeRef.current + delta > LIMIT_MILLISECONDS) {
          resetTimer();
          return;
        }
        setMilliseconds(elapsedTimeRef.current + delta);
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (status === Status.Run) {
      startTimeRef.current = Date.now();
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [status]);

  return (
    <>
      <style.Time>
        <span>{formatTime(milliseconds).minutes}</span>
        <p>:</p>
        <span>{formatTime(milliseconds).seconds}</span>
      </style.Time>
      <style.ButtonWrapper>{ButtonRender(status)}</style.ButtonWrapper>
    </>
  );
};

const LIMIT_MILLISECONDS = 60 * 60 * 1000;

const COLOR_MAPPER = {
  BLUE: '--color-blue-1100',
  RED: '--color-red-500',
  WHITE: '--color-white',
};

const addZero = (num: number) => {
  return String(num).padStart(2, '0');
};

const formatTime = (milliseconds: number) => {
  const seconds = addZero(Math.floor((milliseconds / 1000) % 60));
  const minutes = addZero(Math.floor((milliseconds / (1000 * 60)) % 60));
  return { minutes, seconds };
};
