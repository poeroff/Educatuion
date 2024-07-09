import {
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Box,
  EStyleTableTypes,
  EStyleButtonTypes,
  Input,
  Tag,
  InputStatus,
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
  EStyleFontSizes,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A01_0004_05 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

type TBgColors = 'red' | 'blue' | 'green';

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(A01_0004_05);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [isShow, setShow] = useState<boolean>(false);
  const answer = ['6', '3', '4'];
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [bgColors, setBgColors] = useState<TBgColors[]>([]);
  const pageKey = 'p01';
  const pageNumber = 'P01';

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (cardData[pageKey].answer[0] === cardData[pageKey].solution[0]) {
      inputRef1.current?.focus();
      setBgColors(['blue', 'red']);
    }
    if (cardData[pageKey].answer[1] === cardData[pageKey].solution[1]) {
      inputRef2.current?.focus();
      setBgColors(['blue', 'red', 'green']);
    }
  }, [cardData[pageKey].answer]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '256+378 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='var(--color-grey-600)' />
        256+378을 계산하는 방법을 알아보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
      isSubmitted && setBgColors(['blue', 'red', 'green']);
    }
  };

  const handleChange = (index: number, value: string) => {
    const newData = [...cardData[pageKey].answer];
    newData[index] = value;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newData } }));
    changeData(pageNumber, 1, 1, newData);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData[pageKey].answer[0] === cardData[pageKey].solution[0];
      const isCorrect2 = cardData[pageKey].answer[1] === cardData[pageKey].solution[1];
      const isCorrect3 = cardData[pageKey].answer[2] === cardData[pageKey].solution[2];
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData[pageKey].answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : ' 채점하기'}
      useRound
      vAlign='flex-start'
      submitDisabled={cardData[pageKey].answer[2] === '' ? true : false}
      submitBtnColor={cardData[pageKey].answer[2] !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding='20px 44px' useRound>
          <Box hAlign='center' flexDirection='column' useRound useFull>
            {(cardData[pageKey].answer[1] === cardData[pageKey].solution[1] || cardData[pageKey].isSubmitted) && (
              <Box position='absolute' top='5px' left='455px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            )}
            {(cardData[pageKey].answer[0] === cardData[pageKey].solution[0] || cardData[pageKey].isSubmitted) && (
              <Box position='absolute' top='5px' left='508px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            )}
            <Table color={EStyleTableTypes.MATH} bgColors={bgColors} sizes={['25%', '25%', '25%', '25%']} marginTop={10}>
              <TableMathCaption caption='세로셈' math={['256', '+', '378']} />
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
                  <TD>6</TD>
                  <TD>5</TD>
                  <TD>2</TD>
                  <TD></TD>
                </TR>
                <TR>
                  <TD>8</TD>
                  <TD>7</TD>
                  <TD>3</TD>
                  <TD>+</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  <TD>
                    <Input
                      value={cardData[pageKey].answer[0]}
                      onChange={e => handleChange(0, e.target.value)}
                      ariaLabel='일의 자리, 답'
                      maxLength={1}
                      type='number'
                      readOnly={cardData[pageKey].answer[0] === cardData[pageKey].solution[0] || cardData[pageKey].isSubmitted}
                      onClick={() => {
                        !cardData[pageKey].answer[1] && cardData[pageKey].answer[0] !== cardData[pageKey].solution[0] && setBgColors(['blue']);
                      }}
                      status={
                        !cardData[pageKey].isSubmitted
                          ? InputStatus.ENABLE
                          : cardData[pageKey].answer[0] !== cardData[pageKey].solution[0]
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                      }
                    />
                  </TD>
                  <TD>
                    {(cardData[pageKey].answer[0] === cardData[pageKey].solution[0] || cardData[pageKey].isSubmitted) && (
                      <Input
                        value={cardData[pageKey].answer[1]}
                        onChange={e => handleChange(1, e.target.value)}
                        ariaLabel='십의 자리, 답'
                        type='number'
                        maxLength={1}
                        readOnly={cardData[pageKey].answer[1] === cardData[pageKey].solution[1] || cardData[pageKey].isSubmitted}
                        inputRef={inputRef1}
                        status={
                          !cardData[pageKey].isSubmitted
                            ? InputStatus.ENABLE
                            : cardData[pageKey].answer[1] !== cardData[pageKey].solution[1]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    )}
                  </TD>
                  <TD>
                    {(cardData[pageKey].answer[1] === cardData[pageKey].solution[1] || cardData[pageKey].isSubmitted) && (
                      <Input
                        value={cardData[pageKey].answer[2]}
                        onChange={e => handleChange(2, e.target.value)}
                        ariaLabel='백의 자리, 답'
                        type='number'
                        maxLength={1}
                        readOnly={cardData[pageKey].isSubmitted}
                        inputRef={inputRef2}
                        status={
                          !cardData[pageKey].isSubmitted
                            ? InputStatus.ENABLE
                            : cardData[pageKey].answer[2] !== cardData[pageKey].solution[2]
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
            <MathExpression equation={'- 일의 자리끼리 더하면 $6+8=14$이므로 일의 자리에 4를 쓰고, 십의 자리에 1을 받아올림합니다.'} />
            <MathExpression
              equation={
                '- 십의 자리끼리 더할 때 일의 자리에서 받아올림한 1도 더하면 $1+5+7=13$이므로 십의 자리에 3을 쓰고, 백의 자리에 1을 받아올림합니다.'
              }
            />
            <MathExpression equation={'- 백의 자리끼리 더할 때 십의 자리에서 받아올림한 1도 더하면 $1+2+3=6$이므로 백의 자리에 6을 씁니다.'} />
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
