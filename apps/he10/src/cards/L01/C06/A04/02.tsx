import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Box, Button, BoxWrap, EStyleButtonTypes, Typography, Dropdown, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C06A04 } from './store';
import { IHeaderInfo } from './index';

const P02 = ({ headerInfo }: IHeaderInfo) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A04);
  const { userId } = useRecoilValue(studentAtom);

  const dropdownLabels = ['communicative', 'survival'];

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q2. Choose the correct words to complete the sentence.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const contents =
    'To answer these questions, I’d like to tell you about my childhood companion dog, Sparky.' +
    ' When we played with a ball, I noticed that he responded well to my gestures.' +
    ' The responsive behavior of dogs also caught the attention of an evolutionary anthropologist, Brian Hare.' +
    ' He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor.' +
    ' He placed two cups on the ground with food hidden under only one of them. When he pointed to the cup with the food, the dogs found it easily.' +
    ' The wolves, however, struggled and chose cups at random, paying no attention to his gestures.' +
    ' Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves.' +
    ' He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness.' +
    ' This explanation sounds reasonable according to several evolutionary biologists.' +
    ' They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves.' +
    ' Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = cardData.p02.answer === cardData.p02.solution;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: index } }));
    changeData('P02', 1, 1, index);
  };

  const handleClickButton = () => {
    setOpened(!opened);
  };

  const handleClickDropdown = (value?: string) => {
    const answerIndex = dropdownLabels.findIndex(label => label === value);
    if (answerIndex >= 0) {
      handleChange(answerIndex + 1);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitLabel='채점하기'
      submitDisabled={cardData.p02.answer === 0 || cardData.p02.isSubmitted}
      submitBtnColor={
        cardData.p02.answer === 0 ? EStyleButtonTypes.SECONDARY : !cardData.p02.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull boxGap={24}>
        <Box flex='1' hAlign={'center'} alignSelf='center'>
          <Typography style={{ display: 'inline-block' }}>
            Dogs have developed
            <Dropdown
              dropdownList={dropdownLabels}
              width={'240px'}
              onClick={handleClickDropdown}
              aria-label='답 선택칸'
              readOnly={cardData.p02.isSubmitted}
              selectedValue={dropdownLabels[cardData.p02.answer - 1]}
              isError={cardData.p02.isSubmitted ? (cardData.p02.answer === cardData.p02.solution ? false : true) : false}
            />{' '}
            skills with humans.
          </Typography>
        </Box>
        {opened ? (
          <Box width='450px' useFull useRound background={'blue'} alignSelf='center' line-height='48px'>
            <ButtonWrap>
              <Button color={EStyleButtonTypes.SECONDARY} label='닫기' ariaLabel='닫기' width='56px' height='44px' onClick={handleClickButton} />
            </ButtonWrap>
            <Scroll height='85%' tabIndex={0}>
              {contents}
            </Scroll>
          </Box>
        ) : (
          <Box width='450px' useFull useRound background={'blue'} hAlign={'center'} alignSelf='center'>
            <Button color={EStyleButtonTypes.SECONDARY} useRound label='지문보기' ariaLabel='지문보기' width='118px' onClick={handleClickButton} />
          </Box>
        )}
      </BoxWrap>
    </Container>
  );
};

export default P02;

const ButtonWrap = styled.div`
  padding: 6px 14px;
  display: flex;
  justify-content: flex-end;
`;
