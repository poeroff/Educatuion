import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  IRecorderRef,
  Recorder,
  IUploadRecordData,
  TextView,
  EStyleFontSizes,
  Label,
  BottomSheet,
  Tag,
  ETagLine,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04SP02 } from './store';

const P09 = () => {
  const PAGE_NUMBER = 'P09';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L04SP02);
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
    if (!cardData.p09.isSubmitted) {
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, isSubmitted: true } }));

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
      cardPath: 'L04/SP02',
      changeData,
      mainKey: 1,
      page: 'p09',
      setFunction: setCardData,
      subjectCode: 'HE10',
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
          originCardData: cardData.p09.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE10',
        });

        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
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
      p09: {
        ...prev.p09,
        audioData: {},
        isSubmitted: false,
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, {});
  };

  const getButtonColor = () => {
    const { audioData, isSubmitted } = cardData.p09;

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
      submitLabel={!cardData.p09.isSubmitted ? '완료하기' : !isAnswerShow ? '답안 보기' : '답안 닫기'}
      onSubmit={onSubmit}
      submitDisabled={
        (Object.entries(cardData.p09.audioData!).length === 0 || cardData.p09.isSubmitted) && !cardData.p09.isSubmitted && !isAnswerShow
      }
      submitBtnColor={getButtonColor()}
    >
      <Box>
        <Box hAlign='start'>
          <Label value={'A'} type={'paint'} background='var(--color-blue-100)' />
          <Box width='478px' backgroundColor='var(--color-blue-100)' border='none' useRound hAlign='center' padding='12px 0' marginLeft='8px'>
            <Recorder
              recorderIndex={1}
              initialData={cardData.p09.audioData?.[1]}
              readOnly={cardData.p09.isSubmitted}
              onSubmit={() => {
                onSubmitRecorder();
              }}
              onRefresh={resetAudio}
              ref={recorderRef}
            />
          </Box>
        </Box>
        <Box hAlign='start' margin='26px 0 0 45px'>
          <TextView title='보기' hAlign='start'>
            <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
              I want to learn more about how polar bears hunt.
            </Typography>
            <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
              I’m really worried about polar bears in Arctic.
            </Typography>
          </TextView>
        </Box>
      </Box>
      <Box hAlign='end' marginTop='20px'>
        <Box backgroundColor='var(--color-orange-200)' border='none' useRound hAlign='center' padding='12px' marginRight='8px'>
          <Typography>
            Me, too. They’re losing their homes <br />
            due to global warming.
          </Typography>
        </Box>
        <Label value={'B'} type={'paint'} background='var(--color-orange-100)' />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>I’m really worried about polar bears in Arctic.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
