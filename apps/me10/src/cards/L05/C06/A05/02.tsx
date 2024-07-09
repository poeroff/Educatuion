import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { Box, BoxWrap, IQuestionProps, Label, List, Radio, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L05C06A05 } from './store';

const P02 = () => {
  const pageNumber = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C06A05);
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

  const handleRadioOnChange = (value: number) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput: [contentInfo.P02.label[value]] } }));
    changeData(pageNumber, 1, 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (2)',
  };
  const questionInfo: IQuestionProps = {
    text: 'Choose the correct word.',
    mark: getMarking(cardData[pageNumber].isSubmitted, isAnswer(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0])),
  };
  const answer = {
    value1: cardData[pageNumber].solution[0],
  };
  const data = [
    {
      text: contentInfo.P02.text[0],
    },
    {
      text: contentInfo.P02.text[1],
    },
    {
      text: contentInfo.P02.text[2],
    },
  ];
  const content = (
    <>
      <Box>
        <Typography lineHeight={'48px'} color='var(--color-m-en-default)' fontWeight='var(--font-weight-bold)'>
          {contentInfo.P01.body[0]}
        </Typography>
        <Typography lineHeight={'48px'}>&nbsp;&nbsp;{contentInfo.P01.body[1]}</Typography>
        <Typography lineHeight={'48px'} color='var(--color-blue-600)' fontWeight='var(--font-weight-bold)'>
          {contentInfo.P01.body[2]}
        </Typography>
        <Typography lineHeight={'48px'}>&nbsp;&nbsp;{contentInfo.P01.body[3]}</Typography>
      </Box>
    </>
  );
  const customLeftDiv = (
    <>
      <Box useFull marginRight={'24px'} hAlign='center'>
        <BoxWrap flexDirection='column'>
          <Box>
            <Typography>I ordered Lemonade without a</Typography>
          </Box>
          <Box marginTop={'24px'} marginLeft={'12px'}>
            <Typography type='blank' width='250px' boxColor='var(--color-black)'></Typography>.
          </Box>
          <Box hAlign={'center'} marginTop={'24px'}>
            <List
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={cardData[pageNumber].userInput[0] === contentInfo.P02.label[index - 1]}
                  disabled={cardData[pageNumber].isSubmitted}
                  isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].userInput[0] !== cardData[pageNumber].solution[0]}
                  onClick={e => {
                    handleRadioOnChange(index - 1);
                  }}
                >
                  <Box>
                    <Label value={contentInfo.P02.label[index - 1]} marginRight={4} /> <Typography>{value?.text}</Typography>
                  </Box>
                </Radio>
              )}
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
      onInputChange={e => {}}
      onSubmit={handleSubmit}
      isSubmitted={cardData[pageNumber].isSubmitted}
      customLeftDiv={customLeftDiv}
      submitType='marking'
    />
  );
};

export default P02;
