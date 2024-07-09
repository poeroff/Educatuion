import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  Tag,
  Typography,
  THead,
  TR,
  TH,
  TBody,
  TD,
  TFoot,
  InputStatus,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B04_0006_50 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import ConnectorLine from '../../../../assets/example/connector_line.svg';
import ConnectorArrow from '../../../../assets/example/connector_arrow.svg';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B04_0006_50);

  const { userId } = useRecoilValue(studentAtom);

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: value } }));
    }
    changeData('P06', 1, subKey, value);
  };
  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p06.answer1.trim() === cardData.p06.solution1;
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect1 } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p06.answer1,
            isCorrect: isCorrect1,
          },
        ],
        isCorrect: isCorrect1,
      },
    ];
    submitDataWithResult('P06', userSubmission, isCorrect1);
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P06');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo = null;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: getMarking(cardData.p06.isSubmitted, cardData.p06.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={cardData.p06.isSubmitted ? handleShowAnswer : handleSubmit}
      submitLabel={cardData.p06.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!cardData.p06.answer1}
      submitBtnColor={!cardData.p06.answer1 ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
    >
      <Box hAlign='center' title='82×7를 나타낸 그림입니다.'>
        <Box type='dashed' useRound width='636px' padding='24px 0'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              82
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>× 7</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                width='130px'
                value={cardData.p06.answer1}
                onChange={e => handleChange(1, e.target.value)}
                readOnly={cardData.p06.isSubmitted}
                ariaLabel='82×7의 값'
                status={
                  !isNotEmptyString(cardData.p06.answer1)
                    ? InputStatus.DEFAULT
                    : cardData.p06.isSubmitted && !isAnswer(cardData.p06.answer1, cardData.p06.solution1)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
            </Box>
          </BoxWrap>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={showAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData.p06.solution1}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='가로셈' math={['67', '×', '9']} />
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
                      <TD>2</TD>
                      <TD>8</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD></TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>4</TD>
                      <TD>7</TD>
                      <TD>5</TD>
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

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default P06;