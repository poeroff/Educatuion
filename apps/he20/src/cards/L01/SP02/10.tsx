import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L01SP02 } from './store';
import { studentAtom } from '@/stores/student';
import { useEffect, useRef, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioData,
  IQuestionProps,
  IRecorderRef,
  IUploadRecordData,
  Label,
  makeAudioData,
  Recorder,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import { Container } from '@maidt-cntn/ui/en';

const P10 = () => {
  const PAGE_NUMBER = 'P10';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '[Listen & Speak] 말하기 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 대화의 빈 칸에 들어갈 알맞은 문장을 골라 말 해 보세요.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (!cardData.p10.isSubmitted) {
      setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];
      if (pageData.find(value => value.page === PAGE_NUMBER)) {
        userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE_NUMBER)!.userSubmission[0].inputData[0]);
      }
      submitData(PAGE_NUMBER, userSubmission);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/SP02',
      changeData,
      mainKey: 1,
      page: 'p10',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: 1,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p10.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          p10: {
            ...prev.p10,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const resetAudio = () => {
    setCardData(prev => ({
      ...prev,
      p10: {
        ...prev.p10,
        audioData: {},
        isSubmitted: false,
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, {});
  };

  const getButtonColor = () => {
    const { audioData, isSubmitted } = cardData.p10;

    if (!isSubmitted) {
      return Object.entries(audioData!).length > 0 ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p10.isSubmitted ? '완료하기' : !isAnswerShow ? '답안보기' : '답안닫기'}
      onSubmit={onSubmit}
      submitDisabled={
        (Object.entries(cardData.p10.audioData!).length === 0 || cardData.p10.isSubmitted) && !cardData.p10.isSubmitted && !isAnswerShow
      }
      submitBtnColor={getButtonColor()}
    >
      <Box hAlign='start'>
        <Label value={'A'} type={'paint'} background='var(--color-blue-100)' />
        <Box backgroundColor='var(--color-blue-100)' border='none' useRound hAlign='center' padding='12px' margin='0 8px'>
          <Typography>What type of volunteer work are you going to do?</Typography>
        </Box>
      </Box>
      <Box marginTop='20px'>
        <Box hAlign='end'>
          <Box width='478px' backgroundColor='var(--color-red-100)' border='none' useRound hAlign='center' padding='12px 0' marginRight='8px'>
            <Recorder
              recorderIndex={1}
              initialData={cardData.p10.audioData?.[1]}
              readOnly={cardData.p10.isSubmitted}
              onSubmit={() => {
                onSubmitRecorder();
              }}
              onRefresh={resetAudio}
              ref={recorderRef}
            />
          </Box>
          <Label value={'B'} type={'paint'} background='var(--color-orange-200)' />
        </Box>
        <Box hAlign='end' margin='26px 45px 0 0'>
          <TextView title='보기' hAlign='start'>
            <Box>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                I’m not sure I can join the volunteering club.
              </Typography>
            </Box>
            <Box>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                I’m thinking of cooking something for the elderly.
              </Typography>
            </Box>
          </TextView>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>I’m thinking of cooking something for the elderly.</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>A: 어떤 종류의 자원봉사 일을 할 계획이야?</Typography>
            <Typography>B: 나는 어르신들을 위해 무언가를 요리할 생각이야.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
