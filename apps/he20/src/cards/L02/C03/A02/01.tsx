import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Image,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  IAudioPlayerProps,
  BottomSheet,
  Typography,
  ETagLine,
  Tag,
  PinchZoom,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C03A02 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02);
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
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
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
              isCorrect: cardData.p01.isCorrect,
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
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p01.isSubmitted,
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'What is the man’s advice?',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.mp3',
    captionSrc: '/L02/C03/A02/HE2-L02-C03-A02-01.srt',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={cardData.p01.answer === 0}
      submitBtnColor={cardData.p01.answer === 0 ? EStyleButtonTypes.SECONDARY : !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY}
    >
      <BoxWrap useFull>
        <Box width='317px' hAlign={'center'} useFull>
          <PinchZoom>
            <Image
              src={'/L02/C03/A02/HE2-L02-C03-A02-01.jpg'}
              width='300px'
              height='330px'
              alt='미소 짓는 남자 앞쪽에 돼지저금통, 쌓인 동전이 있음'
            />
          </PinchZoom>
        </Box>
        <Box hAlign={'center'} useFull>
          <List
            gap={24}
            data={cardData.p01.data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                ariaLabel={index + '번 보기'}
                value={index === cardData.p01.answer}
                onClick={() => handleChange(index)}
                readOnly={cardData.p01.isSubmitted}
                isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
              >
                <Box vAlign={'flex-start'}>
                  <Label value={index} /> <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
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
