import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import {
  IQuestionProps,
  Input,
  TD,
  InputStatus,
  EStyleButtonTypes,
  BoxWrap,
  Box,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TFoot,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  TMainHeaderInfoTypes,
  SvgIcon,
  Carousel,
  DotIndicator,
  Dialog,
} from '@maidt-cntn/ui';
import { isNumber, isNotEmptyString, isAnswer, areArraysEqualIgnoringCaseAndWhitespace } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04_0003_08 } from './store';
import { Container } from '@maidt-cntn/ui/math';
import star from '@/assets/icon/header_star.svg';
import P02 from '@/cards/A04/0003/08/02';
import P03 from '@/cards/A04/0003/08/03';
import P04 from '@/cards/A04/0003/08/04';
import P05 from '@/cards/A04/0003/08/05';
import P06 from '@/cards/A04/0003/08/06';
import P07 from '@/cards/A04/0003/08/07';
import Slider from 'react-slick';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04_0003_08);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const valueArray = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [[]];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={star} size='36px' />
        이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [['', ''], ['', ''], [''], ['']],
          isAnswer: true,
        },
      ],
    },
  ];

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (isNumber(value)) {
      const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
      const newData = currentAnswer.map((row, rIndex) => (rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row));
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
      changeData('P01', 1, 1, newData);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(show => !show);
    } else if (cardData.p01.answer.every(subArray => subArray.every(isNotEmptyString))) {
      const isCorrect = cardData.p01.answer.every((subArray, rowIndex) => {
        if (subArray.length !== cardData.p01.solution[rowIndex].length) {
          return false;
        }
        return areArraysEqualIgnoringCaseAndWhitespace(subArray, cardData.p01.solution[rowIndex]);
      });
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onChangeSlide = (idx: number) => {
    const addIndex = !cardData.p01.isCorrect ? 2 : 5;
    saveData(`P0${activeIndex + addIndex}`);
    setActiveIndex(idx);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useLinkLabel={cardData.p01.isSubmitted}
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setShowModal(!showModal);
      }}
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!valueArray.every(subArray => subArray.every(isNotEmptyString))}
      submitBtnColor={
        valueArray.every(subArray => subArray.every(isNotEmptyString))
          ? showAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.GRAY
      }
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['42', '×', '2']} />
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
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.answer[0][1]}
                    onChange={event => handleChange(0, 1, event.target.value)}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[0][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][1], cardData.p01.solution[0][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={101}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.answer[0][0]}
                    onChange={event => handleChange(0, 0, event.target.value)}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[0][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][0], cardData.p01.solution[0][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={102}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='48px'>
            <Typography>34×2=</Typography>
            <Input
              type='number'
              width='130px'
              value={cardData.p01.answer[2][0]}
              onChange={event => handleChange(2, 0, event.target.value)}
              ariaLabel='34×2 값'
              status={
                isNotEmptyString(cardData.p01.answer[2][0])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[2][0], cardData.p01.solution[2][0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p01.isSubmitted ? true : false}
              tabIndex={104}
            />
          </Box>
        </Box>

        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['32', '×', '3']} />
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
              </TR>
              <TR>
                <TD>3</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.answer[1][1]}
                    onChange={event => handleChange(1, 1, event.target.value)}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[1][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][1], cardData.p01.solution[1][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={105}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.answer[1][0]}
                    onChange={event => handleChange(1, 0, event.target.value)}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[1][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][0], cardData.p01.solution[1][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={106}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='48px'>
            <Typography>22×3=</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[3][0]}
              onChange={event => handleChange(3, 0, event.target.value)}
              ariaLabel='22×3의 값'
              status={
                isNotEmptyString(cardData.p01.answer[3][0])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[3][0], cardData.p01.solution[3][0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              tabIndex={108}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={showAnswer}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px' gap={'20px'}>
              {cardData.p01.solution.map((item, index) => (
                <Typography key={index}>
                  {item.join(', ')}
                  {index !== cardData.p01.solution.length - 1 ? ',' : ''}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap flexWrap='wrap'>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['42', '×', '2']} />
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
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>4</TD>
                      <TD>8</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['32', '×', '3']} />
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
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>9</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' marginTop='20px' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['34', '×', '2']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>4</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>8</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' marginTop='20px' marginRight='24px' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['22', '×', '3']} />
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
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={showModal}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setActiveIndex(0);
          setShowModal(false);
        }}
      >
        <Box hAlign='center'>
          <Carousel
            slideWidth={930}
            infinite={false}
            arrowGap={0}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            dots={false}
            controller={({ goto }) => (
              <BoxWrap justifyContent='center' alignItems='center' position='absolute' left={0} right={0} bottom={0}>
                <DotIndicator length={3} activeNumber={activeIndex} onClick={idx => goto(idx)} />
              </BoxWrap>
            )}
          >
            {!cardData.p01.isCorrect
              ? [<P02 key={'P02'} />, <P03 key={'P03'} />, <P04 key={'P04'} />]
              : [<P05 key={'P05'} />, <P06 key={'P06'} />, <P07 key={'P07'} />]}
          </Carousel>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;
