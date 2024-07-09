import arrowRightBlue from '@/assets/icon/arrowRightBlue.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import icCorrect from '@maidt-cntn/assets/icons/correct.svg';
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
  InputStatus,
  Label,
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
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString, getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0004_10 } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_10);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(cardData.p02.isSubmitted);

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
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'NUMBER',
          value: '',
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        잘못 계산한 곳을 찾아 O표 하고 바르게 계산해 보세요.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const isAnswerAllFull = () => {
    if (
      !isNotEmptyString(cardData.p02.answer1) ||
      !isNotEmptyString(cardData.p02.answer2) ||
      !isNotEmptyString(cardData.p02.answer3) ||
      !isNotEmptyString(cardData.p02.answer4) ||
      cardData.p02.answer5 === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const setSubmitBtnColor = () => {
    if (isAnswerAllFull()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (showAnswer) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p02.isSubmitted && showAnswer) {
      return '답안닫기';
    } else if (cardData.p02.isSubmitted && !showAnswer) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = cardData.p02.solution1 === cardData.p02.answer1.trim();
      const isCorrect2 = cardData.p02.solution2 === cardData.p02.answer2.trim();
      const isCorrect3 = cardData.p02.solution3 === cardData.p02.answer3.trim();
      const isCorrect4 = cardData.p02.solution4 === cardData.p02.answer4.trim();
      const isCorrect5 = cardData.p02.solution5 === cardData.p02.answer5;

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.answer4,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'NUMBER',
              value: cardData.p02.answer5,
              isCorrect: isCorrect5,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p02.answer5,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer4: value } }));
    } else if (subKey === 5) {
      if (!cardData.p02.isSubmitted) {
        setIsClicked(!isClicked);
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer5: !isClicked ? parseInt(value) : 0 } }));
      }
    }
    changeData('P02', 1, subKey, value);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerAllFull()}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap justifyContent='center' alignItems='center' paddingTop={20}>
        <TextView title=''>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['998', '+', '323']} />
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
              <TR>
                <TD>8</TD>
                <TD>9</TD>
                <TD>9</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD>2</TD>
                <TD>3</TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <StyleButton type='button' onClick={() => handleChange(5, '1')} isClicked={isClicked && cardData.p02.answer5 === 1}>
                    1
                  </StyleButton>
                </TD>
                <TD>
                  <StyleButton type='button' onClick={() => handleChange(5, '2')} isClicked={isClicked && cardData.p02.answer5 === 2}>
                    2
                  </StyleButton>
                </TD>
                <TD>
                  <StyleButton type='button' onClick={() => handleChange(5, '3')} isClicked={isClicked && cardData.p02.answer5 === 3}>
                    2
                  </StyleButton>
                </TD>
                <TD>
                  <StyleButton type='button' onClick={() => handleChange(5, '4')} isClicked={isClicked && cardData.p02.answer5 === 4}>
                    1
                  </StyleButton>
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
        <Box>
          <SvgIcon size='44px' src={arrowRightBlue} title='오른쪽을 가르키는 화살표 아이콘' />
        </Box>
        <TextView title='바른 계산'>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['998', '+', '323']} />
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
              <TR>
                <TD>8</TD>
                <TD>9</TD>
                <TD>9</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD>2</TD>
                <TD>3</TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p02.answer1}
                    onChange={event => handleChange(1, event.target.value)}
                    ariaLabel='일의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.solution1 === cardData.p02.answer1.trim()
                        ? InputStatus.ENABLE
                        : InputStatus.ERROR
                    }
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer2}
                    onChange={event => handleChange(2, event.target.value)}
                    ariaLabel='십의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.solution2 === cardData.p02.answer2.trim()
                        ? InputStatus.ENABLE
                        : InputStatus.ERROR
                    }
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer3}
                    onChange={event => handleChange(3, event.target.value)}
                    ariaLabel='백의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.solution3 === cardData.p02.answer3.trim()
                        ? InputStatus.ENABLE
                        : InputStatus.ERROR
                    }
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer4}
                    onChange={event => handleChange(4, event.target.value)}
                    ariaLabel='천의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.solution4 === cardData.p02.answer4.trim()
                        ? InputStatus.ENABLE
                        : InputStatus.ERROR
                    }
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <BoxWrap>
              <Box height={'170px'}>
                <TextView title=''>
                  <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                    <TableMathCaption caption='세로셈' math={['998', '+', '323']} />
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
                      <TR>
                        <TD>8</TD>
                        <TD>9</TD>
                        <TD>9</TD>
                        <TD></TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>3</TD>
                        <TD>2</TD>
                        <TD>3</TD>
                        <TD></TD>
                        <TD>+</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>1</TD>
                        <TD>2</TD>
                        <TD>
                          <StyleButton isClicked={true}>2</StyleButton>
                        </TD>
                        <TD>1</TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </Table>
                </TextView>
              </Box>
              <Box display='flex' textAlign='center' padding='76px 0'>
                <Typography>, 1321</Typography>
              </Box>
            </BoxWrap>
          </Box>

          <Box marginTop={'20px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Box display='flex'>
              <TextView title=''>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['998', '+', '323']} />
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
                    <TR>
                      <TD></TD>
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>9</TD>
                      <TD>9</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD>2</TD>
                      <TD>3</TD>
                      <TD></TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD>3</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </TextView>
            </Box>
            <Typography size={EStyleFontSizes.MEDIUM}>십의 자리 계산에서 1+9+2=12이므로 백의 자리 계산에 1을 더해야 합니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

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
        background: url(${icCorrect}) ;
        background-size: contain;
      }
    `}
`;
