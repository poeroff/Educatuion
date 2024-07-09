import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, TMainHeaderInfoTypes, BoxWrap, File, Image, PinchZoom, EStyleButtonTypes, IFileRef } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { FileSampleCardStore } from '../../store';

const FileUploadSample = () => {
  const { initData, submitData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();

  const [cardData, setCardData] = useRecoilState(FileSampleCardStore);
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileUploadRef = useRef<IFileRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Create and Present',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Look at the example to create your own.',
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

  const handleChange = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (url: string) => {
    setImageUrl(url);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: url,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList && userSubmissionList.length > 0) {
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted } }));
        setImageUrl(userSubmissionList[0]?.inputData[0]?.value || '');
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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
      onSubmit={() => fileUploadRef.current?.handleFileSubmit()}
      submitDisabled={cardData.p01.isSubmitted || imageUrl === ''}
      submitBtnColor={!cardData.p01.isSubmitted && imageUrl !== '' ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap useFull>
        <Box>
          <PinchZoom>
            <Image
              src='/L01/C10/A02/HE1-L01-C10-A02-P05.jpg'
              alt='왼쪽에는 물로 이루어진 남성 캐릭터, 오른쪽에는 불로 이루어진 여성 캐릭터가 서로 마주보고 걷고 있다. '
              width='270px'
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <File
            cardStoreInfo={{ subjectCode, cardPath: 'L01/C10/A02', page: 'P01', userId }}
            imgSrc={imageUrl}
            onChange={handleChange}
            onSubmit={handleSubmit}
            readOnly={cardData.p01.isSubmitted}
            ref={fileUploadRef}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default FileUploadSample;
