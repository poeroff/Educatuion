import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, ChipButton, EChipButtonType, EStyleButtonTypes, IQuestionProps, List, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import A03000103State from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A03000103State);

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

  const data = [
    {
      text: '실생활 상황에서 나눗셈의 의미를 알고, 나눗셈에서 몫의 의미를 알아요.',
    },
    {
      text: '곱셈과 나눗셈의 관계를 이해해요.',
    },
  ];

  const isInputComplete = useMemo(() => cardData.p01.checkList.some(Boolean), [cardData.p01.checkList]);

  const handleClick = (index: number) => {
    const newCheckList = [...cardData.p01.checkList];
    newCheckList[index] = Number(!newCheckList[index]);

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        checkList: newCheckList,
      },
    }));
    changeData('P01', 1, 1, newCheckList);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [0, 0],
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            checkList: userSubmissionList[0].inputData[0]?.value || cardData.p01.checkList,
            isSubmitted,
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

  const handleSubmit = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p01.checkList,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitBtnColor={!cardData.p01.isSubmitted && isInputComplete ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p01.isSubmitted || !isInputComplete}
      useRound
    >
      <Box useFull>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <Box key={index} vAlign='flex-start'>
              <Box marginRight={10} marginTop={6}>
                <ChipButton
                  type='button'
                  isActive={Boolean(cardData.p01.checkList[index - 1])}
                  status={EChipButtonType.CHECK}
                  size='32px'
                  onClick={() => handleClick(index - 1)}
                  readOnly={cardData.p01.isSubmitted}
                />
              </Box>
              <Typography>{value?.text}</Typography>
            </Box>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default P01;
