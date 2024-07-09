import {
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Box,
  EStyleTableTypes,
  EStyleButtonTypes,
  Input,
  Tag,
  ETagLine,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  Typography,
  InputStatus,
  EStyleFontSizes,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A01_0004_06 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

type TBgColors = 'red' | 'blue' | 'green';

const P02 = () => {
  const [cardData, setCardData] = useRecoilState(A01_0004_06);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [isShow, setShow] = useState<boolean>(false);
  const answer = ['1', '3', '2', '3'];
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const [bgColors, setBgColors] = useState<TBgColors[]>([]);

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

  useEffect(() => {
    if (cardData.p02.answer[0] === cardData.p02.solution[0]) {
      inputRef1.current?.focus();
      setBgColors(['blue', 'red']);
    }
    if (cardData.p02.answer[1] === cardData.p02.solution[1]) {
      inputRef2.current?.focus();
      setBgColors(['blue', 'red', 'green']);
    }
    if (cardData.p02.answer[2] === cardData.p02.solution[2]) {
      inputRef3.current?.focus();
    }
  }, [cardData.p02.answer]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: <MathExpression equation={'$589+734$ 계산하기'} />,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='var(--color-grey-600)' />
        <MathExpression equation={'$589+734$를 계산하는 방법을 알아보세요.'} />
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
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
      isSubmitted && setBgColors(['blue', 'red', 'green']);
    }
  };

  const handleChange = (index: number, value: string) => {
    const newData = [...cardData.p02.answer];
    newData[index] = value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: newData } }));
    changeData('P02', 1, 1, newData);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer[0] === cardData.p02.solution[0];
      const isCorrect2 = cardData.p02.answer[1] === cardData.p02.solution[1];
      const isCorrect3 = cardData.p02.answer[2] === cardData.p02.solution[2];
      const isCorrect4 = cardData.p02.answer[3] === cardData.p02.solution[3];
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : ' 채점하기'}
      useRound
      vAlign='flex-start'
      submitDisabled={cardData.p02.answer[3] === '' ? true : false}
      submitBtnColor={cardData.p02.answer[3] !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding='20px 44px' useRound>
          <Box hAlign='center' flexDirection='column' useRound useFull>
            {(cardData.p02.answer[1] === cardData.p02.solution[1] || cardData.p02.isSubmitted) && (
              <Box position='absolute' top='5px' left='480px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            )}
            {(cardData.p02.answer[0] === cardData.p02.solution[0] || cardData.p02.isSubmitted) && (
              <Box position='absolute' top='5px' left='533px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            )}
            <Table color={EStyleTableTypes.MATH} bgColors={bgColors} sizes={['20%', '20%', '20%', '20%', '20%']} marginTop={10}>
              <TableMathCaption caption='세로셈' math={['256', '+', '378']} />
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
                  <TD>9</TD>
                  <TD>8</TD>
                  <TD>5</TD>
                  <TD></TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>4</TD>
                  <TD>3</TD>
                  <TD>7</TD>
                  <TD></TD>
                  <TD>+</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>
                    <Input
                      value={cardData.p02.answer[0]}
                      onChange={e => handleChange(0, e.target.value)}
                      ariaLabel='일의 자리, 답'
                      type='number'
                      maxLength={1}
                      readOnly={cardData.p02.answer[0] === cardData.p02.solution[0] || cardData.p02.isSubmitted}
                      onClick={() => {
                        !cardData.p02.answer[1] && cardData.p02.answer[0] !== cardData.p02.solution[0] && setBgColors(['blue']);
                      }}
                      status={
                        !cardData.p02.isSubmitted
                          ? InputStatus.ENABLE
                          : cardData.p02.answer[0] !== cardData.p02.solution[0]
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                      }
                    />
                  </TD>
                  <TD>
                    {(cardData.p02.answer[0] === cardData.p02.solution[0] || cardData.p02.isSubmitted) && (
                      <Input
                        value={cardData.p02.answer[1]}
                        onChange={e => handleChange(1, e.target.value)}
                        ariaLabel='십의 자리, 답'
                        type='number'
                        maxLength={1}
                        readOnly={cardData.p02.answer[1] === cardData.p02.solution[1] || cardData.p02.isSubmitted}
                        inputRef={inputRef1}
                        status={
                          !cardData.p02.isSubmitted
                            ? InputStatus.ENABLE
                            : cardData.p02.answer[1] !== cardData.p02.solution[1]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    )}
                  </TD>
                  <TD>
                    {(cardData.p02.answer[1] === cardData.p02.solution[1] || cardData.p02.isSubmitted) && (
                      <Input
                        value={cardData.p02.answer[2]}
                        onChange={e => handleChange(2, e.target.value)}
                        ariaLabel='백의 자리, 답'
                        type='number'
                        maxLength={1}
                        readOnly={cardData.p02.answer[2] === cardData.p02.solution[2] || cardData.p02.isSubmitted}
                        inputRef={inputRef2}
                        status={
                          !cardData.p02.isSubmitted
                            ? InputStatus.ENABLE
                            : cardData.p02.answer[2] !== cardData.p02.solution[2]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    )}
                  </TD>
                  <TD>
                    {(cardData.p02.answer[2] === cardData.p02.solution[2] || cardData.p02.isSubmitted) && (
                      <Input
                        value={cardData.p02.answer[3]}
                        onChange={e => handleChange(3, e.target.value)}
                        ariaLabel='천의 자리, 답'
                        type='number'
                        maxLength={1}
                        readOnly={cardData.p02.isSubmitted}
                        inputRef={inputRef3}
                        status={
                          !cardData.p02.isSubmitted
                            ? InputStatus.ENABLE
                            : cardData.p02.answer[3] !== cardData.p02.solution[3]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    )}
                  </TD>
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answer.join(', ')}</Box>
          <Box marginTop='30px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px' lineHeight={1.3}>
            <MathExpression equation={'- 일의 자리끼리 더하면 $9+4=13$이므로 일의 자리에 3을 쓰고, 십의 자리에 1을 받아올림합니다.'} />
            <MathExpression
              equation={
                '- 십의 자리끼리 더할 때 일의 자리에서 받아올림한 1도 더하면 $1+8+3=12$이므로 십의 자리에 2를 쓰고, 백의 자리에 1을 받아올림합니다.'
              }
            />
            <MathExpression
              equation={
                '- 백의 자리끼리 더할 때 십의 자리에서 받아올림한 1도 더하면 $1+5+7=13$이므로 백의 자리에 3을 쓰고, 백의 자리에서 받아올림한 1은 천의 자리에 씁니다.'
              }
            />
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
