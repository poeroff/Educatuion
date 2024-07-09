import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import {
  IQuestionProps,
  EStyleButtonTypes,
  Box,
  Input,
  Typography,
  TMainHeaderInfoTypes,
  Image,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  BoxWrap,
  Label,
} from '@maidt-cntn/ui';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { C03_0002_10 } from './store';

const P02 = ({ isAdditional = false }: { isAdditional?: boolean }) => {
  const PAGE_NUMBER = 'P02';
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const { changeData, saveData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0002_10);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />빵 18개를 봉지에 똑같이 나누어 담으려고 합니다. 봉지 수에 따라 봉지 한 개에 담을 수 있는 빵 수를
        구해 보세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
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
      ],
    },
  ];

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newAnswers = [...cardData.p02.answers];
    newAnswers[index] = value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answers: newAnswers } }));
    changeData(PAGE_NUMBER, 1, 1 + index, value);
  };

  const handleSubmit = () => {
    const { answers, solutions, isSubmitted } = cardData.p02;
    if (isSubmitted) {
      setIsAnswerShow(prev => !prev);
    } else {
      const isCorrectAll = answers.every((answer, index) => answer === solutions[index]);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answers[0],
              isAnswer: true,
              isCorrect: answers[0] === solutions[0],
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answers[1],
              isAnswer: true,
              isCorrect: answers[1] === solutions[1],
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isCorrect: isCorrectAll, isSubmitted: true } }));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newAnswers = userSubmissionList[0]?.inputData?.map((data: { value?: string }) => data.value) || cardData.p02.answers;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answers: newAnswers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getInputStatus = (index: number) => {
    const { isSubmitted, answers, solutions } = cardData.p02;
    if (isSubmitted) {
      return answers[index] === solutions[index] ? InputStatus.ENABLE : InputStatus.ERROR;
    } else {
      return answers[index] !== '' ? InputStatus.ENABLE : InputStatus.DEFAULT;
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p02;

    if (!isSubmitted) {
      return !answers.some(value => value === '') ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
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
      headerInfo={isAdditional ? null : headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p02.isSubmitted || cardData.p02.answers.some(value => value === '')) && !cardData.p02.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Box marginBottom={'24px'}>
          <Image src='/C03/0002/10/EC31306.png' alt='빵 18개가 그려진 그림입니다.' width='342px' height='152px' />
        </Box>
        <Box display='flex' lineHeight={'42px'}>
          <Box type='dashed' useRound flex={1} padding='24px' display='flex' justifyContent='center' flexDirection='column'>
            <Box>
              봉지 3개에 담으면 봉지 한 개에 담을 수 있는 빵은{' '}
              <Input
                maxLength={1}
                inputSize='small'
                width='52px'
                value={cardData.p02.answers[0]}
                status={getInputStatus(0)}
                type='number'
                readOnly={cardData.p02.isSubmitted}
                onChange={handleChange(0)}
                title='첫 번째 답 입력란'
              />
              개입니다.
            </Box>
          </Box>
          <Box type='dashed' useRound flex={1} marginLeft={'24px'} padding='24px' display='flex' justifyContent='center' flexDirection='column'>
            <Box>
              봉지 6개에 담으면 봉지 한 개에 담을 수 있는 빵은{' '}
              <Input
                maxLength={1}
                inputSize='small'
                width='52px'
                value={cardData.p02.answers[1]}
                onChange={handleChange(1)}
                status={getInputStatus(1)}
                readOnly={cardData.p02.isSubmitted}
                title='두 번째 답 입력란'
                type='number'
              />
              개입니다.
            </Box>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p02.solutions.join(', ')}</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='22px'>
            <Typography size={EStyleFontSizes.MEDIUM}>18÷3=6, 18÷6=3</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
