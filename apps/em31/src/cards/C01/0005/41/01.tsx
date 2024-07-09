import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Label, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0005_41 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0005_41);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        준호네 학교 학생은 모두 847명입니다. 그중에서 남학생이 432명이라면 여학생은 몇 명인가요?
      </>
    ),
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
    if (isNotEmptyString(cardData.p01.answer1) && isNotEmptyString(cardData.p01.answer2)) {
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

    const isCorrect1 = isExperessionCorrect(cardData.p01.answer1, cardData.p01.solution1);
    const isCorrect2 = isExperessionCorrect(cardData.p01.answer2, cardData.p01.solution2);

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: cardData.p01.answer1,
        answer2: cardData.p01.answer2,
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
            value: cardData.p01.answer1,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect: isCorrect1 && isCorrect2,
      },
    ];

    submitDataWithResult('P01', userSubmission, isCorrect1 && isCorrect2);
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          answer1: value,
        },
      }));
    } else if (subKey === 2) {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          answer2: value,
        },
      }));
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
      headerInfo={null}
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
                !cardData.p01.answer1
                  ? 'default'
                  : cardData.p01.isSubmitted && !isExperessionCorrect(cardData.p01.answer1, cardData.p01.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p01.isSubmitted}
              minWidth='296px'
              marginLeft={12}
              maxLength={20}
              textAlign='center'
              value={cardData.p01.answer1}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel='식을 적어주세요.'
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              status={
                !cardData.p01.answer2
                  ? 'default'
                  : cardData.p01.isSubmitted && !isExperessionCorrect(cardData.p01.answer2, cardData.p01.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p01.isSubmitted}
              width='124px'
              marginLeft={12}
              textAlign='center'
              type='number'
              value={cardData.p01.answer2}
              onChange={e => handleChange(2, e.target.value)}
              ariaLabel='답을 적어주세요.'
            />
            <Typography>명</Typography>
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
              <Typography>847-432=415, 415</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>(여학생 수)=(전체 학생 수)-(남학생 수)=847-432=415(명)</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
