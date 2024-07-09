import { Box, Input, InputStatus, Typography } from '@maidt-cntn/ui';
import { useEffect, useMemo, useState } from 'react';
import HE10L04C05A04 from './HE10L04C05A04';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { isAnswer, getInputStatus } from '@maidt-cntn/util/CommonUtil';
import { useRecoilValue, useRecoilState } from 'recoil';
import { HE20L04C08A03Atom } from './store';

const P03 = () => {
  const currentPage = 'P03';
  const solution = 'singing';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(HE20L04C08A03Atom);
  const [isShow, setIsShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType<string>[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<string>(userId, pageId);
      if ((userSubmissionList?.length ?? 0) > 0) {
        setCardData(prev => {
          const value = userSubmissionList?.[0].inputData[0].value;
          const isCorrect = isAnswer(value ?? '', solution);
          const question = {
            answer: value,
            isCorrect,
          };
          return {
            ...prev,
            [currentPage]: {
              ...prev[currentPage],
              isSubmitted,
              question,
            },
          };
        });
      }

      initData(currentPage, userSubmissionList!, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleSubmit = () => {
    if (cardData[currentPage].isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isSubmitted: true } }));
    const { answer } = cardData[currentPage].question;
    const answerCheck = isAnswer(answer ?? '', solution);
    const userSubmission: userSubmissionType<string>[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: answer,
            isAnswer: true,
            isCorrect: answerCheck,
          },
        ],
      },
    ];
    submitData(currentPage, userSubmission);
  };

  const handleChange = (value?: string) => {
    setCardData(prev => {
      const newQuestion = { ...prev[currentPage].question, answer: value };
      return {
        ...prev,
        [currentPage]: {
          ...prev[currentPage],
          question: newQuestion,
        },
      };
    });
    changeData(currentPage, 1, 1, value);
  };
  const { isSubmitted } = cardData[currentPage];

  const [value, status] = useMemo(() => {
    const value = cardData[currentPage].question.answer;
    const isCorrect = isAnswer(value ?? '', solution ?? '');
    const submittedStatus = getInputStatus(isCorrect, value ?? '');
    const submitBeforeStatus = value ? InputStatus.ENABLE : InputStatus.DEFAULT;
    const status = isSubmitted ? submittedStatus : submitBeforeStatus;

    return [value, status] as [string, InputStatus];
  }, [cardData, isSubmitted]);
  return (
    <HE10L04C05A04
      keyword='sing'
      solution={solution}
      handleSubmit={handleSubmit}
      value={value}
      submitted={isSubmitted}
      isShowAnswer={isShow}
      questionBox={
        <Typography>
          <Box>
            3. They enjoyed a peaceful time in the garden with birds &nbsp;
            <Input
              value={value}
              onChange={e => handleChange(e.target.value)}
              placeholder='내용을 넣어 주세요.'
              width='260px'
              tabIndex={101}
              maxLength={16}
              status={status}
              disabled={isSubmitted}
              ariaLabel='답란'
            />
            &nbsp; in the trees.
          </Box>
        </Typography>
      }
    />
  );
};

export default P03;
