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

const P02 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L06C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const isSubmittable = isNotEmptyString(cardData.p02.userInputs);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };

  const questionInfo = {
    text: '자신의 성격을 나타내는 단어를 모두 써 봅시다.',
  };

  const imageInfo = {
    src: `/L06/C05/A02/ME1-L06-C05-A02-P02.JPG`,
    alt: [
      `8개의 다양한 색깔의 단어가 있다. `,
      `초록색 글자 nice`,
      `연두색 글자 helpful`,
      `주황색 글자 brave`,
      `파란색 글자 shy`,
      `보라색 글자 kind`,
      `빨간색 글자 warm`,
      `분홍색 글자 sweet`,
      `하늘색 글자 cool`,
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
      return { ...prev, p02: { ...prev.p02, userInputs: truncateValue } };
    });
    changeData('P02', 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
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
              value: cardData.p02.userInputs,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userInputs: userSubmissionList[0].inputData[0]?.value || cardData.p02.userInputs,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitDisabled={!isSubmittable || cardData.p02.isSubmitted}
      submitBtnColor={!isSubmittable || cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box hAlign='center' useFull>
          <PinchZoom>
            <Image src={imageInfo.src} width='450px' height='188px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imageInfo.alt.map((item, idx) => (
                <p key={idx}> {item} </p>
              ))}
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Textarea
            value={cardData.p02.userInputs}
            onChange={e => handleInputOnChange(e.target.value)}
            placeholder='내용을 넣어 주세요.'
            ariaLabel='답안 입력란'
            readOnly={cardData.p02.isSubmitted}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
