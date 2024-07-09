import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from './store';

const P19 = ({ _page = 'P19' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>3. 다음 빈칸에 들어갈 말로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p19.isSubmitted ? (cardData.p19.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const pageName = _page.toUpperCase();

  const data = [
    {
      text: 'to discover hidden talents',
    },
    {
      text: 'to predict certain behaviors',
    },
    {
      text: 'to control animals’ instincts',
    },
    {
      text: 'to help animals adapt to the wild',
    },
    {
      text: 'to encourage desirable behaviors',
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
    if (cardData.p19.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p19.answer === cardData.p19.solution;
      setCardData(prev => ({ ...prev, p19: { ...prev.p19, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p19.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageName, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageName)?.pageId;
    if (cardData.p19.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p19.answer;
      const defaultCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p19: {
            ...prev.p19,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultCorrect,
          },
        }));
      }
      initData(pageName, userSubmissionList, defaultSubmission, isSubmitted);

      if (defaultAnswer > 0) {
        setIsSubmittable(true);
      }
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p19: { ...prev.p19, answer: index } }));
    changeData(pageName, 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageName);
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p19.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p19.isSubmitted && cardData.p19.answer === 0}
      submitBtnColor={
        cardData.p19.isSubmitted
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
      <Box useFull>
        <Box>
          <Box width='100%' background='white' lineHeight='48px' useRound>
            <Typography>
              &nbsp;&nbsp;&nbsp;&nbsp; This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant.
              After spending 25 years carrying tourists along rough roads, she developed a twisted spine and foot pain. In order to support Jane in
              taking care of Molly’s foot, we took part in positive reinforcement training, which involves using rewards{' '}
              <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>. When I gently touched her foot with a
              pole and called out, “foot,” she lifted it. We then rewarded her with a sweet piece of watermelon, her favorite fruit. This training
              helps reduce the stress that animals experience during controlled situations, such as treatment or a health examination. The good news
              is Molly seems to be adapting well, and I expect her to get better soon.
            </Typography>
          </Box>
          <Box marginTop={20}>
            <List
              gap={2}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p19.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p19.isSubmitted}
                  isError={cardData.p19.isSubmitted && cardData.p19.answer !== cardData.p19.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box>
                <Tag type={ETagLine.GREEN} label='답안' />
              </Box>
              <Box marginTop='12px'>
                <Typography>{cardData.p19.solution}</Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해설' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                  빈칸 다음에 필자는 막대기를 가지고 Molly의 발을 두드리며 “발”이라고 말하자 Molly가 발을 들어 올렸고, 그녀가 가장 좋아하는 과일인
                  달콤한 수박을 줌으로써 그녀의 행동을 보상했다고 했다. 따라서 긍정적 강화 훈련의 목표는 보상을 통해 바람직한 행동을 장려하기 위한
                  것이라고 추론할 수 있으므로 빈칸에 들어갈 말로 가장 적절한 것은 5번이다.
                </Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                  <p>
                    오늘 아침에 우리는 나이 든 코끼리인 Molly 덕분에 동물 치료에 대해 배울 수 있는 기회를 가졌다. 울퉁불퉁한 길을 따라 관광객들을
                    나르며 25년을 보낸 후, 그녀는 척추가 뒤틀리고 발에 통증이 생겼다. Molly의 발을 돌보는 데 있어 Jane을 도와주기 위해 우리는 바람직한
                    행동을 장려하기 위해 보상을 사용하는 것을 포함하는 긍정적 강화 훈련에 참여했다. 내가 막대기로 부드럽게 그녀의 발을 두드리며
                    "발"이라고 말하자, 그녀는 발을 들어 올렸다. 그러고 나서 우리는 그녀가 가장 좋아하는 과일인 달콤한 수박 한 조각을 상으로 주었다. 이
                    훈련은 치료나 건강 검진과 같은 통제된 상황 동안 동물들이 경험하는 스트레스를 줄이는 데 도움이 된다. 다행인 것은 Molly가 잘
                    적응하는 것 같고, 나는 그녀가 곧 좋아질 것으로 기대한다.
                  </p>
                  <p>1. 숨겨진 재능을 발견하기 위해</p>
                  <p>2. 특정 행동을 예측하기 위해</p>
                  <p>3. 동물의 본능을 조절하기 위해</p>
                  <p>4. 동물이 야생에 적응하는 것을 돕기 위해</p>
                </Typography>
              </Box>
            </Box>
          </BottomSheet>
        </Box>
      </Box>
    </Container>
  );
};

export default P19;
