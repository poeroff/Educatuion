import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, EStyleButtonTypes, IQuestionProps, Label, Radio, TMainHeaderInfoTypes, Typography, Tag, ETagLine, } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { C01000810_Atom } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const CURRENT_PAGE = 'P03';
  const MAIN_KEY = 1;
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C01000810_Atom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
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
          p03: {
            ...prev.p03,
            answer1: {
              ...prev.p03.answer1,
              value: data[0].value.value || cardData.p03.answer1.value,
              isCorrect: data[0].value.value === '1' ? true : false,
            },
            answer2: {
              ...prev.p03.answer2,
              value: data[1].value.value || cardData.p03.answer2.value,
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
    const allZero = cardData.p03.answer1.value !== '' && cardData.p03.answer2.value !== '';
    return allZero || cardData.p03.isSubmitted;
  };

  const checkAnswerCorrect = useCallback(() => {
    const correct1Trim = cardData.p03.answer1.value.trim();
    const correct1 = correct1Trim === '1';
    const correct2Trim = cardData.p03.answer2.value.trim();
    const correct2 = correct2Trim === '3';
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer1: { ...prev.p03.answer1, isCorrect: correct1 },
        answer2: { ...prev.p03.answer2, isCorrect: correct2 },
      },
    }));
    const result = correct1 && correct2;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isCorrect: result } }));
    return result;
  }, [cardData.p03]);

  const submitAnswer = () => {
    const correct = checkAnswerCorrect();
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: MAIN_KEY,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1,
            isCorrect: cardData.p03.answer1.value.trim() === '1',
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer2,
            isCorrect: cardData.p03.answer2.value.trim() === '3',
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p03: { ...prev.p03, isSubmitted: true, isCorrect: correct, inputData: [...(userSubmission[0].inputData as [])] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const radioChange = (value: string) => {
    if (value === '1' || value === '2') {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          answer1: {
            ...prev.p03.answer1,
            value: value,
          },
        },
      }));
      changeData(CURRENT_PAGE, MAIN_KEY, 1, { value: value });
    } else if (value === '3' || value === '4') {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          answer2: {
            ...prev.p03.answer2,
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
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
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
      submitLabel={cardData.p03.isSubmitted ? (isShowBottom ? '답안닫기' : '답안보기') : '채점하기'}
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
              {cardData.p03.answer1.value !== '' &&
                radioData1.map((item, index) => {
                  return (
                    <span key={index}>
                      <Radio
                        gap={0}
                        type={'box'}
                        name={'radio-group'}
                        ariaLabel={item.text}
                        value={cardData.p03.answer1.value === (index + 1).toString()}
                        readOnly={cardData.p03.isSubmitted}
                        isError={cardData.p03.isSubmitted && !cardData.p03.answer1.isCorrect}
                        onClick={() => radioChange((index + 1).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : ''}
                    </span>
                  );
                })}
              {cardData.p03.answer1.value === '' &&
                radioData1.map((item, index) => {
                  return (
                    <span key={index}>
                      <Radio
                        gap={0}
                        type={'box'}
                        name={'radio-group'}
                        ariaLabel={item.text}
                        value={false}
                        readOnly={cardData.p03.isSubmitted}
                        isError={cardData.p03.isSubmitted && !cardData.p03.answer1.isCorrect}
                        onClick={() => radioChange((index + 1).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : ''}
                    </span>
                  );
                })}
              &nbsp; ).
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
              {cardData.p03.answer2.value !== '' &&
                radioData2.map((item, index) => {
                  return (
                    <span key={index}>
                      <Radio
                        gap={0}
                        type={'box'}
                        name={'radio-group2'}
                        ariaLabel={item.text}
                        key={index}
                        value={cardData.p03.answer2.value === (index + 3).toString()}
                        readOnly={cardData.p03.isSubmitted}
                        isError={cardData.p03.isSubmitted && !cardData.p03.answer2.isCorrect}
                        onClick={() => radioChange((index + 3).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : ''}
                    </span>
                  );
                })}
              {cardData.p03.answer2.value === '' &&
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
                        readOnly={cardData.p03.isSubmitted}
                        isError={cardData.p03.isSubmitted && !cardData.p03.answer2.isCorrect}
                        onClick={() => radioChange((index + 3).toString())}
                      >
                        {item.text}
                      </Radio>
                      {index === 0 ? <Typography>,</Typography> : ''}
                    </span>
                  );
                })}
              &nbsp; ).
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
        <Box tabIndex={199} background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
      <Box>
        <Tag type={ETagLine.GREEN} label='정답' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>있습니다. 많기 또는 없습니다. 적기</Typography>
        </Box>
      </Box>
      <Box position='relative' marginTop='40px'>
        <Tag type={ETagLine.GREEN} label='풀이' />
        <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
          <Typography>어림셈을 이용하여 문제를 해결합니다.</Typography>
        </Box>
      </Box>
    </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
