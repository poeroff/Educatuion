import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import HE01702 from '@maidt-cntn/pages/HE-017-02';
import { EChipButtonType, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A05b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A05b);
  const { userId } = useRecoilValue(studentAtom);

  const PAGE_ID = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (1)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q3. Check T (true) or F (false) according to the passage.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const content = `The success of AI-powered neural implants in health care is also expected to spread to other industries. 
  Some futurists predict that these implants will become commercially available in the next 20 to 30 years and significantly 
  change our daily lives. For example, advances in neural implant technology will make it possible to install in our brains 
  software that can read our minds. This could enable us to play games, type social media messages, and stream music simply 
  by thinking. There is also great potential for memory-enhancing brain implants, similar to computer memory chips. Such devices 
  would allow us to capture and enhance memories, and even upload and download them using the digital cloud. We could look through 
  our memories like a social media feed, vividly recall our favorite life moments, share memories with others, and back up our most
  valuable memories. Finally, AI-powered neural implants would revolutionize the way our brains work. The role of the brain would
   shift from learning and storing information to processing the vast amounts of data provided by the implants. Instead of simply 
   memorizing information, we would be able to download knowledge, use our creativity to interpret it, and generate new ideas.`;

  const questionList = ['The brain’s role will shift from learning information to storing a lot of data.'];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [''],
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = areArraysEqualIgnoringCaseAndWhitespace(cardData.p02.values, cardData.p02.answers);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.values,
            },
          ],
          isCorrect,
        },
      ];
      submitData(PAGE_ID, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (isSubmitted && userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            values: userSubmissionList[0].inputData[0]?.value || cardData.p02.values,
            isSubmitted: true,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleValueChange = (values: string[], type: EChipButtonType, index: number) => {
    const choiceValue = type === EChipButtonType.TRUE ? (values[index] === 'T' ? '' : 'T') : values[index] === 'F' ? '' : 'F';
    const originalValue = cardData.p02.values;
    const newValue = [...originalValue];
    newValue[index] = choiceValue;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, values: newValue } }));
    changeData(PAGE_ID, 1, 1, newValue);
  };

  const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
    if (value.length !== answer.length) {
      return false;
    }
    return value.every((val, index) => isAnswer(val, answer[index]));
  };

  return (
    <HE01702
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      questionList={questionList}
      answers={cardData.p02.answers}
      answerLabel='답안'
      values={cardData.p02.values}
      handleValueChange={handleValueChange}
      isSubmitted={cardData.p02.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P02;
