import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  SvgIcon,
  ESvgType,
  InputStatus,
} from '@maidt-cntn/ui';
import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { C04_0009_30 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import arrow from '@/assets/example/EMA-015-01/arrow.svg';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C04_0009_30);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer6: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
      const isCorrect4 = isAnswer(cardData.p01.answer4, cardData.p01.solution4);
      const isCorrect5 = isAnswer(cardData.p01.answer5, cardData.p01.solution5);
      const isCorrect6 = isAnswer(cardData.p01.answer6, cardData.p01.solution6);

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6;
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
              type: 'TEXT',
              value: cardData.p01.answer4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p01.answer6,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p01.answer6,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
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
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box>
          <Box vAlign='center'>
            <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
            &nbsp;안에 알맞은 수를 써넣으세요.
          </Box>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6
        )
      }
      submitBtnColor={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onGrade}
      vAlign='flex-start'
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' display='flex' flexDirection='column' padding={'20px 44px'} hAlign='center' useRound>
          <Box position='absolute' hAlign='center' top='142px' right='315px'>
            <SvgIcon src={arrow} width='39px' height='20px' />
            <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='48px'>
              7×2
            </Typography>
          </Box>
          <Box position='absolute' hAlign='center' top='195px' right='295px'>
            <SvgIcon src={arrow} width='39px' height='20px' />
            <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='48px'>
              30×2
            </Typography>
          </Box>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['24', '+', '7']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>7</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    tabIndex={105}
                    type='number'
                    width='130px'
                    textAlign='start'
                    value={cardData.p01.answer6}
                    onChange={e => handleInputChangeEvent(6, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='37×2의 일의 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer6
                        : !isAnswer(cardData.p01.answer6, cardData.p01.solution6)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD>
                  <Input
                    tabIndex={106}
                    type='number'
                    width='130px'
                    textAlign='start'
                    value={cardData.p01.answer5}
                    onChange={e => handleInputChangeEvent(5, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='37×2의 십의 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer5
                        : !isAnswer(cardData.p01.answer5, cardData.p01.solution5)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    tabIndex={101}
                    type='number'
                    width='130px'
                    textAlign='start'
                    value={cardData.p01.answer2}
                    onChange={e => handleInputChangeEvent(2, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='7×2의 일의 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer2
                        : !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                  <Input
                    tabIndex={103}
                    type='number'
                    width='130px'
                    textAlign='start'
                    value={cardData.p01.answer4}
                    onChange={e => handleInputChangeEvent(4, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='30×2의 일의 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer4
                        : !isAnswer(cardData.p01.answer4, cardData.p01.solution4)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD>
                  <Input
                    tabIndex={102}
                    type='number'
                    width='130px'
                    textAlign='start'
                    value={cardData.p01.answer1}
                    onChange={e => handleInputChangeEvent(1, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='7×2의 십의 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer1
                        : !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                  <Input
                    tabIndex={104}
                    type='number'
                    width='130px'
                    textAlign='start'
                    value={cardData.p01.answer3}
                    onChange={e => handleInputChangeEvent(3, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='30×2의 십의 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer3
                        : !isAnswer(cardData.p01.answer3, cardData.p01.solution3)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
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
              <Typography>1, 4 / 6, 0 / 7, 4</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>37×2는 7×2와 30×2의 합입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
