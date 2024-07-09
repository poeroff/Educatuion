import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, Dropdown, InputStatus, Typography } from '@maidt-cntn/ui';
import { getInputStatus, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DropdownContainer } from './01';
import HE20L02C08A05b from './HE20L02C08A05b';
import { L02C08A05bAtom } from './store';

const P04 = () => {
  const currentPage = 'P04';
  const solution = 'improves';
  const dropDownOptions = ['(should) improve', solution];

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A05bAtom);
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
            isCorrect: answerCheck,
            isAnswer: true,
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
    <HE20L02C08A05b
      hint='최근 연구는 비타민 D가 학습과 기억력을 향상시킨다는 것을 시사한다.'
      solution={solution}
      handleSubmit={handleSubmit}
      value={value}
      submitted={isSubmitted}
      isShowAnswer={isShow}
      questionBox={
        <Typography>
          <Box>
            4. Recent studies suggest that vitamin D &nbsp;
            <DropdownContainer>
              <Dropdown
                isError={status === InputStatus.ERROR}
                readOnly={isSubmitted}
                width='264px'
                dropdownList={dropDownOptions}
                onClick={handleChange}
                selectedValue={value}
              />
            </DropdownContainer>
            &nbsp; learning and memory.
          </Box>
        </Typography>
      }
    />
  );
};

export default P04;
