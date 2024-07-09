import usePageData from '@/hooks/usePageData';
import empty_square from '@/assets/icon/math_empty_square.svg';
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
  SvgIcon,
  ESvgType,
  BoxWrap,
} from '@maidt-cntn/ui';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { C03_0001_11 } from './store';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const { changeData, saveData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0001_11);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        <Box vAlign='center'>
          &nbsp;그림을 보고&nbsp;
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newAnswers = [...cardData.p01.answers];
    newAnswers[index] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answers: newAnswers } }));
    changeData(PAGE_NUMBER, 1, 1 + index, value);
  };

  const handleSubmit = () => {
    const { answers, solutions, isSubmitted } = cardData.p01;
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
              value: cardData.p01.answers[0],
              isAnswer: true,
              isCorrect: answers[0] === solutions[0],
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answers[1],
              isAnswer: true,
              isCorrect: answers[1] === solutions[1],
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answers[2],
              isAnswer: true,
              isCorrect: answers[2] === solutions[2],
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answers[3],
              isAnswer: true,
              isCorrect: answers[3] === solutions[3],
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect: isCorrectAll, isSubmitted: true } }));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newAnswers = userSubmissionList[0]?.inputData?.map((data: { value?: string }) => data.value) || cardData.p01.answers;

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
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
    const { isSubmitted, answers, solutions } = cardData.p01;
    if (isSubmitted) {
      return answers[index] === solutions[index] ? InputStatus.ENABLE : InputStatus.ERROR;
    } else {
      return answers[index] !== '' ? InputStatus.ENABLE : InputStatus.DEFAULT;
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p01;

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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p01.isSubmitted || cardData.p01.answers.some(value => value === '')) && !cardData.p01.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap display='flex' justifyContent='center'>
        <Box marginLeft={'24px'}>
          <Image src='/C03/0001/11/DEC313002.png' alt='사과가 7개씩 3묶음 그려진 그림입니다.' width='342px' height='201px' />
        </Box>
        <Box type='dashed' useRound width='500px' height='201px' padding='0 24px' display='flex' justifyContent='center' flexDirection='column'>
          <Box>
            7씩{' '}
            <Input
              maxLength={1}
              inputSize='small'
              width='52px'
              value={cardData.p01.answers[0]}
              status={getInputStatus(0)}
              type='number'
              readOnly={cardData.p01.isSubmitted}
              onChange={handleChange(0)}
              ariaLabel='7씩 몇 묶음인지 적는 입력란'
            />{' '}
            묶음은{' '}
            <Input
              maxLength={6}
              inputSize='small'
              width='130px'
              value={cardData.p01.answers[1]}
              onChange={handleChange(1)}
              status={getInputStatus(1)}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='7의 N묶음이 몇 개인지 적는 입력란'
              type='number'
            />{' '}
            입니다.
          </Box>
          <Box marginTop='24px'>
            7의{' '}
            <Input
              maxLength={1}
              inputSize='small'
              width='52px'
              value={cardData.p01.answers[2]}
              onChange={handleChange(2)}
              status={getInputStatus(2)}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='7의 N배는 몇인지 적는 입력란'
              type='number'
            />{' '}
            배는{' '}
            <Input
              maxLength={6}
              inputSize='small'
              width='130px'
              value={cardData.p01.answers[3]}
              onChange={handleChange(3)}
              status={getInputStatus(3)}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='7의 N배 값을 적는 입력란'
              type='number'
            />{' '}
            입니다.
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p01.solutions.join(', ')}</Typography>
          </Box>

          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='22px'>
            <Typography size={EStyleFontSizes.MEDIUM}>7×3=21</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
