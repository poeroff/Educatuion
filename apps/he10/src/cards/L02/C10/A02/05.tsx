import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image, Textarea, BoxWrap, EStyleButtonTypes, Button } from '@maidt-cntn/ui';
import { useState, useCallback, useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L02C10A02 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P05 = () => {
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C10A02);
  const { userId } = useRecoilValue(studentAtom);

  const contentImage = '/L02/C10/A02/HE1-L02-C10-A02-P05.jpg';

  const imageText =
    '산 위로 달이 떠있는 하늘 그림 위에 써 있는 시 Love by Han Yongun Deeper than spring’s waters, Higher than the fall mountains, Brighter than the moon, Harder than a stone. If one asks about love, this is my reply.';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Beauty of Poems',
  };

  const questionInfo = {
    text: 'Choose a Korean poem that you want to introduce to people from other countries and translate the poem into English.',
  };

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
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: e.target.value } }));
    changeData('P05', 1, 1, e.target.value);
  };

  const handleSubmit = () => {
    if (!cardData.p05.isSubmitted) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p05.answer1,
            },
          ],
        },
      ];
      submitData('P05', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleUploadFile = useCallback(() => {
    setFileUploaded(true);
  }, []);

  useEffect(() => {
    return () => {
      saveData('P05');
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
      submitBtnColor={
        !isNotEmptyString(cardData.p05.answer1) || !fileUploaded || cardData.p05.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p05.isSubmitted ? true : !isNotEmptyString(cardData.p05.answer1) || !fileUploaded}
      onSubmit={handleSubmit}
    >
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='290px' height='300px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>산 위로 달이 떠있는 하늘 그림 위에 써 있는 시</p>
              <p>Love by Han Yongun</p>
              <p>Deeper than spring’s waters,</p>
              <p>Higher than the fall mountains,</p>
              <p>Brighter than the moon,</p>
              <p>Harder than a stone.</p>
              <p>If one asks about love,</p>
              <p>this is my reply.</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull width='calc(100% - 430px)'>
          <Box height={'100px'} background='var(--color-grey-100)' marginBottom={'10px'} hAlign='center' vAlign='center' useRound>
            <Button onClick={handleUploadFile} width='150px' height='40px'>
              파일 업로드
            </Button>
          </Box>
          <Box height='calc(100% - 100px)'>
            <Textarea
              placeholder='내용을 넣어 주세요.'
              value={cardData.p05.answer1}
              onChange={handleInputChange}
              readOnly={cardData.p05.isSubmitted}
              ariaLabel='답란'
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P05;
