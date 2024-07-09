import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { IHE00401Data } from '@maidt-cntn/pages/HE-004-01';
import HE00401, { IApiInfo } from '@maidt-cntn/pages/HE-004-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes, TMarkType } from '@maidt-cntn/ui';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0101 } from './store';

const P13 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0101);

  const [mark, setMark] = useState<TMarkType>('none');
  const answer = 5;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 대화를 듣고, Kelly와 하준의 관계로 알맞은 것을 고르시오.',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P13.mp3',
  };

  const data: IHE00401Data[] = [
    {
      text: '남매',
    },
    {
      text: '사촌',
    },
    {
      text: '같은 반 친구',
    },
    {
      text: '선생님과 학생',
    },
    {
      text: '처음 만나는 사이',
    },
  ];

  const explanation = 'Kelly와 하준이가 Nice to meet you.라고 말하며 서로 인사하고 있는 것으로 보아 처음 만나는 사이임을 알 수 있다.';
  const script =
    'G: Hi, Minjun.\n B1: Hi, Kelly. This is my twin brother Hajun.\n G: Hi, Hajun. I’m Kelly. Nice to meet you.\n B2: Nice to meet you, too.\n G: Do we all go to the same school?\n B1: Yes, we do. Let’s have a great year.';
  const translation =
    'G: 안녕, 민준아.\n B1: 안녕, Kelly. 이 아이는 내 쌍둥이 동생 하준이야.\n G: 안녕, 하준아. 나는 Kelly야. 만나서 반가워.\n B2: 나도 만나서 반가워.\n G: 우리 모두 같은 학교에 다니는 거지?\n B1: 그래, 맞아. 멋진 한 해 보내자.';

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

  const isCorrect = useMemo(() => cardData.p13.selectedIdx === answer - 1, [cardData.p13.selectedIdx]);
  useEffect(() => {
    if (cardData.p13.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p13.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P13')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p13: {
            ...prev.p13,
            selectedIdx: userSubmissionList[0].inputData[0]?.value || prev.p13.selectedIdx,
            isSubmitted,
          },
        }));
      }
      initData('P13', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P13');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const apiInfo: IApiInfo = {
    pageId: 'P13',
    changeData,
    initData,
    submitDataWithResult,
    saveData,
    pageIds,
    userId,
  };

  const handleChangeMark = (selectedIdx: number | null) => {
    setMark(selectedIdx === answer - 1 ? 'correct' : 'incorrect');
  };

  return (
    <HE00401
      apiInfo={apiInfo}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      answer={answer}
      explanation={explanation}
      script={script}
      translation={translation}
      changeMark={handleChangeMark}
      data={data}
    />
  );
};

export default P13;
