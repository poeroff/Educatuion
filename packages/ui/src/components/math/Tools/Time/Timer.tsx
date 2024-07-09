import React, { useEffect, useRef, useState } from 'react';
import style from './Timer.style';

enum Status {
  Init = 'init',
  Run = 'run',
  Pause = 'pause',
}

interface ITimerProps {
  cancelClassName: string;
}

type TSettingTime = {
  min: number;
  sec: number;
};

export const Timer = ({ cancelClassName }: ITimerProps) => {
  const [settingTime, setSettingTime] = useState<TSettingTime>(DEFAULT_SETTING_TIME);
  const [milliseconds, setMilliseconds] = useState(0);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);
  const [status, setStatus] = useState<Status>(Status.Init);

  const resetTimer = () => {
    setMilliseconds(0);
    elapsedTimeRef.current = 0;
    startTimeRef.current = 0;
    setSettingTime(DEFAULT_SETTING_TIME);
    setStatus(Status.Init);
  };

  const pauseTimer = () => {
    elapsedTimeRef.current = timeToMilliseconds(settingTime) - milliseconds;
    setStatus(Status.Pause);
  };

  const startTimer = () => {
    if (status !== Status.Pause) {
      setMilliseconds(timeToMilliseconds(settingTime));
    }
    setStatus(Status.Run);
  };

  const ButtonRender = (status: Status) => {
    switch (status) {
      case Status.Init:
        if (timeToMilliseconds(settingTime) <= 0) {
          return (
            <style.Button
              className={cancelClassName}
              aria-label='시작'
              borderColor={COLOR_MAPPER.DISABLED}
              fontColor={COLOR_MAPPER.WHITE}
              bgColor={COLOR_MAPPER.DISABLED}
              width='60px'
              disabled
            >
              시작
            </style.Button>
          );
        } else {
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
        }
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

  const onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > MAX_INPUT) return;

    setSettingTime(prev => ({ ...prev, min: parseInt(e.target.value) }));
  };

  const onChangeSec = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > MAX_INPUT) return;

    setSettingTime(prev => ({ ...prev, sec: parseInt(e.target.value) }));
  };

  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = () => {
      if (status === Status.Run) {
        const now = Date.now();
        const delta = now - startTimeRef.current;
        const remainTime = timeToMilliseconds(settingTime) - (elapsedTimeRef.current + delta);

        if (remainTime <= 0) {
          resetTimer();
          return;
        }
        setMilliseconds(remainTime);
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (status === Status.Run) {
      startTimeRef.current = Date.now();
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [status, settingTime]);

  return (
    <>
      <style.Time>
        {status === Status.Init ? (
          <input className={cancelClassName} type='number' value={addZero(settingTime.min)} onChange={onChangeMin} />
        ) : (
          <span>{formatTime(milliseconds).minutes}</span>
        )}
        <p>:</p>
        {status === Status.Init ? (
          <input className={cancelClassName} type='number' value={addZero(settingTime.sec)} onChange={onChangeSec} />
        ) : (
          <span>{formatTime(milliseconds).seconds}</span>
        )}
      </style.Time>
      <style.ButtonWrapper>{ButtonRender(status)}</style.ButtonWrapper>
    </>
  );
};

const DEFAULT_SETTING_TIME: TSettingTime = { min: 0, sec: 0 };

const MAX_INPUT = 59;

const COLOR_MAPPER = {
  BLUE: '--color-blue-1100',
  RED: '--color-red-500',
  WHITE: '--color-white',
  DISABLED: '--color-grey-600',
};

const addZero = (num: number) => {
  return String(num).padStart(2, '0');
};

const formatTime = (milliseconds: number) => {
  const seconds = addZero(Math.max(Math.floor(((milliseconds + 1000) / 1000) % 60), 0));
  const minutes = addZero(Math.floor(((milliseconds + 1000) / (1000 * 60)) % 60));
  return { minutes, seconds };
};

const timeToMilliseconds = (settingTime: TSettingTime) => settingTime.min * 60 * 1000 + settingTime.sec * 1000;
