import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Container } from '@maidt-cntn/ui/math';
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
  InputStatus,
} from '@maidt-cntn/ui';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C01000310_Atom } from './store';
const P02 = () => {
  const PAGE_NUMBER = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000310_Atom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />☐ 안에 알맞은 수를 써넣으세요.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p02.answerOne,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: cardData.p02.answerTens,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: cardData.p02.answerHundreds,
          isAnswer: true,
        },
      ],
    },
  ];
  const onCalculate = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answerOne.trim() === cardData.p02.solutionOne;
      const isCorrect2 = cardData.p02.answerTens.trim().toLowerCase() === cardData.p02.solutionTens;
      const isCorrect3 = cardData.p02.answerHundreds.trim() === cardData.p02.solutionHundreds;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answerOne,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answerTens,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answerHundreds,
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
          p02: {
            ...prev.p02,
            answerOne: userSubmissionList[0].inputData[0]?.value || cardData.p02.answerOne,
            answerTens: userSubmissionList[0].inputData[1]?.value || cardData.p02.answerTens,
            answerHundreds: userSubmissionList[0].inputData[2]?.value || cardData.p02.answerHundreds,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { isSubmitted, answerOne, answerTens, answerHundreds } = cardData.p02;

    if (!isSubmitted) {
      return answerOne && answerTens && answerHundreds ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    } else {
      return isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };
  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answerOne: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answerTens: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answerHundreds: value } }));
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answerHundreds && cardData.p02.answerTens && cardData.p02.answerOne) && !cardData.p02.isSubmitted && !isShow}
      submitBtnColor={getButtonColor()}
      // !!!!!!!!!
      // 임시로 채점하기 클릭 시 바텀시트(해설, 답안) 보이도록 했습니다.
      onSubmit={onCalculate}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['☐45', '+', '5☐1']} />
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
                <TD>5</TD>
                <TD>4</TD>
                <TD>
                  <Input
                    value={cardData.p02.answerHundreds}
                    ariaLabel='㉠의 자리의 답'
                    maxLength={1}
                    status={!cardData.p02.isSubmitted ? InputStatus.ENABLE : !cardData.p02.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                    onChange={e => handleChange(3, e.target.value)}
                  />
                </TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>1</TD>
                <TD>
                  <Input
                    value={cardData.p02.answerTens}
                    status={!cardData.p02.isSubmitted ? InputStatus.ENABLE : !cardData.p02.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                    onChange={e => handleChange(2, e.target.value)}
                    ariaLabel='㉡의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>5</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p02.answerOne}
                    status={!cardData.p02.isSubmitted ? InputStatus.ENABLE : !cardData.p02.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
                    onChange={e => handleChange(1, e.target.value)}
                    ariaLabel='㉢의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>1</TD>
                <TD>9</TD>
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
              <Typography>(위에서부터) 3, 7, 6</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='66px'>
              <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['☐45', '+', '5☐1']} />
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
                      <TD>5</TD>
                      <TD>4</TD>
                      <TD>
                        <Input value={'㉠'} onChange={() => {}} ariaLabel='㉠의 자리의 답' maxLength={1} />
                      </TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>1</TD>
                      <TD>
                        <Input value={'㉡'} onChange={() => {}} ariaLabel='㉡의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>5</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'㉢'} onChange={() => {}} ariaLabel='㉢의 자리의 답' maxLength={1} />
                      </TD>
                      <TD>1</TD>
                      <TD>9</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Typography>5+1=㉢, ㉢=6</Typography>
                <Typography>4+㉡=11, ㉡=7</Typography>
                <Typography>1+㉠+5=9, ㉠=3</Typography>
              </Box>
            </BoxWrap>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>받아올림에 주의하여 일의 자리부터 차례로 계산하여 ☐ 안에 알맞은 수를 구해 봐요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P02;
