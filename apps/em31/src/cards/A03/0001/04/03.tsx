import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { checkAnswers, getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000104State from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000104State);

  const [showAnswer, setShowAnswer] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const answers = ['8', '6'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
        </Box>
        &nbsp;안에 알맞은 수를 써넣으세요.
      </>
    ),
    mark,
  };

  useEffect(() => {
    if (cardData.p03.isSubmitted) {
      setMark(cardData.p03.isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p03.isSubmitted, cardData.p03.isAllCorrect]);

  const isInputComplete = useMemo(() => cardData.p03.inputs.every(Boolean), [cardData.p03.inputs]);

  const handleInputChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newInputs = [...cardData.p03.inputs];
    newInputs[index] = value.trim();

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        inputs: newInputs,
      },
    }));
    changeData('P03', 1, index + 1, value.trim());
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            inputs: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData.p03.inputs,
            isCorrectArr: userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p03.isCorrectArr,
            isAllCorrect: userSubmissionList[0].inputData.every((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p03.isAllCorrect,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const submitAnswer = () => {
    const isCorrectArr = checkAnswers(cardData.p03.inputs, answers);
    const isAllCorrect = isCorrectArr.every(Boolean);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrectArr, isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.inputs[0],
            isAnswer: true,
            isCorrect: isCorrectArr[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.inputs[1],
            isAnswer: true,
            isCorrect: isCorrectArr[1],
          },
        ],
      },
    ];
    submitDataWithResult('P03', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
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
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isInputComplete ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap>
        <Box padding='24px 48px' type='dashed' hAlign='center' useRound useFull>
          <Box>
            <Typography>3 x</Typography>
            <Input
              type='number'
              width='50px'
              maxLength={1}
              value={cardData.p03.inputs[0]}
              onChange={e => handleInputChange(0, e.target.value)}
              status={cardData.p03.isSubmitted && getInputStatus(cardData.p03.isCorrectArr[0], cardData.p03.inputs[0])}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='1번 답란'
            />
            <Typography> = 24</Typography>
          </Box>
        </Box>
        <Box padding='24px 48px' type='dashed' hAlign='center' useRound useFull>
          <Box>
            <Input
              width='50px'
              maxLength={1}
              value={cardData.p03.inputs[1]}
              onChange={e => handleInputChange(1, e.target.value)}
              status={cardData.p03.isSubmitted && getInputStatus(cardData.p03.isCorrectArr[1], cardData.p03.inputs[1])}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='2번 답란'
            />
            <Typography>× 7 = 42</Typography>
          </Box>
        </Box>
      </BoxWrap>
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
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>{answers.join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>3×8=24이므로 □=8입니다.</Typography>
              <Typography>6×7=42이므로 □=6입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
