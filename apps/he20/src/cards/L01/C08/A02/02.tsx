import { Box, TMainHeaderInfoTypes, Input, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import CustomWrap from './CustomWrap';
import usePageData from '../../../../hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C08A02_Atom } from './store';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const CURRENT_PAGE = 'P02';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };
  const defaultSubmission: userSubmissionType[] = [
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

  const { submitDataWithResult, initData, saveData, changeData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A02_Atom);

  const handleSubmit = () => {
    submit();
  };

  const submit = async () => {
    try {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      submitAnswer();
    } catch (e) {
      console.error(e);
    }
  };

  const isBtnDisabled = () => {
    return cardData.p02.answer.trim() === '' || cardData.p02.isSubmitted;
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === CURRENT_PAGE)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0].value || cardData.p02.answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0].value ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(CURRENT_PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitDataWithResult(CURRENT_PAGE, userSubmission, true);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, []);

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(CURRENT_PAGE, 1, 1, value);
  };

  return (
    <Container
      headerInfo={headerInfo}
      submitBtnColor={isBtnDisabled() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isBtnDisabled()}
      questionInfo={{ text: 'Discovering the Patterns' }}
      submitLabel='완료하기'
      onSubmit={handleSubmit}
    >
      <Box flexDirection='column' hAlign='center' gap='20px' useFull>
        <Box useRound background='white'>
          <CustomWrap>
            <FontWeight>
              <span> His friends </span>
              <RedText title='빨간색 글자'>encouraged </RedText>
              <GreenText title='초록색 글자'>him </GreenText>
              <BlueText title='파란색 글자'>to attend </BlueText>
              <span>the music festival.</span>
            </FontWeight>
          </CustomWrap>
          <CustomWrap>
            <FontWeight>
              <span>Our teacher </span>
              <RedText title='빨간색 글자'>advised </RedText>
              <GreenText title='초록색 글자'>us </GreenText>
              <BlueText title='파란색 글자'>not to compare </BlueText>
              ourselves with others.
            </FontWeight>
          </CustomWrap>
        </Box>
        <Box marginTop={'15px'}>
          <Box>
            <QuestionText>What is the relationship between the red, the green, and the blue words?</QuestionText>
          </Box>
          <Box marginTop={'8px'}>
            <Input
              readOnly={cardData.p02.isSubmitted}
              width='100%'
              value={cardData.p02.answer}
              maxLength={100}
              onChange={event => handleChange(event.target.value)}
              ariaLabel='답란'
              placeholder='내용을 넣어 주세요.'
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;

const FontWeight = styled.span`
  font-weight: var(--font-weight-bold);
  color: var(--color-grey-800);
`;

const QuestionText = styled.span`
  color: var(--color-grey-900);
  weight: var(--font-weight-medium);
`;

const RedText = styled.span`
  color: var(--color-red-800);
`;

const BlueText = styled.span`
  color: var(--color-blue-800);
`;

const GreenText = styled.span`
  color: var(--color-green-800);
`;
