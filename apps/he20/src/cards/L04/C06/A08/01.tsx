import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A08 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A08);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Viewing Critically',
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
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!isNotEmptyString(cardData.p01.answer1) || cardData.p01.isSubmitted}
      onSubmit={onSubmitText}
    >
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={'/L04/C06/A08/HE2-L04-C06-A08-P01.jpg'} width='346px' height='200px' ariaDescribedby='img_desc' />
          </PinchZoom>
          <Box type='hidden' id='img_desc'>
            <p>
              YOU MAY ALSO LIKE 라는 제목이 적힌 이미지 이다. 컵을 들고 있는 한쪽 팔이 인공 팔로 대체된 여성과 그 옆에 신체 보조기구의 역사가 기록된
              연표가 있다.
            </p>
            <p>
              around 950-710 B.C. : Wooden Toe around1508 : Götz’s Iron Hand World War I : 1914-1918 World War II : 1939-1945 1945 : Bert Shepard’s
              Leg Today : AI-Powered Artificial Limbs
            </p>
          </Box>
        </Box>
        <BoxWrap background='white' flexDirection='column' useFull>
          <Box width='100%' height='50%' hAlign='center'>
            <Typography>Look at the timeline to see how artificial limbs have evolved over time.</Typography>
          </Box>
          <Textarea
            height='40%'
            rows={4}
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
