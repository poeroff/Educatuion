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
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';

import { studentAtom } from '@/stores/student';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L01C02A03b } from './store';

const P01 = ({ headerInfo, audioInfo }: { headerInfo: TMainHeaderInfoTypes; audioInfo: IAudioPlayerProps }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A03b);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<EStyleShadowedButtonTypes>(EStyleShadowedButtonTypes.PRIMARY);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [{ subKey: 1, type: 'NUMBER', value: -1 }],
    },
  ];

  const questionInfo: IQuestionProps = {
    text: 'What are the speakers going to do together this weekend?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const cards = [
    {
      src: '/L01/C02/A03b/HE2-L01-C02-A03b-01-1.jpg',
      alt: '자전거를 타려고 안장에 발을 올리고 있는 모습의 여자',
    },
    {
      src: '/L01/C02/A03/HE2-L01-C02-A03-01-2.jpg',
      alt: '마이크를 잡고 노래를 하고 있는 모습의 여자',
    },
    {
      src: '/L01/C02/A03/HE2-L01-C02-A03-01-3.jpg',
      alt: '사람들에게 책을 읽어주는 듯한 모습의 남자',
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;

      setStatus(isCorrect ? EStyleShadowedButtonTypes.PRIMARY : EStyleShadowedButtonTypes.WARNING);
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

  const handleOnClick = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index + 1 } }));
    changeData('P01', 1, 1, index + 1);
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p01.answer === -1}
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p01.answer >= 0
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box useFull hAlign='center'>
        {cards.map((item, index) => (
          <Box useFull key={'option-' + (index + 1)}>
            <Radio
              name={'radio-question-A'}
              value={cardData.p01.answer === index}
              onClick={() => handleOnClick(index)}
              ariaLabel={index + 1 + '번 보기'}
              readOnly={cardData.p01.isSubmitted}
            >
              <ShadowedButton key={index} type='img' state={index + 1 === cardData.p01.answer ? status : EStyleShadowedButtonTypes.DEFAULT}>
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
          <Box marginTop='10px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
