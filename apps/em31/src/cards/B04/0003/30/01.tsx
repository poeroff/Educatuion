import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Table,
  TableMathCaption,
  Tag,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Typography,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import ConnectorLine from '@maidt-cntn/assets/icons/connector_line.svg';
import ConnectorArrow from '@maidt-cntn/assets/icons/connector_arrow.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { B04_0003_30 } from './store';
import usePageData from '@/hooks/usePageData';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B04_0003_30);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isAllCorrect),
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
            answer1:
              { ...prev.p01.answer1, value: userSubmissionList[0]?.inputData[0]?.value, isCorrect: userSubmissionList[0]?.inputData[0]?.isCorrect } ||
              cardData.p01.answer1,
            answer2:
              { ...prev.p01.answer2, value: userSubmissionList[0]?.inputData[1]?.value, isCorrect: userSubmissionList[0]?.inputData[1]?.isCorrect } ||
              cardData.p01.answer2,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: { ...prev.p01.answer2, value } } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p01.answer1.value === cardData.p01.answer1.solution;
    const isCorrect2 = cardData.p01.answer2.value === cardData.p01.answer2.solution;
    const isAllCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer1: {
          ...cardData.p01.answer1,
          isCorrect: isCorrect1,
        },
        answer2: {
          ...cardData.p01.answer2,
          isCorrect: isCorrect2,
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
            value: cardData.p01.answer1.value,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2.value,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const getAllInputFilled = () => {
    return cardData.p01.answer1.value && cardData.p01.answer2.value;
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
      bodyId={'targetContainer_p01'}
      headerInfo={null}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getAllInputFilled() ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!getAllInputFilled()}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      vAlign='flex-start'
      background={'var(--color-white)'}
      useRound
    >
      <BoxWrap display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-green-300)'>
              11
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>×4</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type={'number'}
                width='130px'
                value={cardData.p01.answer1.value}
                onChange={e => handleChange(1, e.target.value.trim())}
                readOnly={cardData.p01.isSubmitted}
                ariaLabel={'11에 4를 곱한 값'}
                maxLength={3}
                status={
                  !isNotEmptyString(cardData.p01.answer1.value)
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>×2</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type={'number'}
                width='130px'
                value={cardData.p01.answer2.value}
                onChange={e => handleChange(2, e.target.value.trim())}
                readOnly={cardData.p01.isSubmitted}
                ariaLabel={'11에 4를 곱한 값에 2를 곱한 값'}
                maxLength={3}
                status={
                  !isNotEmptyString(cardData.p01.answer2.value)
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId={`targetContainer_p01`} height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>44, 88</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <BoxWrap alignItems={'flex-start'}>
            <Box hAlign='center' flexDirection='column' useRound>
              <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                <TableMathCaption caption='세로셈' math={['11', '×', '4']} />
                <THead hidden>
                  <TR>
                    <TH scope='col'>일의 자리</TH>
                    <TH scope='col'>십의 자리</TH>
                    <TH scope='col'>연산 기호</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR>
                    <TD>1</TD>
                    <TD>1</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>4</TD>
                    <TD></TD>
                    <TD>×</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>4</TD>
                    <TD>4</TD>
                    <TD></TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>
            <Box hAlign='center' flexDirection='column' useRound>
              <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                <TableMathCaption caption='세로셈' math={['44', '×', '2']} />
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
                    <TD>8</TD>
                    <TD>8</TD>
                    <TD></TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>
          </BoxWrap>
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

export default P01;
