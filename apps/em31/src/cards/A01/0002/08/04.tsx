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
  TableCaption,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0002_08 } from './store';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A01_0002_08);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'basic',
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
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 4,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 5,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 6,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 7,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer1: {
          ...cardData.p04.answer1,
          isCorrect: cardData.p04.answer1.value.replace(/\s/gi, '') === '독도야사랑해',
        },
        answer2: {
          ...cardData.p04.answer2,
          isCorrect: cardData.p04.answer2.value === '8',
        },
        answer3: {
          ...cardData.p04.answer3,
          isCorrect: cardData.p04.answer3.value === '4',
        },
        answer4: {
          ...cardData.p04.answer4,
          isCorrect: cardData.p04.answer4.value === '7',
        },
        answer5: {
          ...cardData.p04.answer5,
          isCorrect: cardData.p04.answer5.value === '5',
        },
        answer6: {
          ...cardData.p04.answer6,
          isCorrect: cardData.p04.answer6.value === '2',
        },
        answer7: {
          ...cardData.p04.answer7,
          isCorrect: cardData.p04.answer7.value === '9',
        },
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
            value: cardData.p04.answer1.value,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer2.value,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer3.value,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer4.value,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer5.value,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer6.value,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer7.value,
          },
        ],
      },
    ];
    submitData('P04', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: {
              value: userSubmissionList[0].inputData[0]?.value || '',
              isCorrect: userSubmissionList[0].inputData[0]?.value.replace(/\s/gi, '') === '독도야사랑해',
            },
            answer2: {
              value: userSubmissionList[0].inputData[1]?.value || '',
              isCorrect: userSubmissionList[0].inputData[1]?.value === '8',
            },
            answer3: {
              value: userSubmissionList[0].inputData[2]?.value || '',
              isCorrect: userSubmissionList[0].inputData[2]?.value === '4',
            },
            answer4: {
              value: userSubmissionList[0].inputData[3]?.value || '',
              isCorrect: userSubmissionList[0].inputData[3]?.value === '7',
            },
            answer5: {
              value: userSubmissionList[0].inputData[4]?.value || '',
              isCorrect: userSubmissionList[0].inputData[4]?.value === '5',
            },
            answer6: {
              value: userSubmissionList[0].inputData[5]?.value || '',
              isCorrect: userSubmissionList[0].inputData[5]?.value === '2',
            },
            answer7: {
              value: userSubmissionList[0].inputData[6]?.value || '',
              isCorrect: userSubmissionList[0].inputData[6]?.value === '9',
            },
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: { ...prev.p04.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: { ...prev.p04.answer2, value } } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer3: { ...prev.p04.answer3, value } } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer4: { ...prev.p04.answer4, value } } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer5: { ...prev.p04.answer5, value } } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer6: { ...prev.p04.answer6, value } } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer7: { ...prev.p04.answer7, value } } }));
    }
    changeData('P04', 1, subKey, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={{
        type: 'icon',
        text: (
          <>
            <Label type='icon' size='small' value={3} />
            계산을 하고, 각 자리 수에 알맞은 글자를 찾아 문장을 만들어 보세요.
          </>
        ),
        mark: cardData.p04.isSubmitted
          ? cardData.p04.answer1.isCorrect &&
            cardData.p04.answer2.isCorrect &&
            cardData.p04.answer3.isCorrect &&
            cardData.p04.answer4.isCorrect &&
            cardData.p04.answer5.isCorrect &&
            cardData.p04.answer6.isCorrect &&
            cardData.p04.answer7.isCorrect
            ? 'correct'
            : 'incorrect'
          : 'none',
      }}
      bodyId='targetContainer4'
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !(
          cardData.p04.answer1.value &&
          cardData.p04.answer2.value &&
          cardData.p04.answer3.value &&
          cardData.p04.answer4.value &&
          cardData.p04.answer5.value &&
          cardData.p04.answer6.value &&
          cardData.p04.answer7.value
        )
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onSubmit}
      submitDisabled={
        !(
          cardData.p04.answer1.value &&
          cardData.p04.answer2.value &&
          cardData.p04.answer3.value &&
          cardData.p04.answer4.value &&
          cardData.p04.answer5.value &&
          cardData.p04.answer6.value &&
          cardData.p04.answer7.value
        )
      }
    >
      <BoxWrap flexDirection='column'>
        <Box type='dashed' useRound useFull>
          <Box hAlign='center' flexDirection='row' gap='100px' paddingTop='30px'>
            <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption='세로셈' math={['127', '+', '621']} />
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
                  <TD>2</TD>
                  <TD>1</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>1</TD>
                  <TD>2</TD>
                  <TD>6</TD>
                  <TD>+</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>
                    <Input
                      status={
                        !cardData.p04.answer2.value ? 'default' : cardData.p04.isSubmitted && !cardData.p04.answer2.isCorrect ? 'error' : 'enable'
                      }
                      readOnly={cardData.p04.isSubmitted}
                      value={cardData.p04.answer2.value}
                      onChange={e => handleChange(2, e.target.value)}
                      ariaLabel='첫번째 숫자의 일의 자리의 답'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      status={
                        !cardData.p04.answer3.value ? 'default' : cardData.p04.isSubmitted && !cardData.p04.answer3.isCorrect ? 'error' : 'enable'
                      }
                      readOnly={cardData.p04.isSubmitted}
                      value={cardData.p04.answer3.value}
                      onChange={e => handleChange(3, e.target.value)}
                      ariaLabel='첫번째 숫자의 십의 자리의 답'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      status={
                        !cardData.p04.answer4.value ? 'default' : cardData.p04.isSubmitted && !cardData.p04.answer4.isCorrect ? 'error' : 'enable'
                      }
                      readOnly={cardData.p04.isSubmitted}
                      value={cardData.p04.answer4.value}
                      onChange={e => handleChange(4, e.target.value)}
                      ariaLabel='첫번째 숫자의 백의 자리의 답'
                      maxLength={1}
                    />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
            <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption='세로셈' math={['211', '+', '714']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>일의 자리</TH>
                  <TH scope='col'>십의 자리</TH>
                  <TH scope='col'>연산 기호</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD>1</TD>
                  <TD>1</TD>
                  <TD>2</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>4</TD>
                  <TD>1</TD>
                  <TD>7</TD>
                  <TD>+</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>
                    <Input
                      status={
                        !cardData.p04.answer5.value ? 'default' : cardData.p04.isSubmitted && !cardData.p04.answer5.isCorrect ? 'error' : 'enable'
                      }
                      readOnly={cardData.p04.isSubmitted}
                      value={cardData.p04.answer5.value}
                      onChange={e => handleChange(5, e.target.value)}
                      ariaLabel='두번째 숫자의 일의 자리의 답'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      status={
                        !cardData.p04.answer6.value ? 'default' : cardData.p04.isSubmitted && !cardData.p04.answer6.isCorrect ? 'error' : 'enable'
                      }
                      readOnly={cardData.p04.isSubmitted}
                      value={cardData.p04.answer6.value}
                      onChange={e => handleChange(6, e.target.value)}
                      ariaLabel='두번째 숫자의 십의 자리의 답'
                      maxLength={1}
                    />
                  </TD>
                  <TD>
                    <Input
                      status={
                        !cardData.p04.answer7.value ? 'default' : cardData.p04.isSubmitted && !cardData.p04.answer7.isCorrect ? 'error' : 'enable'
                      }
                      readOnly={cardData.p04.isSubmitted}
                      value={cardData.p04.answer7.value}
                      onChange={e => handleChange(7, e.target.value)}
                      ariaLabel='두번째 숫자의 백의 자리의 답'
                      maxLength={1}
                    />
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
          <Box padding='30px' display='flex' justifyContent='center'>
            <Table color={EStyleTableTypes.DEFAULT} sizes={Array(10).fill('70px')}>
              <TableCaption caption='문장과 숫자 테이블' hidden />
              <THead>
                <TR>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(value => (
                    <TH key={value} scope='col' hAlign='center' color={EStyleTableTypes.GRAY}>
                      {value}
                    </TH>
                  ))}
                </TR>
              </THead>
              <TBody>
                <TR>
                  {['나', '랑', '요', '도', '해', '월', '독', '야', '사', '너'].map(value => (
                    <TD key={value} scope='col' vAlign='middle' hAlign='center' color={EStyleTableTypes.GRAY}>
                      {value}
                    </TD>
                  ))}
                </TR>
              </TBody>
            </Table>
          </Box>
        </Box>
        <Box marginTop={30} paddingBottom={'30px'} display='flex' justifyContent='center'>
          <Box>
            <Tag type={ETagLine.YELLOW} label='문장' />
            <Input
              status={!cardData.p04.answer1.value ? 'default' : cardData.p04.isSubmitted && !cardData.p04.answer1.isCorrect ? 'error' : 'enable'}
              readOnly={cardData.p04.isSubmitted}
              width='200px'
              marginLeft={8}
              value={cardData.p04.answer1.value}
              onChange={e => handleChange(1, e.target.value)}
            />
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId={'targetContainer4'} height={'50%'} show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>748, 925, 독도야 사랑해</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['24', '-', '7']} />
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
                      <TD>2</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>8</TD>
                      <TD>4</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['35', '-', '8']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>1</TD>
                      <TD>7</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>5</TD>
                      <TD>2</TD>
                      <TD>9</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
            <Box marginTop='12px'>
              <Box>
                <Typography>각 자리 수 7, 4, 8, 9, 2, 5에 알맞은 글자를 찾아 문장을 만들면 '독도야 사랑해'입니다.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P04;
