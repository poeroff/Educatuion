import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L01C06A08 } from './store';

const imgContentA08P01 = {
  imgSrc: `/L01/C06/A08/HE2-L01-C06-A08-P01.jpg`,
  imgAlt: (
    <>
      <p>철장에 갇힌 새끼 곰의 사진과 Bears Around the World 라는 제목의 곰의 서식지 지도</p>
      <p>
        Brown Bear, Polar Bear, American Black Bear, Andean Bear, Giant Panda, Asiatic Black Bear, Sloth Bear, Sun Bear의 서식지가 지도 위에 표시되어
        있다.
      </p>
    </>
  ),
};

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A08);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Viewing Critically',
  };

  const questionText = `Look at the map and guess which species might be raised illegally, just like Ben and Lily, the bears mentioned in the main text.`;

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

  const onSubmitText = () => {
    if (!cardData.p01.isSubmitted) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: e.target.value } }));
    changeData('P01', 1, 1, e.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      submitLabel='완료하기'
      onSubmit={onSubmitText}
      submitDisabled={!isNotEmptyString(cardData.p01.answer1) || cardData.p01.isSubmitted}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull>
        <Box flexDirection='column' hAlign='center'>
          <PinchZoom>
            <Image src={`${imgContentA08P01.imgSrc}`} width='320px' height='128px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imgContentA08P01.imgAlt}
            </Box>
          </PinchZoom>
        </Box>
        <BoxWrap background='white' flexDirection='column' useFull>
          <Box height='50%' hAlign='center'>
            <Typography>{questionText}</Typography>
          </Box>
          <Textarea
            height='40%'
            placeholder='내용을 넣어 주세요.'
            value={cardData.p01.answer1}
            onChange={handleInputChange}
            readOnly={cardData.p01.isSubmitted}
            ariaLabel='답 입력란'
          />
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default P01;
