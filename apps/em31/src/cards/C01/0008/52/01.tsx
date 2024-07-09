import { Container } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Radio,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
  Question,
} from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01000852 } from './store';
import { useCallback, useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import arrowRight from '@/assets/icon/arrow_right.svg';
import AnswerSheet01 from './AnswerSheet01';
const P01 = () => {
  const CURRENT_PAGE = 'P01';
  const MAIN_KEY = 1;
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: MAIN_KEY,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: {
            value: '',
          },
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: {
            value: '',
          },
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: {
            value: '',
          },
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: {
            value: '',
          },
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: {
            value: '',
          },
        },
      ],
    },
  ];
  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C01000852);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='baseline' fontSize={28} width="920px" fontWeight={'var(--font-weight-medium)'}>
        <Box marginRight={8}>[1~3]</Box>
        <Typography lineHeight='48px'>
        라면을 기부하는 행사를 했습니다. 이틀 동안 마을 사람들이 기부한 라면이 1000개가 넘으면 으뜸 기업이 같은 양의 라면을 기부하겠다고 약속했습니다.
        마을 사람들이 기부한 라면은 첫째 날 513개, 둘째 날 498개입니다.
        </Typography>
      </Box>
    ),
  };
  const isBtnDisabled = () => {
    const allZero =
      cardData.p01.answer1.value !== '' &&
      cardData.p01.answer2.value !== '' &&
      cardData.p01.answer3.value !== '' &&
      cardData.p01.answer4.value !== '' &&
      cardData.p01.answer5.value !== '';
    return allZero || cardData.p01.isSubmitted;
  };
  const handleChange = (_value: string, subKey: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${subKey}`]: { value: _value } } }));
    changeData(CURRENT_PAGE, MAIN_KEY, subKey, { value: _value });
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: {
              ...prev.p01.answer1,
              value: data[0].value.value,
              isCorrect: data[0].isCorrect,
            },
            answer2: {
              ...prev.p01.answer2,
              value: data[1].value.value,
              isCorrect: data[1].isCorrect,
            },
            answer3: {
              ...prev.p01.answer3,
              value: data[2].value.value,
              isCorrect: data[2].isCorrect,
            },
            answer4: {
              ...prev.p01.answer4,
              value: data[3].value.value,
              isCorrect: data[3].isCorrect,
            },
            answer5: {
              ...prev.p01.answer5,
              value: data[4].value.value,
              isCorrect: data[4].isCorrect,
            },
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const checkAnswerCorrect = useCallback(() => {
    const correct1 = cardData.p01.answer1.value === cardData.p01.solution1 || cardData.p01.answer1.value === cardData.p01.solution2;
    const correct2 = cardData.p01.answer2.value === cardData.p01.solution1 || cardData.p01.answer2.value === cardData.p01.solution2;
    const correct3 = cardData.p01.answer3.value === cardData.p01.solution3;
    const correct4 = cardData.p01.answer4.value === cardData.p01.solution4;
    const correct5 = cardData.p01.answer5.value === cardData.p01.solution5;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: { ...prev.p01.answer1, isCorrect: correct1 },
        answer2: { ...prev.p01.answer2, isCorrect: correct2 },
        answer3: { ...prev.p01.answer3, isCorrect: correct3 },
        answer4: { ...prev.p01.answer4, isCorrect: correct4 },
        answer5: { ...prev.p01.answer5, isCorrect: correct5 },
      },
    }));
    const result = correct1 && correct2 && correct3 && correct4 && correct5;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect: result } }));
    return result;
  }, [cardData.p01]);
  const submitAnswer = () => {
    const correct = checkAnswerCorrect();
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: MAIN_KEY,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
            isCorrect: cardData.p01.answer1.value === cardData.p01.solution1 || cardData.p01.answer1.value === cardData.p01.solution2,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
            isCorrect: cardData.p01.answer2.value === cardData.p01.solution1 || cardData.p01.answer2.value === cardData.p01.solution2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer3,
            isCorrect: cardData.p01.answer3.value === cardData.p01.solution3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer4,
            isCorrect: cardData.p01.answer4.value === cardData.p01.solution4,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer5,
            isCorrect: cardData.p01.answer5.value === '1',
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p01: { ...prev.p01, isSubmitted: true, isCorrect: correct, inputData: [...(userSubmission[0].inputData as [])] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };
const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };
  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);
  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, []);
  const radioChange = (value: string) => {
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer5: {
          ...prev.p01.answer5,
          value: value,
        },
      },
    }));
    changeData(CURRENT_PAGE, MAIN_KEY, 5, { value: value });
  };
  const radioData1 = [
    {
      text: '있습니다.',
    },
    {
      text: '없습니다',
    },
  ];

return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      bodyId={'targetContainer'}
      useRound
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isBtnDisabled()}
      submitLabel={cardData.p01.isSubmitted ? (isShowBottom ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
    >

        <Box width="903px">
          <Typography lineHeight='48px'>
            <Box fontSize={36}>
              <Question type='number' number='3' mark={cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'}>
              마을 사람들이 이틀 동안 기부한 라면은 모두 몇 개인지 구하고, 글을 완성해 보세요.
              </Question>
            </Box>
          </Typography>
        </Box>

      <Box hAlign={'center'} marginTop={'24px'}>
        <Input
          width='130px'
          status={cardData.p01.isSubmitted ? (cardData.p01.answer1.isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE}
          readOnly={cardData.p01.isSubmitted}
          value={cardData.p01.answer1.value}
          ariaLabel='첫 번째 답란'
          onChange={e => handleChange(e.target.value, 1)}
        />
        <Typography size={EStyleFontSizes.MEDIUM}>+</Typography>
        <Input
          width='130px'
          status={cardData.p01.isSubmitted ? (cardData.p01.answer2.isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE}
          readOnly={cardData.p01.isSubmitted}
          value={cardData.p01.answer2.value}
          ariaLabel='두 번째 답란'
          onChange={e => handleChange(e.target.value, 2)}
        />
        <Typography size={EStyleFontSizes.MEDIUM}>=</Typography>
        <Input
          width='130px'
          status={cardData.p01.isSubmitted ? (cardData.p01.answer3.isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE}
          readOnly={cardData.p01.isSubmitted}
          value={cardData.p01.answer3.value}
          ariaLabel='세 번째 답란'
          onChange={e => handleChange(e.target.value, 3)}
        />
      </Box>
      <Box vAlign='flex-start' marginTop='24px'>
        <SvgIcon src={arrowRight} size='50px' style={{ marginTop: '4px' }} />
        <Typography lineHeight='56px'>
          이틀 동안 기부한 라면이{' '}
          <Input
            textAlign='center'
            status={cardData.p01.isSubmitted ? (cardData.p01.answer4.isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE}
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer4.value}
            width='130px'
            ariaLabel='이틀동안 기부한 라면 갯수'
            onChange={e => handleChange(e.target.value, 4)}
          />
          {' '}개이므로 으뜸 기업은 약속한 대로 라면을 기부할 수 (&nbsp;
          {cardData.p01.answer5.value !== '' &&
            radioData1.map((item, index) => {
              return (
                <span key={index}>
                  <Radio
                    gap={0}
                    type={'box'}
                    name={'radio-group'}
                    ariaLabel={item.text}
                    value={cardData.p01.answer5.value === (index + 1).toString()}
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && !cardData.p01.answer5.isCorrect}
                    onClick={() => radioChange((index + 1).toString())}
                  >
                    {item.text}
                  </Radio>
                  {index === 0 ? <Typography>,</Typography> : null}
                </span>
              );
            })}
          {cardData.p01.answer5.value === '' &&
            radioData1.map((item, index) => {
              return (
                <span key={index}>
                  <Radio
                    type={'box'}
                    name={'radio-group'}
                    ariaLabel={item.text}
                    value={false}
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && !cardData.p01.answer5.isCorrect}
                    onClick={() => radioChange((index + 1).toString())}
                  >
                    {item.text}
                  </Radio>
                  {index === 0 ? <Typography>,</Typography> : null}
                </span>
              );
            })}
          &nbsp; ).
        </Typography>
      </Box>
      <BottomSheet
        bottomSheetTargetId={'targetContainer'}
        height='50%'
        show={isShowBottom}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowBottom(false);
          },
        }}
      >
        <AnswerSheet01 />
      </BottomSheet>
    </Container>
  );
};
export default P01;