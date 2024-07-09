import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioData,
  IRecorderRef,
  IUploadRecordData,
  Label,
  List,
  makeAudioData,
  Recorder,
  Scroll,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C11A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C11A03);
  const { userId } = useRecoilValue(studentAtom);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B. Speaking',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: '1. Complete the dialogue with the given sentences.',
  };

  const scripts: { speaker: string; text: string }[] = [
    { speaker: 'A', text: 'Daniel, what are you looking at on your phone?' },
    { speaker: 'B', text: `I'm looking at pictures from my visit to my aunt in Sydney last winter. Take a look!` },
    { speaker: 'A', text: `Wow, that's the Harbor Bridge!` },
    { speaker: 'B', text: `Yeah, that's what I usually do when taking pictures. Why?` },
    {
      speaker: 'A',
      text: `Well, in countries like Australia, New Zealand, and the U.K., making a V sign with the back of your hand facing out is an insulting
    gesture.`,
    },
    { speaker: 'B', text: `Oh, really? I wasn't aware of that.` },
  ];

  const choices = [
    'Make sure not to do that in those countries.',
    'I’ll have to study different cultures before traveling.',
    'By the way, it looks like you’re making a V sign with the back of your hand facing out.',
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
        {
          subKey: 3,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const answer = `3, 1, 2`;
  const isSubmitDisabled = !Object.values(cardData.p01.audioData!).every(value => {
    return value && Object.keys(value).length > 0;
  });

  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const handleSubmitRecorder = async (index?: number) => {
    if (!index) return;
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L02/C11/A03',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE10',
      subKey: index,
      userId,
    });
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];

      if (pageData.find(value => value.page === 'P01')) {
        userSubmission[0].inputData = pageData.find(value => value.page === 'P01')!.userSubmission[0].inputData;
      }

      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      submitData('P01', userSubmission);
    }
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList,
          subjectCode: 'HE10',
        });

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId={'targetContainer'}
      vAlign={'flex-start'}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      submitLabel={!cardData.p01.isSubmitted ? '완료하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
    >
      <Box background={'white'} useRound>
        <Scroll height='130px' tabIndex={0}>
          <Box vAlign='start'>
            <SpeakerSpan>{scripts[0].speaker} :</SpeakerSpan>
            <Box>{scripts[0].text}</Box>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[1].speaker} :</SpeakerSpan>
            <Box>{scripts[1].text}</Box>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[2].speaker} :</SpeakerSpan>
            <Box>
              {scripts[2].text}
              <Typography type='blank' width='320px' boxColor='var(--color-grey-900)'>
                <Box hAlign='center'>
                  <Recorder
                    recorderIndex={1}
                    readOnly={cardData.p01.isSubmitted}
                    initialData={cardData.p01.audioData?.[1]}
                    onSubmit={() => handleSubmitRecorder(1)}
                    onClick={() => handleRecorderClose(1)}
                    ref={ref => {
                      recorderRef.current[1] = ref;
                    }}
                  />
                </Box>
              </Typography>
            </Box>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[3].speaker} :</SpeakerSpan>
            <Box>{scripts[3].text}</Box>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[4].speaker} :</SpeakerSpan>
            <Box>
              {scripts[4].text}
              <Typography type='blank' width='320px' boxColor='var(--color-grey-900)'>
                <Box hAlign='center'>
                  <Recorder
                    recorderIndex={2}
                    readOnly={cardData.p01.isSubmitted}
                    initialData={cardData.p01.audioData?.[2]}
                    onSubmit={() => handleSubmitRecorder(2)}
                    onClick={() => handleRecorderClose(2)}
                    ref={ref => {
                      recorderRef.current[2] = ref;
                    }}
                  />
                </Box>
              </Typography>
            </Box>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[5].speaker} :</SpeakerSpan>
            <Box>
              {scripts[5].text}
              <Typography type='blank' width='320px' boxColor='var(--color-grey-900)'>
                <Box hAlign='center'>
                  <Recorder
                    recorderIndex={3}
                    readOnly={cardData.p01.isSubmitted}
                    initialData={cardData.p01.audioData?.[3]}
                    onSubmit={() => handleSubmitRecorder(3)}
                    onClick={() => handleRecorderClose(3)}
                    ref={ref => {
                      recorderRef.current[3] = ref;
                    }}
                  />
                </Box>
              </Typography>
            </Box>
          </Box>
        </Scroll>
      </Box>

      <Box marginTop='20px'>
        <TextView title='보기' hAlign='start'>
          <List
            align='vertical'
            data={choices}
            row={({ value, index = 1 }) => (
              <Box vAlign='start' hAlign='start'>
                <Label value={index} marginRight={16} />
                <Typography align='start' useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
                  {value}
                </Typography>
              </Box>
            )}
          />
        </TextView>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre useGap={false}>
              {answer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P01;

const SpeakerSpan = styled.span`
  min-width: var(--font-size-40);
`;
