import { ChangeEventHandler, useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
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
import styled from '@emotion/styled';
import ConnectorLine from '@/assets/example/connector_line.svg';
import ConnectorArrow from '@/assets/example/connector_arrow.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { C01_0001_21 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0001_21);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isAnswerCorrect = (answer: string, solution: string) => {
    const incorrectPattern = /\d\s+\d/;
    return answer.replace(/\s+/g, '') === solution && !incorrectPattern.test(answer);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect = isAnswerCorrect(cardData.p02.answer, cardData.p02.solution);

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const { userId } = useRecoilValue(studentAtom);
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: event.target.value } }));
    changeData('P02', 1, 1, event.target.value);
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p02.answer}
      submitBtnColor={cardData.p02.answer ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              48
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>+ 35</GrayRoundBox>
            </Box>
            <Box>
              <Input
                textAlign='start'
                width='130px'
                title='답 입력란'
                value={cardData.p02.answer}
                onChange={handleInputOnChange}
                readOnly={cardData.p02.isSubmitted}
                status={!cardData.p02.answer ? 'default' : cardData.p02.isSubmitted && !cardData.p02.isCorrect ? 'error' : 'enable'}
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
              <Typography>83</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['48', '+', '35']} />
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
                      <TD>8</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>3</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>3</TD>
                      <TD>8</TD>
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

export default P02;
