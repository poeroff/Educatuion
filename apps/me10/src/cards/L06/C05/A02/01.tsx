import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L06C05A02 } from './store';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L06C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const isSubmittable = isNotEmptyString(cardData.p01.userInputs);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };

  const questionInfo = {
    text: '장래 희망을 묻는 질문에 중학생들이 어떤 답을 가장 많이 할지 추측하여 써 봅시다.',
  };

  const imageInfo = {
    src: `/L06/C05/A02/ME1-L06-C05-A02-P01.jpg`,
    alt: [
      `디양한 직업을 가진 사람들이 유니폼을 입고 서 있다. `,
      `요리사, 선생님, 군인, 의사, 간호사, 배달원, 청소부 등이 있고, 사람들 사진 위에는 직업을 나타내는 문구가 다양한 색깔의 카드에 써 있다. `,
      `분홍색 카드 : Teacher`,
      `노란색 카드 : Webtoon artist`,
      `초록색 카드 : AI Scientist`,
      `하늘색 카드 : Soccer player`,
      `흰색 카드 : I don’t know.`,
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

  const handleInputOnChange = (value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => {
      return { ...prev, p01: { ...prev.p01, userInputs: truncateValue } };
    });
    changeData('P01', 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.userInputs,
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
            userInputs: userSubmissionList[0].inputData[0]?.value || cardData.p01.userInputs,
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
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!isSubmittable || cardData.p01.isSubmitted}
      submitBtnColor={!isSubmittable || cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box hAlign='center' useFull>
          <PinchZoom>
            <Image src={imageInfo.src} width='450px' height='334px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imageInfo.alt.map((item, idx) => (
                <p key={idx}> {item} </p>
              ))}
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea
            value={cardData.p01.userInputs}
            onChange={e => handleInputOnChange(e.target.value)}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답안 입력란'
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
