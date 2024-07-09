import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
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
  Symbol,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0006_40 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C01_0006_40);
  const [radio, setRadio] = useState<number>(parseInt(cardData.p01.answer));
  const { changeData, initData, submitData, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box>
          바르게 계산한 것을 찾아 <Symbol type='correct' /> 표 하세요.
        </Box>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const isAnswerUnfilled = () => {
    if (isNotEmptyString(cardData.p01.answer)) {
      return false;
    } else {
      return true;
    }
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: cardData.p01.answer,
        isCorrect: cardData.p01.answer === cardData.p01.solution,
        isSubmitted: true,
      },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer,
          },
        ],
        isCorrect: cardData.p01.isCorrect,
      },
    ];
    submitData('P01', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value.toString(),
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
        setRadio(parseInt(userSubmissionList[0].inputData[0]?.value));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleClick = (index: number) => {
    if (cardData.p01.isSubmitted) return;
    setRadio(index);
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: index.toString(),
        isCorrect: index.toString() === cardData.p01.solution,
      },
    }));
    changeData('P01', 1, 1, index);
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
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
    >
      <BoxWrap justifyContent='center' alignItems='center'>
        <Box>
          <TextView title={''} height='196px'>
            <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
              <TableMathCaption caption='세로셈' math={['865', '-', '459']} />
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
                  <TD>6</TD>
                  <TD>8</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>9</TD>
                  <TD>5</TD>
                  <TD>4</TD>
                  <TD>-</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>6</TD>
                  <TD>0</TD>
                  <TD>4</TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </TextView>
          <Box justifyContent='center' vAlign='center' alignItems='center'>
            <Typography>(</Typography>
            <CircleCheck type='button' onClick={() => handleClick(0)}>
              {0 === radio && <Symbol type='correct' />}
            </CircleCheck>
            <Typography>)</Typography>
          </Box>
        </Box>

        <Box>
          <TextView title={''} height='196px'>
            <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
              <TableMathCaption caption='세로셈' math={['865', '-', '459']} />
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
                  <TD>6</TD>
                  <TD>8</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>9</TD>
                  <TD>5</TD>
                  <TD>4</TD>
                  <TD>-</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>6</TD>
                  <TD>1</TD>
                  <TD>4</TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </TextView>
          <Box justifyContent='center' vAlign='center' alignItems='center'>
            <Typography>(</Typography>
            <CircleCheck type='button' onClick={() => handleClick(1)}>
              {cardData.p01.isSubmitted ? 1 === radio && <Symbol type='correct' /> : 1 === radio && <Symbol type='correct' />}
            </CircleCheck>
            <Typography>)</Typography>
          </Box>
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
            <Box marginTop='12px'>
              <Typography>
                ( <Symbol type='correct' /> )
              </Typography>
              <Typography>( &nbsp;&nbsp; &nbsp; )</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
              <TableMathCaption caption='세로셈' math={['517', '-', '384']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>일의 자리</TH>
                  <TH scope='col'>십의 자리</TH>
                  <TH scope='col'>연산 기호</TH>
                </TR>
              </THead>
              <TBody>
                <TR isMathSolution>
                  <TD>10</TD>
                  <TD>5</TD>
                  <TD></TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>5</TD>
                  <TD isMathCheck>6</TD>
                  <TD>8</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>9</TD>
                  <TD>5</TD>
                  <TD>4</TD>
                  <TD>-</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>6</TD>
                  <TD>0</TD>
                  <TD>4</TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default P01;
