import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  Recorder,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  IUploadRecordData,
  IAudioData,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { L01SP05 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP05);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const recorderRef = useRef<IRecorderRef>(null);
  const pageData = useRecoilValue(pageDataAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '자유 발화',
  };
  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 말해 봅시다.',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
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
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const onSubmitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [],
      },
    ];

    if (pageData.find(value => value.page === 'P01')) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === 'P01')!.userSubmission[0].inputData[0]);
    }
    submitData('P01', userSubmission);
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/SP05',
      changeData,
      mainKey: 1,
      page: 'p01',
      subjectCode: 'HE20',
      subKey: 1,
      userId,
      setFunction: setCardData,
    });
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const resetAudio = () => {
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        audioData: {},
        isSubmitted: false,
      },
    }));
    changeData('P01', 1, 1, {});
  };

  const ButtonColorShow = () => {
    const { audioData, isSubmitted } = cardData.p01;

    if (!isSubmitted) {
      return Object.entries(audioData!).length > 0 ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p01.isSubmitted ? '완료하기' : !isShowAnswer ? '답안보기' : '답안닫기'}
      onSubmit={onSubmitAnswer}
      submitDisabled={
        (Object.entries(cardData.p01.audioData!).length === 0 || cardData.p01.isSubmitted) && !cardData.p01.isSubmitted && !isShowAnswer
      }
      submitBtnColor={ButtonColorShow()}
    >
      <Box vAlign='center' marginTop='20px' textAlign='center' flexDirection='column' gap='8px'>
        <Typography> What do you think is important when you volunteer? </Typography>
        <Typography> Use an expression you learned in this lesson.</Typography>
      </Box>

      <Box hAlign='center' marginTop='20px'>
        <Recorder
          recorderIndex={1}
          initialData={cardData.p01.audioData?.[1]}
          readOnly={cardData.p01.isSubmitted}
          onRefresh={resetAudio}
          onSubmit={() => {
            onSubmitRecorder();
          }}
          ref={recorderRef}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' flexDirection='column' gap='10px'>
            <Typography useGap={false}> {cardData.p01.exampleAnswerEng} </Typography>
          </Box>
          <Box marginTop={'24px'}></Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' flexDirection='column' gap='10px'>
            <Typography useGap={false}>
              {' '}
              여러분이 자원봉사를 할 때 중요하다고 생각하는 것은 무엇입니까? 이 단원에서 배운 표현을 활용하세요.
            </Typography>
            <Typography useGap={false}>
              {' '}
              나는 다른 자원봉사자들과 협력하는 것이 중요하다고 생각한다. 한 팀으로 일하는 것은 자원봉사자들이 공동의 목표를 달성하도록 도울 것이다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
