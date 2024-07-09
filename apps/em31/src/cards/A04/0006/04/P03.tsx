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
import { A04000604_Atom } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import AnswerSheet03 from './AnswerSheet03';

type boxType = 'red' | 'blue';

const P03 = () => {
  const CURRENT_PAGE = 'P03';
  const MAIN_KEY = 3;
  const FIRST_ANSWER = ['1', '2'];
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
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A04000604_Atom);
  const input4Focus = useRef<HTMLInputElement | null>(null);

  const [showDepth, setShowDepth] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '붙임딱지 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label value={'ㄷ'} color='var(--color-white)' background='#969590' />수 모형으로 붙임딱지 수를 알아보세요.
      </>
    ),
  };

  const onBlueClick = () => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isBlueClick: true } }));
  };

  useEffect(() => {
    if (cardData.p03.answer1.value === FIRST_ANSWER[0] && cardData.p03.answer2.value === FIRST_ANSWER[1]) {
      setShowDepth(true);
      setShowAnswer(true);
    }
  }, [cardData.p03.answer1.value, cardData.p03.answer2.value]); // 첫번째 input박스 ( 파란색 클릭 후 )

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
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, [`answer${num}`]: { value: _value } } }));
      changeData(CURRENT_PAGE, MAIN_KEY, num, { value: _value });
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, [`answer${num}`]: { value: '' } } }));
    }
  };

  const isBtnDisabled = () => {
    const answer3 = cardData.p03.answer3.value;
    const answer4 = cardData.p03.answer4.value;
    const answer5 = cardData.p03.answer5.value;
    const allZero = answer3 !== '' && answer4 !== '' && answer5 !== '';
    return allZero || cardData.p03.isSubmitted;
  };

  const onSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const checkAnswerCorrect = useCallback(() => {
    const correct3 = cardData.p03.answer3.value === cardData.p03.solution3;
    const correct4 = cardData.p03.answer4.value === cardData.p03.solution4;
    const correct5 = cardData.p03.answer5.value === cardData.p03.solution5;
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer3: { ...prev.p03.answer3, isCorrect: correct3 },
        answer4: { ...prev.p03.answer4, isCorrect: correct4 },
        answer5: { ...prev.p03.answer5, isCorrect: correct5 },
      },
    }));
    const result = correct3 && correct4 && correct5;
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
            isCorrect: cardData.p03.answer1.value === FIRST_ANSWER[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer2,
            isCorrect: cardData.p03.answer2.value === FIRST_ANSWER[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p03.answer3,
            isCorrect: cardData.p03.answer3.value === cardData.p03.solution3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p03.answer4,
            isCorrect: cardData.p03.answer4.value === cardData.p03.solution4,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p03.answer5,
            isCorrect: cardData.p03.answer5.value === cardData.p03.solution5,
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      p03: { ...prev.p03, isSubmitted: true, isCorrect: correct, inputData: userSubmission[0].inputData as [] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        if (data[0].value !== '' && data[1].value !== '') {
          onBlueClick();
        } else if (data[0] === FIRST_ANSWER[0] && data[1] === FIRST_ANSWER[1]) {
          setShowDepth(true);
          setShowAnswer(true);
        }

        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const inputStatus = (isCorrect: boolean) => {
    return cardData.p03.isSubmitted ? (isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE;
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
      submitLabel={cardData.p03.isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      bodyId={'targetContainer'}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap useFull position='relative' justifyContent='center' boxGap={70} alignItems='flex-start'>
        <Box padding='0 41px'>
          <Image src={'/A04/0006/04/MC31408.png'} alt='한 줄에 10원 동전 3개와 1원 동전 2개씩 6개의 줄이 있습니다.' width='290px' height='198px' />
          <AreaBox style={{ backgroundSize: '100%' }} type='red' top='-6px' left='151px' width='148px' height='210px' isClicked={showDepth}></AreaBox>
          <AreaBox
            type='blue'
            top='-6px'
            left='298px'
            width='98px'
            height='210px'
            onClick={onBlueClick}
            isClicked={cardData.p03.isBlueClick}
            style={{ cursor: 'pointer' }}
          ></AreaBox>
        </Box>
        <Box padding='31px 48px'>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['41', '*', '3']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>2</TD>
                <TD>3</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>6</TD>
                <TD></TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            {showDepth && (
              <TFoot>
                <TR>
                  <TD vAlign='middle' bgColor='var(--color-pink-200)'>
                    0
                  </TD>
                  <TD bgColor='var(--color-pink-200)'>8</TD>
                  <TD bgColor='var(--color-pink-200)'>1</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD hAlign='center'>
                    <Input
                      type='number'
                      value={cardData.p03.answer3.value}
                      status={inputStatus(cardData.p03.answer3.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 3)}
                      ariaLabel='일의 자리 답'
                      tabIndex={210}
                      readOnly={cardData.p03.isSubmitted}
                    />
                  </TD>
                  <TD hAlign='center'>
                    <Input
                      type='number'
                      value={cardData.p03.answer4.value}
                      status={inputStatus(cardData.p03.answer4.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 4)}
                      ariaLabel='십의 자리 답'
                      tabIndex={209}
                      readOnly={cardData.p03.isSubmitted}
                    />
                  </TD>
                  <TD hAlign='center'>
                    <Input
                      type='number'
                      value={cardData.p03.answer5.value}
                      status={inputStatus(cardData.p03.answer5.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 5)}
                      ariaLabel='백의 자리 답'
                      tabIndex={208}
                      readOnly={cardData.p03.isSubmitted}
                    />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            )}
            <TFoot>
              <TR>
                <TD bgColor={cardData.p03.isBlueClick ? 'var(--color-blue-200)' : ''}>
                  {cardData.p03.isBlueClick &&
                    (showAnswer ? (
                      FIRST_ANSWER[1]
                    ) : (
                      <Input
                        type='number'
                        value={cardData.p03.answer2.value}
                        onChange={e => answerInputChange(e.target.value, 2)}
                        ariaLabel='일의 자리 답'
                        tabIndex={111}
                      />
                    ))}
                </TD>
                <TD bgColor={cardData.p03.isBlueClick ? 'var(--color-blue-200)' : ''}>
                  {cardData.p03.isBlueClick &&
                    (showAnswer ? (
                      FIRST_ANSWER[0]
                    ) : (
                      <Input
                        type='number'
                        value={cardData.p03.answer1.value}
                        onChange={e => answerInputChange(e.target.value, 1)}
                        ariaLabel='십의 자리 답'
                        tabIndex={110}
                      />
                    ))}
                </TD>
                <TD width='52px' height='50px'></TD>
                <TD width='52px' height='50px'></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      {cardData.p03.isBlueClick && (
        <Box
          position='absolute'
          width='199px'
          height='109px'
          top='28%'
          left='42.8%'
          background={`url(${blue_arrow}) center no-repeat`}
          hAlign='center'
        >
          <Box backgroundColor='var(--color-white)' hAlign='center'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>2×6</Typography>
          </Box>
        </Box>
      )}
      {showAnswer && (
        <Box position='absolute' width='331px' height='63px' top='45%' left='29.8%' background={`url(${red_arrow}) center no-repeat`} hAlign='center'>
          <Box backgroundColor='var(--color-white)' vAlign='center' width='80px' marginLeft='105px' marginTop='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>30×6</Typography>
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
            12와 180을
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
        <AnswerSheet03 />
      </BottomSheet>
    </Container>
  );
};

export default P03;

const MouseBalloon = styled.span`
  position: absolute;
  left: 60px;
  bottom: 15px;

  display: inline-block;
  background: url(${mouse}) bottom center no-repeat;
  height: 194px;
  width: 147px;
`;

const BearBallon = styled(MouseBalloon)`
  left: 83%;
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
