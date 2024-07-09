import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP03_1 } from './store';

const P18 = ({ _page = 'P18' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>2. 주어진 글 다음에 이어질 글의 순서로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(A)-(C)-(B)',
    },
    {
      text: '(B)-(A)-(C)',
    },
    {
      text: '(B)-(C)-(A)',
    },
    {
      text: '(C)-(A)-(B)',
    },
    {
      text: '(C)-(B)-(A)',
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
    if (cardData.p18.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p18.answer === cardData.p18.solution;
      setCardData(prev => ({ ...prev, p18: { ...prev.p18, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p18.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p18: {
            ...prev.p18,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p18.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p18: { ...prev.p18, answer: index } }));
    changeData(_page, 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p18.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p18.isSubmitted && cardData.p18.answer === 0}
      submitBtnColor={
        cardData.p18.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull>
          <Box background='white' useRound paddingRight='10px'>
            <Typography>Destructive interference is used in the noise-cancelling feature of headphones when we listen to music.</Typography>
          </Box>
          <Box background='white' useRound paddingRight='10px' marginTop='16px'>
            <BoxWrap>
              <Box>(A)</Box>
              <Typography>
                For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of –1 and transmit it to the speakers.
                This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume.
              </Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>(B)</Box>
              <Typography>
                Inside the headphones are microphones and noise-cancelling circuitry. The microphones pick up sounds from the outside, and the
                circuitry analyzes them to produce opposite sound waves.
              </Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>(C)</Box>
              <Typography>
                However, it is not easy to entirely eliminate external noise with this technology. To achieve full noise cancellation, the circuitry
                must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the
                microphones.
              </Typography>
            </BoxWrap>
          </Box>
          <Box marginTop='10px'>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p18.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p18.isSubmitted}
                  isError={cardData.p18.isSubmitted && cardData.p18.answer !== cardData.p18.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p18.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              주어진 글은 우리가 음악을 들을 때 상쇄 간섭이 헤드폰의 노이즈 캔슬링 기능에 사용된다는 내용이므로, 이 기능의 작동 원리에 관해 설명하는
              내용인 (B)로 이어지는 것이 자연스럽다. 그리고 예시를 들어 (B)의 내용을 더 자세히 설명해 주는 (A)가 나오고, 이 기능이 외부 소음을 완전히
              제거하는 것은 쉽지 않다는 노이즈 캔슬링 기능의 한계를 언급하는 (C)로 이어지는 것이 자연스럽다.
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='22px'>
              <Typography>
                상쇄 간섭은 우리가 음악을 들을 때 헤드폰의 노이즈 캔슬링 기능에 사용된다. (B) 헤드폰 내부에는 마이크와 노이즈 캔슬링 회로가 있다.
                마이크는 외부로부터 소리를 포착하고, 회로는 그것들을 분석하여 반대 음파를 생성한다. (A) 예를 들어, 외부 소음이 +1의 값을 가지면 회로는
                -1의 반대 소음을 생성하여 그것을 스피커로 전송한다. 시끄러운 주변 환경에서도 원하지 않는 소리를 상쇄시켜서, 음량을 높이지 않고도 음악
                소리를 또렷하게 들을 수 있다. (C) 하지만 이 기술로 외부 소음을 완전히 제거하는 것은 쉽지 않다. 완전한 소음 제거를 이루기 위해서 회로는
                소음을 디지털 데이터로 변환하고 소음이 마이크에 도달하자마자 반대 소리를 스피커로 즉시 전송해야 한다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P18;
