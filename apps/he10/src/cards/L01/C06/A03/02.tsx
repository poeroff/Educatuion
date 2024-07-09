import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Box, Button, BoxWrap, EStyleButtonTypes, Radio, Typography, Scroll, IQuestionProps, List } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L01C06A03 } from './store';
import { IHeaderInfo } from './index';

const P02 = ({ headerInfo }: IHeaderInfo) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A03);
  const { userId } = useRecoilValue(studentAtom);

  const radioLabels = [{ text: 'a student' }, { text: 'a professor' }, { text: 'an envolutionary biologist' }];

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q1. Who is the speaker?',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const contents = `It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and why is it important?`;

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

  const handleButtonOnClick = () => {
    setOpened(!opened);
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
      <BoxWrap useFull>
        <Box width='50%' height='400px' hAlign='center' alignItems='flex-start' flexDirection='column'>
          <List
            data={radioLabels}
            row={({ value, index = 1 }) => (
              <Radio
                key={index}
                type='circle'
                align='vertical'
                gap={8}
                label={value?.text}
                ariaLabel={index + '번 보기'}
                value={cardData.p02.answer === index ? true : false}
                fontSize='var(--font-size-28)'
                onClick={() => {
                  handleChange(index);
                }}
                tabIndex={101 + index}
                isError={cardData.p02.isSubmitted && cardData.p02.answer !== cardData.p02.solution}
                readOnly={cardData.p02.isSubmitted}
              />
            )}
          />
        </Box>
        {opened ? (
          <Box width='450px' useFull useRound background={'blue'}>
            <ButtonWrap>
              <Button color={EStyleButtonTypes.SECONDARY} label='닫기' ariaLabel='닫기' width='56px' height='44px' onClick={handleButtonOnClick} />
            </ButtonWrap>
            <Scroll height='85%' tabIndex={0}>
              <Typography lineHeight='48px'>{contents}</Typography>
            </Scroll>
          </Box>
        ) : (
          <Box width='450px' useFull useRound background={'blue'} hAlign={'center'}>
            <Button color={EStyleButtonTypes.SECONDARY} useRound label='지문보기' ariaLabel='지문보기' width='118px' onClick={handleButtonOnClick} />
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
