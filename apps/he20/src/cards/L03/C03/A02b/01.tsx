import { useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Label,
  Image,
  EImageType,
  IQuestionProps,
  EStyleShadowedButtonTypes,
  Radio,
  IAudioPlayerProps,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C03A02b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02b);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is the boy allowed to bring inside?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE2-L03-C03-A02-01.mp3',
    captionSrc: '/L03/C03/A02/HE2-L03-C03-A02-01.srt',
  };

  const cards = [
    {
      src: '/L03/C03/A02/HE2-L03-C03-A02-01-1.jpg',
      alt: '긴 우산 하나',
    },
    {
      src: '/L03/C03/A02/HE2-L03-C03-A02-01-2.jpg',
      alt: '생수 한 병',
    },
    {
      src: '/L03/C03/A02/HE2-L03-C03-A02b-01-3.jpg',
      alt: '우비 하나',
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

  const isSubmitDisabled = !cardData.p01.answer;

  const getStatus = (value: number) => {
    if (value !== cardData.p01.answer) {
      return EStyleShadowedButtonTypes.DEFAULT;
    }
    if (cardData.p01.isSubmitted && !cardData.p01.isCorrect) {
      return EStyleShadowedButtonTypes.WARNING;
    }
    return EStyleShadowedButtonTypes.PRIMARY;
  };

  const handleRadioClick = (value: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: value } }));
    changeData('P01', 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(!isShowAnswer);
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
              isAnswer: isCorrect,
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
      onSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box useFull hAlign='center'>
        {cards.map((item, index) => (
          <Box useFull key={'option-' + (index + 1)}>
            <Radio
              name={'radio-question-A'}
              value={index === cardData.p01.answer}
              onClick={() => handleRadioClick(index + 1)}
              readOnly={cardData.p01.isSubmitted}
            >
              <ShadowedButton key={index} type='img' state={getStatus(index + 1)}>
                <Label value={index + 1} />
                <Box marginTop='8px' height='100%'>
                  <Image size='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
                </Box>
              </ShadowedButton>
            </Radio>
          </Box>
        ))}
      </Box>
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
