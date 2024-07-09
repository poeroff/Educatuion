import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { B01001140 } from './store';
import usePageData from '@/hooks/usePageData';
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

const P06 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01001140);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const PAGE_NUMBER = 'P06';

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
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 3,
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
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        계산해 보세요.
      </>
    ),
  };

  const onGrade = () => {
    if (cardData.p06.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p06.answer1.trim() === cardData.p06.solution1;
      const isCorrect2 = cardData.p06.answer2.trim() === cardData.p06.solution2;
      const isCorrect3 = cardData.p06.answer3.trim() === cardData.p06.solution3;

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p06.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'NUMBER',
              value: cardData.p06.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'NUMBER',
              value: cardData.p06.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
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
          p06: {
            ...prev.p06,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p06.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p06.answer3,
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
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer3: value } }));
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
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p06.answer1 && cardData.p06.answer2 && cardData.p06.answer3)}
      submitBtnColor={
        !(cardData.p06.answer1 && cardData.p06.answer2 && cardData.p06.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <BoxWrap justifyContent='center'>
        <Box type='dashed' hAlign='center' flexDirection='column' padding='24px 20px' useRound>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['672', '-', '194']} />
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
                <TD>2</TD>
                <TD>7</TD>
                <TD>6</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>9</TD>
                <TD>1</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p06.answer3}
                    onChange={event => handleChange(3, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.p06.isSubmitted}
                    status={cardData.p06.isSubmitted && cardData.p06.answer3.trim() !== cardData.p06.solution3 ? 'error' : ''}
                    ariaLabel='일의 자리의 답.'
                    tabIndex={103}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p06.answer2}
                    onChange={event => handleChange(2, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.p06.isSubmitted}
                    status={cardData.p06.isSubmitted && cardData.p06.answer2.trim() !== cardData.p06.solution2 ? 'error' : ''}
                    ariaLabel='십의 자리의 답.'
                    tabIndex={102}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p06.answer1}
                    onChange={event => handleChange(1, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.p06.isSubmitted}
                    status={cardData.p06.isSubmitted && cardData.p06.answer1.trim() !== cardData.p06.solution1 ? 'error' : ''}
                    ariaLabel='백의 자리의 답.'
                    tabIndex={101}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
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
              <Typography>478</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['672', '-', '194']} />
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
                      <TD>10</TD>
                      <TD>16</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD isMathCheck>7</TD>
                      <TD isMathCheck>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>9</TD>
                      <TD>1</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'8'} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'7'} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'4'} onChange={() => {}} ariaLabel='백의 자리의 답' maxLength={1} readOnly />
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

export default P06;
