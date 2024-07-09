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
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow from '@/assets/icon/v_arrow.svg';
import { useEffect, useState } from 'react';
import empty_square from '@/assets/icon/math_empty_square.svg';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import B03_0004_60 from './store';

const P02 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B03_0004_60);
  const { userId } = useRecoilValue(studentAtom);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={2} size='small' />
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
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isAllCorrect),
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
        {
          subKey: 11,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 12,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isAnswer1 = checkAnswers(cardData.p02.answer1, cardData.p02.solution1[0]);
    const isAnswer2 = checkAnswers(cardData.p02.answer1, cardData.p02.solution1[1]);
    const isAnswer3 = checkAnswers(cardData.p02.answer2, cardData.p02.solution2[0]);
    const isAnswer4 = checkAnswers(cardData.p02.answer2, cardData.p02.solution2[1]);

    const isCorrect1 = isAnswer1.every(answer => answer) || isAnswer2.every(answer => answer);
    const isCorrect2 = isAnswer3.every(answer => answer) || isAnswer4.every(answer => answer);
    const isAllCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect1, isCorrect2, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer1[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer1[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p02.answer1[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p02.answer1[4],
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p02.answer1[5],
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p02.answer2[0],
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: cardData.p02.answer2[1],
          },
          {
            subKey: 9,
            type: 'TEXT',
            value: cardData.p02.answer2[2],
          },
          {
            subKey: 10,
            type: 'TEXT',
            value: cardData.p02.answer2[3],
          },
          {
            subKey: 11,
            type: 'TEXT',
            value: cardData.p02.answer2[4],
          },
          {
            subKey: 12,
            type: 'TEXT',
            value: cardData.p02.answer2[5],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P02', userSubmission, isAllCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
                userSubmissionList[0].inputData[5]?.value,
              ] || cardData.p02.answer1,
            answer2:
              [
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
                userSubmissionList[0].inputData[8]?.value,
                userSubmissionList[0].inputData[9]?.value,
                userSubmissionList[0].inputData[10]?.value,
                userSubmissionList[0].inputData[11]?.value,
              ] || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (key: number, index: number, value: string) => {
    if (key === 1) {
      const inputAnswer = [...cardData.p02.answer1];
      inputAnswer[index] = value;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: inputAnswer } }));
    } else if (key === 2) {
      const inputAnswer = [...cardData.p02.answer2];
      inputAnswer[index - 6] = value;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: inputAnswer } }));
    }
    changeData('P02', 1, index + 1, value);
  };

  const handleInputStatus = (key: number, index: number): InputStatus => {
    if (key === 1) {
      return !isNotEmptyString(cardData.p02.answer1[index])
        ? InputStatus.DEFAULT
        : cardData.p02.isSubmitted && !cardData.p02.isCorrect1
        ? InputStatus.ERROR
        : InputStatus.ENABLE;
    }
    return !isNotEmptyString(cardData.p02.answer2[index])
      ? InputStatus.DEFAULT
      : cardData.p02.isSubmitted && !cardData.p02.isCorrect2
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isInputAnswer = () => {
    const answerList1 = [...cardData.p02.answer1];
    const answerList2 = [...cardData.p02.answer2];

    const hasEmptyValue = answerList1.some(element => element === '') || answerList2.some(element => element === '');

    return !hasEmptyValue;
  };
  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      useRound
      vAlign='start'
    >
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <Typography>8×3 = 24</Typography>
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='10px'>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer1[0]}
              onChange={e => handleChange(1, 0, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(1, 0)}
              ariaLabel='첫 번째 나눗셈 첫 번째 숫자'
            />
            <Typography>÷</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer1[1]}
              onChange={e => handleChange(1, 1, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(1, 1)}
              ariaLabel='첫 번째 나눗셈 두 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer1[2]}
              onChange={e => handleChange(1, 2, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(1, 2)}
              ariaLabel='첫 번째 나눗셈 결과'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='10px' marginTop='20px'>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer1[3]}
              onChange={e => handleChange(1, 3, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(1, 3)}
              ariaLabel='두 번째 나눗셈 첫 번째 숫자'
            />
            <Typography>÷</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer1[4]}
              onChange={e => handleChange(1, 4, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(1, 4)}
              ariaLabel='두 번째 나눗셈 두 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer1[5]}
              onChange={e => handleChange(1, 5, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(1, 5)}
              ariaLabel='두 번째 나눗셈 결과'
            />
          </Box>
        </Box>
      </Box>
      <br />
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <Typography>56÷8 = 7</Typography>
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='10px'>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer2[0]}
              onChange={e => handleChange(2, 6, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(2, 0)}
              ariaLabel='첫 번째 곱셈 첫 번째 숫자'
            />
            <Typography>×</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer2[1]}
              onChange={e => handleChange(2, 7, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(2, 1)}
              ariaLabel='첫 번째 곱셈 두 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer2[2]}
              onChange={e => handleChange(2, 8, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(2, 2)}
              ariaLabel='첫 번째 곱셈 결과'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='10px' marginTop='20px'>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer2[3]}
              onChange={e => handleChange(2, 9, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(2, 3)}
              ariaLabel='두 번째 곱셈 첫 번째 숫자'
            />
            <Typography>×</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer2[4]}
              onChange={e => handleChange(2, 10, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(2, 4)}
              ariaLabel='두 번째 곱셈 두 번째 숫자'
            />
            <Typography>=</Typography>
            <Input
              type='number'
              width='121px'
              value={cardData.p02.answer2[5]}
              onChange={e => handleChange(2, 11, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(2, 5)}
              ariaLabel='두 번째 곱셈 결과'
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>24, 8, 3, 24, 3, 8 (또는 24, 3, 8, 24, 8, 3)</Typography>
            <br />
            <Typography>/ 8, 7, 56, 7, 8, 56 (또는 7, 8, 56, 8, 7, 56)</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>• 곱셈식 8×3=24를 나눗셈식 2개로 나타내면 24÷8=3, 24÷3=8입니다.</Typography>
            <br />
            <Typography>• 나눗셈식 56÷8=7을 곱셈식 2개로 나타내면 8×7=56, 7×8=56입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
