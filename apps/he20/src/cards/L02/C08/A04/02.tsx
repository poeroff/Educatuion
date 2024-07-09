import { Box, TMainHeaderInfoTypes, Input, SvgIcon, EStyleButtonTypes, InputStatus } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { List, Typography } from '@maidt-cntn/ui';
import arrow from '@maidt-cntn/assets/icons/arrow-icon.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

type TAnswers = { text: string; value: string };

const P02 = () => {
  const PAGE_NUMBER = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A04);
  const { userId } = useRecoilValue(studentAtom);

  const [data, setData] = useState<Array<TAnswers>>([
    {
      text: `What do the red words have in common in meaning?`,
      value: '',
    },
  ]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p02.answer,
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(PAGE_NUMBER, userSubmission);
  };

  const handleChange = (value: string) => {
    const updatedAnswers = value;
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData(PAGE_NUMBER, 1, 1, updatedAnswers);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  const questionInfo = {
    text: 'Discovering the Patterns',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitLabel='완료하기'
      submitBtnColor={cardData.p02.isSubmitted || !cardData.p02.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p02.isSubmitted || !cardData.p02.answer}
    >
      <Box useFull hAlign='center' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' background='white' useRound lineHeight='1'>
            <Box display='flex' alignItems='flex-start'>
              <div style={{ width: '40px', height: '40px' }}>
                <SvgIcon src={arrow} size='30px' style={{ verticalAlign: 'top' }}></SvgIcon>
              </div>
              <Typography>
                The doctor
                <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                  &nbsp;suggested&nbsp;
                </Typography>
                that the patient
                <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                  &nbsp;(should) exercise&nbsp;
                </Typography>
                for at least minutes every day.
              </Typography>
            </Box>
            <Box display='flex' alignItems='flex-start'>
              <div style={{ width: '40px', height: '40px' }}>
                <SvgIcon src={arrow} size='30px' style={{ verticalAlign: 'top' }}></SvgIcon>
              </div>
              <Typography>
                Mary
                <Typography color='var(--color-red-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                  &nbsp;insisted&nbsp;
                </Typography>
                that we
                <Typography color='var(--color-blue-800)' weight={'var(--font-weight-bold)'} useGap={false}>
                  &nbsp;(should) complete&nbsp;
                </Typography>
                the task quickly, but we couldn’t.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <List data={data} gap={20}>
        {({ value: item, index = 0 }) => (
          <Box>
            <Typography>{item?.text}</Typography>
            <Box marginTop={'8px'} paddingLeft={'10px'}>
              <Input
                width='100%'
                value={cardData.p02.answer}
                onChange={e => handleChange(e.target.value)}
                status={cardData.p02.answer ? InputStatus.ENABLE : InputStatus.DEFAULT}
                maxLength={100}
                readOnly={cardData.p02.isSubmitted}
                placeholder='내용을 넣어 주세요.'
              />
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default P02;
