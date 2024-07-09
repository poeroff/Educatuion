import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  IQuestionProps,
  BottomSheet,
  Typography,
  ETagLine,
  Tag,
  EStyleButtonTypes,
  IAudioPlayerProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L02C02A03 } from './store';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const [cardData, setCardData] = useRecoilState(L02C02A03);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.mp3',
    captionSrc: '/L02/C02/A03/HE2-L02-C02-A03-02.srt',
  };

  const data = [
    {
      text: 'to explain how to apply for school council membership',
    },
    {
      text: 'to inform the students about all the school events this year',
    },
    {
      text: 'to announce and promote the school flea market for next month',
    },
  ];
  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p03.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P03', userSubmission);
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: Number(index),
      },
    }));
    changeData('P03', 1, 1, index);
  };

  const questionInfo: IQuestionProps = {
    text: 'What is the purpose of the talk?',
    mark: !cardData.p03.isSubmitted ? undefined : cardData.p03.answer === cardData.p03.solution ? 'correct' : 'incorrect',
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={cardData.p03.answer === 0 ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={submitAnswer}
      bodyId='targetContainer'
      submitDisabled={cardData.p03.answer === 0}
      audioInfo={audioInfo}
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
              value={cardData.p03.answer === index}
              disabled={cardData.p03.isSubmitted}
              label={value?.text}
              onClick={e => handleChange(index)}
              isError={cardData.p03.isSubmitted && cardData.p03.answer !== cardData.p03.solution}
            >
              <Box>
                <Label value={index} /> {value?.text}
              </Box>
            </Radio>
          )}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>3</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
