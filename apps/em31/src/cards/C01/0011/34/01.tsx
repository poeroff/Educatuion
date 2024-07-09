import { useEffect, useState } from 'react';

import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Input,
  List,
  Question,
  Radio,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { C01_0011_34 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import arrowRight from '@/assets/icon/arrow_right.svg';

const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0011_34);
  const textData = ['있을', '없을'];

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline' fontSize={28}>
        <Box marginRight={20}>[5~6]</Box>
        편의점에서 사탕 1개는 596원, 초콜릿 1개는 914원에 할인하여 팝니다. 세아는 용돈 1400원으로 사탕 1개와 초콜릿 1개를 사려고 합니다.
      </Box>
    ),
  };

  const isAnswerCorrect = (answer: string, solution: string | string[]) => {
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

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect1 = isAnswerCorrect(cardData.p01.answer1, cardData.p01.solution1);
    const isCorrect2 = isAnswerCorrect(cardData.p01.answer2, cardData.p01.solution1);
    const isCorrect3 = isAnswerCorrect(cardData.p01.answer3, cardData.p01.solution2);
    const isCorrect4 = isAnswerCorrect(cardData.p01.answer4, cardData.p01.solution2);
    const isCorrect5 = cardData.p01.answer5 === cardData.p01.solution3;
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer4,
          },
          {
            subKey: 5,
            type: 'NUMBER',
            value: cardData.p01.answer5,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const { userId } = useRecoilValue(studentAtom);
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
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];
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
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const handleRadioChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: index } }));
    changeData('P01', 1, 5, index);
  };

  const isCorrect = () => {
    const isCorrect1 = isAnswerCorrect(cardData.p01.answer1, cardData.p01.solution1);
    const isCorrect2 = isAnswerCorrect(cardData.p01.answer2, cardData.p01.solution1);
    const isCorrect3 = isAnswerCorrect(cardData.p01.answer3, cardData.p01.solution2);
    return isCorrect1 && isCorrect2 && isCorrect3;
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
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer1 || !cardData.p01.answer2 || !cardData.p01.answer3 || !cardData.p01.answer4 || !cardData.p01.answer5}
      submitBtnColor={
        cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
      useRound
    >
      <Question size='medium' type='number' number='5' mark={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'}>
        사탕 1개와 초콜릿 1개는 얼마쯤일지 어림하는 식을 쓰고, 어림셈을 <br />
        하여 문장을 완성해 보세요.
      </Question>
      <Box hAlign='center' marginTop='24px'>
        <Input
          textAlign='center'
          name='value1'
          value={cardData.p01.answer1}
          onChange={e => handleChange(1, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={!cardData.p01.answer1 ? 'default' : cardData.p01.isSubmitted && !isCorrect() ? 'error' : 'enable'}
          width='130px'
          ariaLabel='사탕 1개의 값'
        />
        <Typography>+</Typography>
        <Input
          textAlign='center'
          name='value2'
          value={cardData.p01.answer2}
          onChange={e => handleChange(2, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={!cardData.p01.answer2 ? 'default' : cardData.p01.isSubmitted && !isCorrect() ? 'error' : 'enable'}
          width='130px'
          ariaLabel='초콜릿 1개의 값'
        />
        <Typography>=</Typography>
        <Input
          textAlign='center'
          name='value3'
          value={cardData.p01.answer3}
          onChange={e => handleChange(3, e.target.value)}
          readOnly={cardData.p01.isSubmitted}
          status={!cardData.p01.answer3 ? 'default' : cardData.p01.isSubmitted && !isCorrect() ? 'error' : 'enable'}
          width='130px'
          ariaLabel='사탕 1개와 초콜릿 1개를 더해 어림한 값'
        />
      </Box>
      <Box vAlign='flex-start' marginTop='24px'>
        <SvgIcon src={arrowRight} size='50px' />
        <Typography size={EStyleFontSizes.MEDIUM}>
          어림셈을 하면 사탕 1개와 초콜릿 1개는&nbsp;
          <Input
            textAlign='center'
            name='value4'
            value={cardData.p01.answer4}
            onChange={e => handleChange(4, e.target.value)}
            readOnly={cardData.p01.isSubmitted}
            status={
              !cardData.p01.answer4
                ? 'default'
                : cardData.p01.isSubmitted && !isAnswerCorrect(cardData.p01.answer4, cardData.p01.solution2)
                ? 'error'
                : 'enable'
            }
            width='130px'
            ariaLabel='사탕 1개와 초콜릿 1개를 더해 어림한 값'
          />
          &nbsp;원 쯤이므로
          <List
            data={textData}
            align='horizontal'
            row={({ value, index = 1 }) => (
              <Box>
                {index === 1 ? <span>1400원으로 살 수 {'('}&nbsp;</span> : <span>,&nbsp;</span>}
                <Radio
                  gap={10}
                  type={'box'}
                  name={'radio-group'}
                  value={index === cardData.p01.answer5}
                  readOnly={cardData.p01.isSubmitted}
                  label={value}
                  onClick={() => handleRadioChange(index)}
                  isError={cardData.p01.isSubmitted && !(cardData.p01.answer5 === cardData.p01.solution3)}
                >
                  {value}
                </Radio>
              </Box>
            )}
          >
            <span>{')'} 것 같습니다.</span>
          </List>
        </Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>600, 900, 1500 / 1500, 없을</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>596을 600, 914를 900으로 생각하여 어림셈을 하면 600+900=1500입니다.</Typography>
            <Typography>1500{'>'}1400이므로 1400원으로 살 수 없을 것 같습니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
