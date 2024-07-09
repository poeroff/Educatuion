import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B01000350 } from './store';
import ConnectorLine from '@maidt-cntn/assets/icons/connector_line.svg';
import ConnectorArrow from '@maidt-cntn/assets/icons/connector_arrow.svg';

const P05 = () => {
  const PAGE_NUMBER = 'P05';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000350);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: cardData.p05.answer,
          isAnswer: true,
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const answerChecker = (answer: string, solution: string) => {
    if (answer.trim().includes(' ')) {
      return false;
    }

    return answer === solution;
  };

  const handleSubmit = () => {
    const { answer, isSubmitted, solution } = cardData.p05;
    if (!isSubmitted) {
      const isCorrect = answerChecker(answer, solution);
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    } else {
      setShow(isShow => !isShow);
    }
  };

  const getButtonColor = () => {
    const { isSubmitted, answer } = cardData.p05;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    } else {
      return isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p05.isSubmitted || !cardData.p05.answer) && !cardData.p05.isSubmitted && !isShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              465
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>+ 293</GrayRoundBox>
            </Box>
            <Box>
              <Input
                width='130px'
                value={cardData.p05.answer}
                onChange={handleAnswerChange}
                readOnly={cardData.p05.isSubmitted}
                ariaLabel='465+293의 값'
                status={cardData.p05.isSubmitted && cardData.p05.answer !== cardData.p05.solution ? 'error' : ''}
              />
            </Box>
          </BoxWrap>
        </Box>
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
            <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
              <Typography>{cardData.p05.solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['61', '-', '29']} />
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
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>6</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD>9</TD>
                      <TD>2</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'8'} ariaLabel='일의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>
                        <Input value={'5'} ariaLabel='십의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>
                        <Input value={'7'} ariaLabel='십의 자리의 답' maxLength={1} />
                      </TD>
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

export default P05;
