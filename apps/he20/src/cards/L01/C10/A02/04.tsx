import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image, Textarea, BoxWrap, EStyleButtonTypes, Button } from '@maidt-cntn/ui';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import { useState, useCallback, useEffect } from 'react';
import { L01C10A02 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P04 = () => {
  const contentImage = '/L01/C10/A02/HE2-L01-C10-A02-P04.jpg';

  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C10A02);
  const { userId } = useRecoilValue(studentAtom);

  const imageText =
    '손바닥 모양의 나뭇잎이 그려진 나무 포스터 위에 글자 More Colors, a More Beautiful WorldThe poster shows a tree with many hand shaped leaves in different colors. It’s amazingthat each leaf looks different, yet together, they look so beautiful and harmonious. We designed this poster to show how cultural diversity helps create a better world.';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Public Service Announcements for a Better World',
  };

  const questionInfo = {
    text: 'Make and describe a poster or a video clip for a public service announcement and share it to the class.',
  };

  const handleUploadFile = useCallback(() => {
    setFileUploaded(true);
  }, []);

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
      submitBtnColor={
        !isNotEmptyString(cardData.p04.answer1) || !fileUploaded || cardData.p04.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p04.isSubmitted ? true : !isNotEmptyString(cardData.p04.answer1) || !fileUploaded}
      onSubmit={handleSubmit}
    >
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='180px' height='250px' alt='' />
            <Box type={'hidden'}>{imageText}</Box>
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
              placeholder='Describe your poster or a video clip.'
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
