import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  Box,
  IQuestionProps,
  Typography,
  TMainHeaderInfoTypes,
  Input,
  Button,
  EStyleSizes,
  EStyleButtonTypes,
  Dialog,
  BottomSheet,
  InputStatus,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageNo = 'P02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A03);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShowText, setShowText] = useState<boolean>(false);

  const isAllFilled = useMemo(() => cardData.p02.answers.every(value => isNotEmptyString(value)), [cardData.p02.answers]);

  const mark = useMemo(
    () => (cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none'),
    [cardData.p02.isSubmitted, cardData.p02.isCorrect],
  );

  const status = useMemo(
    () =>
      cardData.p02.answers.map((value, index) =>
        isNotEmptyString(value)
          ? !cardData.p02.isSubmitted || isAnswer(value, cardData.p02.solutions[index])
            ? InputStatus.ENABLE
            : InputStatus.ERROR
          : InputStatus.DEFAULT,
      ),
    [cardData.p02.answers, cardData.p02.solutions, cardData.p02.isSubmitted],
  );

  const submitBtnColor = useMemo(() => {
    if (cardData.p02.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData.p02.isSubmitted, isShowAnswer, isAllFilled]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (1)',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Typography useGap={false}>
        <Typography useGap={false} style={{ fontWeight: 'var(--font-weight-extraBold)' }}>
          Q1.&nbsp;
        </Typography>
        How much coffee do Korean adults drink each day on average?
      </Typography>
    ),
    mark: mark,
  };

  const text = (
    <Typography useGap={false}>
      The famous German musician Johann Sebastian Bach once said, "Without my morning coffee, I'm just like a dried-up piece of goat." Today this
      sentiment is shared by many, with coffee shops springing up on almost every street corner, and it is common to see city residents walking around
      with a cup of coffee in hand. According to the International Coffee Organization (ICO), approximately 10 billion tons of coffee was consumed
      worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780 tons of coffee. This means
      that every Korean adult drank an average of one cup of coffee every day throughout the year. Clearly, for Koreans and other world citizens,
      coffee is not just a drink but a daily necessity.
    </Typography>
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: Array.from({ length: 4 }, (_, index) => ({
        subKey: index + 1,
        type: 'TEXT',
        value: '',
        isAnswer: true,
      })),
    },
  ];

  const handleChangeInput = (value: string, index: number) => {
    const newAnswers = [...cardData.p02.answers];
    newAnswers[index] = value;

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answers: newAnswers } }));
    changeData(pageNo, 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const answers = [...cardData.p02.answers];
      const markings = answers.map((value, index) => isAnswer(value, cardData.p02.solutions[index]));
      const isCorrect = markings.every(marking => marking);

      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: answers.map((value, index) => ({
            subKey: index + 1,
            type: 'TEXT',
            value: value,
            isAnswer: true,
            isCorrect: markings[index],
          })),
          isCorrect,
        },
      ];

      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(show => !show);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answers: [
              userSubmissionList[0].inputData[0]?.value || cardData.p02.answers[0],
              userSubmissionList[0].inputData[1]?.value || cardData.p02.answers[1],
              userSubmissionList[0].inputData[2]?.value || cardData.p02.answers[2],
              userSubmissionList[0].inputData[3]?.value || cardData.p02.answers[3],
            ],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
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
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p02.isSubmitted && !isAllFilled}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
    >
      <Box hAlign='right'>
        <Button
          minWidth='118px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          useRound
          onClick={() => setShowText(true)}
          tabIndex={102}
        />
      </Box>
      <Box useFull flexDirection='column' gap='48px' hAlign='center'>
        <Box hAlign='center' flexDirection='column' textAlign='center' useRound width='100%' height='200px' background='white' marginBottom='45px'>
          <Box width='100%' height='48px' hAlign='center'>
            <Typography usePre>On average, every Korean adult drinks</Typography>
          </Box>
          <Box hAlign='center' marginTop='4px'>
            {cardData.p02.answers.map((value, index) => (
              <Input
                key={'text-input-' + (index + 1)}
                placeholder=''
                textAlign='center'
                value={value}
                onChange={event => handleChangeInput(event.target.value, index)}
                status={status[index]}
                width='180px'
                maxLength={14}
                marginLeft={index === 0 ? 0 : 5}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel={`${index + 1}번 답 입력란`}
              />
            ))}
            <Typography>daily.</Typography>
          </Box>
        </Box>
      </Box>
      <Dialog
        width={921}
        height={500}
        topHeight={50}
        useHeader
        header={() => (
          <Box useRound backgroundColor='#EFF0F2' height='50px' marginBottom='20px'>
            <Typography weight={700}>A Better Future for Coffee Waste (1)</Typography>
          </Box>
        )}
        isShow={isShowText}
        closeLabel='지문 닫기'
        onClose={() => setShowText(false)}
        useFooter={true}
        confirmLabel='지문 닫기'
        tabIndex={301}
      >
        <Typography>{text}</Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solutions.join(', ')}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
