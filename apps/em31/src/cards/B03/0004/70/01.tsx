import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
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

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import B03_0004_70 from './store';
import headerIcon from '@/assets/icon/m_default_01.svg';
const P01 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B03_0004_70);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='40px' />
        <Box>
          <Box vAlign='center'>5장의 수 카드 중에서 3장을 골라 한 번씩만 이용하여 곱셈식을 만들고, 만든 곱셈식을 나눗셈식으로 나타내 보세요.</Box>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isAnswer = checkAnswers(cardData.p01.answer, cardData.p01.solution);
    const isCorrect = isAnswer.every(answer => answer);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer[4],
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p01.answer[5],
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isCorrect);
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
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
                userSubmissionList[0].inputData[5]?.value,
              ] || cardData.p01.answer,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    const inputAnswer = [...cardData.p01.answer];
    inputAnswer[index - 1] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: inputAnswer } }));
    changeData('P01', 1, index, value);
  };

  const handleInputStatus = (key: number, index: number): InputStatus => {
    return !isNotEmptyString(cardData.p01.answer[index])
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !(cardData.p01.answer[index] === cardData.p01.solution[index])
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isInputAnswer = () => {
    const answerList = [...cardData.p01.answer];
    const hasEmptyValue = answerList.some(element => element === '');

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
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box display='flex'>
          <Box background='pink' hAlign='center' width={'50px'} height={'70px'} marginRight={'24px'}>
            <Typography fontSize='32px'>1</Typography>
          </Box>
          <Box background='pink' hAlign='center' width={'50px'} height={'70px'} marginRight={'24px'}>
            <Typography fontSize='32px'>2</Typography>
          </Box>
          <Box background='pink' hAlign='center' width={'50px'} height={'70px'} marginRight={'24px'}>
            <Typography fontSize='32px'>5</Typography>
          </Box>
          <Box background='pink' hAlign='center' width={'50px'} height={'70px'} marginRight={'24px'}>
            <Typography fontSize='32px'>7</Typography>
          </Box>
          <Box background='pink' hAlign='center' width={'50px'} height={'70px'}>
            <Typography fontSize='32px'>9</Typography>
          </Box>
        </Box>
        <br />
        <Box marginTop='24px' display='flex' whiteSpace='nowrap' alignItems='center'>
          <Box
            color='var(--color-yellow-800)'
            backgroundColor='var(--color-yellow-100)'
            border='1px solid var(--color-yellow-700)'
            fontSize={22}
            borderRadius={50}
            display='flex'
            alignItems='center'
            padding='4px 18px'
            height={44}
            marginRight={8}
          >
            곱셈식
          </Box>
          <Typography>&nbsp;&nbsp;8 ×</Typography>
          <Input
            type='number'
            width='50px'
            value={cardData.p01.answer[0]}
            onChange={e => handleChange(1, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={handleInputStatus(1, 0)}
            ariaLabel='곱셈 첫 번째 숫자'
            maxLength={1}
          />
          <Typography>=</Typography>
          <Input
            type='number'
            width='50px'
            value={cardData.p01.answer[1]}
            onChange={e => handleChange(2, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={handleInputStatus(1, 1)}
            ariaLabel='곱셈 결과'
            maxLength={1}
          />
          <Input
            type='number'
            width='50px'
            value={cardData.p01.answer[2]}
            onChange={e => handleChange(3, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={handleInputStatus(1, 2)}
            ariaLabel='곱셈 결과'
            maxLength={1}
          />
        </Box>
        <Box marginTop='24px' display='flex' whiteSpace='nowrap' alignItems='center'>
          <Box
            color='var(--color-yellow-800)'
            backgroundColor='var(--color-yellow-100)'
            border='1px solid var(--color-yellow-700)'
            fontSize={22}
            borderRadius={50}
            display='flex'
            alignItems='center'
            padding='4px 18px'
            height={44}
            marginRight={8}
          >
            나눗셈식
          </Box>
          <Typography></Typography>
          <Input
            type='number'
            width='50px'
            value={cardData.p01.answer[3]}
            onChange={e => handleChange(4, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={handleInputStatus(1, 3)}
            ariaLabel='나눗셈 첫 번째 숫자'
            maxLength={1}
          />
          <Input
            type='number'
            width='50px'
            value={cardData.p01.answer[4]}
            onChange={e => handleChange(5, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={handleInputStatus(1, 4)}
            ariaLabel='나눗셈 두 번째 숫자'
            maxLength={1}
          />
          <Typography>÷ 8 =</Typography>
          <Input
            type='number'
            width='50px'
            value={cardData.p01.answer[5]}
            onChange={e => handleChange(6, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={handleInputStatus(1, 5)}
            ariaLabel='나눗셈 결과'
            maxLength={1}
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>9, 7, 2 / 7, 2, 9</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>8단 곱셈구구 중에서 주어진 수 카드로 만들 수 있는 곱셈식은 8×1=8,</Typography>
            <br />
            <Typography>8×2=16, 8×5=40, 8×7=56, 8×9=72입니다. 이 중에서 수 카드를</Typography>
            <Typography>한 번씩만 이용하여 만들 수 있는 것은 8×9=72입니다.</Typography>
            <br />
            <Typography>곱셈식 8×9=72를 나눗셈식으로 나타내면 72÷8=9입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
