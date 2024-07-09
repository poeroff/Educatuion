import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { BoxWrap, TMainHeaderInfoTypes, Box, Textarea, Typography, Scroll, EStyleButtonTypes, Image, PinchZoom, ArrowBox } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L01C06A08 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A08);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Viewing Critically',
  };

  const questionText = `The speaker is using a slide for his lecture. Do you think the slide is well-made? How can we organize presentation slides effectively?`;

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
    const truncateValue = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: truncateValue } }));
    changeData('P01', 1, 1, truncateValue);
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
      bodyId='targetContainer'
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
      <BoxWrap>
        <Box width='40%' hAlign={'center'} useFull>
          <PinchZoom>
            <Image src={'/L01/C06/A08/HE1-L01-C06-A08-P01.jpg'} alt='' width='358px' height='207px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>남자 선생님이 개와 늑대 사진 아래 각각의 설명이 적힌 인포그래픽 슬라이드를 설명하고 있다.</p>
              <p>이미지 제목</p>
              <p>Dogs vs. Wolves (Case 1)</p>
              <p>슬라이드 텍스트</p>
              <p>Dogs followed Dr. Hare’s Gestures found the cup with the food easily</p>
              <p>Wolves paid no attention to his gestures struggled and chose cups randomly</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box width='60%'>
          <Box background='white' width={'100%'} whiteSpace='pre-line' useRound>
            <Scroll maxHeight='430px' tabIndex={0}>
              <Typography>{questionText}</Typography>
            </Scroll>
          </Box>
          <Box width={'100%'} marginTop={10}>
            <Textarea
              placeholder='내용을 넣어 주세요.'
              value={cardData.p01.answer1}
              onChange={handleInputChange}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel='답란'
              height='200px'
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
