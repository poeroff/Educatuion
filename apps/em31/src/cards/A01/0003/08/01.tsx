import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  TMainHeaderInfoTypes,
  SvgIcon,
  EStyleFontSizes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A01_0003_08 } from './store';
import star from '../../../../assets/icon/header_star.svg';
import { isNumber, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [cardData, setCardData] = useRecoilState(A01_0003_08);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [-1, -1, -1],
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'NUMBER_LIST',
          value: [-1, -1, -1],
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: -1,
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'NUMBER',
          value: -1,
          isAnswer: true,
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const [isShow, setShow] = useState(false);

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
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const setAnswer = (event: React.ChangeEvent<HTMLInputElement>, answerNo: number, answerIdx = -1) => {
    const value = event.target.value === '' ? -1 : Number(event.target.value);

    if (!isNumber(event.target.value) && value !== -1) {
      return;
    }

    let answer: number | number[] = value;
    if (answerNo === 1 || answerNo === 2) {
      setCardData(prev => {
        answer = [...prev.p01[`answer${answerNo}`]];
        answer[answerIdx] = value;
        return { ...prev, p01: { ...prev.p01, [`answer${answerNo}`]: answer } };
      });
    } else if (answerNo === 3 || answerNo === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${answerNo}`]: value } }));
    }
    changeData('P01', 1, answerNo, answer);
  };

  const getValue = (val: number) => {
    return val === -1 ? '' : val.toString();
  };

  const getStatus = (answer: number, solution: number) => {
    return answer === -1 || !isNotEmptyString(answer.toString())
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !isAnswer(answer.toString(), solution.toString())
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswer(JSON.stringify(cardData.p01.answer1), JSON.stringify(cardData.p01.solution1));
    const isCorrect2 = isAnswer(JSON.stringify(cardData.p01.answer2), JSON.stringify(cardData.p01.solution2));
    const isCorrect3 = isAnswer(cardData.p01.answer3.toString(), cardData.p01.solution3.toString());
    const isCorrect4 = isAnswer(cardData.p01.answer4.toString(), cardData.p01.solution4.toString());
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'NUMBER',
            value: cardData.p01.answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'NUMBER',
            value: cardData.p01.answer4,
            isAnswer: true,
            isCorrect: isCorrect4,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const canSubmit = () => {
    return (
      cardData.p01.answer1.every((val: number) => val !== -1) &&
      cardData.p01.answer2.every((val: number) => val !== -1) &&
      cardData.p01.answer3 !== -1 &&
      cardData.p01.answer4 !== -1
    );
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p01.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return !isShow ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      onSubmit={onGrade}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['449', '+', '138']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>9</TD>
                <TD>4</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>3</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={getValue(cardData.p01.answer1[2])}
                    onChange={e => setAnswer(e, 1, 2)}
                    status={getStatus(cardData.p01.answer1[2], cardData.p01.solution1[2])}
                    ariaLabel='일의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    tabIndex={101}
                  />
                </TD>
                <TD>
                  <Input
                    value={getValue(cardData.p01.answer1[1])}
                    onChange={e => setAnswer(e, 1, 1)}
                    status={getStatus(cardData.p01.answer1[1], cardData.p01.solution1[1])}
                    ariaLabel='십의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    tabIndex={102}
                  />
                </TD>
                <TD>
                  <Input
                    value={getValue(cardData.p01.answer1[0])}
                    onChange={e => setAnswer(e, 1, 0)}
                    status={getStatus(cardData.p01.answer1[0], cardData.p01.solution1[0])}
                    ariaLabel='백의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    tabIndex={103}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>527+105=</Typography>
            <Input
              width='130px'
              value={getValue(cardData.p01.answer3)}
              onChange={e => setAnswer(e, 3)}
              status={getStatus(cardData.p01.answer3, cardData.p01.solution3)}
              title='답 입력란'
              readOnly={cardData.p01.isSubmitted}
              tabIndex={104}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['361', '+', '346']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>1</TD>
                <TD>6</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>6</TD>
                <TD>4</TD>
                <TD>3</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={getValue(cardData.p01.answer2[2])}
                    onChange={e => setAnswer(e, 2, 2)}
                    status={getStatus(cardData.p01.answer2[2], cardData.p01.solution2[2])}
                    ariaLabel='일의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    tabIndex={105}
                  />
                </TD>
                <TD>
                  <Input
                    value={getValue(cardData.p01.answer2[1])}
                    onChange={e => setAnswer(e, 2, 1)}
                    status={getStatus(cardData.p01.answer2[1], cardData.p01.solution2[1])}
                    ariaLabel='십의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    tabIndex={106}
                  />
                </TD>
                <TD>
                  <Input
                    value={getValue(cardData.p01.answer2[0])}
                    onChange={e => setAnswer(e, 2, 0)}
                    status={getStatus(cardData.p01.answer2[0], cardData.p01.solution2[0])}
                    ariaLabel='백의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    tabIndex={107}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>474+252=</Typography>
            <Input
              width='130px'
              value={getValue(cardData.p01.answer4)}
              onChange={e => setAnswer(e, 4)}
              status={getStatus(cardData.p01.answer4, cardData.p01.solution4)}
              title='답 입력란'
              readOnly={cardData.p01.isSubmitted}
              tabIndex={108}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>5, 8, 7</Typography>
              <Typography>7, 0, 7</Typography>
              <Typography>632, 726</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['449', '+', '138']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>9</TD>
                      <TD>4</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>3</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>7</TD>
                      <TD>8</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['361', '+', '346']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>1</TD>
                      <TD>6</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>4</TD>
                      <TD>3</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>7</TD>
                      <TD>0</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['527', '+', '105']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>7</TD>
                      <TD>2</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>0</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>3</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['474', '+', '252']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>4</TD>
                      <TD>7</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD>5</TD>
                      <TD>2</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>2</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box position='absolute' top='60px' left='215px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
              <Box position='absolute' top='285px' left='210px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
              <Box position='absolute' top='60px' left='603px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
              <Box position='absolute' top='285px' left='585px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
