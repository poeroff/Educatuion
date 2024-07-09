import { useState, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  BoxWrap,
  Image,
  List,
  Label,
  Radio,
  Typography,
  IAudioPlayerProps,
  Tag,
  ETagLine,
  BottomSheet,
  EStyleButtonTypes,
  IQuestionProps,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C04A02 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C04A02);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C04/A02/HE1-L04-C04-A02.mp3',
    captionSrc: '/L04/C04/A02/HE1-L04-C04-A02.srt',
  };

  const questionInfo: IQuestionProps = {
    text: '1. What is the news mainly about?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const data = [
    {
      text: 'a cause of global warming',
    },
    {
      text: 'a positive change to our environment',
    },
    {
      text: 'a substance that helps restore the ozone layer',
    },
  ];

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
    if (cardData.p01.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
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

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
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
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p01.isSubmitted && cardData.p01.answer === 0}
      submitBtnColor={isSubmittable ? (isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box vAlign={'center'}>
          <PinchZoom>
            <Image
              src={'/L04/C04/A02/HE1-L04-C04-A02-1.jpg'}
              width='400px'
              height='249.15px'
              alt='여성 뉴스 앵커가 울창한 숲에 나비 두 마리가 날고 있는 사진을 손으로 가리킨다.'
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <List data={data} gap={20}>
            {({ value, index = 1 }) => (
              <Radio
                align={'vertical'}
                type={'square'}
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p01.answer}
                onClick={() => handleChange(index)}
                disabled={cardData.p01.isSubmitted}
                isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
              >
                <Box display='flex'>
                  <Box paddingTop='4px'>
                    <Label value={index} />
                  </Box>
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
