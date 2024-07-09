import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image, Textarea, BoxWrap, EStyleButtonTypes, Button } from '@maidt-cntn/ui';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import { useState, useCallback, useEffect } from 'react';
import { L02C10A02 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P04 = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>('');
  const contentImage = '/L02/C10/A02/HE2-L02-C10-A02-P04.jpg';

  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C10A02);
  const { userId } = useRecoilValue(studentAtom);

  const imageText = '장영실의 초상화가 그려져 있는 삼천원짜리 지폐';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Stories of the People on Our Money',
  };

  const questionInfo = {
    text: 'Design and describe your own bill and present it.',
  };

  // const handleSubmit = useCallback(() => {
  //   setIsSubmitted(true);
  // }, []);

  // const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setInputContent(event.target.value);
  // };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: e.target.value } }));
    changeData('P04', 1, 1, e.target.value);
  };

  const handleSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer1,
            },
          ],
        },
      ];
      submitData('P04', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleUploadFile = useCallback(() => {
    setFileUploaded(true);
  }, []);

  useEffect(() => {
    return () => {
      saveData('P04');
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
      submitLabel='제출하기'
      submitBtnColor={!isNotEmptyString(cardData.p04.answer1) || !fileUploaded ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p04.isSubmitted ? true : !isNotEmptyString(cardData.p04.answer1) || !fileUploaded}
      onSubmit={handleSubmit}
    >
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='290px' height='300px' alt={imageText} />
          </PinchZoom>
        </Box>

        <Box useFull width='calc(100% - 430px)'>
          <Box height={'100px'} background='var(--color-grey-100)' marginBottom={'10px'} hAlign='center' vAlign='center' useRound>
            <Button onClick={handleUploadFile} width='100px' height='40px'>
              파일 업로드
            </Button>
          </Box>
          <Box height='calc(100% - 100px)'>
            <Textarea
              placeholder='Describe your own bill.'
              value={cardData.p04.answer1}
              onChange={handleInputChange}
              readOnly={cardData.p04.isSubmitted}
              ariaLabel='답란'
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P04;
