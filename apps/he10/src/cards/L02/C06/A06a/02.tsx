import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C06A06a } from './store';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNo = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A06a);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
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
          p02: {
            ...prev.p02,
            userAnswer: userSubmissionList[0].inputData[0]?.value || cardData.p02.userAnswer,
            isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: { [name]: truncateValue } } }));
    changeData(pageNo, 1, 1, truncateValue);
  };

  const onSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p02.userAnswer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(pageNo, userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. What did the two old men do from the afternoon to the evening?',
  };

  const content =
    'Just before noon, we arrived at a small town called Murupara. “Where do we go now?” I asked Nani. He did not reply, but he was searching inside himself, staring at the small houses. Then, at a street corner, he told us to turn. After turning the corner, we saw an old man standing in front of a house. He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We must hurry.”  Now that day seems like a dream to me. I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked. All through the quiet afternoon and into the evening, they recalled missing names. I had a strange feeling that there were other people in the room. I felt as if people from the past were looking over the shoulders of the two old men to see if the work was correct. Finally, they stopped. It was done. After a moment of silence, the old man whispered to Nani, “Goodbye, friend.” Crying, they pressed their noses together to say goodbye.';

  const answerLabel = '예시답안';
  const answer = { value1: 'They recalled missing names.' };

  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      answerLabel={answerLabel}
      answer={answer}
      onInputChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = target;
        handleInputChange(name, value);
      }}
      isSubmitted={cardData.p02.isSubmitted}
      onSubmit={onSubmit}
      inputs={cardData.p02.userAnswer}
    />
  );
};

export default P02;
