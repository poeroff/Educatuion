import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image, Button, EStyleButtonTypes } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L04C10A02 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P05 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C10A02);
  const { userId } = useRecoilValue(studentAtom);
  const contentImage = '/L04/C10/A02/HE1-L04-C10-A02-P05.jpg';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Green Policies Around the World',
  };

  const questionInfo = {
    text: 'Design a poster to promote your policy and present it.',
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

  const handleUploadFile = () => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, fileName: 'file name example' } }));
    changeData('P05', 1, 1, 'file name example');
    console.log(cardData.p05);
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
              value: cardData.p05.fileName,
            },
          ],
        },
      ];
      submitData('P05', userSubmission);
      console.log(submitData);
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
            fileName: userSubmissionList[0].inputData[0]?.value || cardData.p05.fileName,
            isSubmitted,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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
      submitBtnColor={!isNotEmptyString(cardData.p05.fileName) || cardData.p05.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p05.isSubmitted ? true : !isNotEmptyString(cardData.p05.fileName)}
      onSubmit={handleSubmit}
    >
      <Box hAlign='center'>
        <PinchZoom>
          <Image src={contentImage} width='800px' height='300px' alt='' ariaDescribedby='img_desc' />
          <Box type='hidden' id='img_desc'>
            <p>핸드폰 화면 속 99 개의 이메일</p>
            <p>지우기 버튼과 휴지통 이미지</p>
            <p>E-mail Cleaning Day</p>
            <p>Storing too many e-mails can lead to a lot of greenhouse gas emissions.</p>
            <p>On Earth Day, April 22nd, open your mail box and make it eco-friendly.</p>
            <p>Help save the environment by deleting unnecessary e- mails!</p>
          </Box>
        </PinchZoom>
      </Box>

      {/* todo : 파일 업로드 추후 별도 개발 예정 */}
      <Box display='flex' justifyContent='right' marginTop={'10px'}>
        <Button onClick={handleUploadFile} width='150px' height='40px'>
          파일 업로드
        </Button>
      </Box>
    </Container>
  );
};

export default P05;
