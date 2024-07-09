import styled from '@emotion/styled';
import { SvgIcon, TAudioSpeedType, EAudioSpeedTypeName } from '@maidt-cntn/ui';
import SpeakerSVG from '@maidt-cntn/assets/audioPlayer/speaker.svg';
import CaptionSVG from '@maidt-cntn/assets/audioPlayer/caption.svg';
import CaptionActiveSVG from '@maidt-cntn/assets/audioPlayer/caption_active.svg';
import CheckSVG from '@maidt-cntn/assets/audioPlayer/check.svg';
import StatusOffSVG from '@maidt-cntn/assets/audioPlayer/status_off.svg';
import { useEffect, useRef } from 'react';
import AudioCaption from '../../molecules/AudioPlayer/AudioCaption';

interface IDetailOptionBarProps {
  isDragging: boolean;
  isVolumeProgressView: boolean;
  isSpeedDetailView: boolean;
  isCaptionActive: boolean;
  volume: number;
  speed: TAudioSpeedType;
  tabIndex: number;
  caption: string;
  currentTime: number;
  volumeRef: React.RefObject<HTMLDivElement>;
  setIsVolumeProgressView: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSpeedDetailView: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCaptionActive: React.Dispatch<React.SetStateAction<boolean>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  setSpeed: React.Dispatch<React.SetStateAction<TAudioSpeedType>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailAudioOptionBar = ({
  isDragging,
  isVolumeProgressView,
  isSpeedDetailView,
  isCaptionActive,
  volume,
  speed,
  tabIndex,
  caption,
  currentTime,
  setIsVolumeProgressView,
  setIsSpeedDetailView,
  setIsCaptionActive,
  setIsDragging,
  setVolume,
  setSpeed,
  volumeRef,
}: IDetailOptionBarProps) => {
  const volumeHandleRef = useRef<HTMLDivElement>(null);
  const speedDetailViewContainerRef = useRef<HTMLDivElement>(null);
  const speedDetailViewRef = useRef<null[] | HTMLDivElement[]>([]);

  useEffect(() => {
    document.addEventListener('mouseup', e => {
      setIsDragging(false);
    });
    return () => {
      document.removeEventListener('mouseup', () => {
        setIsDragging(false);
      });
    };
  }, []);

  const getSpeedToText = (speed: TAudioSpeedType) => {
    switch (speed) {
      case 0.5:
        return EAudioSpeedTypeName.SLOW;
      case 1:
        return EAudioSpeedTypeName.NORMAL;
      case 1.2:
        return EAudioSpeedTypeName.LITTLEFAST;
      case 1.5:
        return EAudioSpeedTypeName.FAST;
    }
  };

  const handleVolumeControlMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setVolumeEvent(event);
  };

  const handleVolumeControlMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handleVolumeControlMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setVolumeEvent(event);
    }
  };

  const handleVolumeControlMouseOver = () => {
    // setIsDragging(mouseDown);
  };

  const handleVolumeControlKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' && volume < 1) {
      if (volume + 0.01 > 1) setVolume(1);
      else setVolume(percent => percent + 0.01);
    }
    if (event.key === 'ArrowLeft') {
      if (volume - 0.01 < 0) setVolume(0);
      else setVolume(percent => percent - 0.01);
    }
    if (event.key === 'Enter') {
      setIsVolumeProgressView(false);
    }
  };

  const handleVolumeControlBlur = () => {
    setIsVolumeProgressView(false);
  };

  const handleCaptionControlBlur = () => {
    setIsCaptionActive(false);
  };

  const setVolumeEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = volumeRef.current?.getBoundingClientRect();
    const offsetX = event.clientX - rect!.left;
    const percent = offsetX / rect!.width;

    if (percent > 1) setVolume(1);
    else if (percent < 0) setVolume(0);
    else setVolume(percent);
  };

  useEffect(() => {
    if (isVolumeProgressView && volumeHandleRef.current) {
      volumeHandleRef.current.focus();
    }
  }, [isVolumeProgressView]);

  useEffect(() => {
    if (isSpeedDetailView && speedDetailViewRef.current) {
      speedDetailViewRef.current[0]?.focus();
    }
  }, [isSpeedDetailView]);

  return (
    <DetailOptionSection>
      <SpeedSection
        tabIndex={tabIndex}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            setIsSpeedDetailView(true);
          }
        }}
      >
        <p
          style={{
            cursor: 'pointer',
          }}
          role='button'
          onClick={() => {
            setIsSpeedDetailView(true);
          }}
          aria-label={speed + ', 재생 속도 조절'}
        >
          {getSpeedToText(speed)}
        </p>

        {isSpeedDetailView && (
          <SpeedDetailViewContainer
            ref={speedDetailViewContainerRef}
            onBlur={event => {
              if (!speedDetailViewContainerRef.current?.contains(event.relatedTarget)) {
                setIsSpeedDetailView(false);
              }
            }}
          >
            {([1.5, 1.2, 1, 0.5] as TAudioSpeedType[]).map((spd: TAudioSpeedType, index) => {
              return (
                <SpeedDetailBox
                  key={index}
                  $selected={spd === speed}
                  ref={element => {
                    speedDetailViewRef.current[index] = element;
                  }}
                  onClick={() => {
                    setSpeed(spd);
                    setIsSpeedDetailView(false);
                  }}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      setSpeed(spd);
                      setIsSpeedDetailView(false);
                    }
                    if (event.key === 'ArrowUp') {
                      if (spd === 1.5) return;
                      else speedDetailViewRef.current[index - 1]?.focus();
                    }
                    if (event.key === 'ArrowDown') {
                      if (spd === 0.5) return;
                      else speedDetailViewRef.current[index + 1]?.focus();
                    }
                  }}
                  aria-label={getSpeedToText(spd)}
                  title={spd === speed ? '선택됨' : ''}
                  tabIndex={tabIndex}
                >
                  <SvgIcon src={CheckSVG} width='12px' height='12px' />
                  <p key={spd}>{getSpeedToText(spd)}</p>
                </SpeedDetailBox>
              );
            })}
          </SpeedDetailViewContainer>
        )}
      </SpeedSection>
      <VolumeSection>
        <SpeakerFigure
          onClick={() => {
            setIsVolumeProgressView(state => !state);
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              setIsVolumeProgressView(state => !state);
            }
          }}
          aria-label='음량 조절'
        >
          <SvgIcon src={volume === 0 ? StatusOffSVG : SpeakerSVG} width='24px' height='24px' />
        </SpeakerFigure>
        {isVolumeProgressView && (
          <VolumeControlSection
            ref={volumeRef}
            onMouseDown={handleVolumeControlMouseDown}
            onMouseUp={handleVolumeControlMouseUp}
            onMouseMove={handleVolumeControlMouseMove}
            onMouseOver={handleVolumeControlMouseOver}
            onKeyDown={handleVolumeControlKeyDown}
            onBlur={handleVolumeControlBlur}
          >
            <VolumeControlBar>
              <VolumeProgressBarTrack volume={volume} />
              <VolumeHandle ref={volumeHandleRef} tabIndex={tabIndex} style={{ left: `calc(${volume * 90}% - 16px)` }} />
            </VolumeControlBar>
          </VolumeControlSection>
        )}
      </VolumeSection>
      <CaptionSection
        tabIndex={tabIndex}
        onClick={() => {
          setIsCaptionActive(!isCaptionActive);
        }}
        onBlur={handleCaptionControlBlur}
      >
        <SvgIcon src={isCaptionActive ? CaptionActiveSVG : CaptionSVG} width='24px' height='24px' />
        {isCaptionActive && <AudioCaption caption={caption} currentTime={currentTime} />}
      </CaptionSection>
    </DetailOptionSection>
  );
};

export default DetailAudioOptionBar;

const DetailOptionSection = styled.section`
  width: 109px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  margin: 0 15px;
  padding: 4px 0;
`;
const VolumeSection = styled.section`
  display: flex;

  margin: 0px;
`;

const SpeakerFigure = styled.button`
  width: 24px;
  height: 24px;

  font-size: 0px;
`;

const VolumeControlSection = styled.section`
  position: absolute;
  top: 64px;
  transform: translate(-50%, 0%);

  width: 80px;
  height: 20px;
  padding: 6px;

  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 16px 0px rgba(71, 73, 77, 0.24);

  cursor: pointer;
`;

const VolumeControlBar = styled.section`
  position: relative;
  width: 68px;
  bottom: 0;
  height: 8px;
  background-color: var(--color-blue-100);
  border-radius: 10px;
`;

const VolumeProgressBarTrack = styled.section<{ volume: number }>`
  position: absolute;
  width: ${({ volume }) => volume * 100}%;
  height: 8px;
  bottom: 0;
  background-color: var(--color-blue-600);
  border-radius: 10px;
`;

const VolumeHandle = styled.div`
  position: absolute;
  transform: translateY(-3px);

  width: 14px;
  height: 14px;

  background-color: white;
  border: 1.5px solid var(--color-blue-600);
  border-radius: 50%;
  z-index: 1;

  cursor: pointer;
`;

const SpeedSection = styled.section`
  width: 53px;
  p {
    max-width: 49px;
    min-width: 25px;
    margin: 0;
    padding: 2px;
    font-size: var(--font-size-14);
    color: var(--color-grey-800);
    font-weight: var(--font-weight-bold);
    text-align: right;
  }
`;

const SpeedDetailViewContainer = styled.section`
  position: absolute;
  top: 64px;
  transform: translate(-25%, 0%);

  width: 153px;
  height: fit-content;
  padding: 6px;
  margin: 0px;

  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 3px 7px 0px #0000001f;

  cursor: pointer;
`;

const SpeedDetailBox = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 6px;
  height: 40px;
  margin: 0px;

  background-color: ${props => (props.$selected ? '#f4f8ff' : '#fff')};

  & span {
    opacity: ${props => (props.$selected ? 1 : 0)};
  }

  & > p {
    text-align: left;

    color: ${props => (props.$selected ? '#232426' : '#6a6d73')};
  }
`;

const CaptionSection = styled.section`
  display: flex;
  align-items: center;
  margin: 0px;

  cursor: pointer;
`;
