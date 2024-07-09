import {
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  IAudioPlayerProps,
  IQuestionProps,
  EStyleButtonTypes,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L03C04A02 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C04A02);
  const [isShow, setIsShow] = useState(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
          isAnswer: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: '2. What is the audience most likely to do after the talk?',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const data = [
    {
      text: 'research why lotus leaves don’t get wet',
    },
    {
      text: 'explore other examples of nature-inspired inventions',
    },
    {
      text: 'learn more about the inventors of Velcro and shower curtains',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C04/A02/HE1-L03-C04-A02.mp3',
    captionSrc: '/L03/C04/A02/HE1-L03-C04-A02.srt',
  };

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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: index } }));
    changeData('P03', 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = cardData.p03.answer === cardData.p03.solution;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));
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
          isCorrect,
        },
      ];

      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p03.answer === -1}
      submitBtnColor={cardData.p03.answer === -1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={submitAnswer}
    >
      <Box vAlign='center' useFull>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <Radio
              key={`1${index}2`}
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              value={cardData.p03.answer === index}
              defaultValue={cardData.p03.answer === index}
              isError={cardData.p03.isSubmitted && !cardData.p03.isCorrect}
              onClick={() => handleRadioClick(index)}
              readOnly={cardData.p03.isSubmitted}
            >
              <Box>
                <Label value={index} /> {value?.text}
              </Box>
            </Radio>
          )}
        </List>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p03.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
