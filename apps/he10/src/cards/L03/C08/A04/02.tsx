import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, TMainHeaderInfoTypes, Input, Typography, Image, IQuestionProps, InputStatus, EStyleButtonTypes, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C08A04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageKey = 'p02';
  const pageNo = pageKey.toUpperCase();

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A04);

  const isAllFilled = useMemo(() => isNotEmptyString(cardData[pageKey].answer), [cardData]);
  const submitBtnColor = useMemo(() => {
    if (cardData[pageKey].isSubmitted) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData, isAllFilled]);
  const status = useMemo(() => (isNotEmptyString(cardData[pageKey].answer) ? InputStatus.ENABLE : InputStatus.DEFAULT), [cardData, pageKey]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  const questionInfo: IQuestionProps = {
    text: 'Discovering the Patterns',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const handleInputChange = (value: string) => {
    const truncatedValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncatedValue } }));
    changeData(pageNo, 1, 1, truncatedValue);
  };

  const handleSubmit = () => {
    if (!cardData[pageKey].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
            },
          ],
        },
      ];

      submitData(pageNo, userSubmission);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={'완료하기'}
      submitDisabled={cardData[pageKey].isSubmitted || !isAllFilled}
      onSubmit={handleSubmit}
      submitBtnColor={submitBtnColor}
    >
      <Box hAlign='center'>
        <PinchZoom>
          <Image
            src='/L03/C08/A04/HE1-L03-C08-A04.jpg'
            width={'100%'}
            alt={`
              It is possible for drivers to focus on driving without being disturbed
              It, to focus가 빨간 색자로, for drivers가 파란 색자로 표현되어있다.
            `}
          />
        </PinchZoom>
      </Box>
      <Box marginTop='35px'>
        <Typography>What are the functions of the colored words?</Typography>
      </Box>
      <Box marginTop='24px' vAlign='center'>
        <Input
          value={cardData[pageKey].answer}
          onChange={event => handleInputChange(event.target.value)}
          placeholder='내용을 넣어 주세요.'
          width='100%'
          maxLength={2000}
          status={status}
          readOnly={cardData[pageKey].isSubmitted}
          ariaLabel='답란'
          marginLeft={5}
        />
      </Box>
    </Container>
  );
};

export default P02;
