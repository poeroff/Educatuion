import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IRecorderRef,
  IUploadRecordData,
  Label,
  List,
  Recorder,
  Scroll,
  Tag,
  IAudioData,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C11A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C11A03);
  const { userId } = useRecoilValue(studentAtom);
  const currentPage = 'P01';

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'B. Speaking',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: '1. Complete the dialogue with the given sentences.',
  };

  const scripts: { speaker: string; text: string }[] = [
    { speaker: 'A', text: 'Which job do you think will become important in the future?' },
    { speaker: 'B', text: `` },
    {
      speaker: 'A',
      text: `They’re already popular now, but will they become even more important?`,
    },
    { speaker: 'B', text: `I think so.` },
    { speaker: 'A', text: `What makes you think so?` },
    { speaker: 'B', text: `This will make people feel lonely.` },
    {
      speaker: 'A',
      text: `I see your point. Thanks for sharing your thoughts!`,
    },
  ];

  const choices = [
    'I believe that mental health professionals will play a crucial role in the future.',
    'In my opinion, too much technology will lead to a lack of face-to-face contact.',
    'I expect the number of people with stress and depression will increase in the future.',
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

  const answer = `1, 3, 2`;
  const audioSubKeys = [1, 2, 3];

  const isSubmitDisabled = !audioSubKeys.every(index => !!cardData.p01.audioData?.[index]);

  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const handleSubmitRecorder = async (index?: number) => {
    if (!index) return;
    recorderRef.current?.[index]?.onSubmitRecorderProcess({
      cardPath: 'L04/C11/A03',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE20',
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

      if (pageData.find(value => value.page === currentPage)) {
        userSubmission[0].inputData = pageData.find(value => value.page === currentPage)!.userSubmission[0].inputData;
      }

      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      submitData(currentPage, userSubmission);
    }
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<IUploadRecordData>(userId, pageId);

      if (userSubmissionList && userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p01.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
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

      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
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
            <Typography useGap={false}>
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
              &nbsp;{scripts[1].text}
            </Typography>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[2].speaker} :</SpeakerSpan>
            <Box>{scripts[2].text}</Box>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[3].speaker} :</SpeakerSpan>
            <Typography useGap={false}>
              {scripts[3].text}&nbsp;
              <Typography type='blank' width='320px' boxColor='var(--color-grey-900)'>
                <Box hAlign='center' width='100%'>
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
            </Typography>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[4].speaker} :</SpeakerSpan>
            <Typography useGap={false}>{scripts[4].text}</Typography>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[5].speaker} :</SpeakerSpan>
            <Box>
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
              &nbsp;{scripts[5].text}
            </Box>
          </Box>

          <Box vAlign='start'>
            <SpeakerSpan>{scripts[6].speaker} :</SpeakerSpan>
            <Box>{scripts[6].text}</Box>
          </Box>
        </Scroll>
      </Box>

      <Box marginTop='20px'>
        <TextView title='보기' vAlign='start'>
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
            <Tag type={ETagLine.GREEN} label='모범 답안' />
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
