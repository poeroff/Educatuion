import styled from '@emotion/styled';
import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Typography,
  RecordButton,
  EStyleFontSizes,
  SimpleAudioPlayer,
  EStyleButtonTypes,
  ISimpleAudioPlayerRef,
  IQuestionProps,
  Recorder,
  OverlayTooltip,
} from '@maidt-cntn/ui';
import { Container, PlayButton } from '@maidt-cntn/ui/en';
import { useRef, useState } from 'react';

export interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  audioSrc: string;
}

export interface IHE00902 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
}

const HE00902 = ({ headerInfo, questionInfo, data }: IHE00902) => {
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const [role, setRole] = useState<string>('A');
  const [step, setStep] = useState<{ [role: string]: number }>({ A: 0, B: 0 });
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isRecordingDone, setIsRecordingDone] = useState<{ [role: string]: boolean[] }>({
    A: Array.from({ length: Math.ceil(data.length / 2) }, () => false),
    B: Array.from({ length: Math.floor(data.length / 2) }, () => false),
  });
  const [isStop, setIsStop] = useState(false);

  const LAST_STEP = data.length + 1;
  const isRoleOver = (role: string | undefined) => {
    if (!role) return false;
    return step[role] === LAST_STEP && isRecordingDone[role].every(v => v);
  };
  const isSubmitDisabled = hasSubmitted || !isRoleOver(role);

  const isShowRecordAudio = (value: IListenAndAnswer | undefined, index: number) => {
    const isCompletedOrInProgress = !!role && index <= step[role];
    const isStoppedProgress = !!role && isStop && index === step[role];

    if (!isCompletedOrInProgress) {
      return { audio: false, recorder: false };
    }

    if (value?.type !== role) {
      return { audio: true, recorder: false };
    } else if (isStoppedProgress) {
      return { audio: false, recorder: false };
    } else {
      return { audio: false, recorder: true };
    }
  };

  const stopAllAudio = () => {
    audioRefs.current.forEach(ref => ref?.changePlayStatus(false));
  };

  const handleClickStart = () => {
    if (!role) {
      return;
    }
    if (isStop) {
      setIsStop(false);
    }
    if (step[role] === 0) {
      setStep(prev => ({ ...prev, [role]: 1 }));
    }
  };

  const handleClickStop = () => {
    setIsStop(true);
    stopAllAudio();
  };

  const handleClickRecordBtn = () => {
    if ((!!role && step[role] === 0) || isStop) {
      handleClickStart();
    } else {
      handleClickStop();
    }
  };

  const handleRecorderEvent = (index: number, status: boolean) => {
    const newState: { [role: string]: boolean[] } = { A: [...isRecordingDone['A']], B: [...isRecordingDone['B']] };
    newState[role][index] = status;
    setIsRecordingDone(newState);
  };

  const handleAudioEnded = (index: number) => {
    if (step[role] === index) {
      setStep(prev => ({ ...prev, [role]: prev[role] + 1 }));
    }
  };

  const handleRecorderSubmit = (index: number) => {
    if (step[role] === index) {
      setStep(prev => ({ ...prev, [role]: prev[role] + 1 }));
      audioRefs.current[index + 1]?.changePlayStatus(true);
    }
    handleRecorderEvent(Math.floor((index - 1) / 2), true);
  };

  const handleRecorderRefresh = (index: number) => {
    handleRecorderEvent(Math.floor((index - 1) / 2), false);
  };

  const handleSubmit = () => {
    // TODO 완료하기 액션 추가 필요
    setHasSubmitted(true);
  };
  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.TERTIARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
      submitLabel='완료하기'
      useExtend
    >
      <Box hAlign={'center'} marginBottom={8} justifyContent='space-between'>
        <>
          <Box whiteSpace={'nowrap'}>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>나의 역할 선택하기 </Typography>
          </Box>
          <BoxWrap boxGap={8} marginLeft={8}>
            <Box>
              <PlayButton
                label='A'
                color='skyblue'
                isActive={'A' === role}
                onClick={() => {
                  if (!isStop && !!role && role !== 'A' && !isRoleOver(role)) return;
                  setRole('A');
                }}
                disabled={!isStop && !!role && role !== 'A' && !isRoleOver(role)}
              />
            </Box>
            <Box>
              <PlayButton
                label='B'
                color='beige'
                isActive={'B' === role}
                onClick={() => {
                  if (!isStop && !!role && role !== 'B' && !isRoleOver(role)) return;
                  setRole('B');
                }}
                disabled={!isStop && !!role && role !== 'B' && !isRoleOver(role)}
              />
            </Box>
          </BoxWrap>
        </>

        {!isRoleOver(role) && !hasSubmitted && (
          <>
            <RecordButton
              label={!role || step[role] === 0 || isStop ? 'start' : 'stop'}
              onClick={handleClickRecordBtn}
              data-tooltip-id='click_tooltip'
            />
            {!role && (
              <OverlayTooltip
                id='click_tooltip'
                type='normal'
                padding='16px'
                openOnClick
                backgroundColor='var(--color-white)'
                color='var(--color-black)'
                isShadow
                place='left'
                showClose
              >
                <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
                  역할을 선택하세요.
                </Typography>
              </OverlayTooltip>
            )}
          </>
        )}
      </Box>

      <Box useFull>
        <Scroll maxHeight='340px'>
          <List<IListenAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <BoxWrap minHeight={'44px'}>
                <Box vAlign='center' height={'40px'}>
                  <Label
                    value={index % 2 === 0 ? 'B' : 'A'}
                    type={'paint'}
                    size={'x-small'}
                    background={index % 2 === 0 ? 'var(--color-yellow-100)' : 'var(--color-blue-100)'}
                  />
                </Box>

                <Box width={'70%'}>
                  <div>{value?.content}</div>
                </Box>

                <Box width={'30%'} hAlign='flex-end' vAlign='flex-start'>
                  <HiddenDiv isHidden={!isShowRecordAudio(value, index).audio}>
                    <SimpleAudioPlayer
                      audioSrc={value?.audioSrc ?? ''}
                      onEnded={() => handleAudioEnded(index)}
                      onChangeStatus={() => handleAudioReset(index)}
                      ref={ref => {
                        audioRefs.current[index] = ref;
                      }}
                    />
                  </HiddenDiv>

                  <HiddenDiv isHidden={!isShowRecordAudio(value, index).recorder}>
                    <Recorder
                      recorderIndex={index}
                      onSubmit={() => handleRecorderSubmit(index)}
                      onRefresh={() => handleRecorderRefresh(index)}
                      readOnly={hasSubmitted}
                    />
                  </HiddenDiv>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Scroll>
      </Box>
    </Container>
  );
};
export default HE00902;

const HiddenDiv = styled.div<{ isHidden: boolean }>(props => ({
  visibility: props.isHidden ? 'hidden' : 'visible',
  width: props.isHidden ? 0 : '',
  height: props.isHidden ? 0 : '',
  overflow: props.isHidden ? 'hidden' : 'auto',
  transform: props.isHidden ? 'scale(0)' : '',
}));
