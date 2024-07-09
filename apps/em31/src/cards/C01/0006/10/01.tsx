import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow from '@/assets/icon/arrow_right.svg';
import styled from '@emotion/styled';
import isCorrectIcon from '@maidt-cntn/assets/icons/correct.svg';
import inCorrectIcon from '@maidt-cntn/assets/icons/checkSymbol_X.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0006_10 } from './store';
import { ChangeEvent, useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0006_10);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        계산이 잘못된 이유를 쓰고 바르게 계산해 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (index === 0) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: e.target.value } }));
    } else if (index === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: e.target.value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: e.target.value } }));
    }
    changeData('P01', 1, index + 1, e.target.value);
  };

  const handleButton = (index: number) => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: index } }));
      changeData('P01', 1, 4, index);
    }
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
        {
          subKey: 4,
          type: 'NUMBER',
          value: -1,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value >= 0 ? userSubmissionList[0].inputData[3]?.value : cardData.p01.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1 === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2 === cardData.p01.solution2;
      const isCorrect3 = cardData.p01.answer3 === cardData.p01.solution3;
      const isCorrect4 = cardData.p01.answer4 === cardData.p01.solution4;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
            {
              subKey: 4,
              type: 'NUMBER',
              value: cardData.p01.answer4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
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

  const StyleButton = styled.button<{ isClicked: boolean }>`
    position: relative;
    width: 52px;
    height: 40px;
    ${({ isClicked }) =>
      isClicked &&
      `
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 84px;
        height: 84px;
        top: -16px;
        left: -18px;
        background: url(${cardData.p01.isSubmitted && cardData.p01.answer4 !== cardData.p01.solution4 ? inCorrectIcon : isCorrectIcon}) ;
        background-size: contain;
      }
    `}
  `;

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={!cardData.p01.isSubmitted ? '채점하기' : isShow ? '답안 닫기' : '답안 열기'}
      submitBtnColor={
        cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 !== -1
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
      useRound
      submitDisabled={
        !(
          isNotEmptyString(cardData.p01.answer1) &&
          isNotEmptyString(cardData.p01.answer2) &&
          isNotEmptyString(cardData.p01.answer3) &&
          cardData.p01.answer4 !== -1
        )
      }
    >
      <BoxWrap justifyContent='center' alignItems='center'>
        <TextView title={''} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='잘못된 세로셈' math={['517', '-', '384']} />
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
                <TD>7</TD>
                <TD>1</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>8</TD>
                <TD>3</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>3</TD>
                <TD>3</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
        <Box marginTop='15px'>
          <SvgIcon size='44px' src={arrow} title='오른쪽을 가르키는 화살표 아이콘' />
        </Box>
        <TextView title={'바른 계산'} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['517', '+', '384']} />
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
                <TD>7</TD>
                <TD>1</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>8</TD>
                <TD>3</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    readOnly={cardData.p01.isSubmitted}
                    status={
                      cardData.p01.isSubmitted && cardData.p01.answer3 !== cardData.p01.solution3
                        ? InputStatus.ERROR
                        : cardData.p01.answer3
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    maxLength={1}
                    value={cardData.p01.answer3}
                    onChange={e => {
                      handleInput(e, 2);
                    }}
                    ariaLabel='일의 자리 값'
                  />
                </TD>
                <TD>
                  <Input
                    readOnly={cardData.p01.isSubmitted}
                    status={
                      cardData.p01.isSubmitted && cardData.p01.answer2 !== cardData.p01.solution2
                        ? InputStatus.ERROR
                        : cardData.p01.answer2
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    maxLength={1}
                    value={cardData.p01.answer2}
                    onChange={e => {
                      handleInput(e, 1);
                    }}
                    ariaLabel='십의 자리 값'
                  />
                </TD>
                <TD>
                  <Input
                    readOnly={cardData.p01.isSubmitted}
                    status={
                      cardData.p01.isSubmitted && cardData.p01.answer1 !== cardData.p01.solution1
                        ? InputStatus.ERROR
                        : cardData.p01.answer1
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    maxLength={1}
                    value={cardData.p01.answer1}
                    onChange={e => {
                      handleInput(e, 0);
                    }}
                    ariaLabel='백의 자리 값'
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
      </BoxWrap>
      <Box key={'box' + cardData.p01.answer4} type='dashed' padding={'24px 48px'} marginTop={24} vAlign='start' hAlign='center' borderRadius={8}>
        <Box margin='9px 0'>
          <Tag label={'이유'} type={ETagLine.YELLOW} width='90px' height='40px' />
        </Box>
        <Typography>( </Typography>
        <StyleButton
          type='button'
          onClick={() => {
            handleButton(0);
          }}
          isClicked={cardData.p01.answer4 === 0}
        >
          백
        </StyleButton>
        <Typography>, </Typography>
        <StyleButton
          type='button'
          onClick={() => {
            handleButton(1);
          }}
          isClicked={cardData.p01.answer4 === 1}
        >
          십
        </StyleButton>
        <Typography>, </Typography>
        <StyleButton
          type='button'
          onClick={() => {
            handleButton(2);
          }}
          isClicked={cardData.p01.answer4 === 2}
        >
          일
        </StyleButton>
        <Typography> )</Typography>
        <Typography>의 자리에서 받아내림한 수를 빼지 않았습니다.</Typography>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'정답'} />
            </Box>
            <Box marginTop='12px'>
              <Typography>133, 백</Typography>
            </Box>
            <Box marginTop={20}>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
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
                    <TD></TD>
                    <TD>10</TD>
                    <TD>4</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>7</TD>
                    <TD>1</TD>
                    <TD isMathCheck>5</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>4</TD>
                    <TD>8</TD>
                    <TD>3</TD>
                    <TD>-</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>3</TD>
                    <TD>3</TD>
                    <TD>1</TD>
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

export default P01;
