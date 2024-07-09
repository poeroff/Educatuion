import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TMarkType,
  TR,
  Table,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { checkAnswers, getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000104State from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000104State);

  const [showAnswer, setShowAnswer] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const answers = ['4', '12', '20', '28'];
  const thColArr = ['1', '3', '5', '7'];
  const thRowArr = ['4'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark,
  };

  useEffect(() => {
    if (cardData.p02.isSubmitted) {
      setMark(cardData.p02.isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p02.isSubmitted, cardData.p02.isAllCorrect]);

  const isInputComplete = useMemo(() => cardData.p02.inputs.every(Boolean), [cardData.p02.inputs]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...cardData.p02.inputs];
    newInputs[index] = value;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        inputs: newInputs,
      },
    }));
    changeData('P02', 1, index + 1, value);
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
            inputs: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData.p02.inputs,
            isCorrectArr: userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p02.isCorrectArr,
            isAllCorrect: userSubmissionList[0].inputData.every((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p02.isAllCorrect,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const submitAnswer = () => {
    const isCorrectArr = checkAnswers(cardData.p02.inputs, answers);
    const isAllCorrect = isCorrectArr.every(Boolean);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrectArr, isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.inputs[0],
            isAnswer: true,
            isCorrect: isCorrectArr[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.inputs[1],
            isAnswer: true,
            isCorrect: isCorrectArr[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.inputs[2],
            isAnswer: true,
            isCorrect: isCorrectArr[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p02.inputs[3],
            isAnswer: true,
            isCorrect: isCorrectArr[3],
          },
        ],
      },
    ];
    submitDataWithResult('P02', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isInputComplete ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      vAlign='start'
    >
      <Box marginTop='10px' display='flex' justifyContent='center'>
        <Table
          color={EStyleTableTypes.DEFAULT}
          sizes={['120px', '120px', '120px', '120px', '120px']}
          caption='4x1, 4x3, 4x5, 4x7을 표현한 표가 있습니다.'
        >
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
            {thRowArr.map((item, index) => (
              <TR key={index}>
                <TH scope='row' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {item}
                </TH>
                {thColArr.map((_, index) => (
                  <TD key={index} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    <Input
                      type='number'
                      maxLength={4}
                      width='104px'
                      value={cardData.p02.inputs[index]}
                      status={cardData.p02.isSubmitted && getInputStatus(cardData.p02.isCorrectArr[index], cardData.p02.inputs[index])}
                      onChange={e => handleInputChange(index, e.target.value)}
                      ariaLabel={item + '×' + thColArr[index] + '의 값'}
                    />
                  </TD>
                ))}
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
      <BottomSheet
        height={'50%'}
        show={showAnswer}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{answers.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>4단 곱셈구구를 이용하면 4×1=4, 4×3=12, 4×5=20, 4×7=28입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
