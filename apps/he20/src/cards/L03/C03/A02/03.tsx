import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  IQuestionProps,
  Tag,
  ETagLine,
  InputStatus,
  Image,
  EImageType,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C03A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const pageNo = 'P03';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const isAllFilled = useMemo(() => cardData.p03.answers.every(value => isNotEmptyString(value)), [cardData.p03.answers]);
  const mark = useMemo(
    () => (cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none'),
    [cardData.p03.isSubmitted, cardData.p03.isCorrect],
  );

  const status = useMemo(
    () =>
      cardData.p03.answers.map((value, index) =>
        isNotEmptyString(value)
          ? !cardData.p03.isSubmitted || isAnswer(value, cardData.p03.solutions[index])
            ? InputStatus.ENABLE
            : InputStatus.ERROR
          : InputStatus.DEFAULT,
      ),
    [cardData.p03.answers, cardData.p03.solutions, cardData.p03.isSubmitted],
  );

  const submitBtnColor = useMemo(() => {
    if (cardData.p03.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData.p03.isSubmitted, isShowAnswer, isAllFilled]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the reminders using information from the talk.',
    size: 'medium',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE2-L03-C03-A02-02.mp3',
    captionSrc: '/L03/C03/A02/HE2-L03-C03-A02-02.srt',
  };

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

  const handleInputChange = (value: string, index: number) => {
    const truncatedValue = truncateToMaxBytes(value);

    const newAnswers = [...cardData.p03.answers];
    newAnswers[index] = truncatedValue;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answers: newAnswers } }));
    changeData(pageNo, 1, index + 1, truncatedValue);
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      const answers = [...cardData.p03.answers];
      const markings = answers.map((value, index) => isAnswer(value, cardData.p03.solutions[index]));
      const isCorrect = markings.every(marking => marking);

      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

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
      setShowAnswer(!isShowAnswer);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answers: [
              userSubmissionList[0].inputData[0]?.value || cardData.p03.answers[0],
              userSubmissionList[0].inputData[1]?.value || cardData.p03.answers[1],
              userSubmissionList[0].inputData[2]?.value || cardData.p03.answers[2],
              userSubmissionList[0].inputData[3]?.value || cardData.p03.answers[3],
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
      audioInfo={audioInfo}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitLabel={cardData.p03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p03.isSubmitted && !isAllFilled}
      submitBtnColor={submitBtnColor}
    >
      <Image
        alt='알림의 의미를 가진 종모양 장식 이미지'
        type={EImageType.IMG_BG}
        src='/L03/C03/A02/HE2-L03-C03-A02-02-3.png'
        height='100%'
        style={{ padding: '30px', justifyContent: 'space-between' }}
      >
        <Box hAlign='flex-start' vAlign='flex-start'>
          <Box width='64px' height='64px'></Box>
          <Box padding='8px 12px'>
            <Typography useGap={false} color='var(--color-blue-700)' weight={900} style={{ fontSize: '36px', lineHeight: '54px' }}>
              Musical Matilda
            </Typography>
          </Box>
        </Box>
        <Box marginTop='15px'>
          <Box paddingLeft='12px' vAlign='bottom'>
            <Typography>1. Turn off or (1)</Typography>
            <Input
              placeholder='내용을 넣어 주세요.'
              ariaLabel='1번 답 입력란'
              width='300px'
              inputSize='x-small'
              value={cardData.p03.answers[0]}
              onChange={event => handleInputChange(event.target.value, 0)}
              status={status[0]}
              readOnly={cardData.p03.isSubmitted}
              maxLength={19}
            />
            <Typography>your electronic devices.</Typography>
          </Box>
          <Box paddingLeft='12px' marginTop='15px' vAlign='bottom'>
            <Typography>2. Don’t take photos or make video (2)</Typography>
            <Input
              placeholder='내용을 넣어 주세요.'
              ariaLabel='2번 답 입력란'
              width='300px'
              inputSize='x-small'
              value={cardData.p03.answers[1]}
              onChange={event => handleInputChange(event.target.value, 1)}
              status={status[1]}
              readOnly={cardData.p03.isSubmitted}
              maxLength={19}
            />
            <Typography>.</Typography>
          </Box>
          <Box paddingLeft='12px' marginTop='15px' vAlign='bottom'>
            <Typography>3. For your safety, check the nearest (3)</Typography>
            <Input
              placeholder='내용을 넣어 주세요.'
              ariaLabel='3번 답 입력란'
              width='280px'
              inputSize='x-small'
              value={cardData.p03.answers[2]}
              onChange={event => handleInputChange(event.target.value, 2)}
              status={status[2]}
              readOnly={cardData.p03.isSubmitted}
              maxLength={17}
            />
            <Typography>.</Typography>
          </Box>
        </Box>
        <Box useRound hAlign='center' padding='12px 6px' marginTop='25px'>
          <Typography color='var(--color-blue-900)' weight={700}>
            Break: (4)
          </Typography>
          <Input
            ariaLabel='4번 답 입력란'
            width='190px'
            inputSize='x-small'
            value={cardData.p03.answers[3]}
            onChange={event => handleInputChange(event.target.value, 3)}
            status={status[3]}
            readOnly={cardData.p03.isSubmitted}
            maxLength={11}
          />
          <Typography color='var(--color-blue-900)' weight={700}>
            minutes between Act 1 and Act 2
          </Typography>
        </Box>
      </Image>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {cardData.p03.solutions.map((val, idx) => (
              <Box>
                <Typography key={'answer-' + (idx + 1)} useGap={false} usePre>
                  ({idx + 1}) {val}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
