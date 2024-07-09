import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  Dialog,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { A01_0001_05 } from './store';
import { studentAtom } from '@/stores/student';
import { checkAnswers, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import P07 from './07';

const P04 = () => {
  const pageKey = 'P04';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(A01_0001_05);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [1, 2].map(subKey => ({
        subKey,
        type: 'TEXT',
        value: '',
        isAnswer: true,
      })),
      isListCorrect: cardData[pageKey].isListCorrect,
    },
  ];

  const { userId } = useRecoilValue(studentAtom);
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isListCorrect: isSubmitted ? userSubmissionList[0].isListCorrect : cardData[pageKey].isListCorrect,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }
    const results = checkAnswers(cardData[pageKey].answer, cardData[pageKey].solution);
    const isCorrect = results.every(val => val);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect, isListCorrect: results } }));

    const inputData: inputDatasType[] = cardData[pageKey].answer.map((value, idx) => ({
      subKey: idx + 1,
      type: 'TEXT',
      value: value || '',
      isCorrect: results[idx],
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: inputData,
        isCorrect: isCorrect,
        isListCorrect: results,
      },
    ];

    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        고구마 83개 중에서 24개를 먹었습니다. 남은 고구마는 몇 개 인가요?
      </>
    ),
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const checkStatus = (index: number) => {
    return cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[index]
      ? InputStatus.ERROR
      : isNotEmptyString(cardData[pageKey].answer[index])
      ? InputStatus.ENABLE
      : InputStatus.DEFAULT;
  };

  const handleInputChangeEvent = (value: string, index: number) => {
    const updatedAnswers = cardData[pageKey].answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: updatedAnswers,
      },
    }));

    changeData(pageKey, 1, index + 1, updatedAnswers[index]);
  };

  const inputNodes: React.ReactNode[] = [
    <Input
      name={'value1'}
      marginLeft={12}
      textAlign='center'
      value={cardData[pageKey].answer[0]}
      onChange={e => handleInputChangeEvent(e.target.value, 0)}
      width='296px'
      ariaLabel='남은 고구마를 구하는 식'
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(0)}
      maxLength={12}
    />,
    <Input
      type='number'
      name={'value2'}
      marginLeft={12}
      textAlign='center'
      value={cardData[pageKey].answer[1]}
      onChange={e => handleInputChangeEvent(e.target.value, 1)}
      width='124px'
      ariaLabel='답란'
      maxLength={4}
      readOnly={cardData[pageKey].isSubmitted}
      status={checkStatus(1)}
    />,
  ];

  return (
    <Container
      useRound
      useExtend
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData[pageKey].answer.some(item => !isNotEmptyString(item))}
      submitBtnColor={
        cardData[pageKey].answer.every(ans => isNotEmptyString(ans))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.GRAY
      }
      onSubmit={handleSubmit}
      useLinkLabel={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setDialogOpen(!isDialogOpen);
      }}
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            {inputNodes[0]}
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            {inputNodes[1]}
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[pageKey].solution.join(', ')}</Typography>
            </Box>
            <Box position='relative' marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />
              <Box>
                <Typography usePre>{cardData[pageKey].commentary}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={isDialogOpen}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setDialogOpen(false);
          saveData('P07');
        }}
        onConfirm={() => {
          setDialogOpen(false);
        }}
      >
        <P07 />
      </Dialog>
    </Container>
  );
};
export default P04;
