import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow from '@/assets/icon/v_arrow.svg';
import { useEffect, useState } from 'react';
import empty_square from '@/assets/icon/math_empty_square.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import C03_0004_50 from './store';

const P01 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C03_0004_50);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='40px' />
        <Box>
          <Box vAlign='center'>
            <Box marginLeft='5px' marginRight='5px' hAlign='center'>
              <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='48px' />
            </Box>
            안에 알맞은 수를 써넣으세요.
          </Box>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isAllCorrect),
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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 9,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 10,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isAnswer1 = checkAnswers(cardData.p01.answer1, cardData.p01.solution1[0]);
    const isAnswer2 = checkAnswers(cardData.p01.answer1, cardData.p01.solution1[1]);
    const isAnswer3 = checkAnswers(cardData.p01.answer2, cardData.p01.solution2);

    const isCorrect1 = isAnswer1.every(answer => answer) || isAnswer2.every(answer => answer);
    const isCorrect2 = isAnswer3.every(answer => answer);
    const isAllCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect1, isCorrect2, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer1[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer1[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer1[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer1[4],
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p01.answer2[0],
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p01.answer2[1],
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: cardData.p01.answer2[2],
          },
          {
            subKey: 9,
            type: 'TEXT',
            value: cardData.p01.answer2[3],
          },
          {
            subKey: 10,
            type: 'TEXT',
            value: cardData.p01.answer2[4],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
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
            answer1:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
              ] || cardData.p01.answer1,
            answer2:
              [
                userSubmissionList[0].inputData[5]?.value,
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
                userSubmissionList[0].inputData[8]?.value,
                userSubmissionList[0].inputData[9]?.value,
              ] || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (key: number, index: number, value: string) => {
    if (key === 1) {
      const inputAnswer = [...cardData.p01.answer1];
      inputAnswer[index] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: inputAnswer } }));
    } else if (key === 2) {
      const inputAnswer = [...cardData.p01.answer2];
      inputAnswer[index - 6] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: inputAnswer } }));
    }
    changeData('P01', 1, index + 1, value);
  };

  const handleInputStatus = (key: number, index: number): InputStatus => {
    if (key === 1) {
      return !isNotEmptyString(cardData.p01.answer1[index])
        ? InputStatus.DEFAULT
        : cardData.p01.isSubmitted && !cardData.p01.isCorrect1
        ? InputStatus.ERROR
        : InputStatus.ENABLE;
    }
    return !isNotEmptyString(cardData.p01.answer2[index])
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !(cardData.p01.answer2[index] === cardData.p01.solution2[index])
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isInputAnswer = () => {
    const answerList1 = [...cardData.p01.answer1];
    const answerList2 = [...cardData.p01.answer2];

    const hasEmptyValue = answerList1.some(element => element === '') || answerList2.some(element => element === '');

    return !hasEmptyValue;
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
  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      useRound
      vAlign='start'
    >
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <Typography>4×8 = 32</Typography>
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='10px'>
            <Typography>32</Typography>
            <Typography>÷</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer1[0]}
              onChange={e => handleChange(1, 0, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(1, 0)}
              ariaLabel='첫 번째 나눗셈 첫 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer1[1]}
              onChange={e => handleChange(1, 1, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(1, 1)}
              ariaLabel='첫 번째 나눗셈 결과'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='10px' marginTop='20px'>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer1[2]}
              onChange={e => handleChange(1, 2, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(1, 2)}
              ariaLabel='두 번째 나눗셈 첫 번째 숫자'
            />
            <Typography>÷</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer1[3]}
              onChange={e => handleChange(1, 3, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(1, 3)}
              ariaLabel='두 번째 나눗셈 두 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer1[4]}
              onChange={e => handleChange(1, 4, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(1, 4)}
              ariaLabel='두 번째 나눗셈 결과'
            />
          </Box>
        </Box>
      </Box>
      <br />
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <Typography>42÷7 = 6</Typography>
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='10px'>
            <Typography>7</Typography>
            <Typography>×</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer2[0]}
              onChange={e => handleChange(2, 6, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(2, 0)}
              ariaLabel='첫 번째 곱셈 첫 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer2[1]}
              onChange={e => handleChange(2, 7, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(2, 1)}
              ariaLabel='첫 번째 곱셈 결과'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='10px' marginTop='20px'>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer2[2]}
              onChange={e => handleChange(2, 8, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(2, 2)}
              ariaLabel='첫 번째 곱셈 결과'
            />
            <Typography>×</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer2[3]}
              onChange={e => handleChange(2, 9, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(2, 3)}
              ariaLabel='두 번째 곱셈 첫 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p01.answer2[4]}
              onChange={e => handleChange(2, 10, e.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={handleInputStatus(2, 4)}
              ariaLabel='두 번째 곱셈 두 번째 숫자'
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>4, 8, 32, 8, 4 (또는 8, 4, 32, 4, 8) / 6, 42, 6, 7, 42</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>• 곱셈식 4×8=32를 나눗셈식 2개로 나타내면 32÷4=8, 32÷8=4입니다.</Typography>
            <br />
            <Typography>• 나눗셈식 42÷7=6을 곱셈식 2개로 나타내면 7×6=42, 6×7=42입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
