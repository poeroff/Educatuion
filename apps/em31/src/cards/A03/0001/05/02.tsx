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
  Image,
  Input,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getInputStatus, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000105State from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000105State);

  const [showAnswer, setShowAnswer] = useState(false);
  const [isShowDialog, setShowDialog] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const answer = '10';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={1} type='icon' size='small' />
        토마토 15개 중에서 5개를 먹었습니다. 남은 토마토는 몇 개인가요?
      </>
    ),
    mark,
  };

  useEffect(() => {
    if (cardData.p02.isSubmitted) {
      setMark(cardData.p02.isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p02.isSubmitted, cardData.p02.isCorrect]);

  const isInputComplete = useMemo(() => cardData.p02.input, [cardData.p02.input]);

  const handleInputChange = (value: string) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        input: value,
      },
    }));
    changeData('P02', 1, 1, value);
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
            input: userSubmissionList[0].inputData[0].value || cardData.p02.input,
            isCorrect: userSubmissionList[0].inputData[0].isCorrect || cardData.p02.isCorrect,
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
    const isCorrect = isAnswer(cardData.p02.input, answer);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.input,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
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
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isInputComplete ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      useRound
      useLinkLabel={cardData.p02.isSubmitted && !cardData.p02.isCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => setShowDialog(true)}
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image
            src='/A03/0001/05/EC31301.png'
            alt='토마토 15개가 나란히 놓여있고 그 중 5개의 토마토에 빗금 표시가 있습니다.'
            width='652px'
            height='40px'
          />
        </Box>
        <Box marginTop='24px'>
          <Typography>15 - 5 = </Typography>
          <Input
            type='number'
            maxLength={6}
            width='130px'
            value={cardData.p02.input}
            onChange={e => handleInputChange(e.target.value)}
            readOnly={cardData.p02.isSubmitted}
            status={cardData.p02.isSubmitted && getInputStatus(cardData.p02.isCorrect, cardData.p02.input)}
            ariaLabel='15 빼기 5의 값'
          />
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
              <Typography>{answer}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>남은 토마토는 15-5=10(개)입니다.</Typography>
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
        <Box hAlign='center'>C-EI31-03-0001-1001</Box>
      </Dialog>
    </Container>
  );
};

export default P02;
