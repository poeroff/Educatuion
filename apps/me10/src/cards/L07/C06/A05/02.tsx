import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { Box, BoxWrap, IQuestionProps, Input, InputStatus, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { checkAnswers, getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L07C06A05 } from './store';

interface IListenAndAnswer {
  originText: string;
  label?: string;
  labelColor?: string;
}

const P02 = () => {
  const pageNumber = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L07C06A05);
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
        {
          subKey: 2,
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
            userInput: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData[pageNumber].userInput[i]),
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const results = checkAnswers(cardData[pageNumber].userInput, cardData[pageNumber].solution);
    const isCorrect = results.every(item => item);

    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

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
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageNumber].userInput[1],
              isCorrect: isAnswer(cardData[pageNumber].userInput[1], cardData[pageNumber].solution[1]),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleInputChange = (value: string, idx: number) => {
    setCardData(prev => {
      return {
        ...prev,
        [pageNumber]: {
          ...prev[pageNumber],
          userInput: [...prev[pageNumber].userInput.slice(0, idx), value, ...prev[pageNumber].userInput.slice(idx + 1)],
        },
      };
    });
    changeData(pageNumber, 1, 1 + idx, value);
  };

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData[pageNumber].isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (2)',
  };
  const questionInfo: IQuestionProps = {
    text: 'Which is larger, the Sahara or Antarctica? Fill in the blanks.',
    mark: getMarking(
      cardData[pageNumber].isSubmitted,
      checkAnswers(cardData[pageNumber].userInput, cardData[pageNumber].solution).every(item => item),
    ),
  };
  const answer = {
    value1: cardData[pageNumber].solution[0],
    value2: cardData[pageNumber].solution[1],
  };
  const content = (
    <>
      <Box marginTop={'24px'}>
        <List<IListenAndAnswer>
          data={contentInfo.P01.body}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              {value?.labelColor && value?.label ? (
                <Box width='100px' textAlign='center' background={value?.labelColor} height='fit-content' padding='4px 0' borderRadius='8px'>
                  <Typography useGap={false} weight='var(--font-weight-bold)'>
                    {value?.label}
                  </Typography>
                </Box>
              ) : (
                <Box width='100px' textAlign='center' height='fit-content' padding='4px 0' borderRadius='8px'></Box>
              )}
              <Box width={'270px'}>
                <Typography useGap={true}>{value?.originText}</Typography>
              </Box>
            </BoxWrap>
          )}
        />
      </Box>
    </>
  );
  const customLeftDiv = (
    <>
      <Box useFull marginRight={'24px'} hAlign='center'>
        <BoxWrap flexDirection='column'>
          <Box marginTop={'24px'}>
            <Input
              width='calc(100% - 190px)'
              maxLength={100}
              placeholder=''
              ariaLabel='답안 입력란 1'
              status={getStatus(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0])}
              onChange={e => {
                handleInputChange(e.target.value, 0);
              }}
              value={cardData[pageNumber].userInput[0]}
              readOnly={cardData[pageNumber].isSubmitted}
            />
            <Typography>is larger than</Typography>
          </Box>
          <Box marginTop={'24px'}>
            <Typography>the </Typography>
            <Input
              width='calc(100% - 100px)'
              maxLength={100}
              placeholder=''
              ariaLabel='답안 입력란 2'
              status={getStatus(cardData[pageNumber].userInput[1], cardData[pageNumber].solution[1])}
              onChange={e => {
                handleInputChange(e.target.value, 1);
              }}
              value={cardData[pageNumber].userInput[1]}
              readOnly={cardData[pageNumber].isSubmitted}
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
      inputs={{ value1: cardData[pageNumber].userInput[0], value2: cardData[pageNumber].userInput[1] }}
      answer={answer}
      onInputChange={e => {}}
      onSubmit={handleSubmit}
      isSubmitted={cardData[pageNumber].isSubmitted}
      customLeftDiv={customLeftDiv}
      submitType='marking'
    />
  );
};

export default P02;
