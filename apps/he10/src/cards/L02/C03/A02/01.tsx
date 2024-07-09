import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  IAudioPlayerProps,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C03A02 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers mainly talking about?',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'a way of greeting in Tibet',
    },
    {
      text: 'the history of Tibetan kings',
    },
    {
      text: 'the traditional clothes of Tibet',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.mp3',
    captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.srt',
  };

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index } }));
    changeData(pageNumber, 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      audioInfo={audioInfo}
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={cardData[pageKey].answer === 0}
      onSubmit={submitAnswer}
      submitBtnColor={cardData[pageKey].answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box vAlign='center' useFull>
        <List
          gap={24}
          data={data}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              ariaLabel={index + '번 보기'}
              value={index === cardData[pageKey].answer}
              onClick={() => handleChange(index)}
              readOnly={cardData[pageKey].isSubmitted}
              isError={cardData[pageKey].isSubmitted && cardData[pageKey].answer !== cardData[pageKey].solution}
            >
              <Box>
                <Label value={index} /> {value?.text}
              </Box>
            </Radio>
          )}
          key='list'
        ></List>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageKey].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
