import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01_C06_A05 } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

const P02 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01_C06_A05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const handleChange =
    (subKey: number): ChangeEventHandler<HTMLInputElement> =>
    event => {
      if (isNaN(Number(event.target.value))) {
        return;
      }
      if (subKey === 1) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value: event.target.value } } }));
      } else if (subKey === 2) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: { ...prev.p02.answer2, value: event.target.value } } }));
      } else if (subKey === 3) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: { ...prev.p02.answer3, value: event.target.value } } }));
      }
      changeData('P02', 1, subKey, event.target.value);
    };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  const handleSubmit = () => {
    const correct1 = cardData.p02.answer1.value.trim() === cardData.p02.answer1.solution;
    const correct2 = cardData.p02.answer2.value.trim() === cardData.p02.answer2.solution;
    const correct3 = cardData.p02.answer3.value.trim() === cardData.p02.answer3.solution;
    const isAllCorrect = correct1 && correct2 && correct3;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: {
          ...cardData.p02.answer1,
          isCorrect: correct1,
        },
        answer2: {
          ...cardData.p02.answer2,
          isCorrect: correct2,
        },
        answer3: {
          ...cardData.p02.answer3,
          isCorrect: correct3,
        },
        isSubmitted: true,
        isAllCorrect: isAllCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1.value,
            isCorrect: correct1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2.value,
            isCorrect: correct2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3.value,
            isCorrect: correct3,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isAllCorrect);
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
            answer1: { ...prev.p02.answer1, value: userSubmissionList[0].inputData[0].value || cardData.p02.answer1.value },
            answer2: { ...prev.p02.answer2, value: userSubmissionList[0].inputData[1].value || cardData.p02.answer2.value },
            answer3: { ...prev.p02.answer3, value: userSubmissionList[0].inputData[2].value || cardData.p02.answer3.value },
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
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

  const answers = ['2', '1', '3'];
  const questions = ['Fill the holes with honey.', 'Make several holes in a log.', 'Hang the honey-log feeder on a tree.'];

  const [isShowText, setShowText] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary(3)',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <span>
        <span style={{ fontWeight: 'var(--font-weight-extraBold)' }}>Q3. </span>Number the following steps to make a honey-log feeder.
      </span>
    ),
    markSize: 'middle',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const text = (
    <Typography>
      Today, we made a gift for Ben and Lily. These two baby bears were rescued after they had been raised illegally in a tiny cage on a farm for many
      years. To help the bears restore their natural instincts, we carried out some special activities known as “behavioral enrichment.” For example,
      we made honey-log feeders for the bears. First, we made several holes in a log and filled them with honey. Then, we hung the honey-log feeders
      on trees near the bears’ habitat. As bears are intelligent and curious creatures, they can become bored and stressed when lacking mental and
      physical stimulation. The honey-log feeders stimulate their natural curiosity and keep them as active as they would be in the wild. After a
      while, Ben and Lily approached the feeders and started eating the honey inside. They are so cute!
    </Typography>
  );

  const handleDialogClose = () => {
    setShowText(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p02.answer1.value && cardData.p02.answer2.value && cardData.p02.answer3.value
          ? showAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!(cardData.p02.answer1.value && cardData.p02.answer2.value && cardData.p02.answer3.value)}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <Box hAlign='right'>
        <Button
          minWidth='118px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          useRound
          onClick={() => setShowText(true)}
        />
      </Box>
      <Box useFull flexDirection='column' paddingTop='20px'>
        <Box hAlign='center' flexDirection='column' textAlign='center' useRound width='100%' height='200px'>
          <Box hAlign='center' flexDirection='column' alignItems='flex-start'>
            <Box marginBottom={'20px'}>
              <Input
                key={'text-input-1'}
                inputSize='x-small'
                textAlign='center'
                value={cardData.p02.answer1.value}
                onChange={handleChange(1)}
                width='50px'
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='올바른 순서'
                status={cardData.p02.isSubmitted && cardData.p02.answer1.solution !== cardData.p02.answer1.value ? 'error' : ''}
                maxLength={1}
              />
              <Typography usePre>{questions[0]}</Typography>
            </Box>
            <Box marginBottom={'20px'}>
              <Input
                key={'text-input-2'}
                inputSize='x-small'
                textAlign='center'
                value={cardData.p02.answer2.value}
                onChange={handleChange(2)}
                width='50px'
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='올바른 순서2'
                status={cardData.p02.isSubmitted && cardData.p02.answer2.solution !== cardData.p02.answer2.value ? 'error' : ''}
                maxLength={1}
              />
              <Typography usePre>{questions[1]}</Typography>
            </Box>
            <Box marginBottom={'20px'}>
              <Input
                key={'text-input-3'}
                inputSize='x-small'
                textAlign='center'
                value={cardData.p02.answer3.value}
                onChange={handleChange(3)}
                width='50px'
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='올바른 순서3'
                status={cardData.p02.isSubmitted && cardData.p02.answer3.solution !== cardData.p02.answer3.value ? 'error' : ''}
                maxLength={1}
              />
              <Typography usePre>{questions[2]}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        topHeight={50}
        width={893}
        height={458}
        isShow={isShowText}
        useHeader
        header={() => {
          return (
            <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px'>
              <Typography weight={700}>July 30, Tuesday</Typography>
            </Box>
          );
        }}
        closeLabel='지문 닫기'
        onClose={handleDialogClose}
        useFooter={true}
        tabIndex={101}
      >
        <Box useFull padding='24px 32px'>
          <Box padding='4px 12px'>
            <Typography useGap={false}>{text}</Typography>
          </Box>
        </Box>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{answers.join(', ')}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
