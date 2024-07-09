import { TRecordingStateType } from '@maidt-cntn/ui';
import { AudioVisualizerContainer, AudioWave, Wave } from './AudioVisualizer.style';

export interface IAudioVisualizerProps {
  audioVolumes: Array<number>;
}

export const AudioVisualizer = ({ audioVolumes }: IAudioVisualizerProps) => {
  return (
    <AudioVisualizerContainer>
      <AudioWave>
        {audioVolumes.map((volume, index) => (
          <Wave key={index} $volume={volume} />
        ))}
      </AudioWave>
    </AudioVisualizerContainer>
  );
};
