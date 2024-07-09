import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  Checkbox,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C03A02a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswerBS, setIsShowAnswerBS] = useState(false);

  const questionInfo: IQuestionProps = {
    text: 'Which can be answered with information from the dialogue? Choose all the correct answers.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const data = [
    {
      text: 'How did the self-cleaning system in the house work?',
    },
    {
      text: 'Why did Frances Gabe invent the self-cleaning house?',
    },
    {
      text: 'Where did Frances Gabe build the self-cleaning house?',
    },
    {
      text: 'What was the size of the house Frances Gabe invented?',
    },
    {
      text: 'How long did Frances Gabe live in the self-cleaning house?',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.mp3',
    captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
        },
      ],
    },
  ];

  const isSubmitDisabled = cardData.p01.answer.length === 0;

  const isCorrectAnswer = (arr: number[], correct: number[]) => {
    if (arr.length !== correct.length) return false;

    const sortedArr = [...arr].sort();
    const sortedCorrect = [...correct].sort();

    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i] !== sortedCorrect[i]) {
        return false;
      }
    }
    return true;
  };

  const handleCheckboxChange = (index: number) => {
    const newAnswer = cardData.p01.answer.includes(index) ? cardData.p01.answer.filter(i => i !== index) : [...cardData.p01.answer, index];

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newAnswer } }));
    changeData('P01', 1, 1, newAnswer);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShowAnswerBS(!isShowAnswerBS);
    } else {
      const isCorrect = isCorrectAnswer(cardData.p01.answer, cardData.p01.solution);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER_LIST',
              value: cardData.p01.answer,
              isAnswer: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswerBS ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isSubmitDisabled}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswerBS ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
    >
      <Box vAlign='center' useFull>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <Checkbox
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              defaultValue={cardData.p01.answer.includes(index)}
              value={cardData.p01.answer.includes(index)}
              isError={cardData.p01.isSubmitted && cardData.p01.answer.includes(index) && !cardData.p01.solution.includes(index)}
              disabled={cardData.p01.isSubmitted}
              onClick={() => handleCheckboxChange(index)}
            >
              <Box padding='0px 12px' vAlign='center'>
                <Label value={index} />
                <Typography lineHeight='40px'>{value?.text}</Typography>
              </Box>
            </Checkbox>
          )}
        </List>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswerBS}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution.join(', ')}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
