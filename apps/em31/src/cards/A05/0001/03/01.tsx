import { useEffect } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A05_0001_03 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05_0001_03);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPreview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />이 단원에서 공부할 내용을 살펴보세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p01.data[0].userAnswer,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.p01.data[1].userAnswer,
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.p01.data[2].userAnswer,
              isAnswer: true,
            },
            {
              subKey: 4,
              type: 'BOOLEAN',
              value: cardData.p01.data[3].userAnswer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const handleChange = (index: number) => {
    if (!cardData.p01.isSubmitted) {
      const updatedAnswers = cardData.p01.data.map((item, idx) => (idx === index - 1 ? { ...item, userAnswer: !item.userAnswer } : { ...item }));
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          data: updatedAnswers,
        },
      }));
      updatedAnswers.map((item, index) => changeData('P01', 1, index + 1, item.userAnswer));
    } else return;
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            data: prev.p01.data.map((item, index) => {
              return {
                ...item,
                userAnswer: userSubmissionList[0].inputData[index]?.value || cardData.p01.data[index].userAnswer,
              };
            }),
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitDisabled={cardData.p01.data.every(item => !item.userAnswer) || cardData.p01.isSubmitted}
      submitBtnColor={
        cardData.p01.data.every(item => !item.userAnswer) || cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW
      }
      onSubmit={onSubmit}
      useRound
    >
      <Box useFull>
        <List gap={24} data={cardData.p01.data}>
          {({ value, index }) => (
            <Box key={index} vAlign='center'>
              <Box marginRight={10} vAlign='center'>
                <ChipButton
                  key={index}
                  type='button'
                  status={EChipButtonType.CHECK}
                  isActive={value?.userAnswer}
                  size='32px'
                  onClick={() => handleChange(index as number)}
                  readOnly={cardData.p01.isSubmitted}
                />
              </Box>
              <Typography>{value?.contents}</Typography>
            </Box>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P01;
