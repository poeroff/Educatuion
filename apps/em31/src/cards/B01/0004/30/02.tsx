import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
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
  TextView,
  EStyleButtonTypes,
  Scroll,
  BottomSheet,
  Tag,
  Typography,
  ETagLine,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import icCorrect from '@maidt-cntn/assets/icons/correct.svg';
import arrowRightBlue from '@/assets/icon/arrowRightBlue.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { B01000430_store } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [isClicked, setClicked] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000430_store);

  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

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

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim() === cardData.p02.solution2;
      const isCorrect3 = cardData.p02.answer3.trim() === cardData.p02.solution3;
      const isCorrect4 = cardData.p02.answer4.trim() === cardData.p02.solution4;
      const isCorrect5 = cardData.p02.answer5 === cardData.p02.solution5;
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
        setClicked(!isClicked);
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        잘못 계산한 곳을 찾아 O표 하고 바르게 계산해 보세요
      </>
    ),
    markSize: 'middle',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3 && cardData.p02.answer4 && cardData.p02.answer5)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3 && cardData.p02.answer4 && cardData.p02.answer5)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <Scroll tabIndex={0}>
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
                    <StyleButton type='button' onClick={() => handleChange(5, '1')} isClicked={cardData.p02.answer5 === 1}>
                      1
                    </StyleButton>
                  </TD>
                  <TD>
                    <StyleButton type='button' onClick={() => handleChange(5, '2')} isClicked={cardData.p02.answer5 === 2}>
                      2
                    </StyleButton>
                  </TD>
                  <TD>
                    <StyleButton type='button' onClick={() => handleChange(5, '3')} isClicked={cardData.p02.answer5 === 3}>
                      2
                    </StyleButton>
                  </TD>
                  <TD>
                    <StyleButton type='button' onClick={() => handleChange(5, '4')} isClicked={cardData.p02.answer5 === 4}>
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
                      tabIndex={104}
                      value={cardData.p02.answer1}
                      onChange={e => handleChange(1, e.target.value)}
                      ariaLabel='일의 자리 답'
                      maxLength={1}
                      readOnly={cardData.p02.isSubmitted}
                      status={
                        !cardData.p02.isSubmitted
                          ? InputStatus.ENABLE
                          : cardData.p02.answer1 !== cardData.p02.solution1
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                      }
                    />
                  </TD>
                  <TD>
                    <Input
                      tabIndex={103}
                      value={cardData.p02.answer2}
                      onChange={e => handleChange(2, e.target.value)}
                      ariaLabel='십의 자리 답'
                      maxLength={1}
                      readOnly={cardData.p02.isSubmitted}
                      status={
                        !cardData.p02.isSubmitted
                          ? InputStatus.ENABLE
                          : cardData.p02.answer2 !== cardData.p02.solution2
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                      }
                    />
                  </TD>
                  <TD>
                    <Input
                      tabIndex={102}
                      value={cardData.p02.answer3}
                      onChange={e => handleChange(3, e.target.value)}
                      ariaLabel='백의 자리 답'
                      maxLength={1}
                      readOnly={cardData.p02.isSubmitted}
                      status={
                        !cardData.p02.isSubmitted
                          ? InputStatus.ENABLE
                          : cardData.p02.answer3 !== cardData.p02.solution3
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                      }
                    />
                  </TD>
                  <TD>
                    <Input
                      tabIndex={101}
                      value={cardData.p02.answer4}
                      onChange={e => handleChange(4, e.target.value)}
                      ariaLabel='천의 자리 답'
                      maxLength={1}
                      readOnly={cardData.p02.isSubmitted}
                      status={
                        !cardData.p02.isSubmitted
                          ? InputStatus.ENABLE
                          : cardData.p02.answer4 !== cardData.p02.solution4
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                      }
                    />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </TextView>
        </BoxWrap>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='42px' display='flex' alignItems='flex-end'>
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
                    <StyleButton type='button' isClicked={true}>
                      2
                    </StyleButton>
                  </TD>
                  <TD>1</TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
            <Typography>, 1321</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px' display='flex' marginBottom='15px'>
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
          </Box>
          <Typography>십의 자리 계산에서 1+9+2=12이므로 백의 자리 계산에 1을 더해야 합니다.</Typography>
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
