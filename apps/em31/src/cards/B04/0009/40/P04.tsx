import { useCallback, useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  BottomSheet,
  InputStatus,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A04000940_Atom } from './store';
import AnswerSheet04 from './AnswerSheet04';

const P04 = () => {
  const CURRENT_PAGE = 'P04';
  const MAIN_KEY = 4;
  const ANSWER = ['8', '0'];
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
      ],
    },
  ];

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A04000940_Atom);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        계산해 보세요.
      </>
    ),
  };

  const answerInputChange = (value: string, num: number) => {
    if (value.length > 0) {
      const _value = value[value.length - 1];
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, [`answer${num}`]: { value: value[value.length - 1] } } }));
      changeData(CURRENT_PAGE, MAIN_KEY, num, { value: _value });
    } else {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, [`answer${num}`]: { value: '' } } }));
      changeData(CURRENT_PAGE, MAIN_KEY, num, { value: '' });
    }
  };

  const isBtnDisabled = () => {
    const answer1 = cardData.p04.answer1.value;
    const answer2 = cardData.p04.answer2.value;
    const allZero = answer1 !== '' && answer2 !== '';
    return allZero || cardData.p04.isSubmitted;
  };

  const onSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const checkAnswerCorrect = useCallback(() => {
    const correct1 = cardData.p04.answer1.value === ANSWER[0];
    const correct2 = cardData.p04.answer2.value === ANSWER[1];
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
            isCorrect: cardData.p04.answer1.value === ANSWER[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2,
            isCorrect: cardData.p04.answer2.value === ANSWER[1],
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p04: { ...prev.p04, isSubmitted: true, isCorrect: correct, inputData: userSubmission[0].inputData as [] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

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
              value: data[0].value.value,
              isCorrect: data[0].isCorrect,
            },
            answer2: {
              value: data[1].value.value,
              isCorrect: data[1].isCorrect,
            },
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
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

  const inputStatus = (isCorrect: boolean) => {
    return cardData.p04.isSubmitted ? (isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isBtnDisabled()}
      submitLabel={cardData.p04.isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'250px'} justifyContent='center'>
        <Box type='dashed' hAlign='center' flexDirection='column' padding={'20px 44px'} useRound>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['24', '+', '7']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>6</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>5</TD>
                <TD></TD>
                <TD>x</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p04.answer2.value}
                    status={inputStatus(cardData.p04.answer2.isCorrect)}
                    onChange={e => answerInputChange(e.target.value, 2)}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                    tabIndex={105}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p04.answer1.value}
                    status={inputStatus(cardData.p04.answer1.isCorrect)}
                    onChange={e => answerInputChange(e.target.value, 1)}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                    tabIndex={104}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShowBottom}
        bottomSheetTargetId={'targetContainer'}
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
