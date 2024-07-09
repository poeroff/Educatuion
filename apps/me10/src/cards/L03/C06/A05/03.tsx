import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { Box, BoxWrap, IQuestionProps, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L03C06A05 } from './store';

const P03 = () => {
  const pageNumber = 'P03';
  const { changeData, initData, submitData, saveData } = usePageData();
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
          type: 'TEXTAREA',
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

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput[0],
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput: [value] } }));
    changeData(pageNumber, 1, 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (2)',
  };
  const questionInfo: IQuestionProps = {
    text: 'What about you?',
  };
  const content = (
    <>
      <Box>
        <Typography>&nbsp;{contentInfo.P01.body[0]}</Typography>
      </Box>
    </>
  );
  const customLeftDiv = (
    <>
      <BoxWrap flexDirection='row' marginBottom={'24px'}>
        <Box width={'20px'}>
          <Typography> Q.</Typography>
        </Box>
        <Box>
          <BoxWrap flexDirection='column'>
            <Typography>여러분이 Cathy라면, 어떤</Typography>
            <Typography>기분일까요?</Typography>
            <Box marginTop={'24px'}>
              <Textarea
                name={'value1'}
                width={'100%'}
                height={'290px'}
                readOnly={cardData.P03.isSubmitted}
                value={cardData.P03.userInput[0]}
                onChange={e => handleInputChange(e.target.value)}
                placeholder='내용을 넣어 주세요.'
                ariaLabel={'질문에 대한 답을 입력'}
              />
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
    </>
  );
  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={{ value1: cardData[pageNumber].userInput[0] }}
      onInputChange={e => {
        handleInputChange(e.target.value);
      }}
      onSubmit={handleSubmit}
      isSubmitted={cardData[pageNumber].isSubmitted}
      customLeftDiv={customLeftDiv}
      submitType='complete'
    />
  );
};

export default P03;
