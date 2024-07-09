import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Image,
  Input,
  Label,
  OverlayTooltip,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  EStyleButtonTypes,
  BottomSheet,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import mouse from '../../../../assets/example/EM-004-03/mouse.svg';
import number from '../../../../assets/example/EM-004-03/number.svg';
import square from '../../../../assets/example/EM-004-03/sqaure.svg';
import { A04_0004_05 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import AnswerSheet01 from './AnswerSheet01';

type boxType = 'red' | 'blue' | 'white';

const P01 = () => {
  const CURRENT_PAGE = 'P01';
  const MAIN_KEY = 1;
  const FIRST_ANSWER = '3';
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
      ],
    },
  ];

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A04_0004_05);
  const input3Focus = useRef<HTMLInputElement | null>(null);

  const [isRedClicked, setIsRedClicked] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);
  const [step, setStep] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
  });

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '41 x 3 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='#969590' />
        41 x 3을 계산하는 방법을 알아보세요.
      </>
    ),
  };

  useEffect(() => {
    if (cardData.p01.answer1.value === FIRST_ANSWER) {
      setStep(prev => ({ ...prev, one: false, two: false, three: true }));
      setShowAnswer(true);
      setIsRedClicked(true);
    }
  }, [cardData.p01.answer1.value]); // 첫번째 input박스 ( 파란색 클릭 후 )

  useEffect(() => {
    if (showAnswer) {
      if (input3Focus && !cardData.p01.isSubmitted) {
        input3Focus.current?.focus();
      }
    }
  }, [showAnswer]);

  const redButtonClickHandler = () => {
    setStep(prev => ({ ...prev, one: false, two: false, three: false, four: true }));
    setIsRedClicked(true);
  };

  const blueButtonClickHandler = () => {
    setStep(prev => ({ ...prev, one: false, two: true, three: false }));
    onBlueClick();
  };

  const onBlueClick = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isBlueClick: true } }));
  };

  const answerInputChange = (value: string, num: number) => {
    if (value.length > 0) {
      const _value = value[value.length - 1];
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${num}`]: { value: _value } } }));
      changeData(CURRENT_PAGE, MAIN_KEY, num, { value: _value });
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${num}`]: { value: '' } } }));
    }
  };

  const isBtnDisabled = () => {
    const answer2 = cardData.p01.answer2.value;
    const answer3 = cardData.p01.answer3.value;
    const allZero = answer2 !== '' && answer3 !== '';
    return allZero || cardData.p01.isSubmitted;
  };

  const onSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const checkAnswerCorrect = useCallback(() => {
    const correct2 = cardData.p01.answer2.value === cardData.p01.solution2;
    const correct3 = cardData.p01.answer3.value === cardData.p01.solution3;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer2: { ...prev.p01.answer2, isCorrect: correct2 },
        answer3: { ...prev.p01.answer3, isCorrect: correct3 },
      },
    }));
    const result = correct2 && correct3;
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
            isCorrect: cardData.p01.answer1.value === FIRST_ANSWER,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
            isCorrect: cardData.p01.answer2.value === cardData.p01.solution2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer3,
            isCorrect: cardData.p01.answer3.value === cardData.p01.solution3,
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p01: { ...prev.p01, isSubmitted: true, isCorrect: correct, inputData: userSubmission[0].inputData as [] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const inputStatus = (isCorrect: boolean) => {
    return cardData.p01.isSubmitted ? (isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE;
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        if (data[0].value.value !== '') {
          onBlueClick();
        } else if (data[0] === FIRST_ANSWER) {
          setIsRedClicked(true);
          setShowAnswer(true);
        }
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: {
              value: data[0].value.value,
              isCorrect: data[0].isCorrect,
            },
            answer2: {
              value: data[1].value.value,
              isCorrect: data[1].isCorrect,
            },
            answer3: {
              value: data[2].value.value,
              isCorrect: data[2].isCorrect,
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitBtnColor={isBtnDisabled() ? (isShowBottom ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isBtnDisabled()}
      submitLabel={cardData.p01.isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      bodyId={'targetContainer'}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap useFull position='relative' justifyContent='center' boxGap={70} alignItems='flex-start'>
        <Box padding='0 58px'>
          {step.one && (
            <>
              <Image
                src={'/A04/0004/05/MC31404.png'}
                alt='한 줄에 10원 동전 4개와 1원 동전 1개씩 3개의 줄이 있습니다.'
                width='237px'
                height='170px'
                style={{ marginTop: '12px' }}
              />
              <AreaBox
                type='white'
                top='1px'
                left='325px'
                width='56px'
                height='191px'
                onClick={blueButtonClickHandler}
                isClicked={cardData.p01.isBlueClick}
                style={{ cursor: 'pointer' }}
              ></AreaBox>
            </>
          )}
          {step.two && (
            <>
              <Image
                src={'/A04/0004/05/MC31405.png'}
                alt='한 줄에 10원 동전 4개와 1원 동전 1개씩 3개의 줄이 있습니다.'
                width='237px'
                height='170px'
                style={{ marginTop: '12px' }}
              />
            </>
          )}
          {step.three && (
            <>
              <Image
                src={'/A04/0004/05/MC31405-2.png'}
                alt='한 줄에 10원 동전 4개와 1원 동전 1개씩 3개의 줄이 있습니다.'
                style={{
                  width: '242px',
                  height: '196px',
                }}
              />
              <AreaBox
                type='white'
                top='39px'
                left='175px'
                width='154px'
                height='154px'
                isClicked={isRedClicked}
                onClick={redButtonClickHandler}
                style={{ cursor: 'pointer' }}
              ></AreaBox>
            </>
          )}
          {step.four && (
            <>
              <Image
                src={'/A04/0004/05/MC31405-4.png'}
                alt='한 줄에 10원 동전 4개와 1원 동전 1개씩 3개의 줄이 있습니다.'
                style={{
                  position: 'absolute',
                  width: '242px',
                  height: '196px',
                  left: '-8px',
                  top: '108px',
                  zIndex: '9',
                }}
              />
              <Image
                src={'/A04/0004/05/MC31405-3.png'}
                alt='한 줄에 100원 동전 1개와 10원 동전 2개, 그리고 1원 동전 3개가 있습니다.'
                style={{
                  position: 'absolute',
                  left: '50px',
                  top: '250px',
                  width: '480px',
                  height: '80px',
                }}
              />
            </>
          )}
        </Box>
        <Box padding='24px 48px' marginLeft={step.four ? '250px' : ''}>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['12', '*', '4']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
                <TH scope='col'></TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD bgColor={cardData.p01.isBlueClick && !isRedClicked ? 'var(--color-blue-200)' : ''}>1</TD>
                <TD bgColor={isRedClicked ? 'var(--color-red-200)' : ''}>4</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD bgColor={cardData.p01.isBlueClick && !isRedClicked ? 'var(--color-blue-200)' : isRedClicked ? 'var(--color-red-200)' : ''}>3</TD>
                <TD></TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>

            <TFoot>
              <TR>
                {cardData.p01.isBlueClick &&
                  (showAnswer ? (
                    <>
                      <TD bgColor='var(--color-blue-200)'>{FIRST_ANSWER}</TD>
                    </>
                  ) : (
                    <>
                      <TD hAlign='center' bgColor={cardData.p01.isBlueClick && !isRedClicked ? 'var(--color-blue-200)' : ''}>
                        <Input
                          type='number'
                          value={cardData.p01.answer1.value}
                          onChange={e => answerInputChange(e.target.value, 1)}
                          ariaLabel='일의 자리 답'
                        />
                      </TD>
                      <TD></TD>
                      <TD></TD>
                    </>
                  ))}
                {isRedClicked ? (
                  <>
                    <TD bgColor={!cardData.p01.isSubmitted ? 'var(--color-red-200)' : ''}>
                      <Input
                        type='number'
                        value={cardData.p01.answer3.value}
                        onChange={e => answerInputChange(e.target.value, 3)}
                        status={inputStatus(cardData.p01.answer3.isCorrect)}
                        ariaLabel='십의 자리 답'
                        tabIndex={205}
                        readOnly={cardData.p01.isSubmitted}
                      />
                    </TD>
                    <TD bgColor={!cardData.p01.isSubmitted ? 'var(--color-red-200)' : ''}>
                      <Input
                        type='number'
                        value={cardData.p01.answer2.value}
                        inputRef={input3Focus}
                        status={inputStatus(cardData.p01.answer2.isCorrect)}
                        onChange={e => answerInputChange(e.target.value, 2)}
                        ariaLabel='백의 자리 답'
                        tabIndex={204}
                        readOnly={cardData.p01.isSubmitted}
                      />
                    </TD>
                    <TD></TD>
                  </>
                ) : (
                  <>
                    <TD></TD>
                  </>
                )}
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      {step.four ? (
        <></>
      ) : (
        <MouseBalloon>
          <OverlayTooltip type='cloud' place='top'>
            <Box vAlign='center'>
              일 모형&nbsp;
              <SvgIcon src={square} size='22px' />
              &nbsp;은&nbsp;
              <SvgIcon src={number} size='22px' />
              &nbsp;으로
            </Box>
            나타낼 수 있어요.
          </OverlayTooltip>
        </MouseBalloon>
      )}
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

const MouseBalloon = styled.span`
  position: absolute;
  left: 60px;
  bottom: 46px;

  display: inline-block;
  background: url(${mouse}) bottom center no-repeat;
  height: 194px;
  width: 147px;
`;

const AreaBox = styled.div<{
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  type?: boxType;
  isClicked?: boolean;
}>`
  position: absolute;
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ top }) => top && `top: ${top};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ isClicked, type }) =>
    isClicked &&
    type === 'red' &&
    `
    border: 3px solid #EBAA9D;
    `}
    ${({ isClicked, type }) =>
    isClicked &&
    type === 'blue' &&
    `
    border: 3px solid #85B2E0;
    `}
`;
