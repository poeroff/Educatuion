import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  ListHeader,
  ToggleButton,
  IQuestionProps,
  Box,
  SimpleAudioPlayer,
  List,
  Scroll,
  Label,
  Typography,
  ISimpleAudioPlayerRef,
} from '@maidt-cntn/ui';
import { useState, useRef, useEffect } from 'react';

export interface IListenAndAnswer {
  key: number;
  type: string;
  question: string;
  answer: string;
  color: string;
}

export interface EEL01C04A04P03 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  audioList: Array<{ audioSrc: string }>;
}

const EEL01C04A04P03 = ({ headerInfo, questionInfo, data, audioList }: EEL01C04A04P03) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const audioPlayerRefs = useRef<ISimpleAudioPlayerRef[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const setRef = (index: number, ref: ISimpleAudioPlayerRef | null) => {
    if (ref) {
      audioPlayerRefs.current[index] = ref;
    }
  };

  const handleChangeStatus = (index: number, isPlaying: boolean) => {
    if (isPlaying) {
      setPlayingIndex(index);
    } else if (playingIndex === index) {
      setPlayingIndex(null);
    }
  };

  useEffect(() => {
    audioPlayerRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index !== playingIndex) {
          ref.changePlayStatus(false);
        }
      }
    });
  }, [playingIndex]);

  return (
    <>
      <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
        <ListHeader>
          <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
        </ListHeader>
        <Box hAlign={'center'} marginTop={'-50px'} width={'1000px'}>
          <Box width={'684px'} gap={40} hAlign={'flex-start'}>
            {[0, 1].map(key => (
              <Box key={key} width={'320px'} gap={8}>
                <Box width='264px' height='58px' gap={8} hAlign={'flex-start'}>
                  <Typography style={{ fontSize: '36px', fontWeight: '800', lineHeight: '58px', color: '#996500' }}>{key + 1}</Typography>
                  <SimpleAudioPlayer
                    audioSrc={audioList[key as number].audioSrc}
                    onChangeStatus={isPlaying => handleChangeStatus(key, isPlaying)}
                    ref={ref => setRef(key, ref)}
                  />
                </Box>
                <Scroll>
                  <List<IListenAndAnswer>
                    data={data.filter(item => item.key === key)}
                    row={({ value }) => (
                      <BoxWrap height={value?.answer === '' ? '50px' : '94px'}>
                        <Box>
                          <Label value={value?.type || ''} type={'paint'} background={value?.color} />
                        </Box>
                        <Box>
                          <Typography
                            style={{ fontSize: '32px', fontWeight: '500', lineHeight: '42px', color: 'var(--color-grey-900)' }}
                            useGap={false}
                          >
                            {value?.question}
                          </Typography>
                          {isOpen && (
                            <Box>
                              <Typography style={{ fontSize: '28px', fontWeight: '500', lineHeight: '42px', color: '#2F38C7' }} useGap={false}>
                                {value?.answer}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </BoxWrap>
                    )}
                  />
                </Scroll>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EEL01C04A04P03;
