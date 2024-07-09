import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Dialog,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  Label,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { checkAnswers, getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000105State from './store';

const P05 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000105State);

  const [showAnswer, setShowAnswer] = useState(false);
  const [isShowDialog, setShowDialog] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const answers = [['6×5=30', '5×6=30', '6×5', '5×6'], '30'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
        무당벌레 한 마리의 다리가 6개일 때 5마리의 다리는 모두 몇 개인가요?
      </>
    ),
    mark,
  };

  useEffect(() => {
    if (cardData.p05.isSubmitted) {
      setMark(cardData.p05.isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p05.isSubmitted, cardData.p05.isAllCorrect]);

  const isInputComplete = useMemo(() => cardData.p05.inputs.every(Boolean), [cardData.p05.inputs]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...cardData.p05.inputs];
    newInputs[index] = value;

    setCardData(prev => ({
      ...prev,
      p05: {
        ...prev.p05,
        inputs: newInputs,
      },
    }));
    changeData('P05', 1, index + 1, value);
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
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            inputs: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData.p05.inputs,
            isCorrectArr: userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p05.isCorrectArr,
            isAllCorrect: userSubmissionList[0].inputData.every((item: { isCorrect: boolean }) => item.isCorrect) || cardData.p05.isAllCorrect,
            isSubmitted,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const submitAnswer = () => {
    const isCorrectArr = [answers[0].includes(cardData.p05.inputs[0].replace(/\s+/g, '')), answers[1] === cardData.p05.inputs[1]];
    const isAllCorrect = isCorrectArr.every(Boolean);
    setCardData(prev => ({
      ...prev,
      p05: { ...prev.p05, inputs: [prev.p05.inputs[0].replace(/\s+/g, ''), prev.p05.inputs[1]], isSubmitted: true, isCorrectArr, isAllCorrect },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.inputs[0].replace(/\s+/g, ''),
            isAnswer: true,
            isCorrect: isCorrectArr[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p05.inputs[1],
            isAnswer: true,
            isCorrect: isCorrectArr[1],
          },
        ],
      },
    ];
    submitDataWithResult('P05', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
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
      submitLabel={cardData.p05.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isInputComplete ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      useRound
      useLinkLabel={cardData.p05.isSubmitted && !cardData.p05.isAllCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => setShowDialog(true)}
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image src='/A03/0001/05/EC31304.png' alt='무당벌레 5마리가 있습니다.' width='500px' />
        </Box>
        <Box marginTop='20px'>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              maxLength={15}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p05.inputs[0]}
              onChange={e => handleInputChange(0, e.target.value)}
              status={cardData.p05.isSubmitted && getInputStatus(cardData.p05.isCorrectArr[0], cardData.p05.inputs[0])}
              readOnly={cardData.p05.isSubmitted}
              ariaLabel='식을 적어주세요.'
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              maxLength={6}
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p05.inputs[1]}
              onChange={e => handleInputChange(1, e.target.value)}
              status={cardData.p05.isSubmitted && getInputStatus(cardData.p05.isCorrectArr[1], cardData.p05.inputs[1])}
              readOnly={cardData.p05.isSubmitted}
              ariaLabel='답을 적어주세요.'
            />
            <Typography>개</Typography>
          </Box>
        </Box>
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
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>{(answers[0] as string[]).join(' 또는 ')}</Typography>

              <Typography>{answers[1]}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>(무당벌레 한 마리의 다리 수)×(무당벌레 수)=6×5=30(개)</Typography>
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
        <Box hAlign='center'>C-EI31-03-0001-1301</Box>
      </Dialog>
    </Container>
  );
};

export default P05;
