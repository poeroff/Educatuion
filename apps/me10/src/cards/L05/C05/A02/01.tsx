import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EImageType, EStyleButtonTypes, Image, Input, PinchZoom, Question, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C05A02 } from './store';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C05A02);
  const { userId } = useRecoilValue(studentAtom);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };
  const questionInfo = {
    text: '일상생활에서 환경 보호를 얼마나 잘 하고 있는지 점수를 매겨 봅시다.',
  };
  const imageInfo = {
    src: `/L05/C05/A02/ME1-L05-C05-A02-P01.jpg`,
    alt: [
      `환경 보호 활동을 평가하는 설문지`,
      `각 질문에 대해 활동 빈도를 0에서 5까지 점수로 평가한다.`,
      `점수는 "전혀 하지 않음" (0)에서 "항상 함" (5)까지의 척도를 나타내고 있다.`,
      `설문지 항목과 점수 표시는 다음과 같다.`,
      `1. I walk to school.`,
      `0 1 2 3 4 5`,
      `2. I carry my own water bottle.`,
      `0 1 2 3 4 5`,
      `3. I bring a cloth bag for shopping.`,
      `0 1 2 3 4 5`,
      `4. I use both sides of the paper.`,
      `0 1 2 3 4 5`,
      `5. I take a shower for 5 minutes or less.`,
      `0 1 2 3 4 5`,
      `점수 범위에 따른 평가 결과는 아래와 같다.`,
      `0~10: 작은 나무 아이콘`,
      `11~20: 중간 나무 아이콘`,
      `21~25: 큰 나무 아이콘`,
    ],
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

  const handleInputChange = (value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: truncateValue } }));
    changeData('P01', 1, 1, value);
  };

  const isSubmittable = isNotEmptyString(cardData.p01.answer1);

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      return;
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
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
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!isSubmittable || cardData.p01.isSubmitted}
      submitBtnColor={!isSubmittable || cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull>
          <PinchZoom pinchType={'image'}>
            <Image src={imageInfo.src} type={EImageType.IMG} width='378px' height='192px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imageInfo.alt.map((item, idx) => (
                <p key={idx}> {item} </p>
              ))}
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull vAlign='center'>
          <Box>
            <Question size={'small'}>My score :</Question>
            <Input
              width='100%'
              value={cardData.p01.answer1}
              maxLength={100}
              placeholder='내용을 넣어 주세요.'
              ariaLabel={`답안 입력란`}
              readOnly={cardData.p01.isSubmitted}
              onChange={e => handleInputChange(e.target.value)}
            />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
