import { ChangeEventHandler, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, TMainHeaderInfoTypes, TextView, Input, Typography, Image, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { L01C08A02 } from './store';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A02);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point1',
  };
  const questionInfo = {
    text: 'Discovering the Patterns',
  };

  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

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
            type: 'TEXT',
            value: cardData.p02.answer,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
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
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: event.target.value } }));
    changeData('P02', 1, 1, event.target.value);
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
      submitLabel='완료하기'
      submitDisabled={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted}
      submitBtnColor={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <Image src={'/L01/C08/A02/HE1-L01-C08-A02.jpg'} width='636px' height='49px' alt='' ariaDescribedby='example_desc' />
            <Box type='hidden' id='example_desc'>
              They set up a device which required two individuals to pull both ends of a rope at the same time. 빨간 색자 which가 이끄는 절이 which
              앞의 파란 색자 a device를 수식하는 모습을 나타낸다.
            </Box>
          </TextView>
        </Box>
        <Box marginTop='20px'>
          <Box>
            <Typography>What is the relationship between the red and the blue words?</Typography>
          </Box>
          <Box marginTop='10px'>
            <Input
              width='100%'
              value={cardData.p02.answer}
              onChange={handleChange}
              maxLength={50}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답 입력란'
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
