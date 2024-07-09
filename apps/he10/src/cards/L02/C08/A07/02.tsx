import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, EStyleButtonTypes, Image, TMainHeaderInfoTypes, TextView, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L02C08A07 } from './store';

const P02 = () => {
  const pageKey = 'p02';
  const pageNumber = 'P02';

  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A07);
  const { userId } = useRecoilValue(studentAtom);

  const isSubmittable = isNotEmptyString(cardData.p02.userInput);

  /* default 제출 값 */
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammer',
  };
  const questionInfo = {
    text: 'Make your own quote using the structures below.',
  };

  const handleTextAreaOnChange = (value: string) => {
    setCardData(prev => {
      return { ...prev, [pageKey]: { ...prev[pageKey], userInput: value } };
    });
    changeData(pageNumber, 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].userInput,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            userInput: userSubmissionList[0].inputData[0].value || cardData[pageKey].userInput,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
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
      submitLabel='완료하기'
      submitDisabled={!isSubmittable || cardData[pageKey].isSubmitted}
      submitBtnColor={!isSubmittable || cardData[pageKey].isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      bodyId='targetContainer'
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <Box margin={'16px'} height={'auto'}>
              <Image src={contentInfo.P02.image[0].src} width={'636px'} alt={contentInfo.P02.image[0].alt} />
              <Image src={contentInfo.P02.image[1].src} width={'636px'} alt={contentInfo.P02.image[1].alt} />
            </Box>
          </TextView>
        </Box>
        <Box height='210px' marginTop='10px' useFull>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            ariaLabel='서술형 입력란'
            value={cardData[pageKey].userInput}
            readOnly={cardData[pageKey].isSubmitted}
            onChange={event => {
              handleTextAreaOnChange(event.target.value);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
