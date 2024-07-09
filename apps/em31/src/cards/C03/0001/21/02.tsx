import {
  Box,
  Image,
  IQuestionProps,
  Input,
  BoxWrap,
  SvgIcon,
  ESvgType,
  Typography,
  BottomSheet,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import empty_square from '@/assets/icon/math_empty_square.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03_0001_21, TAnswer } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [cardData, setCardData] = useRecoilState(C03_0001_21);
  const [isShow, setShow] = useState<boolean>(false);

  const pageNum = 'P02';

  const { answers, isSubmitted, solution, isCorrect } = cardData[pageNum];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        {' '}
        <SvgIcon src={headerIcon} size='48px' />{' '}
        <Box vAlign='center'>
          {' '}
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' /> &nbsp;안에 알맞은 수를 써넣으세요.{' '}
        </Box>{' '}
      </>
    ),
    mark: getMarking(isSubmitted, isCorrect),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    const newAnswers = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      value: value,
    };

    setCardData(prev => ({
      ...prev,
      [pageNum]: {
        ...prev[pageNum],
        answers: newAnswers,
      },
    }));

    changeData(pageNum, 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (cardData[pageNum].isSubmitted) {
      setShow(prev => !prev);
    } else {
      const newAnswers = answers.map((answer, index) => ({ value: answer.value, isAnswer: isAnswer(answer.value, solution[index]) }));
      const isCorrect = newAnswers.every(newAnswer => newAnswer.isAnswer);

      setCardData(prev => ({
        ...prev,
        [pageNum]: {
          ...prev[pageNum],
          answers: newAnswers,
          isCorrect: isCorrect,
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: answers.map((answer, index) => {
            const result: inputDatasType = {
              subKey: index + 1,
              type: 'TEXT',
              value: answer.value,
              isAnswer: answer.value === solution[index],
            };
            return result;
          }),
          isCorrect: isCorrect,
        },
      ];

      submitDataWithResult(pageNum, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted, isCorrect } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const { inputData } = userSubmissionList[0];
        setCardData(prev => ({
          ...prev,
          [pageNum]: {
            ...prev[pageNum],
            answers: inputData.map((data: TAnswer) => ({ value: data.value, isAnswer: data.isAnswer })),
            isSubmitted: isSubmitted,
            isCorrect,
          },
        }));
      }

      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
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
      headerInfo={null}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={answers.some(answer => answer.value === '')}
      submitBtnColor={
        answers.every(answer => answer.value !== '') ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap display='flex' justifyContent='center'>
        <Box>
          <Image src='/C03/0001/21/DEC313I03.png' alt='도토리가 3개씩 5묶음 그려진 그림입니다.' width='396px' height='201px' />
        </Box>
        <Box
          type='dashed'
          useRound
          width='calc(100% - 396px)'
          height='201px'
          padding='0px 20px'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <Box width={'100%'}>
            <Typography>3씩</Typography>
            <Input
              type='number'
              inputSize='small'
              width='52px'
              name='input1'
              value={answers[0]?.value}
              onChange={e => handleInputChange(e, 0)}
              readOnly={isSubmitted}
              status={isSubmitted && !answers[0].isAnswer && InputStatus.ERROR}
              ariaLabel='3씩 몇 묶음이 15인지 적는 입력란'
            />
            <Typography useGap={false}>묶음은 15입니다.</Typography>
          </Box>
          <Box width={'100%'} marginTop='24px'>
            <Typography>3의</Typography>
            <Input
              type='number'
              inputSize='small'
              width='52px'
              name='input2'
              value={answers[1]?.value}
              onChange={e => handleInputChange(e, 1)}
              readOnly={isSubmitted}
              status={isSubmitted && !answers[1].isAnswer && InputStatus.ERROR}
              ariaLabel='3의 몇배가 15인지 적는 입력란'
            />
            <Typography useGap={false}>배는 15입니다.</Typography>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>{solution.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>3씩 5묶음은 3의 5배입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
