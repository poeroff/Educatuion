import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C06A08 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A08);
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
            <Image src={'/L02/C06/A08/HE2-L02-C06-A08-P01.jpg'} width='346px' height='200px' ariaDescribedby='img_desc' />
          </PinchZoom>
          <Box type='hidden' id='img_desc'>
            <p>
              'Morning Times'라는 웹사이트 페이지를 보여주고 있다. 상단에 'HOME', 'WORLD', 'BUSINESS', 'TECH', 'LIFE & ARTS', 'SPORTS', 'OPINION' 메뉴
              항목이 있고, 'BUSINESS'가 선택되어 있다. 제목은 "Dark Patterns: Deception or Marketing Strategy?"이고, 부제목은 "Companies and critics
              hold conflicting views on this issue."이다.
            </p>
            <p>
              오른쪽에는 만화 이미지가 있다. 한 남자가 스마트폰을 들고 있고, 화면에는 'Payment Successful!'이라고 적혀 있다. 남자는 머리를 감싸며 "No!
              Not again! I hit the payment button!"이라고 말한다. 그의 셔츠에는 'Steve Lee'라고 쓰여 있다. 그의 주변에는 빨간 뱀이 있고, 뱀은 "Sss...
              thank you, Ssssteve... One of my sssspecial, sssneaky dark patterns... sss..."라고 말한다.
            </p>
            <p>
              이 만화는 'Dark Patterns'라는 개념을 비꼬고 있다. 'Dark Patterns'는 사용자가 실수로 원하지 않는 행동을 하게 만드는 기만적인 디자인
              패턴을 의미한다.
            </p>
          </Box>
        </Box>
        <BoxWrap background='white' flexDirection='column' useFull>
          <Box width='100%' height='50%' hAlign='center'>
            <Typography>What do you think the cartoon is trying to say? Have you seen similar cartoons in newspapers or on the Internet?</Typography>
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
