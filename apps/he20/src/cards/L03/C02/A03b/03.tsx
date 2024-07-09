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
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  PinchZoom,
  Typography,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';

import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C02A03b } from './store';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C02A03b);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<EStyleShadowedButtonTypes>(EStyleShadowedButtonTypes.PRIMARY);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [{ subKey: 1, type: 'NUMBER', value: -1 }],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'According to the dialogue, choose one that the man did not see in the Gyeongbok palace.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE2-L03-C02-A03-02.mp3',
    captionSrc: '/L03/C02/A03/HE2-L03-C02-A03-02.srt',
  };

  const cards = [
    {
      src: '/L03/C02/A03b/HE2-L03-C02-A03b-02-1.jpg',
      alt: '알록달록하게 채색된 궁궐의 단청',
    },
    {
      src: '/L03/C02/A03b/HE2-L03-C02-A03b-02-2.jpg',
      alt: '장구를 치고 있는 모습의 남자',
    },
    {
      src: '/L03/C02/A03b/HE2-L03-C02-A03b-02-3.jpg',
      alt: '수문장 교대식에서 전통복식을 입은 남자들이 깃발을 들고 서 있다.',
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
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
        if (isSubmitted) setStatus(userSubmissionList[0].isCorrect ? EStyleShadowedButtonTypes.PRIMARY : EStyleShadowedButtonTypes.WARNING);
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p03.answer === cardData.p03.solution;

      setStatus(isCorrect ? EStyleShadowedButtonTypes.PRIMARY : EStyleShadowedButtonTypes.WARNING);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p03.answer,
              isAnswer: isCorrect,
            },
          ],
          isCorrect,
        },
      ];

      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const handleOnClick = (index: number) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: index + 1 } }));
    changeData('P03', 1, 1, index + 1);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p03.answer === -1}
      submitBtnColor={
        cardData.p03.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p03.answer >= 0
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box useFull hAlign='center'>
        {cards.map((item, index) => (
          <Box useFull key={'option-' + (index + 1)}>
            <Radio
              name={'radio-question-A'}
              value={cardData.p03.answer === index}
              onClick={() => handleOnClick(index)}
              ariaLabel={index + 1 + '번 보기'}
              readOnly={cardData.p03.isSubmitted}
            >
              <ShadowedButton key={index} type='img' state={index + 1 === cardData.p03.answer ? status : EStyleShadowedButtonTypes.DEFAULT}>
                <Label value={index + 1} />
                <Box marginTop='8px' height='100%'>
                  <PinchZoom>
                    <Image width='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
                  </PinchZoom>
                </Box>
              </ShadowedButton>
            </Radio>
          </Box>
        ))}
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{cardData.p03.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
