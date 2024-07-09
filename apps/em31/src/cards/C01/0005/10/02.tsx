import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0005_10 } from './store';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0005_10);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        마을의 공기를 깨끗하게 하기 위해 은행나무와 단풍나무를 286그루 심으려고 합니다. 그중에서 은행나무가 141그루라면 단풍나무는 몇 그루인가요?
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const isExperessionCorrect = (answer: string, solution: string | string[]) => {
    // 숫자 사이의 공백이 있다면 false 반환
    if (/\d\s+\d/.test(answer)) {
      return false;
    }

    // 입력한 값의 모든 공백을 제거
    const normalizedAnswer = answer.replace(/\s+/g, '');

    // solution이 배열인 경우, 배열의 요소 중 하나라도 일치하면 true 반환
    if (Array.isArray(solution)) {
      return solution.some(sol => normalizedAnswer === sol);
    }

    // solution이 단일 문자열인 경우, 문자열과 일치하는지 확인
    return normalizedAnswer === solution;
  };

  const isAnswerUnfilled = () => {
    if (isNotEmptyString(cardData.p02.answer1) && isNotEmptyString(cardData.p02.answer2)) {
      return false;
    } else {
      return true;
    }
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
    if (cardData.p02.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p02.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = isExperessionCorrect(cardData.p02.answer1, cardData.p02.solution1);
    const isCorrect2 = isExperessionCorrect(cardData.p02.answer2, cardData.p02.solution2);

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: cardData.p02.answer1,
        answer2: cardData.p02.answer2,
        isCorrect: isCorrect1 && isCorrect2,
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
            value: cardData.p02.answer1,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect: isCorrect1 && isCorrect2,
      },
    ];

    submitDataWithResult('P02', userSubmission, isCorrect1 && isCorrect2);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          answer1: value,
        },
      }));
    } else if (subKey === 2) {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          answer2: value,
        },
      }));
    }
    changeData('P02', 1, subKey, value);
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
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box marginTop={40}>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              status={
                !cardData.p02.answer1
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !isExperessionCorrect(cardData.p02.answer1, cardData.p02.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p02.isSubmitted}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              maxLength={20}
              value={cardData.p02.answer1}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel='식을 적어주세요.'
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              status={
                !cardData.p02.answer2
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !isExperessionCorrect(cardData.p02.answer2, cardData.p02.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p02.isSubmitted}
              width='124px'
              type='number'
              marginLeft={12}
              textAlign='center'
              value={cardData.p02.answer2}
              onChange={e => handleChange(2, e.target.value)}
              ariaLabel='답을 적어주세요.'
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
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
              <Typography>286-141=145, 145</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>(심으려고 하는 은행나무와 단풍나무 수)-(은행나무 수)=286-141=145(그루)</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
