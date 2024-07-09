import headerIcon from '@/assets/icon/m_default_01.svg';
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
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMarkType,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import C01000242State from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01000242State);

  const answers = ['549', '827', '친구야 힘내자'];
  const explanation = `각 자리 수 5, 4, 9, 8, 2, 7에 알맞은 글자를 찾아 문장을 만들면 ‘친구야 힘내자’입니다.`;
  const thColArr1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const thColArr2 = ['수', '내', '이', '구', '친', '학', '자', '힘', '야', '요'];

  const [showAnswer, setShowAnswer] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const isAnswer1Correct = useMemo(() => cardData.p01.input1.join('') === answers[0], [cardData.p01.input1]);
  const isAnswer2Correct = useMemo(() => cardData.p01.input2.join('') === answers[1], [cardData.p01.input2]);
  const isAnswer3Correct = useMemo(() => cardData.p01.input3.replace(/\s+/g, '') === answers[2].replace(/\s+/g, ''), [cardData.p01.input3]);
  const isAllCorrect = useMemo(
    () => isAnswer1Correct && isAnswer2Correct && isAnswer3Correct,
    [isAnswer1Correct, isAnswer2Correct, isAnswer3Correct],
  );

  useEffect(() => {
    if (cardData.p01.isSubmitted) {
      setMark(isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p01.isSubmitted, isAllCorrect]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        계산을 하고, 각 자리 수에 알맞은 글자를 찾아 문장을 만들어 보세요.
      </>
    ),
    markSize: 'middle',
    mark,
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', '', ''],
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
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
            input1: userSubmissionList[0].inputData[0]?.value || cardData.p01.input1,
            input2: userSubmissionList[0].inputData[1]?.value || cardData.p01.input2,
            input3: userSubmissionList[0].inputData[2]?.value || cardData.p01.input3,
            isSubmitted,
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

  const isInputComplete = useMemo(() => {
    return cardData.p01.input1.every(value => value !== '') && cardData.p01.input2.every(value => value !== '') && cardData.p01.input3 !== '';
  }, [cardData.p01.input1, cardData.p01.input2, cardData.p01.input3]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, input3: prev.p01.input3.replace(/\s+/g, ''), isSubmitted: true, isCorrect: isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.input1,
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
          {
            subKey: 2,
            type: 'TEXT_LIST',
            value: cardData.p01.input2,
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.input3.replace(/\s+/g, ''),
            isAnswer: true,
            isCorrect: isAnswer3Correct,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleListInputChange = (index: number, subKey: 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = [...cardData.p01[`input${subKey}`]];
    newInput[index] = e.target.value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`input${subKey}`]: newInput } }));
    changeData('P01', 1, subKey, newInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, input3: e.target.value } }));
    changeData('P01', 1, 3, e.target.value);
  };

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.YELLOW;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap justifyContent='center'>
        <Box>
          <Table color={EStyleTableTypes.MATH}>
            <TableMathCaption caption='세로셈' math={['137', '+', '412']} />
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
                <TD>3</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD>1</TD>
                <TD>4</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input1[2]}
                    onChange={e => handleListInputChange(2, 1, e)}
                    status={cardData.p01.isSubmitted && getInputStatus(cardData.p01.input1[2] === answers[0][2], cardData.p01.input1[2])}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input1[1]}
                    onChange={e => handleListInputChange(1, 1, e)}
                    status={cardData.p01.isSubmitted && getInputStatus(cardData.p01.input1[1] === answers[0][1], cardData.p01.input1[1])}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input1[0]}
                    onChange={e => handleListInputChange(0, 1, e)}
                    status={cardData.p01.isSubmitted && getInputStatus(cardData.p01.input1[0] === answers[0][0], cardData.p01.input1[0])}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>

        <Box marginLeft={50}>
          <Table color={EStyleTableTypes.MATH}>
            <TableMathCaption caption='세로셈' math={['502', '+', '325']} />
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
                <TD>2</TD>
                <TD>0</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>5</TD>
                <TD>2</TD>
                <TD>3</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input2[2]}
                    onChange={e => handleListInputChange(2, 2, e)}
                    status={cardData.p01.isSubmitted && getInputStatus(cardData.p01.input2[2] === answers[1][2], cardData.p01.input2[2])}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input2[1]}
                    onChange={e => handleListInputChange(1, 2, e)}
                    status={cardData.p01.isSubmitted && getInputStatus(cardData.p01.input2[1] === answers[1][1], cardData.p01.input2[1])}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input2[0]}
                    onChange={e => handleListInputChange(0, 2, e)}
                    status={cardData.p01.isSubmitted && getInputStatus(cardData.p01.input2[0] === answers[1][0], cardData.p01.input2[0])}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>

      <Box marginTop={30} display='flex' justifyContent='center'>
        <Table color={EStyleTableTypes.DEFAULT} sizes={Array(10).fill('70px')} caption=''>
          <TBody>
            <TR>
              {thColArr1.map((value, index) => (
                <TH key={index} scope='col' hAlign='center' color={EStyleTableTypes.GRAY}>
                  {value}
                </TH>
              ))}
            </TR>
            <TR>
              {thColArr2.map((value, index) => (
                <TD key={index} scope='col' vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {value}
                </TD>
              ))}
            </TR>
          </TBody>
        </Table>
      </Box>
      <Box marginTop={30} display='flex' justifyContent='center'>
        <Box>
          <Tag type={ETagLine.YELLOW} label='문장' />
          <Input
            maxLength={20}
            minWidth='296px'
            marginLeft={12}
            textAlign='center'
            value={cardData.p01.input3}
            onChange={handleInputChange}
            status={cardData.p01.isSubmitted && getInputStatus(isAnswer3Correct, cardData.p01.input3)}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='문장을 적어주세요.'
          />
        </Box>
      </Box>

      <BottomSheet height={'40%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{answers.join(', ')}</Typography>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <BoxWrap marginTop='12px' marginLeft='20px'>
            <Box>
              <Table color={EStyleTableTypes.MATH}>
                <TableMathCaption caption='세로셈' math={['137', '+', '412', '=', '549']} />
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
                    <TD>3</TD>
                    <TD>1</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>2</TD>
                    <TD>1</TD>
                    <TD>4</TD>
                    <TD>+</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>9</TD>
                    <TD>4</TD>
                    <TD>5</TD>
                    <TD></TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>

            <Box marginLeft={50}>
              <Table color={EStyleTableTypes.MATH}>
                <TableMathCaption caption='세로셈' math={['502', '+', '325', '=', '827']} />
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
                    <TD>2</TD>
                    <TD>0</TD>
                    <TD>5</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>5</TD>
                    <TD>2</TD>
                    <TD>3</TD>
                    <TD>+</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>7</TD>
                    <TD>2</TD>
                    <TD>8</TD>
                    <TD></TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>
          </BoxWrap>
          <Box marginTop='10px'>
            <Typography usePre>{explanation}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
