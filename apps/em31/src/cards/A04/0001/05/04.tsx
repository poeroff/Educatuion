import { Container } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  Dialog,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  Scroll,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A04000105_store } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
//맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 import 경로 수정
//import CEM310100111101 from '../../C04/0001/12/01';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A04000105_store);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  const pageKey = 'P04';

  const thColArr = ['1', '2', '4', '8'];
  const thRowArr = ['3', '5', '6'];
  const thColArr2 = ['0', '5', '7', '9'];
  const thRowArr2 = ['2', '5', '8'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        곱셈표를 완성해 보세요.
      </>
    ),
    mark: cardData.P04.isSubmitted ? (cardData.P04.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
          ],
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
          ],
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P04: {
            ...prev.P04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P04.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newAnswers = cardData.P04.answer1.map(row => [...row]);
    newAnswers[rowIndex][colIndex] = value;
    setCardData(prevData => ({
      ...prevData,
      P04: {
        ...prevData.P04,
        answer1: newAnswers,
      },
    }));
  };

  const handleInputChange2 = (rowIndex: number, colIndex: number, value: string) => {
    const newAnswers = cardData.P04.answer2.map(row => [...row]);
    newAnswers[rowIndex][colIndex] = value;
    setCardData(prevData => ({
      ...prevData,
      P04: {
        ...prevData.P04,
        answer2: newAnswers,
      },
    }));
  };

  const isAnswerCorrect = (answer: string[][], solution: string[][]): boolean => {
    return answer.every((row, rowIndex) => row.every((val, colIndex) => val === solution[rowIndex][colIndex]));
  };

  const isCorrectFinally = (): boolean => {
    const { answer1, answer2, solution1, solution2 } = cardData.P04;
    const isAnswer1Correct = isAnswerCorrect(answer1, solution1);
    const isAnswer2Correct = isAnswerCorrect(answer2, solution2);
    return isAnswer1Correct && isAnswer2Correct;
  };

  const handleSubmit = () => {
    if (!cardData.P04.isSubmitted) {
      const isCorrect = isCorrectFinally();
      setCardData(prev => ({ ...prev, P04: { ...prev.P04, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.P04.answer1,
              isCorrect: isCorrect,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: cardData.P04.answer2,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const getButtonColor = () => {
    if (!cardData?.P04.isSubmitted) {
      return !(cardData.P04.answer1?.every(row => row.every(val => val)) && cardData.P04.answer2?.every(row => row.every(val => val)))
        ? EStyleButtonTypes.SECONDARY
        : EStyleButtonTypes.YELLOW;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const getSubmitLabel = () => (cardData.P04.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const isSubmitDisabled = () =>
    !(cardData.P04.answer1?.every(row => row.every(val => val)) && cardData.P04.answer2?.every(row => row.every(val => val))) &&
    !cardData.P04.isSubmitted;

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.P04.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  useEffect(() => {
    changeData(pageKey, 1, 1, cardData.P04.answer1);
  }, [cardData.P04.answer1]);

  useEffect(() => {
    changeData(pageKey, 1, 2, cardData.P04.answer2);
  }, [cardData.P04.answer2]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
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
      useRound
      vAlign='start'
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      submitLabel={getSubmitLabel()}
      submitDisabled={isSubmitDisabled()}
      {...(!cardData.P04.isCorrect &&
        cardData.P04.isSubmitted && {
          linkLabel: '맞춤 학습하기',
          useLinkLabel: true,
          onLink: () => {
            setIsModalShow(!isModalShow);
          },
        })}
    >
      <Scroll tabIndex={0}>
        <Box marginTop='10px' display='flex' justifyContent='center'>
          <Box width={'50%'}>
            <Table width={110} color={EStyleTableTypes.DEFAULT} sizes={['120px', '120px', '120px', '120px', '120px']} caption=''>
              <TableMathCaption caption='1,2,4,8과 3,5,6의 곱셈' math={['']} />
              <TBody>
                <TR>
                  <TH scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    ×
                  </TH>
                  {thColArr.map((value, index) => (
                    <TH key={index} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                      {value}
                    </TH>
                  ))}
                </TR>
                {thRowArr.map((item, rowIndex) => (
                  <TR key={rowIndex}>
                    <TH scope='row' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                      {item}
                    </TH>
                    {thColArr.map((_, colIndex) => (
                      <TD key={colIndex} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                        <Input
                          type='number'
                          width='74px'
                          value={cardData.P04.answer1[rowIndex][colIndex]}
                          onChange={event => handleInputChange(rowIndex, colIndex, event.target.value)}
                          ariaLabel={item + '×' + thColArr[colIndex] + '의 값'}
                          status={handleInputStatus(cardData.P04.answer1[rowIndex][colIndex], cardData.P04.solution1[rowIndex][colIndex])}
                          readOnly={cardData.P04.isSubmitted}
                        />
                      </TD>
                    ))}
                  </TR>
                ))}
              </TBody>
            </Table>
          </Box>

          <Box type='hidden' id='img_desc'>
            <p>표가 2개 있습니다.</p>
            <p>왼쪽 표의 행(세로)에는 순서대로 3,5,6이 적혀있고 열(가로)에는 순서대로 1,2,4,8이 적혀있습니다.</p>
            <p>오른쪽 표의 행(세로)에는 순서대로 2,5,8이 적혀있고 열(가로)에는 순서대로 0,5,7,9이 적혀있습니다.</p>
          </Box>

          <Box width={'50%'} marginLeft={'40px'}>
            <Table width={110} color={EStyleTableTypes.DEFAULT} sizes={['120px', '120px', '120px', '120px', '120px']} caption=''>
              <TableMathCaption caption='0,5,7,9와 2,5,8의 곱셈' math={['']} />
              <TBody>
                <TR>
                  <TH scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    ×
                  </TH>
                  {thColArr2.map((value, index) => (
                    <TH key={index} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                      {value}
                    </TH>
                  ))}
                </TR>
                {thRowArr2.map((item, rowIndex) => (
                  <TR key={rowIndex}>
                    <TH scope='row' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                      {item}
                    </TH>
                    {thColArr2.map((_, colIndex) => (
                      <TD key={colIndex} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                        <Input
                          type='number'
                          width='74px'
                          value={cardData.P04.answer2[rowIndex][colIndex]}
                          onChange={event => handleInputChange2(rowIndex, colIndex, event.target.value)}
                          ariaLabel={item + '×' + thColArr[colIndex] + '의 값'}
                          status={handleInputStatus(cardData.P04.answer2[rowIndex][colIndex], cardData.P04.solution2[rowIndex][colIndex])}
                          readOnly={cardData.P04.isSubmitted}
                        />
                      </TD>
                    ))}
                  </TR>
                ))}
              </TBody>
            </Table>
          </Box>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isAnswerOpen} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>
              <p>3 6 12 24</p>
              <p>5 10 20 40</p>
              <p>6 12 24 48</p>
              <br />
              <p>0 10 14 18</p>
              <p>0 25 35 45</p>
              <p>0 40 56 72</p>
            </Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>곱셈구구를 풀이하여 빈칸을 채웁니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isModalShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setIsModalShow(false);
        }}
        onConfirm={() => {
          setIsModalShow(false);
        }}
      >
        {/* 맞춤 학습 콘텐츠 카드 미개발, 추후 개발 후 주석 해제  */}
        {/* C-EM31-04-0001-1201 -> 맞춤 카드*/}
        <>{/* <CEM310400011201 /> */}</>
      </Dialog>
    </Container>
  );
};

export default P04;
