import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  Image,
  BoxWrap,
  Scroll,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  InputStatus,
  IQuestionProps,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is the man’s advice? Fill in the blanks.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.mp3',
    captionSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.srt',
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
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
      return;
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleInputChange = (answerNo: number, value: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${answerNo}`]: value } }));
    changeData('P01', 1, answerNo, value);
  };

  const canSubmit = () => {
    return isNotEmptyString(cardData.p01.answer1) && isNotEmptyString(cardData.p01.answer2) && isNotEmptyString(cardData.p01.answer3);
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p01.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      audioInfo={audioInfo}
    >
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={'/L02/C03/A02/HE2-L02-C03-A02-01.jpg'} width='300px' height='330px' alt='미소짓는 남자 앞에 돼지저금통과 쌓인 동전이 있음' />
          </PinchZoom>
        </Box>
        <Box hAlign='center'>
          <Box flex-direction='column' hAlign='center' vAlign='flex-start'>
            <Scroll height='100%'>
              <Typography>
                Make a (1){' '}
                <Input
                  textAlign='left'
                  maxLength={33}
                  inputSize='x-small'
                  placeholder=''
                  ariaLabel='1번의 첫 번째 답란'
                  value={cardData.p01.answer1}
                  onChange={e => handleInputChange(1, e.target.value)}
                  status={getStatus(cardData.p01.answer1, cardData.p01.solution1)}
                  readOnly={cardData.p01.isSubmitted}
                />{' '}
                <Input
                  textAlign='left'
                  maxLength={33}
                  marginLeft={10}
                  inputSize='x-small'
                  placeholder=''
                  ariaLabel='1번의 두 번째 답란'
                  value={cardData.p01.answer2}
                  onChange={e => handleInputChange(2, e.target.value)}
                  status={getStatus(cardData.p01.answer2, cardData.p01.solution2)}
                  readOnly={cardData.p01.isSubmitted}
                />
              </Typography>
              <Typography>
                to use (2){' '}
                <Input
                  maxLength={33}
                  inputSize='x-small'
                  placeholder=''
                  ariaLabel='2번의 첫 번째 답란'
                  value={cardData.p01.answer3}
                  onChange={e => handleInputChange(3, e.target.value)}
                  status={getStatus(cardData.p01.answer3, cardData.p01.solution3)}
                  readOnly={cardData.p01.isSubmitted}
                />{' '}
                wisely.
              </Typography>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              (1) {cardData.p01.solution1}, {cardData.p01.solution2} (2) {cardData.p01.solution3}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
