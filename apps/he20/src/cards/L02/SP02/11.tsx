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
import { L02SP02 } from './store';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P11 = () => {
  const PAGE_NUMBER = 'P11';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L02SP02);
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
    if (!cardData.p11.isSubmitted) {
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isSubmitted: true } }));

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
      cardPath: 'L02/SP02',
      changeData,
      mainKey: 1,
      page: 'p11',
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
          originCardData: cardData.p11.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });

        setCardData(prev => ({
          ...prev,
          p11: {
            ...prev.p11,
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
      p11: {
        ...prev.p11,
        audioData: {},
        isSubmitted: false,
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, {});
  };

  const getButtonColor = () => {
    const { audioData, isSubmitted } = cardData.p11;

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
      submitLabel={!cardData.p11.isSubmitted ? '완료하기' : !isAnswerShow ? '답안보기' : '답안닫기'}
      onSubmit={onSubmit}
      submitDisabled={
        (Object.entries(cardData.p11.audioData!).length === 0 || cardData.p11.isSubmitted) && !cardData.p11.isSubmitted && !isAnswerShow
      }
      submitBtnColor={getButtonColor()}
    >
      <Box hAlign='start'>
        <Label value={'A'} type={'paint'} background='var(--color-blue-100)' />
        <Box backgroundColor='var(--color-blue-100)' border='none' useRound hAlign='center' padding='12px' margin='0 8px'>
          <Typography>Why do you rarely watch movies at home?</Typography>
        </Box>
      </Box>
      <Box marginTop='20px'>
        <Box hAlign='end'>
          <Box width='478px' backgroundColor='var(--color-red-100)' border='none' useRound hAlign='center' padding='12px 0' marginRight='8px'>
            <Recorder
              recorderIndex={1}
              initialData={cardData.p11.audioData?.[1]}
              readOnly={cardData.p11.isSubmitted}
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
                I think watching movies at the theater is more
                <br />
                engaging than watching them at home.
              </Typography>
            </Box>
            <Box>
              <Typography align='left' size={EStyleFontSizes['X-MEDIUM']}>
                Oh, I was thinking of watching movies at my place.
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
            <Typography>I think watching movies at the theater is more engaging than watching them at home.</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>A: 너는 왜 집에서 거의 영화를 보지 않니?</Typography>
            <Typography>B: 나는 영화관에서 영화를 보는 것이 집에서 보는 것보다 더 재미있다고 생각해.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
