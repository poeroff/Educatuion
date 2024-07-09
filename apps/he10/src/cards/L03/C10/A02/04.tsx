import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image, BoxWrap, EStyleButtonTypes, Button, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L03C10A02 } from './store';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C10A02);
  const { userId } = useRecoilValue(studentAtom);
  const contentImage = '/L03/C10/A02/HE1-L03-C10-A02-P04.jpg';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Inventions Ahead of Their Time PAST',
  };

  const questionInfo = {
    text: 'Search for an amazing invention from ancient history and make Card News about the invention and present it.',
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
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, fileName: 'test file name' } }));
    changeData('P04', 1, 1, 'test file name');
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
              value: cardData.p04.fileName,
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
            fileName: userSubmissionList[0].inputData[0]?.value || cardData.p04.fileName,
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
      submitBtnColor={!isNotEmptyString(cardData.p04.fileName) || cardData.p04.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p04.isSubmitted ? true : !isNotEmptyString(cardData.p04.fileName)}
      onSubmit={handleSubmit}
    >
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='290px' height='300px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>Science News 카드뉴스 제목 Amazing Invention from Ancient History</p>
              <p>카드 1 Have you heard of Seokbinggo, a freezer made of rocks? 고대 돌 구조물에 초가 지붕이 있는 이미지</p>
              <p>
                카드 2 It’s an ancient refrigerator located in Gyeongju, Korea. Historical records say that Seokbinggo dates back to more than 1,500
                years ago. 돌 담으로 이루어져 있는 있는 터널 , 끝에서 빛이 비추고 있다 .
              </p>
              <p>
                카드 3 It has stone walls and openings at the top for releasing hot air to ensure efficient cooling. The floor is sloped to allow
                water from melted ice to go down. 물 터널과 물 펌프가 그려진 일러스트 . 물 터널과 펌프가 있는 장면 .{' '}
              </p>
            </Box>
          </PinchZoom>
        </Box>
        <Box hAlign='center' width='calc(100% - 430px)' useFull>
          <Box background='var(--color-grey-100)' height={'200px'} width={'400px'} useRound vAlign='center' hAlign='center' flexDirection='column'>
            {/* todo : 파일 업로드 추후 별도 개발 예정 */}
            <Button onClick={handleUploadFile} width='160px'>
              파일 업로드
            </Button>
            <Typography size={EStyleFontSizes['X-SMALL']}>파일 업로드는 sb 카드에서 미작업으로</Typography>
            <Typography size={EStyleFontSizes['X-SMALL']}>버튼 클릭시 제출하기 버튼 활성화 로직만 추가</Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P04;
