import { ChangeEventHandler, useEffect } from 'react';
import { Box, TMainHeaderInfoTypes, TextView, Input, Typography, Image, EStyleButtonTypes, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L01C08A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point2',
  };
  const questionInfo = {
    text: 'Discovering The Patterns',
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

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
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
      submitLabel={'완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted}
      submitBtnColor={!isNotEmptyString(cardData.p02.answer) || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull flexDirection='column' paddingTop='20px'>
        <TextView title='보기' height='100px'>
          <Box useFull hAlign='center' vAlign='center' paddingTop='10px'>
            <Image src='/L01/C08/A04/HE1-L01-C08-A04.jpg' width='636px' alt='' ariaDescribedby='example_desc' />
            <Box type='hidden' id='example_desc'>
              (When) Paired with new partners, the chimpanzees usually failed to get the food. 빨간 색자 (When) Paired가 파란 색자 the chimpanzees와
              선으로 연결되어 있다.
            </Box>
          </Box>
        </TextView>
        <Box marginTop='20px'>
          <Box hAlign='flex-start'>
            <Typography>Focusing on the forms of the red words and the green word, think about how they relate to the blue words.</Typography>
          </Box>
          <Box hAlign='flex-start' marginTop='10px' marginRight='20px' gap='10px'>
            <Input
              width='100%'
              minWidth='600px'
              textAlign='start'
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답 입력란'
              value={cardData.p02.answer}
              onChange={handleInputOnChange}
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
