import styled from '@emotion/styled';
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
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { A05_0008_04 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A05_0008_04);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer6: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect3 = isAnswer(cardData.p02.answer3, cardData.p02.solution3);
      const isCorrect4 = isAnswer(cardData.p02.answer4, cardData.p02.solution3);
      const isCorrect5 = isAnswer(cardData.p02.answer5, cardData.p02.solution2);
      const isCorrect6 = isAnswer(cardData.p02.answer6, cardData.p02.solution1);

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.answer4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p02.answer5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p02.answer6,
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
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p02.answer6,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
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
      saveData('P02');
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '시간의 덧셈하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />
        버스의 도착 예정 시각을 구해 보세요.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p02.answer1 &&
          cardData.p02.answer2 &&
          cardData.p02.answer3 &&
          cardData.p02.answer4 &&
          cardData.p02.answer5 &&
          cardData.p02.answer6
        )
      }
      onSubmit={onGrade}
      submitBtnColor={
        !(
          cardData.p02.answer1 &&
          cardData.p02.answer2 &&
          cardData.p02.answer3 &&
          cardData.p02.answer4 &&
          cardData.p02.answer5 &&
          cardData.p02.answer6
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Typography>8시 5분 10초+2분+20초=</Typography>
        <Input
          type='number'
          width='61px'
          inputSize='small'
          value={cardData.p02.answer1}
          onChange={e => handleInputChangeEvent(1, e.target.value)}
          maxLength={2}
          readOnly={cardData.p02.isSubmitted}
          ariaLabel='시 자리의 답'
          status={
            !cardData.p02.isSubmitted
              ? !cardData.p02.answer1
              : !isAnswer(cardData.p02.answer1, cardData.p02.solution1)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        <InputText>시</InputText>
        <Input
          type='number'
          width='61px'
          inputSize='small'
          value={cardData.p02.answer2}
          onChange={e => handleInputChangeEvent(2, e.target.value)}
          maxLength={2}
          readOnly={cardData.p02.isSubmitted}
          ariaLabel='분 자리의 답'
          status={
            !cardData.p02.isSubmitted
              ? !cardData.p02.answer2
              : !isAnswer(cardData.p02.answer2, cardData.p02.solution2)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        <InputText>분</InputText>
        <Input
          type='number'
          width='98px'
          inputSize='small'
          value={cardData.p02.answer3}
          onChange={e => handleInputChangeEvent(3, e.target.value)}
          maxLength={2}
          readOnly={cardData.p02.isSubmitted}
          ariaLabel='초 자리의 답'
          status={
            !cardData.p02.isSubmitted
              ? !cardData.p02.answer3
              : !isAnswer(cardData.p02.answer3, cardData.p02.solution3)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        <InputText>초</InputText>
      </BoxWrap>
      <BoxWrap height='304px'>
        <Box hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['450px', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto']}>
            <TableMathCaption caption='세로셈' math={['8시 5분 10초', '+', '2분 20초']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>초</TD>
                <TD>10</TD>
                <TD>분</TD>
                <TD>5</TD>
                <TD>시</TD>
                <TD>8</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>초</TD>
                <TD>20</TD>
                <TD>분</TD>
                <TD>2</TD>
                <TD></TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>초</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p02.answer4}
                    onChange={e => handleInputChangeEvent(4, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='초 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? !cardData.p02.answer4
                        : !isAnswer(cardData.p02.answer4, cardData.p02.solution3)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD>분</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p02.answer5}
                    onChange={e => handleInputChangeEvent(5, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='분 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? !cardData.p02.answer5
                        : !isAnswer(cardData.p02.answer5, cardData.p02.solution2)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD>시</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p02.answer6}
                    onChange={e => handleInputChangeEvent(6, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='시 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? !cardData.p02.answer6
                        : !isAnswer(cardData.p02.answer6, cardData.p02.solution1)
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
      </BoxWrap>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>8, 7, 30 / 8, 7, 30</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Table color={EStyleTableTypes.MATH} sizes={['14%', '14%', '14%', '14%', '14%', '14%', '14%']}>
                <TableMathCaption caption='세로셈' math={['8시 5분 10초', '+', '2분 20초']} />
                <THead hidden>
                  <TR>
                    <TH scope='col'>일의 자리</TH>
                    <TH scope='col'>십의 자리</TH>
                    <TH scope='col'>연산 기호</TH>
                    <TH scope='col'>일의 자리</TH>
                    <TH scope='col'>십의 자리</TH>
                    <TH scope='col'>연산 기호</TH>
                    <TH scope='col'>연산 기호</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR>
                    <TD>초</TD>
                    <TD>10</TD>
                    <TD>분</TD>
                    <TD>5</TD>
                    <TD>시</TD>
                    <TD>8</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>초</TD>
                    <TD>20</TD>
                    <TD>분</TD>
                    <TD>2</TD>
                    <TD></TD>
                    <TD></TD>
                    <TD>+</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>초</TD>
                    <TD>30</TD>
                    <TD>분</TD>
                    <TD>7</TD>
                    <TD>시</TD>
                    <TD>8</TD>
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

export default P02;

const InputText = styled(Typography)`
  padding-left: 0px;
`;
