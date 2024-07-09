import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  TMarkType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AnswerTagBox from './components/AnswerTagBox';
import L01SP011State from './store';
import L01SP012State from '@/cards/L01/SP01-2/store';
interface P13Props {
  pageNumber?: string;
  store?: 'SP01-1' | 'SP01-2';
}
const P13 = ({ pageNumber = 'p13', store = 'SP01-1' }: P13Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP01-1' ? L01SP011State : L01SP012State);

  const PAGE_NUM = pageNumber.toUpperCase();

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 5;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 확인문제',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 다음을 듣고, 여학생이 하는 말의 주제로 가장 적절한 것을 고르시오.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-1/HE1-L01-SP01-1-P13.mp3',
  };

  const data: IHE00401Data[] = [
    {
      text: '학업적 성장의 중요성',
    },
    {
      text: '교내 동아리 가입 절차',
    },
    {
      text: '좋은 친구가 필요한 이유',
    },
    {
      text: '중학교와 고등학교의 차이점',
    },
    {
      text: '학교생활을 의미 있게 보내는 방법',
    },
  ];

  const explanation = '고등학교 생활을 의미 있게 만들어 줄 조언을 소개하고 있으므로 여학생이 하는 말의 요지로 가장 적절한 것은 5번이다.';
  const script =
    'G: Welcome, newcomers! I’m Maria, and I’m honored to represent the 2nd grade students here today. I know how all of you must feel—excited yet nervous, just like I was last year. But don’t worry: high school isn’t that different from middle school, and you’ll adapt well. Here are some tips to make your high school life meaningful. First, make new friends who can understand and support you. They’ll help you feel comfortable and handle tough times more easily. Second, build good relationships with your teachers. They’ll guide you academically and emotionally. Finally, explore various clubs and classes to discover your passion and plan your future. Remember, be sure to try new things as they provide opportunities for your growth. I hope your high school journey will be filled with amazing experiences. Thank you for listening, and once again, welcome to our high school.';
  const translation =
    '여: 환영합니다, 신입생 여러분! 저는 Maria이고, 오늘 이 자리에서 2학년 학생을 대표하게 되어 영광입니다. 여러분 모두가 어떤 기분을 느낄지 알고 있습니다. 작년에 제가 그랬던 것처럼, 신나지만 긴장되겠죠. 하지만 걱정하지 마세요. 고등학교는 중학교와 그렇게 다르지 않고, 여러분은 잘 적응할 거예요. 여기 여러분의 고등학교 생활을 의미 있게 만들어 줄 몇 가지 팁이 있습니다. 첫째, 여러분을 이해하고 지지해 줄 수 있는 새로운 친구들을 만드세요. 그들은 여러분이 편안함을 느끼고 힘든 시간을 더 쉽게 버틸 수 있게 도와줄 거예요. 둘째, 선생님들과 좋은 관계를 쌓으세요. 그들은 학업적으로나 정서적으로 여러분을 지도해 줄 거예요. 마지막으로, 여러분의 열정을 발견하고 여러분의 미래를 계획하기 위해 다양한 동아리와 수업을 탐색하세요. 새로운 것은 여러분의 성장을 위한 기회를 제공하므로 그것들을 꼭 시도해 보는 것을 잊지 마세요. 여러분의 고등학교 여정이 멋진 경험들로 가득하길 바랍니다. 들어주셔서 감사드리며, 다시 한번 우리 고등학교에 오신 것을 환영합니다.';

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

  const isCorrect = useMemo(() => cardData[pageNumber].selectedIdx === answer - 1, [cardData[pageNumber].selectedIdx]);
  useEffect(() => {
    if (cardData[pageNumber].isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData[pageNumber].isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            selectedIdx: userSubmissionList[0].inputData[0]?.value || prev[pageNumber].selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageNumber].selectedIdx,
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
    if (cardData[pageNumber].isSubmitted) return;

    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], selectedIdx: index } }));
    changeData(PAGE_NUM, 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData[pageNumber].isSubmitted) {
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
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={
        cardData[pageNumber].selectedIdx != null ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={cardData[pageNumber].selectedIdx === null}
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
              value={index - 1 === cardData[pageNumber].selectedIdx}
              onClick={() => handleRowClick(index - 1)}
              readOnly={cardData[pageNumber].isSubmitted}
              isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].selectedIdx !== answer - 1}
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
            {answer}
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
