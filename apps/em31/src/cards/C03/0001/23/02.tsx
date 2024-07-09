import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { C03_0001_23, TAnswer } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilState, useRecoilValue } from 'recoil';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [cardData, setCardData] = useRecoilState(C03_0001_23);
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
        {
          subKey: 3,
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
        <SvgIcon src={headerIcon} size='48px' style={{ marginTop: '5px' }} />
        접시 한 개에 귤이 5개씩 놓여 있습니다. <br />
        접시 4개에 놓여 있는 귤은 모두 몇 개인가요?
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
            answers: inputData.map((data: TAnswer) => ({ value: data.value, isAnswer: data.isAnswer ?? false })),
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
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image src='/C03/0001/23/DEC313I04.png' alt='귤 5개씩 담긴 접시 4개가 그려진 그림입니다.' width='652px' />
        </Box>
        <Box marginTop='24px'>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Typography>
              5x
              <Input
                type='number'
                inputSize='small'
                width='52px'
                value={answers[0]?.value}
                onChange={e => handleInputChange(e, 0)}
                readOnly={isSubmitted}
                status={isSubmitted && !answers[0].isAnswer && InputStatus.ERROR}
                ariaLabel='5 * 몇 인지 적는 입력란'
              />
              =
              <Input
                type='number'
                inputSize='small'
                width='148px'
                value={answers[1]?.value}
                onChange={e => handleInputChange(e, 1)}
                readOnly={isSubmitted}
                status={isSubmitted && !answers[1].isAnswer && InputStatus.ERROR}
                ariaLabel='수식에 대한 정답을 적는 입력란'
              />
            </Typography>
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Typography>
              <Input
                type='number'
                inputSize='small'
                width='148px'
                value={answers[2]?.value}
                onChange={e => handleInputChange(e, 2)}
                readOnly={isSubmitted}
                status={isSubmitted && !answers[2].isAnswer && InputStatus.ERROR}
                ariaLabel='수식에 대한 정답을 적는 입력란'
              />
              개
            </Typography>
          </Box>
        </Box>
      </Box>

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
              <Typography>(접시 한 개에 놓여 있는 귤 수)×(접시 수)</Typography>
              <Typography>=5×4=20(개)</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
