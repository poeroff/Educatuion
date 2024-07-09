import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Input,
  InputStatus,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C02A03a } from './store';

const headerText = 'Listen and Answer';
const questionText = 'What form of ice will melt slowest under the same conditions? Fill in the blanks.';
const answer = ['sphere-shaped', 'least'];
const answerText = answer.map((answer, index) => `(${index + 1}) ${answer}`).join('\n');

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03a);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userAnswer, isSubmitted, isCorrect } = cardData.p01;
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => !Array.isArray(userAnswer) || !userAnswer.every(a => removeSpaces(a) !== ''), [userAnswer]);
  const submitLabel = useMemo(() => (isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'), [isSubmitted, isAnswerShow]);
  const mark: TMarkType = useMemo(() => (isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none'), [isCorrect, isSubmitted]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: headerText,
  };
  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: mark,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.mp3',
    captionSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.srt',
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
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            userAnswer: userSubmissionList[0].inputData?.map((v: { value: string }) => v.value) || userAnswer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      const isCorrect: boolean[] = userAnswer.map((u, i) => isAnswer(u, answer[i]));
      const isAllCorrect = isCorrect.every(value => value === true);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isAllCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: userAnswer[0],
              isAnswer: true,
              isCorrect: isCorrect[0],
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: userAnswer[1],
              isAnswer: true,
              isCorrect: isCorrect[1],
            },
          ],
          isCorrect: isAllCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isAllCorrect);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = e.target.value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, userAnswer: newAnswer } }));
    changeData('P01', 1, 1, newAnswer);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign={'flex-start'}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      submitDisabled={isDisabled}
      submitLabel={submitLabel}
    >
      <Box background={'white'} useRound marginTop={'40px'}>
        <Scroll height='180px'>
          <Typography>A(n) (1) </Typography>
          <Input
            ariaLabel='1번 답란'
            placeholder='내용을 넣어 주세요.'
            maxLength={999}
            value={userAnswer[0]}
            width='250px'
            onChange={e => handleInputChange(e, 0)}
            readOnly={isSubmitted}
            status={isSubmitted ? (userAnswer[0] === answer[0] ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.DEFAULT}
          />
          <Typography> ice will melt slowest because the</Typography>
          <Typography> shape has the (2) </Typography>
          <Input
            ariaLabel='2번 답란'
            placeholder='내용을 넣어 주세요.'
            maxLength={999}
            value={userAnswer[1]}
            width='250px'
            onChange={e => handleInputChange(e, 1)}
            readOnly={isSubmitted}
            status={isSubmitted ? (userAnswer[1] === answer[1] ? InputStatus.ENABLE : InputStatus.ERROR) : InputStatus.DEFAULT}
          />
          <Typography> surface area for a given</Typography>
          <Typography> volume.</Typography>
        </Scroll>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{answerText}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
