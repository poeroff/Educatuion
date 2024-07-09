import Style from './SmallTimer.style';

export const SmallTimer = ({ seconds }: { seconds: number }) => {
  const addZero = (num: number) => {
    return String(num).padStart(2, '0');
  };

  return (
    <Style.SmallTimerContainer>
      <Style.Text>타이머</Style.Text>
      <Style.Times>
        {addZero(Math.floor(seconds / 60))}:{addZero(seconds % 60)}
      </Style.Times>
    </Style.SmallTimerContainer>
  );
};

export default SmallTimer;
