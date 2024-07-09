import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03_0004_06 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A03_0004_06);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '곱셈식을 나눗셈식 2개로, 나눗셈식을 곱셈식 2개로 나타내 보세요.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p01.answer1.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    cardData.p01.answer2.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 =
      (cardData.p01.answer1[0] === cardData.p01.solution1[0] &&
        cardData.p01.answer1[1] === cardData.p01.solution1[1] &&
        cardData.p01.answer1[2] === cardData.p01.solution1[2]) ||
      (cardData.p01.answer1[0] === cardData.p01.solution1[0] &&
        cardData.p01.answer1[1] === cardData.p01.solution1[2] &&
        cardData.p01.answer1[2] === cardData.p01.solution1[1]);

    let isCorrect2 =
      (cardData.p01.answer1[3] === cardData.p01.solution1[0] &&
        cardData.p01.answer1[4] === cardData.p01.solution1[2] &&
        cardData.p01.answer1[5] === cardData.p01.solution1[1]) ||
      (cardData.p01.answer1[3] === cardData.p01.solution1[0] &&
        cardData.p01.answer1[4] === cardData.p01.solution1[1] &&
        cardData.p01.answer1[5] === cardData.p01.solution1[2]);

    const isCorrect3 =
      (cardData.p01.answer2[0] === cardData.p01.solution2[0] &&
        cardData.p01.answer2[1] === cardData.p01.solution2[1] &&
        cardData.p01.answer2[2] === cardData.p01.solution2[2]) ||
      (cardData.p01.answer2[0] === cardData.p01.solution2[1] &&
        cardData.p01.answer2[1] === cardData.p01.solution2[0] &&
        cardData.p01.answer2[2] === cardData.p01.solution2[2]);

    let isCorrect4 =
      (cardData.p01.answer2[3] === cardData.p01.solution2[1] &&
        cardData.p01.answer2[4] === cardData.p01.solution2[0] &&
        cardData.p01.answer2[5] === cardData.p01.solution2[2]) ||
      (cardData.p01.answer2[3] === cardData.p01.solution2[0] &&
        cardData.p01.answer2[4] === cardData.p01.solution2[1] &&
        cardData.p01.answer2[5] === cardData.p01.solution2[2]);

    if (
      cardData.p01.answer1[0] === cardData.p01.answer1[3] &&
      cardData.p01.answer1[1] === cardData.p01.answer1[4] &&
      cardData.p01.answer1[2] === cardData.p01.answer1[5]
    ) {
      isCorrect2 = false;
    }

    if (
      cardData.p01.answer2[0] === cardData.p01.answer2[3] &&
      cardData.p01.answer2[1] === cardData.p01.answer2[4] &&
      cardData.p01.answer2[2] === cardData.p01.answer2[5]
    ) {
      isCorrect4 = false;
    }

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isCorrect1: isCorrect1,
        isCorrect2: isCorrect2,
        isCorrect3: isCorrect3,
        isCorrect4: isCorrect4,
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer1[1],
            isCorrect: isCorrect1,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer1[2],
            isCorrect: isCorrect1,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer1[3],
            isCorrect: isCorrect2,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer1[4],
            isCorrect: isCorrect2,
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p01.answer1[5],
            isCorrect: isCorrect2,
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p01.answer2[0],
            isCorrect: isCorrect3,
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: cardData.p01.answer2[1],
            isCorrect: isCorrect3,
          },
          {
            subKey: 9,
            type: 'TEXT',
            value: cardData.p01.answer2[2],
            isCorrect: isCorrect3,
          },
          {
            subKey: 10,
            type: 'TEXT',
            value: cardData.p01.answer2[3],
            isCorrect: isCorrect4,
          },
          {
            subKey: 11,
            type: 'TEXT',
            value: cardData.p01.answer2[4],
            isCorrect: isCorrect4,
          },
          {
            subKey: 12,
            type: 'TEXT',
            value: cardData.p01.answer2[5],
            isCorrect: isCorrect4,
          },
        ],
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4,
      },
    ];

    submitDataWithResult('P01', userSubmission, isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4);
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
                userSubmissionList[0].inputData[5]?.value,
              ] || cardData.p01.answer1,
            answer2:
              [
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
                userSubmissionList[0].inputData[8]?.value,
                userSubmissionList[0].inputData[9]?.value,
                userSubmissionList[0].inputData[10]?.value,
                userSubmissionList[0].inputData[11]?.value,
              ] || cardData.p01.answer2,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isCorrect1: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : false,
            isCorrect2: isSubmitted ? userSubmissionList[0].inputData[3]?.isCorrect : false,
            isCorrect3: isSubmitted ? userSubmissionList[0].inputData[6]?.isCorrect : false,
            isCorrect4: isSubmitted ? userSubmissionList[0].inputData[9]?.isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (1 <= subKey && subKey <= 6) {
      const answerList = [...cardData.p01.answer1];
      answerList[subKey - 1] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: answerList } }));
    } else if (7 <= subKey && subKey <= 12) {
      const answerList = [...cardData.p01.answer2];
      answerList[subKey - 7] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: answerList } }));
    }

    changeData('P01', 1, subKey, value);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap>
        <Box useFull type='dashed' useRound padding='20px'>
          <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
            <Typography>3×9=27</Typography>
          </Box>
          <Box display='flex'>
            <Input
              width='100%'
              status={
                !cardData.p01.answer1[0]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect1
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer1[0]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(1, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>÷</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer1[1]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect1
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer1[1]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(2, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>=</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer1[2]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect1
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer1[2]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(3, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
          </Box>
          <Box display='flex' marginTop='24px'>
            <Input
              width='100%'
              status={
                !cardData.p01.answer1[3]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect2
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer1[3]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(4, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>÷</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer1[4]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect2
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer1[4]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(5, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>=</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer1[5]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect2
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer1[5]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(6, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
          </Box>
        </Box>
        <Box useFull type='dashed' useRound padding='24px'>
          <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
            <Typography>35÷5=7</Typography>
          </Box>
          <Box display='flex'>
            <Input
              width='100%'
              status={
                !cardData.p01.answer2[0]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect3
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer2[0]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(7, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>x</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer2[1]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect3
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer2[1]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(8, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>=</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer2[2]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect3
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer2[2]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(9, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
          </Box>
          <Box display='flex' marginTop='24px'>
            <Input
              width='100%'
              status={
                !cardData.p01.answer2[3]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect4
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer2[3]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(10, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>x</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer2[4]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect4
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer2[4]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(11, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
            <Typography>=</Typography>
            <Input
              width='100%'
              status={
                !cardData.p01.answer2[5]
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !cardData.p01.isCorrect4
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              type='number'
              value={cardData.p01.answer2[5]}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleChange(12, e.target.value)}
              maxLength={2}
              ariaLabel={'답을 입력해 주세요.'}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        marginTop={200}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>27, 3, 9 또는 27, 9, 3</Typography>
              <Typography>5, 7, 35 또는 7, 5, 35</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>27÷3=9</Typography>
              <Typography>27÷9=3</Typography>
              <Typography>5×7=35</Typography>
              <Typography>7×5=35</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
