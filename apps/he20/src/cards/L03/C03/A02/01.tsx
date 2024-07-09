import { useEffect, useMemo, useState } from 'react';
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
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03C03A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const pageNo = 'P01';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02);

  const [ready, setReady] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const isAllFilled = useMemo(() => Boolean(cardData.p01.answer), [cardData.p01.answer]);
  const disabled = useMemo(() => !cardData.p01.isSubmitted && !isAllFilled, [cardData.p01.isSubmitted, isAllFilled]);

  const submitBtnColor = useMemo(() => {
    if (cardData.p01.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData.p01.isSubmitted, isShowAnswer, isAllFilled]);

  const status = useMemo(
    () =>
      cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution
        ? EStyleShadowedButtonTypes.WARNING
        : EStyleShadowedButtonTypes.PRIMARY,
    [cardData.p01.answer, cardData.p01.solution, cardData.p01.isSubmitted],
  );

  const mark = useMemo(
    () => (cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'),
    [cardData.p01.isSubmitted, cardData.p01.isCorrect],
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'What is the boy allowed to bring inside?',
    size: 'medium',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE2-L03-C03-A02-01.mp3',
    captionSrc: '/L03/C03/A02/HE2-L03-C03-A02-01.srt',
  };

  const cards = [
    {
      src: '/L03/C03/A02/HE2-L03-C03-A02-01-1.jpg',
      alt: '접히지 않는 긴 우산 하나',
    },
    {
      src: '/L03/C03/A02/HE2-L03-C03-A02-01-2.jpg',
      alt: '생수 한 병',
    },
    {
      src: '/L03/C03/A02/HE2-L03-C03-A02-01-3.jpg',
      alt: '직접 요리한 도시락 하나',
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
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted: isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      (async () => {
        await init();
        setReady(true);
      })();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  // Set the height of the radio button to the maximum height of the radio button.
  useEffect(() => {
    if (ready) {
      const radios = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      const divs = Array.from(radios).map(el => el.nextElementSibling as HTMLDivElement);

      let maxHeight = 0;

      divs.forEach(el => {
        maxHeight = Math.max(maxHeight, el.clientHeight);
      });

      divs.forEach(el => {
        el.style.height = `${maxHeight}px`;
      });
    }
  }, [ready]);

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index + 1 } }));
    changeData(pageNo, 1, 1, index + 1);
  };

  const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
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
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={disabled}
      submitBtnColor={submitBtnColor}
    >
      <BoxWrap>
        {cards.map((item, index) => (
          <Box key={'boxNumber' + index} width={100 / cards.length + '%'} vAlign='baseline'>
            <Radio
              name={'radio-question-A'}
              value={ready ? index === cardData.p01.answer - 1 : undefined}
              onClick={() => handleRadioClick(index)}
              ariaLabel={`${index + 1}번 보기`}
              readOnly={cardData.p01.isSubmitted}
            >
              <ShadowedButton
                key={'button' + index}
                type='img'
                state={index === cardData.p01.answer - 1 ? status : EStyleShadowedButtonTypes.DEFAULT}
                style={{ justifyContent: 'baseline' }}
              >
                <Label value={index + 1} />
                <Box marginTop='8px'>
                  <Image size='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
                </Box>
              </ShadowedButton>
            </Radio>
          </Box>
        ))}
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
