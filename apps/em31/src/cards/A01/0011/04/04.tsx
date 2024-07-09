import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A01_0011_04 } from './store';
import arrowRightBlue from '@/assets/icon/arrowRightBlue.svg';

const P04 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01_0011_04);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        잘못 계산한 이유를 쓰고 바르게 계산해보세요.
      </>
    ),
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p04.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p04.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p04.answer5,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const setValue = (event: React.ChangeEvent<HTMLInputElement>, answerNo: number) => {
    if (isNaN(Number(event.target.value))) {
      return;
    }

    setCardData(prev => ({ ...prev, p04: { ...prev.p04, [`answer${answerNo}`]: event.target.value } }));
    changeData('P04', 1, answerNo, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswer(cardData.p04.answer1, cardData.p04.solution1);
    const isCorrect2 = isAnswer(cardData.p04.answer2, cardData.p04.solution2);
    const isCorrect3 = isAnswer(cardData.p04.answer3, cardData.p04.solution3);
    const isCorrect4 = isAnswer(cardData.p04.answer4, cardData.p04.solution4);
    const isCorrect5 = isAnswer(cardData.p04.answer5, cardData.p04.solution5);
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;

    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p04.answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p04.answer4,
            isAnswer: true,
            isCorrect: isCorrect4,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p04.answer5,
            isAnswer: true,
            isCorrect: isCorrect5,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P04', userSubmission, isCorrect);
  };

  const getButtonStatus = (answer: string, solution: string) => {
    if (!cardData.p04.isSubmitted) {
      return '';
    }
    return !isAnswer(answer, solution) ? 'error' : 'enable';
  };

  const canSubmit = () => {
    return (
      isNotEmptyString(cardData.p04.answer1) &&
      isNotEmptyString(cardData.p04.answer2) &&
      isNotEmptyString(cardData.p04.answer3) &&
      isNotEmptyString(cardData.p04.answer4) &&
      isNotEmptyString(cardData.p04.answer5)
    );
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p04.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return !isShow ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      useRound
    >
      <BoxWrap justifyContent='center' alignItems='center'>
        <TextView title={''} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='잘못된 세로셈' math={['529', '+', '248']} />
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
                <TD>2</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>4</TD>
                <TD>2</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>7</TD>
                <TD>6</TD>
                <TD>7</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
        <Box marginTop='15px'>
          <SvgIcon src={arrowRightBlue} alt='오른쪽을 가르키는 화살표 아이콘' size='44px' />
        </Box>
        <TextView title={'바른 계산'} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['529', '+', '248']} />
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
                <TD>2</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>4</TD>
                <TD>2</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p04.answer1}
                    status={getButtonStatus(cardData.p04.answer1, cardData.p04.solution1)}
                    onChange={e => setValue(e, 1)}
                    readOnly={cardData.p04.isSubmitted}
                    ariaLabel='일의 자리 값'
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p04.answer2}
                    status={getButtonStatus(cardData.p04.answer2, cardData.p04.solution2)}
                    onChange={e => setValue(e, 2)}
                    readOnly={cardData.p04.isSubmitted}
                    ariaLabel='십의 자리 값'
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p04.answer3}
                    status={getButtonStatus(cardData.p04.answer3, cardData.p04.solution3)}
                    onChange={e => setValue(e, 3)}
                    readOnly={cardData.p04.isSubmitted}
                    ariaLabel='백의 자리 값'
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
      </BoxWrap>
      <Box type='dashed' padding={'24px 48px'} marginTop={24} vAlign='start' hAlign='center' borderRadius={8}>
        <Box margin='9px 0'>
          <Tag label={'이유'} type={ETagLine.YELLOW} width='84px' height='40px' />
        </Box>
        <Typography>
          일의 자리 계산이 9+8={' '}
          <Input
            value={cardData.p04.answer4}
            status={getButtonStatus(cardData.p04.answer4, cardData.p04.solution4)}
            onChange={e => setValue(e, 4)}
            readOnly={cardData.p04.isSubmitted}
            width='130px'
            ariaLabel='9+8의 값'
          />{' '}
          이므로 십의 자리 계산에&nbsp;
          <Input
            value={cardData.p04.answer5}
            status={getButtonStatus(cardData.p04.answer5, cardData.p04.solution5)}
            onChange={e => setValue(e, 5)}
            readOnly={cardData.p04.isSubmitted}
            width='130px'
            ariaLabel='10의 자리의 계산에 더해야할 값'
          />{' '}
          을 더해야 합니다.
        </Typography>
      </Box>

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
              <Typography>7, 7, 7, 17, 1</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' marginLeft='96px' useRound>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['529', '+', '248']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD>2</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>4</TD>
                      <TD>2</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>7</TD>
                      <TD>7</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
