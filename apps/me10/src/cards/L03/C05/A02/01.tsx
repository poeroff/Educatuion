import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C05A02 } from './store';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const isSubmittable = isNotEmptyString(cardData.p01.userInputs);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };

  const questionInfo = {
    text: '본문 속 개와 고양이의 특징에 관해 써 봅시다.',
  };

  const imageInfo = {
    src: `/L03/C05/A02/ME1-L03-C05-A02-P01.jpg`,
    alt: [`두 개의 사진이 나란히 있다.`, `첫 번째 사진 : 테니스 공을 입에 물고 달리는 개`, `두 번째 사진 : 창가에서 잠을 자고 있는 고양이`],
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
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!isSubmittable || cardData.p01.isSubmitted}
      submitBtnColor={!isSubmittable || cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        <Box hAlign='center' vAlign='center' useFull>
          <PinchZoom>
            <Image src={imageInfo.src} width='568px' height='260px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imageInfo.alt.map((item, idx) => (
                <p key={idx}> {item} </p>
              ))}
            </Box>
          </PinchZoom>
        </Box>
      </BoxWrap>
      <Box vAlign='center' marginTop={'20px'}>
        <Textarea
          value={cardData.p01.userInputs}
          onChange={e => handleInputOnChange(e.target.value)}
          width='100%'
          height='130px'
          placeholder='내용을 넣어 주세요.'
          ariaLabel='답안 입력란'
          readOnly={cardData.p01.isSubmitted}
        />
      </Box>
    </Container>
  );
};

export default P01;
