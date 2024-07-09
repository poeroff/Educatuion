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
  IAudioData,
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
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import L03SP02State from './store';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P12 = () => {
  const PAGE_NUMBER = 'P12';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L03SP02State);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '[Listen & Speak] 말하기 연습',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 대화의 빈칸에 들어갈 알맞은 문장을 골라 말해 보세요.',
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
    if (!cardData.p12.isSubmitted) {
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true } }));

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
      cardPath: 'L03/SP02',
      changeData,
      mainKey: 1,
      page: 'p12',
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
          originCardData: cardData.p12.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
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
      p12: {
        ...prev.p12,
        audioData: {},
        isSubmitted: false,
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, {});
  };

  const getButtonColor = () => {
    const { audioData, isSubmitted } = cardData.p12;

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
      submitLabel={!cardData.p12.isSubmitted ? '완료하기' : !isAnswerShow ? '답안 보기' : '답안 닫기'}
      onSubmit={onSubmit}
      submitDisabled={
        (Object.entries(cardData.p12.audioData!).length === 0 || cardData.p12.isSubmitted) && !cardData.p12.isSubmitted && !isAnswerShow
      }
      submitBtnColor={getButtonColor()}
    >
      <Box hAlign='start'>
        <Label value={'A'} type={'paint'} background='var(--color-blue-100)' />
        <Box backgroundColor='var(--color-blue-100)' border='none' useRound hAlign='center' padding='12px' margin='0 8px'>
          <Typography>Is there anything I should be careful about in the theater?</Typography>
        </Box>
      </Box>
      <Box marginTop='20px'>
        <Box hAlign='end'>
          <Box width='478px' backgroundColor='var(--color-red-100)' border='none' useRound hAlign='center' padding='12px 0' marginRight='8px'>
            <Recorder
              recorderIndex={1}
              initialData={cardData.p12.audioData?.[1]}
              readOnly={cardData.p12.isSubmitted}
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
                I can't wait! I'm so excited to see the musical tonight.
              </Typography>
            </Box>
            <Box>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                Please remember you're not allowed to make video recordings.
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
            <Typography>Please remember you're not allowed to make video recordings.</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>A: 극장에서 제가 주의해야 할 것이 있나요?</Typography>
            <Typography>B: 영상 녹화는 허용되지 않는다는 것을 기억하세요.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P12;
