import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { B01001140 } from './store';
import usePageData from '@/hooks/usePageData';
import styled from '@emotion/styled';
import ConnectorLine from '@/assets/example/connector_line.svg';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';

const P10 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01001140);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const PAGE_NUMBER = 'P10'

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',

  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p10.isSubmitted ? (cardData.p10.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={10} />
        빈칸에 알맞은 수를 써넣으세요 .
      </>
    ),
  };

  const onGrade = () => {
    if (cardData.p10.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p10.answer1.trim() === cardData.p10.solution1;
   
      const isCorrect = isCorrect1
      setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p10.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p10: {
            ...prev.p10,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p10.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p10: { ...prev.p10, answer1: value } }));
    } 
    changeData(PAGE_NUMBER, 1, subKey, value);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='flex-start'
      useRound
      onSubmit={onGrade}
      submitLabel={cardData.p10.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(cardData.p10.answer1)
      }
      submitBtnColor={
        !(cardData.p10.answer1)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
        <Box display='flex' justifyContent='center'>
            <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
                <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
                    <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
                        542
                    </Box>
                    <Box width='80px' hAlign='center'>
                        <GrayRoundBox>- 281</GrayRoundBox>
                    </Box>
                    <Box>
                        <Input
                        value={cardData.p10.answer1}
                        onChange={event => handleChange(1, event.target.value)}
                        maxLength={3}
                        width='130px'
                        readOnly={cardData.p10.isSubmitted}
                        status={cardData.p10.isSubmitted && cardData.p10.answer1.trim() !== cardData.p10.solution1 ? 'error' : ''}
                        ariaLabel='542-281의 값.'
                        tabIndex={104}
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
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>261</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['542', '-', '281']} />
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
                      <TD>10</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD>4</TD>
                      <TD isMathCheck>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>1</TD>
                      <TD>8</TD>
                      <TD>2</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        1
                      </TD>
                      <TD>
                        6
                      </TD>
                      <TD>
                        2
                      </TD>
                      <TD>
                      </TD>
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


export default P10;