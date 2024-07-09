import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L07C05A02 } from './store';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L07C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const isSubmittable = isNotEmptyString(cardData.p01.userInputs);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };

  const questionInfo = {
    text: '다음 장소에 관해 알고 있는 것을 써 봅시다.',
  };

  const imageInfo = {
    src: `/L07/C05/A02/ME1-L07-C05-A02-P01.jpg`,
    alt: [
      `다양한 여행지의 도장들.`,
      `각 도장은 특정 장소를 상징하며, 다음과 같은 장소들이 포함되어 있다.`,
      `THE SAHARA: 사하라 사막을 나타내는 갈색 도장으로, 낙타와 사막이 그려져 있다.`,
      `NEPAL, EVEREST: 네팔의 에베레스트 산을 나타내는 초록색 도장으로, 산이 그려져 있다.`,
      `MAUNA KEA: 마우나 케아를 나타내는 초록색 도장으로, 산과 수평선이 그려져 있다.`,
      `EGYPT: 이집트를 나타내는 파란색 도장으로, 피라미드와 스핑크스가 그려져 있다.`,
      `SUDAN: 수단을 나타내는 분홍색 도장으로, 수단 지도가 그려져 있다.`,
      `ANTARCTICA: 남극을 나타내는 파란색 도장으로, 펭귄이 그려져 있다.`,
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
        <Box vAlign='center' hAlign='center'>
          <PinchZoom>
            <Image src={imageInfo.src} width='450px' height='258px' ariaDescribedby='img_desc' />
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
