import Style from './VideoPlayer.style';

interface IVideoProgressBarProps {
  max: number;
  value: number;
  onChange: (progress: number) => void;
  onMouseDown: (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => void;
  onMouseUp: () => void;
}

export const VideoProgressBar = ({ value, max, onChange, onMouseDown, onMouseUp }: IVideoProgressBarProps) => {
  const percentNum = (value / max || 0) * 100;

  return (
    <Style.ProgressBarWrapper>
      <Style.RangeInput
        onChange={e => onChange(parseInt(e.target.value, 10))}
        onMouseDown={e => onMouseDown(e)}
        onMouseUp={onMouseUp}
        onTouchStart={e => onMouseDown(e)}
        onTouchEnd={onMouseUp}
        type='range'
        min='0'
        max='100'
        step='1'
        value={percentNum}
      />
    </Style.ProgressBarWrapper>
  );
};

export default VideoProgressBar;
