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
import { A04_0005_04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import AnswerSheet03 from './AnswerSheet03';

type boxType = 'red' | 'blue';

const P03 = () => {
  const CURRENT_PAGE = 'P03';
  const MAIN_KEY = 3;
  const FIRST_ANSWER = ['8', '2'];
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
          subKey: 6,
          type: 'TEXT',
          value: {
            value: '',
          },
        },
        {
          subKey: 8,
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
  const [cardData, setCardData] = useRecoilState(A04_0005_04);
  const input4Focus = useRef<HTMLInputElement | null>(null);

  const [showDepth, setShowDepth] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShowBottom, setIsShowBottom] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '줄을 선 사람 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.P03.isSubmitted ? (cardData.P03.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label value={'ㄷ'} type='paint' color='var(--color-white)' background='var(--color-grey-600)' />수 모형으로 줄을 선 사람수를 알아보세요.
      </>
    ),
  };

  // 1 영역 클릭시
  const onBlueClick = () => {
    setCardData(prev => ({ ...prev, P03: { ...prev.P03, isBlueClick: true } }));
  };

  useEffect(() => {
    if (cardData.P03.answer1.value === FIRST_ANSWER[0] && cardData.P03.answer2.value === FIRST_ANSWER[1]) {
      setShowDepth(true);
      setShowAnswer(true);
    }
  }, [cardData.P03.answer1.value, cardData.P03.answer2.value]); // 첫번째 input박스 ( 파란색 클릭 후 )

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
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, [`answer${num}`]: { value: _value } } }));
      changeData(CURRENT_PAGE, MAIN_KEY, num, { value: _value });
    } else {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, [`answer${num}`]: { value: '' } } }));
    }
  };

  const isBtnDisabled = () => {
    const answer2 = cardData.P03.answer2.value;
    const answer3 = cardData.P03.answer3.value;
    const answer4 = cardData.P03.answer4.value;
    const answer5 = cardData.P03.answer5.value;
    const allZero = answer2 !== '' && answer3 !== '' && answer4 !== '' && answer5 !== '' && answer5 !== '';
    return allZero || cardData.P03.isSubmitted;
  };

  const onSubmit = () => {
    if (!cardData.P03.isSubmitted) {
      submitAnswer();
    } else {
      setIsShowBottom(prev => !prev);
    }
  };

  const checkAnswerCorrect = useCallback(() => {
    const correct3 = cardData.P03.answer3.value === cardData.P03.solution3;
    const correct4 = cardData.P03.answer4.value === cardData.P03.solution4;
    const correct5 = cardData.P03.answer5.value === cardData.P03.solution5;
    const correct6 = cardData.P03.answer6.value === cardData.P03.solution6;
    setCardData(prev => ({
      ...prev,
      P03: {
        ...prev.P03,
        answer3: { ...prev.P03.answer3, isCorrect: correct3 },
        answer4: { ...prev.P03.answer4, isCorrect: correct4 },
        answer5: { ...prev.P03.answer5, isCorrect: correct5 },
        answer6: { ...prev.P03.answer6, isCorrect: correct6 },
      },
    }));
    const result = correct3 && correct4 && correct5 && correct6;
    setCardData(prev => ({ ...prev, P03: { ...prev.P03, isCorrect: result } }));
    return result;
  }, [cardData.P03]);

  const submitAnswer = () => {
    const correct = checkAnswerCorrect();
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: MAIN_KEY,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.P03.answer1,
            isCorrect: cardData.P03.answer1.value === FIRST_ANSWER[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.P03.answer2,
            isCorrect: cardData.P03.answer2.value === FIRST_ANSWER[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.P03.answer3,
            isCorrect: cardData.P03.answer3.value === cardData.P03.solution3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.P03.answer4,
            isCorrect: cardData.P03.answer4.value === cardData.P03.solution4,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.P03.answer5,
            isCorrect: cardData.P03.answer5.value === cardData.P03.solution5,
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.P03.answer6,
            isCorrect: cardData.P03.answer6.value === cardData.P03.solution6,
          },
        ],
        isCorrect: correct,
      },
    ];
    setCardData(prev => ({
      ...prev,
      P03: { ...prev.P03, isSubmitted: true, isCorrect: correct, inputData: userSubmission[0].inputData as [] },
    }));
    submitDataWithResult(CURRENT_PAGE, userSubmission, correct);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData;
        if (data[0].value !== '') {
          onBlueClick();
        } else if (data[0] === FIRST_ANSWER) {
          setShowDepth(true);
          setShowAnswer(true);
        }

        setCardData(prev => ({
          ...prev,
          P03: {
            ...prev.P03,
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const inputStatus = (isCorrect: boolean) => {
    return cardData.P03.isSubmitted ? (isCorrect ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.ENABLE;
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
      submitLabel={cardData.P03.isSubmitted ? (isShowBottom ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      bodyId={'targetContainer'}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap useFull position='relative' justifyContent='center' boxGap={70} alignItems='flex-start'>
        <Box padding='0 48px'>
          <Image src={'/A04/0005/04/MC31406.png'} alt='한 줄에 10원 동전 4개와 1원 동전 1개씩 3개의 줄이 있습니다.' width='330px' height='190px' />
          <AreaBox style={{ backgroundSize: '100%' }} type='red' top='-6px' left='152px' width='48px' height='202px' isClicked={showDepth}></AreaBox>
          <AreaBox
            type='blue'
            top='-6px'
            left='200px'
            width='244px'
            height='202px'
            onClick={onBlueClick}
            isClicked={cardData.P03.isBlueClick}
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
                <TD>7</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            {showDepth && (
              <TFoot>
                <TR>
                  <TD vAlign='middle' bgColor={showAnswer ? 'var(--color-pink-200)' : ''}>
                    <Input
                      value={cardData.P03.answer3.value}
                      status={inputStatus(cardData.P03.answer3.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 3)}
                      ariaLabel='일의 자리 답'
                      tabIndex={205}
                      readOnly={cardData.P03.isSubmitted}
                    />
                  </TD>
                  <TD vAlign='middle' bgColor={showAnswer ? 'var(--color-pink-200)' : ''}>
                    <Input
                      value={cardData.P03.answer4.value}
                      status={inputStatus(cardData.P03.answer4.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 4)}
                      ariaLabel='십의 자리 답'
                      tabIndex={204}
                      inputRef={input4Focus}
                      readOnly={cardData.P03.isSubmitted}
                    />
                  </TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD hAlign='center'>
                    <Input
                      value={cardData.P03.answer5.value}
                      status={inputStatus(cardData.P03.answer5.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 5)}
                      ariaLabel='두번째 일의 자리 답'
                      tabIndex={210}
                      readOnly={cardData.P03.isSubmitted}
                    />
                  </TD>
                  <TD hAlign='center'>
                    <Input
                      value={cardData.P03.answer6.value}
                      status={inputStatus(cardData.P03.answer6.isCorrect)}
                      onChange={e => answerInputChange(e.target.value, 6)}
                      ariaLabel='두번째 십의 자리 답'
                      tabIndex={209}
                      readOnly={cardData.P03.isSubmitted}
                    />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            )}
            <TFoot>
              <TR>
                <TD bgColor={cardData.P03.isBlueClick ? 'var(--color-blue-200)' : ''}>
                  {cardData.P03.isBlueClick &&
                    (showAnswer ? (
                      FIRST_ANSWER[0]
                    ) : (
                      <Input
                        type='number'
                        value={cardData.P03.answer1.value}
                        onChange={e => answerInputChange(e.target.value, 1)}
                        ariaLabel='일의 자리 답'
                        tabIndex={111}
                      />
                    ))}
                </TD>
                <TD bgColor={cardData.P03.isBlueClick ? 'var(--color-blue-200)' : ''}>
                  {cardData.P03.isBlueClick &&
                    (showAnswer ? (
                      FIRST_ANSWER[1]
                    ) : (
                      <Input
                        type='number'
                        value={cardData.P03.answer2.value}
                        onChange={e => answerInputChange(e.target.value, 2)}
                        ariaLabel='십의 자리 답'
                        tabIndex={110}
                      />
                    ))}
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      {cardData.P03.isBlueClick && (
        <Box
          position='absolute'
          width='221px'
          height='109px'
          top='26%'
          left='46.8%'
          background={`url(${blue_arrow}) center no-repeat`}
          hAlign='center'
        >
          <Box backgroundColor='var(--color-white)' hAlign='center'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>7×4</Typography>
          </Box>
        </Box>
      )}
      {showAnswer && (
        <Box position='absolute' width='353px' height='47px' top='45%' left='33.4%' background={`url(${red_arrow}) center no-repeat`} hAlign='center'>
          <Box backgroundColor='var(--color-white)' vAlign='center' width='80px' marginLeft='105px' marginTop='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>10×4</Typography>
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
            28과 40을
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
  bottom: 46px;

  display: inline-block;
  background: url(${mouse}) bottom center no-repeat;
  height: 194px;
  width: 147px;
`;

const BearBallon = styled(MouseBalloon)`
  left: 85%;
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
