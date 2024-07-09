import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, EStyleButtonTypes, IQuestionProps, Label, Radio, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { C01000820_Atom } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import AnswerSheet04 from './AnswerSheet04';

const P04 = () => {
  const CURRENT_PAGE = 'P04';
  const MAIN_KEY = 2;
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C01000820_Atom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        행복 기업이 약속한 대로 쌀을 기부할 수 있을지 답을 쓰고 왜 그렇게 생각하는지 이유를 써 보세요.
      </>
    ),
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
            isCorrect: false,
          },
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: {
            value: '',
            isCorrect: false,
          },
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: {
              ...prev.p04.answer1,
              value: data[0].value.value || cardData.p04.answer1.value,
              isCorrect: data[0].value.value === '1' ? true : false,
            },
            answer2: {
              ...prev.p04.answer2,
              value: data[1].value.value || cardData.p04.answer2.value,
              isCorrect: data[1].value.value === '3' ? true : false,
            },
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const isBtnDisabled = () => {
    const allZero = cardData.p04.answer1.value !== '' && cardData.p04.answer2.value !== '';
    return allZero || cardData.p04.isSubmitted;
  };

  const checkAnswerCorrect = useCallback(() => {
    const correct1Trim = cardData.p04.answer1.value.trim();
    const correct1 = correct1Trim === '1';
    const correct2Trim = cardData.p04.answer2.value.trim();
    const correct2 = correct2Trim === '3';
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer1: { ...prev.p04.answer1, isCorrect: correct1 },
        answer2: { ...prev.p04.answer2, isCorrect: correct2 },
      },
    }));
    const result = correct1 && correct2;
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isCorrect: result } }));
    return result;
    // eslint-disable-next-line
  }, [cardData.p04]);

  const submitAnswer = () => {
    const correct = checkAnswerCorrect();
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: MAIN_KEY,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer1,
            isCorrect: cardData.p04.answer1.value.trim() === '1',
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2,
            isCorrect: cardData.p04.answer2.value.trim() === '3',
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p04: { ...prev.p04, isSubmitted: true, isCorrect: correct, inputData: [...(userSubmission[0].inputData as [])] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const handleSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const radioChange = (value: string) => {
    if (value === '1' || value === '2') {
      setCardData(prev => ({
        ...prev,
        p04: {
          ...prev.p04,
          answer1: {
            ...prev.p04.answer1,
            value: value,
          },
        },
      }));
      changeData(CURRENT_PAGE, MAIN_KEY, 1, { value: value });
    } else if (value === '3' || value === '4') {
      setCardData(prev => ({
        ...prev,
        p04: {
          ...prev.p04,
          answer2: {
            ...prev.p04.answer2,
            value: value,
          },
        },
      }));
      changeData(CURRENT_PAGE, MAIN_KEY, 2, { value: value });
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
    // eslint-disable-next-line
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
    // eslint-disable-next-line
  }, []);

  const radioData1 = [
    {
      text: '있습니다',
    },
    {
      text: '없습니다',
    },
  ];

  const radioData2 = [
    {
      text: '많기',
    },
    {
      text: '적기',
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
      submitLabel={cardData.p04.isSubmitted ? (isShowBottom ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <Box hAlign='center'>
        <Box vAlign='baseline' flexDirection='column' marginTop='24px'>
          <Box hAlign='center'>
            <Label
              value={'답'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Typography>
              쌀을 기부할 수 (&nbsp;
              {cardData.p04.answer1.value !== '' &&
                radioData1.map((item, index) => {
                  return (
                    <span key={index}>
                      <Radio
                        gap={0}
                        type={'box'}
                        name={'radio-group'}
                        ariaLabel={item.text}
                        value={cardData.p04.answer1.value === (index + 1).toString()}
                        readOnly={cardData.p04.isSubmitted}
                        isError={cardData.p04.isSubmitted && !cardData.p04.answer1.isCorrect}
                        onClick={() => radioChange((index + 1).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : null}
                    </span>
                  );
                })}
              {cardData.p04.answer1.value === '' &&
                radioData1.map((item, index) => {
                  return (
                    <span key={index}>
                      <Radio
                        gap={0}
                        type={'box'}
                        name={'radio-group'}
                        ariaLabel={item.text}
                        value={false}
                        readOnly={cardData.p04.isSubmitted}
                        isError={cardData.p04.isSubmitted && !cardData.p04.answer1.isCorrect}
                        onClick={() => radioChange((index + 1).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : null}
                    </span>
                  );
                })}
              &nbsp; )
            </Typography>
          </Box>
          <Box hAlign='center' vAlign={'baseline'} marginTop='8px'>
            <Label
              value={'이유'}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            <Typography>
              어림셈을 하면 마을 사람들이 이틀 동안 기부한 쌀<br /> 봉투가 1000 개 보다(&nbsp;
              {cardData.p04.answer2.value !== '' &&
                radioData2.map((item, index) => {
                  return (
                    <span key={index}>
                      <Radio
                        gap={0}
                        type={'box'}
                        name={'radio-group2'}
                        ariaLabel={item.text}
                        key={index}
                        value={cardData.p04.answer2.value === (index + 3).toString()}
                        readOnly={cardData.p04.isSubmitted}
                        isError={cardData.p04.isSubmitted && !cardData.p04.answer2.isCorrect}
                        onClick={() => radioChange((index + 3).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : null}
                    </span>
                  );
                })}
              {cardData.p04.answer2.value === '' &&
                radioData2.map((item, index) => {
                  return (
                    <span key={index}>
                      <Radio
                        gap={0}
                        type={'box'}
                        name={'radio-group2'}
                        ariaLabel={item.text}
                        key={index}
                        value={false}
                        readOnly={cardData.p04.isSubmitted}
                        isError={cardData.p04.isSubmitted && !cardData.p04.answer2.isCorrect}
                        onClick={() => radioChange((index + 3).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : null}
                    </span>
                  );
                })}
              &nbsp; )
              <Typography>때문입니다.</Typography>
            </Typography>
          </Box>
        </Box>
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
        <AnswerSheet04 />
      </BottomSheet>
    </Container>
  );
};

export default P04;
