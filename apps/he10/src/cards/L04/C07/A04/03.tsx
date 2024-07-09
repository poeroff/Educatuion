import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, BoxWrap, ChipButton, EChipButtonType, EStyleButtonTypes, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04C07A04State from './store';

interface IData {
  title: string;
  question: string;
  value?: string;
}

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A04State);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };

  const questionInfo = {
    text: 'Self-Review',
  };

  const dataList = useMemo(
    () => [
      {
        title: 'Input Reception',
        question: '커피박이 환경에 미치는 영향과 그것의 해결 방안을 파악했나요?',
        value: cardData.p03.value1,
      },
      {
        title: 'Output Production',
        question: '글의 주제와 관련된 정보를 구체적으로 전달했나요?',
        value: cardData.p03.value2,
      },
    ],
    [cardData.p03],
  );

  const handleChangeValue = (value: string | undefined, index: number) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, [`value${index}`]: value } }));
    changeData('P03', 1, index, value);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: undefined,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: undefined,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            value1: userSubmissionList[0].inputData[0]?.value || cardData.p03.value1,
            value2: userSubmissionList[0].inputData[1]?.value || cardData.p03.value2,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.value1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.value2,
          },
        ],
      },
    ];
    submitData('P03', userSubmission);
  };

  const handleSubmit = () => {
    submitAnswer();
  };

  const renderChipButtons = (value: IData, index: number) => {
    const statuses = [EChipButtonType.GOOD, EChipButtonType.NOT_GOOD, EChipButtonType.BAD];
    return statuses.map(status => (
      <ChipButton
        key={status}
        type='radio'
        name={`chip-radio`}
        status={status}
        isActive={value.value === status}
        size={'38px'}
        onClick={() => handleChangeValue(value.value !== status ? status : undefined, index + 1)}
        isDisabled={cardData.p03.isSubmitted}
      />
    ));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={cardData.p03.isSubmitted || !dataList.every(item => item.value) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitDisabled={cardData.p03.isSubmitted || !dataList.every(item => item.value)}
    >
      <List data={dataList} gap={20}>
        {({ value, index = 1 }) => (
          <BoxWrap alignItems='start' justifyContent='space-between' marginTop='24px' useFull>
            <Box width='20%'>
              <Typography weight={700} color={'var(--color-blue-700)'} useGap={false}>
                {value?.title}
              </Typography>
            </Box>
            <Box width='80%'>
              <BoxWrap
                alignItems='start'
                justifyContent='space-between'
                paddingBottom='20px'
                borderBottom={(index === 4 && '0') || '1px dotted var(--color-grey-200)'}
              >
                <Box width='75%'>
                  <Typography useGap={false}>{value?.question}</Typography>
                </Box>
                <Box width='20%'>
                  <BoxWrap>{value && renderChipButtons(value, index - 1)}</BoxWrap>
                </Box>
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default P03;
