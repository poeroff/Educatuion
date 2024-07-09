import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
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
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0001_22 } from './store';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0001_22);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        경민이는 색종이를 56장 가지고 있었는데 28장을 동생에게 주었습니다. 경민이에게 남은 색종이는 몇 장인가요?
      </>
    ),
    mark: cardData.p02.isSubmitted
      ? cardData.p02.answer1.isCorrect && cardData.p02.answer2.isCorrect && cardData.p02.answer3.isCorrect
        ? 'correct'
        : 'incorrect'
      : 'none',
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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
      return;
    }

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: {
          ...cardData.p02.answer1,
          isCorrect: isExperessionCorrect(cardData.p02.answer1.value, '28'),
        },
        answer2: {
          ...cardData.p02.answer2,
          isCorrect: isExperessionCorrect(cardData.p02.answer2.value, '28'),
        },
        answer3: {
          ...cardData.p02.answer3,
          isCorrect: isExperessionCorrect(cardData.p02.answer3.value, '28'),
        },
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
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
  };

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: {
              value: userSubmissionList[0].inputData[0]?.value?.value || userSubmissionList[0].inputData[0]?.value,
              isCorrect: userSubmissionList[0].inputData[0]?.value?.isCorrect,
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value?.value || userSubmissionList[0].inputData[1]?.value,
              isCorrect: userSubmissionList[0].inputData[1]?.value?.isCorrect,
            },
            answer3: {
              value: userSubmissionList[0].inputData[2]?.value?.value || userSubmissionList[0].inputData[2]?.value,
              isCorrect: userSubmissionList[0].inputData[2]?.value?.isCorrect,
            },
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value, isCorrect: isExperessionCorrect(value, '28') } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value, isCorrect: isExperessionCorrect(value, '28') } } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: { ...prev.p02.answer3, value, isCorrect: isExperessionCorrect(value, '28') } } }));
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      useRound
      onSubmit={handleSubmit}
      submitDisabled={!(cardData.p02.answer1.value && cardData.p02.answer2.value && cardData.p02.answer3.value)}
      vAlign='flex-start'
      submitBtnColor={
        cardData.p02.answer1.value && cardData.p02.answer2.value && cardData.p02.answer3.value
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box marginTop={40}>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Typography size={EStyleFontSizes.MEDIUM}>56 - </Typography>
            <Input
              status={
                !cardData.p02.answer1.value
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.answer1.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p02.isSubmitted}
              width='100px'
              textAlign='center'
              type='number'
              value={cardData.p02.answer1.value}
              onChange={e => handleChange(1, e.target.value)}
              title='식을 적어주세요'
            />
            <Typography size={EStyleFontSizes.MEDIUM}>=</Typography>
            <Input
              status={
                !cardData.p02.answer2.value
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.answer2.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p02.isSubmitted}
              width='100px'
              textAlign='center'
              type='number'
              value={cardData.p02.answer2.value}
              onChange={e => handleChange(2, e.target.value)}
              title='식을 적어주세요'
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              status={
                !cardData.p02.answer3.value
                  ? InputStatus.DEFAULT
                  : cardData.p02.isSubmitted && !cardData.p02.answer3.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p02.isSubmitted}
              width='100px'
              marginLeft={12}
              textAlign='center'
              type='number'
              value={cardData.p02.answer3.value}
              onChange={e => handleChange(3, e.target.value)}
              title='답을 적어주세요.'
            />
            <Typography>장</Typography>
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
              <Typography>28, 28, 28</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>(전체 색종이 수)-(동생에게 준 색종이 수)=56-28=28(장)</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
