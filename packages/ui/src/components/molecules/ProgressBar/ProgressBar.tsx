import { useState, useEffect } from 'react';
import { SvgIcon } from '@maidt-cntn/ui';
import timerIconSrc from '@maidt-cntn/assets/icons/progressBar/timer.svg';
import redTimerIconSrc from '@maidt-cntn/assets/icons/progressBar/red_timer.svg';
import circleIconSrc from '@maidt-cntn/assets/icons/progressBar/circle.svg';
import Style from './ProgressBar.style';

export interface IProgressBarProps {
  seconds: number;
}

export const ProgressBar = ({ seconds = 0 }: IProgressBarProps) => {
  const [currentTime, setCurrentTime] = useState(seconds);
  const [timeCritical, setTimeCritical] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prevTime => prevTime - 1);
    }, 1000);
    if (currentTime <= 0) clearInterval(interval);
    if ((currentTime / seconds) * 100 <= 25) setTimeCritical(true);

    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <Style.Container>
      {timeCritical ? <SvgIcon src={redTimerIconSrc} size='36px' /> : <SvgIcon src={timerIconSrc} size='36px' />}
      <Style.BarBackground timeCritical={timeCritical}>
        <Style.Bar widthPercentage={(currentTime / seconds) * 100} timeCritical={timeCritical}>
          {currentTime !== seconds && <SvgIcon src={circleIconSrc} size='8px' />}
        </Style.Bar>
      </Style.BarBackground>
    </Style.Container>
  );
};
