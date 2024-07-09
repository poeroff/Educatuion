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

const P18 = ({ _page = 'P18' }: { _page?: string }) => {
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
    text: <Typography>2. 주어진 글 다음에 이어질 글의 순서로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const pageName = _page.toUpperCase();

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

  const questionData: { question: string; answer: { info: string; description: string }[] } = {
    question:
      'Today, we did something special for Ben and Lily. These two baby bears were rescued after they had been raised illegally in a tiny cage on a farm for many years.',
    answer: [
      {
        info: '(A)',
        description:
          'Then, we hung the honey-log feeders on trees near the bears’ habitat. As bears are intelligent and curious creatures, they can become bored and stressed when lacking mental and physical stimulation.',
      },
      {
        info: '(B)',
        description:
          'The honey-log feeders stimulate their natural curiosity and keep them as active as they would be in the wild. After a while, Ben and Lily approached the feeders and started eating the honey inside. They are so cute!',
      },
      {
        info: '(C)',
        description:
          'To help the bears restore their natural instincts, we carried out some special activities known as “behavioral enrichment.” For example, we made honey-log feeders for the bears. First, we made several holes in a log and filled them with honey.',
      },
    ],
  };

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
      submitDataWithResult(pageName, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageName)?.pageId;
    if (cardData.p18.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p18.answer;
      const defaultCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p18: {
            ...prev.p18,
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
    setCardData(prev => ({ ...prev, p18: { ...prev.p18, answer: index } }));
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
      <Box useFull>
        <Box>
          <Box tabIndex={101} width='100%' background='white' lineHeight='48px' useRound>
            {questionData.question}
          </Box>
          <Box width='100%' background='white' lineHeight='48px' useRound marginTop={20}>
            {questionData.answer.map((data, index) => (
              <BoxWrap key={data.info}>
                <Typography tabIndex={110 + index * 2 + 1}>{data.info}</Typography>
                <Typography tabIndex={110 + index * 2 + 2}>{data.description}</Typography>
              </BoxWrap>
            ))}
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
                  value={index === cardData.p18.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p18.isSubmitted}
                  isError={cardData.p18.isSubmitted && cardData.p18.answer !== cardData.p18.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography tabIndex={150 + index}>{value?.text}</Typography>
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
                <Typography>{cardData.p18.solution}</Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해설' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                  주어진 글은 Ben과 Lily가 수년 동안 농장의 작은 우리에서 불법적으로 자란 후에 구출되었다는 내용이다. 이어서 이 곰들이 타고난 본능을
                  회복하는 것을 돕는 활동인 ‘행동 강화’를 위해 꿀 통나무 공급 장치를 만들었다는 내용의 (C)가 이어지는 것이 자연스럽다. (C)에서 만든
                  장치를 곰들의 서식지 근처 나무에 매달았다는 내용의 (A)가 이어지고, 그 후에 Ben과 Lily가 그 장치에 다가가 꿀을 먹기 시작했다는 (B)로
                  마무리되는 것이 자연스럽다.
                </Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                  오늘 우리는 Ben과 Lily를 위해 특별한 일을 했다. 이 두 마리의 아기 곰은 수년 동안 농장의 작은 우리에서 불법적으로 길러진 후에
                  구조되었다. (C) 그 곰들이 타고난 본능을 회복하는 것을 돕기 위해, 우리는 "행동 강화"라고 알려진 몇 가지 특별한 활동을 수행했다. 예를
                  들어서, 우리는 곰들을 위해 통나무 꿀 먹이통을 만들었다. 먼저 우리는 통나무에 몇 개의 구멍을 뚫어 꿀을 채웠다. (A) 그러고 나서 우리는
                  통나무 꿀 먹이통을 곰들의 서식지 근처 나무에 매달았다. 곰들은 똑똑하고 호기심이 많은 생명체이기 때문에 그들이 정신적, 신체적 자극이
                  부족할 때 지루해하고 스트레스를 받을 수 있다. (B) 통나무 꿀 먹이통은 그들의 타고난 호기심을 자극하고 야생에서만큼 활동적이 되도록
                  해준다. 얼마 후에 Ben과 Lily는 그 먹이통에 다가가서 안에 들어있는 꿀을 먹기 시작했다. 그들은 정말 귀엽다!
                </Typography>
              </Box>
            </Box>
          </BottomSheet>
        </Box>
      </Box>
    </Container>
  );
};

export default P18;
