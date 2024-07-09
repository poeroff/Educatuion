import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C03A02a } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const ANSWER = cardData.p01.solution;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers mainly talking about? Fill in the blank.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.mp3',
    captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.srt',
  };

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData('P01', 1, 1, value);
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
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p01.answer, cardData.p01.solution);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const script: React.ReactNode = (
    <Typography useGap={false}>
      a way of{' '}
      <Input
        name='value1'
        value={cardData.p01.answer}
        textAlign='left'
        maxLength={100}
        width='300px'
        placeholder='내용을 넣어 주세요.'
        readOnly={cardData.p01.isSubmitted}
        onChange={handleInputChangeEvent}
        status={
          cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer, cardData.p01.solution)
            ? InputStatus.ERROR
            : isNotEmptyString(cardData.p01.answer)
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        ariaLabel='답 입력란'
      />{' '}
      in Tibet
    </Typography>
  );

  useEffect(() => {
    return () => {
      saveData('P01');
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
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : !isNotEmptyString(cardData.p01.answer)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!isNotEmptyString(cardData.p01.answer)}
      onSubmit={handleSubmit}
    >
      <Box background='white' height='100px' useRound useFull>
        {script}
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='20px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{ANSWER}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
