import {
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  IQuestionProps,
  TMarkType,
  EStyleButtonTypes,
  Box,
  List,
  Radio,
  Label,
  BottomSheet,
} from '@maidt-cntn/ui';
import { useEffect, useMemo, useState } from 'react';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03SP011State } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import AnswerTagBox from './components/AnswerTagBox';

const P13 = ({ _page = 'p13' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

  const [mark, setMark] = useState<TMarkType>('none');
  const ANSWER = 3;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 다음을 듣고, 선생님이 하는 말의 주제로 가장 적절한 것을 고르시오.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P13.mp3',
  };

  const data: IHE00401Data[] = [
    {
      text: '거스를 수 없는 자연의 힘',
    },
    {
      text: '창의적 사고의 예시와 필요성',
    },
    {
      text: '자연에서 영감을 받은 발명품',
    },
    {
      text: '일상생활에 유용한 식물성 소재',
    },
    {
      text: '자연 친화적인 제품 구매의 필요성',
    },
  ];

  const explanation =
    '자연에서 영감을 얻은 발명품인 Velcro와 샤워 커튼에 관해 설명하고 있으므로, 선생님이 하는 말의 주제로 가장 적절한 것은 3번이다.';
  const script =
    'W: Hello, students! Today, I’d like to share two fascinating inventions inspired by nature. First, have you ever heard of Velcro? It’s a sticky fabric commonly used in clothes and bags. You might wonder how it was invented. Well, back in the 1940s, a Swiss man took his dog for a walk and noticed plant seeds sticking to his dog’s fur. This observation led him to design something similar himself, which later became known as Velcro. Another creative invention from nature is the shower curtain, inspired by lotus leaves. A lotus leaf can resist water and stay dry, so this feature is widely applied to make waterproof materials. There are many other nature-inspired inventions to explore. Now, let’s research them and discover how we can learn from nature to improve our daily lives.';
  const translation =
    '여: 안녕하세요, 학생 여러분! 오늘 저는 자연에서 영감을 얻은 흥미로운 발명품 두 가지를 공유하려 합니다. 먼저, Velcro에 대해 들어본 적이 있나요? 그것은 옷과 가방에 흔히 사용되는 끈끈한 직물입니다. 여러분은 이것이 어떻게 발명되었는지 궁금할 것입니다. 1940년대에, 한 스위스 남자가 강아지를 산책시키다가 강아지의 털에 식물의 씨앗이 달라붙는 것을 발견했습니다. 이 관찰로 그는 직접 그것과 비슷한 것을 디자인하게 되었고, 그것이 나중에 Velcro로 알려지게 되었습니다. 자연에서 나온 또 다른 창의적인 발명품은 연잎에서 영감을 받은 샤워 커튼입니다. 연잎은 물에 강하고 건조한 상태를 유지할 수 있고, 이러한 특징은 방수 재료를 만드는 데 널리 적용됩니다. 자연에서 영감을 받은 살펴볼 만한 다른 발명품이 많이 있습니다. 이제 그것들을 조사하고 자연으로부터 배울 수 있는 우리 일상생활을 개선할 방법을 함께 생각해 봅시다.';

  const [isShow, setShow] = useState<boolean>(false);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: null,
        },
      ],
    },
  ];

  const isCorrect = useMemo(() => cardData.p13.selectedIdx === ANSWER - 1, [cardData.p13.selectedIdx]);
  useEffect(() => {
    if (cardData.p13.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p13.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => {
          let selectedIdx = prev.p13.selectedIdx;
          if (Number.isInteger(userSubmissionList[0].inputData[0]?.value)) {
            selectedIdx = userSubmissionList[0].inputData[0]?.value;
          }
          return {
            ...prev,
            p13: {
              ...prev.p13,
              selectedIdx,
              isSubmitted,
            },
          };
        });
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p13: { ...prev.p13, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p13.selectedIdx,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleRowClick = (index: number) => {
    if (cardData.p13.isSubmitted) return;

    setCardData(prev => ({ ...prev, p13: { ...prev.p13, selectedIdx: index } }));
    changeData(PAGE_NUM, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p13.isSubmitted) {
      setShow(!isShow);
    } else {
      submitAnswer();
    }
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p13.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={cardData.p13.selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p13.selectedIdx === null}
      onSubmit={handleSubmitClick}
      bodyId='targetContainer'
    >
      <Box vAlign='center' useFull>
        <List<IHE00401Data>
          gap={24}
          data={data}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              value={index - 1 === cardData.p13.selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData.p13.isSubmitted}
              isError={cardData.p13.isSubmitted && cardData.p13.selectedIdx !== ANSWER - 1}
            >
              <Box vAlign='center'>
                <Label value={index} marginRight={8} />
                {value?.text}
              </Box>
            </Radio>
          )}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {ANSWER}
          </AnswerTagBox>
          <AnswerTagBox label='해설'>{explanation}</AnswerTagBox>
          <AnswerTagBox label='스크립트'>{script}</AnswerTagBox>
          <AnswerTagBox label='해석'>{translation}</AnswerTagBox>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
