import {
  TMainHeaderInfoTypes,
  BoxWrap,
  Recorder,
  EStyleButtonTypes,
  IRecorderRef,
  IAudioData,
  IUploadRecordData,
  Typography,
  BottomSheet,
  Box,
  Tag,
  ETagLine,
  makeAudioData,
} from '@maidt-cntn/ui';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L04SP05 } from './store';
import { Container } from '@maidt-cntn/ui/en';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';
import { handleDownload } from '@maidt-cntn/util/FileUtil';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04SP05);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const recorderRef = useRef<IRecorderRef>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '자유 발화',
    headerPattern: 'text',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsCompleted(!isCompleted);
      return;
    }
    submitAnswer();
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
          },
        ],
      },
    ];
    if (pageData.find(value => value.page === PAGE_NUMBER)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE_NUMBER)!.userSubmission[0].inputData[1]);
    }
    submitData(PAGE_NUMBER, userSubmission);
  };

  const onSubmitRecorder = async () => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L04/SP05',
      changeData,
      mainKey: 1,
      page: 'p01',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: 2,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
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

  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 말해 봅시다.',
  };

  const checkDisableInput = () => {
    return !(Object.keys(cardData.p01.audioData!).length > 0);
  };

  const getButtonColor = () => {
    if (cardData.p01.isSubmitted || checkDisableInput()) {
      return isCompleted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return EStyleButtonTypes.PRIMARY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData.p01.isSubmitted ? '완료하기' : !isCompleted ? '답안 보기' : '답안 닫기'}
      onSubmit={() => {
        handleSubmit();
      }}
      submitBtnColor={
        cardData.p01.isSubmitted || checkDisableInput()
          ? isCompleted
            ? EStyleButtonTypes.SECONDARY
            : cardData.p01.isSubmitted
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData.p01.isSubmitted && checkDisableInput()}
    >
      <BoxWrap justifyContent={'center'} width={950}>
        <Typography>
          What industry do you think will benefit from AI, and why do you think so? Use an expression you learned in this lesson.
        </Typography>
      </BoxWrap>
      <BoxWrap justifyContent={'center'} marginTop={60}>
        <Recorder
          ref={recorderRef}
          recorderIndex={1}
          initialData={cardData.p01.audioData?.[2]}
          readOnly={cardData.p01.isSubmitted}
          onSubmit={() => {
            onSubmitRecorder();
          }}
        />
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isCompleted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              I believe that farming industry will benefit from using AI. That’s because AI can help farmers make better decisions by analyzing data
              and predicting crop production.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              <Typography>
                어떤 산업이 AI 의 혜택을 가장 많이 볼 것이라고 생각하며, 그 이유는 무엇인가요? 이 단원에서 배운 표현을 활용하세요.
              </Typography>
              <Typography>
                나는 농업이 AI 사용으로 혜택을 볼 것이라고 생각한다. 이는 AI 가 데이터를 분석하고 작물 생산량을 예측하여 농부들이 더 나은 결정을
                하도록 도울 수 있기 때문이다.
              </Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
