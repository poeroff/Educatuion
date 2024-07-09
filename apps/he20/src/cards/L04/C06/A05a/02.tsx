import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L04C06A05a } from './store';

const P02 = () => {
  const pageNo = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A05a);

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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(pageNo, 1, 1, value);
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
              value: cardData.p02.answer,
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
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (3)​',
  };
  const questionInfo = {
    text: 'Q3. How will AI-powered neural implants change the way our brains work?​ ',
  };

  const answer = {
    value1: 'The brain’s role would shift from learning and storing information to processing the vast amounts of data provided by the implants.',
  };
  const content = `The success of AI-powered neural implants in health care is also expected to spread to other industries. Some futurists predict that these implants will become commercially available in the next 20 to 30 years and significantly change our daily lives. For example, advances in neural implant technology will make it possible to install in our brains software that can read our minds. This could enable us to play games, type social media messages, and stream music simply by thinking. There is also great potential for memory-enhancing brain implants, similar to computer memory chips. Such devices would allow us to capture and enhance memories, and even upload and download them using the digital cloud. We could look through our memories like a social media feed, vividly recall our favorite life moments, share memories with others, and back up our most valuable memories. Finally, AI-powered neural implants would revolutionize the way our brains work. The role of the brain would shift from learning and storing information to processing the vast amounts of data provided by the implants. Instead of simply memorizing information, we would be able to download knowledge, use our creativity to interpret it, and generate new ideas.`;

  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={{ value1: cardData.p02.answer }}
      answer={answer}
      onInputChange={e => {
        handleInputChange(e.target.value);
      }}
      isSubmitted={cardData.p02.isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P02;
