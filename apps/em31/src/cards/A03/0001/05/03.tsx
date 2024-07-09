import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Dialog,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  Image,
  Input,
  IQuestionProps,
  Label,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { checkAnswers, getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000105State from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000105State);

  const [showAnswer, setShowAnswer] = useState(false);
  const [isShowDialog, setShowDialog] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const answers = ['4', '12', '4', '12'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label value={2} type='icon' size='small' />
        &nbsp;그림을 보고&nbsp;
        <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
        &nbsp;안에 알맞은 수를 써넣으세요.
      </Box>
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
    const newInputs = [...cardData.p03.inputs];
    newInputs[index] = value;

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        inputs: newInputs,
      },
    }));
    changeData('P03', 1, index + 1, value);
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
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p03.inputs[2],
            isAnswer: true,
            isCorrect: isCorrectArr[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p03.inputs[3],
            isAnswer: true,
            isCorrect: isCorrectArr[3],
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
      useRound
      vAlign='flex-start'
      useLinkLabel={cardData.p03.isSubmitted && !cardData.p03.isAllCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => setShowDialog(true)}
    >
      <BoxWrap display='flex' justifyContent='center'>
        <Box>
          <Image src='/A03/0001/05/EC31302.png' alt='꽃 12개가 3개씩 묶여있습니다.' width='396px' height='201px' />
        </Box>
        <Box
          type='dashed'
          useRound
          width='calc(100% - 396px)'
          height='201px'
          padding='0px 20px'
          display='flex'
          justifyContent='center'
          flexDirection='column'
        >
          <Box>
            3씩{' '}
            <Input
              type='number'
              maxLength={1}
              inputSize='small'
              width='52px'
              value={cardData.p03.inputs[0]}
              onChange={e => handleInputChange(0, e.target.value)}
              status={cardData.p03.isSubmitted && getInputStatus(cardData.p03.isCorrectArr[0], cardData.p03.inputs[0])}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='3씩 몇 묶음인지 적는 입력란'
            />{' '}
            묶음은{' '}
            <Input
              type='number'
              maxLength={6}
              inputSize='small'
              width='130px'
              value={cardData.p03.inputs[1]}
              onChange={e => handleInputChange(1, e.target.value)}
              status={cardData.p03.isSubmitted && getInputStatus(cardData.p03.isCorrectArr[1], cardData.p03.inputs[1])}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='3의 N묶음이 몇 개인지 적는 입력란'
            />{' '}
            입니다.
          </Box>
          <Box marginTop='24px'>
            3의{' '}
            <Input
              type='number'
              maxLength={1}
              inputSize='small'
              width='52px'
              value={cardData.p03.inputs[2]}
              onChange={e => handleInputChange(2, e.target.value)}
              status={cardData.p03.isSubmitted && getInputStatus(cardData.p03.isCorrectArr[2], cardData.p03.inputs[2])}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='3의 N배는 몇인지 적는 입력란'
            />{' '}
            배는{' '}
            <Input
              type='number'
              maxLength={6}
              inputSize='small'
              width='130px'
              value={cardData.p03.inputs[3]}
              onChange={e => handleInputChange(3, e.target.value)}
              status={cardData.p03.isSubmitted && getInputStatus(cardData.p03.isCorrectArr[3], cardData.p03.inputs[3])}
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='3의 N배 값을 적는 입력란'
            />{' '}
            입니다.
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
              <Typography>3×4=12</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isShowDialog}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <Box hAlign='center'>C-EI31-03-0001-1101</Box>
      </Dialog>
    </Container>
  );
};

export default P03;
