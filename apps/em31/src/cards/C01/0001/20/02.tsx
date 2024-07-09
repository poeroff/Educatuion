import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
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
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { ChangeEventHandler, useEffect, useState } from 'react';
import rightArrow from '@maidt-cntn/assets/icons/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C01_0001_20 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0001_20);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const handleChange =
    (subKey: number): ChangeEventHandler<HTMLInputElement> =>
    event => {
      if (isNaN(Number(event.target.value))) {
        return;
      }
      if (subKey === 1) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value: event.target.value } } }));
      } else if (subKey === 2) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value: event.target.value } } }));
      } else if (subKey === 3) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: { ...prev.p02.answer3, value: event.target.value } } }));
      }
      changeData('P02', 1, subKey, event.target.value);
    };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  const handleSubmit = () => {
    const correct1 = cardData.p02.answer1.value.trim() === cardData.p02.answer1.solution;
    const correct2 = cardData.p02.answer2.value.trim() === cardData.p02.answer2.solution;
    const correct3 = cardData.p02.answer3.value.trim() === cardData.p02.answer3.solution;
    const isAllCorrect = correct1 && correct2 && correct3;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: {
          ...cardData.p02.answer1,
          isCorrect: correct1,
        },
        answer2: {
          ...cardData.p02.answer2,
          isCorrect: correct2,
        },
        answer3: {
          ...cardData.p02.answer3,
          isCorrect: correct3,
        },
        isSubmitted: true,
        isAllCorrect: isAllCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1.value,
            isCorrect: correct1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2.value,
            isCorrect: correct2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3.value,
            isCorrect: correct3,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isAllCorrect);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: { ...prev.p02.answer1, value: userSubmissionList[0].inputData[0].value || cardData.p02.answer1.value },
            answer2: { ...prev.p02.answer2, value: userSubmissionList[0].inputData[1].value || cardData.p02.answer2.value },
            answer3: { ...prev.p02.answer3, value: userSubmissionList[0].inputData[2].value || cardData.p02.answer3.value },
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />□ 안에 알맞은 수를 써넣으세요.
      </>
    ),

    mark: cardData.p02.isSubmitted ? (cardData.p02.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p02.answer1.value && cardData.p02.answer2.value && cardData.p02.answer3.value
          ? showAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!(cardData.p02.answer1.value && cardData.p02.answer2.value && cardData.p02.answer3.value)}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['37', '+', '14']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR isMathSolution>
                <TD></TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p02.answer1.value}
                    onChange={handleChange(1)}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='일의자리, 1'
                    status={cardData.p02.isSubmitted && cardData.p02.answer1.solution !== cardData.p02.answer1.value ? 'error' : ''}
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box marginTop={60} hAlign='center'>
          <SvgIcon src={rightArrow} alt='오른쪽을 가르키는 화살표 아이콘' size='44px' />
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['37', '+', '14']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR isMathSolution>
                <TD></TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p02.answer2.value}
                    onChange={handleChange(2)}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='일의자리, 1'
                    status={cardData.p02.isSubmitted && cardData.p02.answer2.solution !== cardData.p02.answer2.value ? 'error' : ''}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer3.value}
                    onChange={handleChange(3)}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='십의자리, 5'
                    status={cardData.p02.isSubmitted && cardData.p02.answer3.solution !== cardData.p02.answer3.value ? 'error' : ''}
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>1, 51</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box hAlign='center' flexDirection='column' useRound useFull>
              <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                <TableMathCaption caption='세로셈' math={['37', '+', '14']} />
                <THead hidden>
                  <TR>
                    <TH scope='col'>일의 자리</TH>
                    <TH scope='col'>십의 자리</TH>
                    <TH scope='col'>연산 기호</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR isMathSolution>
                    <TD></TD>
                    <TD>1</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>7</TD>
                    <TD>3</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>4</TD>
                    <TD>1</TD>
                    <TD>+</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>1</TD>
                    <TD>5</TD>
                    <TD></TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
