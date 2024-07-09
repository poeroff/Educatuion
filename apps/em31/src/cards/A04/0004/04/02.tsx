import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleFontSizes,
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
  Typography,
  EStyleButtonTypes,
  InputStatus,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import bear from '../../../../assets/example/EM-004-03/bear.svg';
import blue_arrow from '../../../../assets/example/EM-004-03/math_arrow.svg';
import red_arrow from '../../../../assets/example/EM-004-03/math_arrow2.svg';
import mouse from '../../../../assets/example/EM-004-03/mouse.svg';
import number from '../../../../assets/example/EM-004-03/number.svg';
import square from '../../../../assets/example/EM-004-03/sqaure.svg';
import { A04_0004_04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import AnswerSheet02 from './AnswerSheet02';

type boxType = 'red' | 'blue';

const P02 = () => {
  const CURRENT_PAGE = 'P02';
  const MAIN_KEY = 2;
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
        {
          subKey: 6,
          type: 'TEXT',
          value: {
            value: '',
          },
        },
        {
          subKey: 7,
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
  const [cardData, setCardData] = useRecoilState(A04_0004_04);
  const input4Focus = useRef<HTMLInputElement | null>(null);

  const [showDepth, setShowDepth] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '지수가 한 줄넘기 횟수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />수 모형으로 지수가 한 줄넘기 횟수를 알아보세요.
      </>
    ),
  };

  const onBlueClick = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isBlueClick: true } }));
  };

  useEffect(() => {
    if (cardData.p02.answer1.value === FIRST_ANSWER) {
      setShowDepth(true);
      setShowAnswer(true);
    }
  }, [cardData.p02.answer1.value]); // 첫번째 input박스 ( 파란색 클릭 후 )

  useEffect(() => {
    if (showAnswer) {
      if (input4Focus) {
        input4Focus.current?.focus();
      }
    }
  }, [showAnswer]);

  const answerInputChange = (value: string, num: number) => {
    if (value.length > 0) {
      const _value = value[value.length - 1];
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, [`answer${num}`]: { value: _value } } }));
      changeData(CURRENT_PAGE, MAIN_KEY, num, { value: _value });
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, [`answer${num}`]: { value: '' } } }));
    }
  };

  const isBtnDisabled = () => {
    const answer2 = cardData.p02.answer2.value;
    const answer3 = cardData.p02.answer3.value;
    const answer4 = cardData.p02.answer4.value;
    const answer5 = cardData.p02.answer5.value;
    const answer6 = cardData.p02.answer6.value;
    const answer7 = cardData.p02.answer7.value;
    const allZero = answer2 !== '' && answer3 !== '' && answer4 !== '' && answer5 !== '' && answer6 !== '' && answer7 !== '';
    return allZero || cardData.p02.isSubmitted;
  };

  const onSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const checkAnswerCorrect = useCallback(() => {
    const correct2 = cardData.p02.answer2.value === cardData.p02.solution2;
    const correct3 = cardData.p02.answer3.value === cardData.p02.solution3;
    const correct4 = cardData.p02.answer4.value === cardData.p02.solution4;
    const correct5 = cardData.p02.answer5.value === cardData.p02.solution5;
    const correct6 = cardData.p02.answer6.value === cardData.p02.solution6;
    const correct7 = cardData.p02.answer7.value === cardData.p02.solution7;
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer2: { ...prev.p02.answer2, isCorrect: correct2 },
        answer3: { ...prev.p02.answer3, isCorrect: correct3 },
        answer4: { ...prev.p02.answer4, isCorrect: correct4 },
        answer5: { ...prev.p02.answer5, isCorrect: correct5 },
        answer6: { ...prev.p02.answer6, isCorrect: correct6 },
        answer7: { ...prev.p02.answer7, isCorrect: correct7 },
      },
    }));
    const result = correct2 && correct3 && correct4 && correct5 && correct6 && correct7;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isCorrect: result } }));
    return result;
  }, [cardData.p02]);

  const submitAnswer = () => {
    const correct = checkAnswerCorrect();
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: MAIN_KEY,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
            isCorrect: cardData.p02.answer1.value === FIRST_ANSWER,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
            isCorrect: cardData.p02.answer2.value === cardData.p02.solution2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3,
            isCorrect: cardData.p02.answer3.value === cardData.p02.solution3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p02.answer4,
            isCorrect: cardData.p02.answer4.value === cardData.p02.solution4,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p02.answer5,
            isCorrect: cardData.p02.answer5.value === cardData.p02.solution5,
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p02.answer6,
            isCorrect: cardData.p02.answer6.value === cardData.p02.solution6,
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p02.answer7,
            isCorrect: cardData.p02.answer7.value === cardData.p02.solution7,
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, isSubmitted: true, isCorrect: correct, inputData: userSubmission[0].inputData as [] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        if (data[0].value.value !== '') {
          onBlueClick();
        } else if (data[0].value.value === FIRST_ANSWER) {
          setShowAnswer(true);
          setShowDepth(true);
        }

        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
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
            answer4: {
              value: data[3].value.value,
              isCorrect: data[3].isCorrect,
            },
            answer5: {
              value: data[4].value.value,
              isCorrect: data[4].isCorrect,
            },
            answer6: {
              value: data[5].value.value,
              isCorrect: data[5].isCorrect,
            },
            answer7: {
              value: data[6].value.value,
              isCorrect: data[6].isCorrect,
            },
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const inputStatus = (isCorrect: boolean) => {
    return cardData.p02.isSubmitted ? (isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE;
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
      submitLabel={cardData.p02.isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      bodyId={'targetContainer'}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap useFull position='relative' justifyContent='center' boxGap={70} alignItems='flex-start'>
        <Box padding='0 48px'>
          <Image src={'/A04/0004/04/MC31404.png'} alt='한 줄에 10원 동전 4개와 1원 동전 1개씩 3개의 줄이 있습니다.' width='219px' height='190px' />
          <AreaBox type='red' top='-6px' left='175px' width='152px' height='202px' isClicked={showDepth}></AreaBox>
          <AreaBox
            type='blue'
            top='-6px'
            left='327px'
            width='46px'
            height='202px'
            onClick={onBlueClick}
            isClicked={cardData.p02.isBlueClick}
            style={{ cursor: 'pointer' }}
          ></AreaBox>
        </Box>
        <Box padding='24px 48px'>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['41', '*', '3']} />
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
                <TD>1</TD>
                <TD>4</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD></TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            {showDepth && (
              <TFoot>
                <TR>
                  <TD vAlign='middle' bgColor='var(--color-pink-200)'>
                    <Input
                      type='number'
                      value={cardData.p02.answer2.value}
                      status={inputStatus(cardData.p02.answer2.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 2)}
                      ariaLabel='일의 자리 답'
                      tabIndex={205}
                      readOnly={cardData.p02.isSubmitted}
                    />
                  </TD>
                  <TD bgColor='var(--color-pink-200)'>
                    <Input
                      type='number'
                      value={cardData.p02.answer3.value}
                      status={inputStatus(cardData.p02.answer3.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 3)}
                      ariaLabel='십의 자리 답'
                      tabIndex={204}
                      readOnly={cardData.p02.isSubmitted}
                    />
                  </TD>
                  <TD bgColor='var(--color-pink-200)'>
                    <Input
                      type='number'
                      value={cardData.p02.answer4.value}
                      status={inputStatus(cardData.p02.answer4.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 4)}
                      ariaLabel='백의 자리 답'
                      tabIndex={203}
                      readOnly={cardData.p02.isSubmitted}
                      inputRef={input4Focus}
                    />
                  </TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD hAlign='center'>
                    <Input
                      value={cardData.p02.answer5.value}
                      status={inputStatus(cardData.p02.answer5.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 5)}
                      ariaLabel='두번째 일의 자리 답'
                      tabIndex={210}
                      readOnly={cardData.p02.isSubmitted}
                    />
                  </TD>
                  <TD hAlign='center'>
                    <Input
                      type='number'
                      value={cardData.p02.answer6.value}
                      status={inputStatus(cardData.p02.answer6.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 6)}
                      ariaLabel='두번째 십의 자리 답'
                      tabIndex={209}
                      readOnly={cardData.p02.isSubmitted}
                    />
                  </TD>
                  <TD hAlign='center'>
                    <Input
                      type='number'
                      value={cardData.p02.answer7.value}
                      status={inputStatus(cardData.p02.answer7.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 7)}
                      ariaLabel='두번째 백의 자리 답'
                      tabIndex={208}
                      readOnly={cardData.p02.isSubmitted}
                    />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            )}
            <TFoot>
              <TR>
                <TD bgColor={cardData.p02.isBlueClick && showAnswer ? 'var(--color-blue-200)' : ''}>
                  {cardData.p02.isBlueClick &&
                    (showAnswer ? (
                      FIRST_ANSWER
                    ) : (
                      <Input value={cardData.p02.answer1.value} onChange={e => answerInputChange(e.target.value, 1)} ariaLabel='일의 자리 답' />
                    ))}
                </TD>
                <TD width='52px' height='50px'></TD>
                <TD width='52px' height='50px'></TD>
                <TD width='52px' height='50px'></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      {cardData.p02.isBlueClick && (
        <Box position='absolute' width='187px' height='109px' top='26%' left='41%' background={`url(${blue_arrow}) center no-repeat`} hAlign='center'>
          <Box backgroundColor='var(--color-white)' hAlign='center'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>1×3</Typography>
          </Box>
        </Box>
      )}
      {showAnswer && (
        <Box position='absolute' width='331px' height='47px' top='45%' left='27.4%' background={`url(${red_arrow}) center no-repeat`} hAlign='center'>
          <Box backgroundColor='var(--color-white)' vAlign='center' width='80px' marginLeft='105px' marginTop='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>40×3</Typography>
          </Box>
        </Box>
      )}
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

      {showDepth && (
        <BearBallon>
          <OverlayTooltip type='cloud' place='top'>
            3과 120을
            <br />
            더해요.
          </OverlayTooltip>
        </BearBallon>
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
        <AnswerSheet02 />
      </BottomSheet>
    </Container>
  );
};

export default P02;

const MouseBalloon = styled.span`
  position: absolute;
  left: 60px;
  bottom: 46px;

  display: inline-block;
  background: url(${mouse}) bottom center no-repeat;
  height: 194px;
  width: 147px;
`;

const BearBallon = styled(MouseBalloon)`
  left: 80%;
  bottom: 74px;

  height: 205px;
  width: 96px;
  background: url(${bear}) bottom center no-repeat;
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
