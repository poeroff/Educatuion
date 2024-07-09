import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  SvgIcon,
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
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0004_51 } from './store';

import headerIcon from '../../../../assets/icon/m_default_01.svg';

const P01 = () => {
  const { initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_51);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: !cardData.p01.isSubmitted ? 'none' : cardData.p01.isCorrect ? 'correct' : 'incorrect',
    markSize: 'middle',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        빈칸에 두 수의 합을 써넣으세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
      isCorrect: false,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
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

  const submitAnswer = () => {
    const isCorrect = cardData.p01.answer === cardData.p01.solution;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleInputChange = (val: string) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: val } }));
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='flex-start'
      useRound
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!cardData.p01.answer ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!cardData.p01.answer}
      onSubmit={handleSubmit}
    >
      <Box display='flex' hAlign='start' justifyContent='center'>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['224px', '224px']}>
          <TableMathCaption caption='세로셈' math={['586', '+', '947']} hidden />
          <THead>
            <TR>
              {['586', '947'].map((item, idx) => {
                return (
                  <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    {item}
                  </TH>
                );
              })}
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD colSpan={2} hAlign='center' color={EStyleTableTypes.DEFAULT}>
                <Input
                  type='number'
                  width='432px'
                  ariaLabel='답을 입력하세요'
                  maxLength={5}
                  value={cardData.p01.answer}
                  onChange={e => handleInputChange(e.target.value)}
                  status={
                    !cardData.p01.answer
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && !cardData.p01.isCorrect
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  readOnly={cardData.p01.isSubmitted}
                />
              </TD>
            </TR>
          </TBody>
        </Table>
      </Box>

      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId='targetContainer'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>1533</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound>
                <Table color={EStyleTableTypes.MATH} sizes={['20%', '20%', '20%', '20%']}>
                  <TableMathCaption caption='세로셈' math={['685', '+', '947']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>천의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>8</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>4</TD>
                      <TD>9</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>3</TD>
                      <TD>3</TD>
                      <TD>5</TD>
                      <TD>1</TD>
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

export default P01;
