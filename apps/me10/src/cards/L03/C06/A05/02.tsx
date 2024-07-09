import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { Box, BoxWrap, Dropdown, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L03C06A05 } from './store';

const P02 = () => {
  const pageNumber = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A05);
  const { userId } = useRecoilValue(studentAtom);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            userInput: [userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInput[0]],
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const isCorrect = isAnswer(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0]);
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].userInput[0],
              isCorrect: isAnswer(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0]),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput: [value] } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getStatus = (answer: string, solution: string) => {
    return cardData[pageNumber].isSubmitted && !isAnswer(answer, solution);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (2)',
  };
  const questionInfo: IQuestionProps = {
    text: 'Choose the correct word.',
    mark: getMarking(cardData[pageNumber].isSubmitted, isAnswer(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0])),
  };
  const answer = {
    value1: cardData[pageNumber].solution[0],
  };
  const content = (
    <>
      <Box>
        <Typography>&nbsp;&nbsp;{contentInfo.P01.body[0]}</Typography>
      </Box>
    </>
  );
  const customLeftDiv = (
    <>
      <Box useFull marginRight={'24px'} vAlign='center'>
        <BoxWrap flexDirection='column'>
          <Box>
            <Typography>The new member is a cat, </Typography>
          </Box>
          <Box width={'250px'}>
            <Dropdown
              width='250px'
              type='down'
              dropdownList={cardData[pageNumber].dropArr}
              selectedValue={cardData[pageNumber].userInput[0]}
              readOnly={cardData[pageNumber].isSubmitted}
              onClick={value => handleChange(value ?? '')}
              ariaLabel='답 선택칸'
              isError={getStatus(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0])}
            />
          </Box>
        </BoxWrap>
      </Box>
    </>
  );
  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={{ value1: cardData[pageNumber].userInput[0] }}
      answer={answer}
      onInputChange={e => {
        handleChange(e.target.value);
      }}
      onSubmit={handleSubmit}
      isSubmitted={cardData[pageNumber].isSubmitted}
      customLeftDiv={customLeftDiv}
      submitType='marking'
    />
  );
};

export default P02;
