import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C05A02 } from './store';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const isSubmittable = isNotEmptyString(cardData.p01.userInputs);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };

  const questionInfo = {
    text: '그림을 보고, 30년 전 중학생의 일상과 자신의 일상을 비교해 보고 간단히 써 봅시다.',
  };

  const imageInfo = {
    src: `/L02/C05/A02/ME1-L02-C05-A02-P01.jpg`,
    alt: [
      `필름지 모양의 테두리 안에 세 개의 사진이 나란히 있다.`,
      `첫 번째 사진 : 아침에 침대에서 일어나는 여학생`,
      `두 번째 사진 : 책장에서 책을 한가득 꺼내고 있는 여학생`,
      `세 번째 사진 : 책상앞에 앉아 라디오 음악을 들으며 종이에 무언가 쓰고 있는 여학생`,
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
        <Box hAlign='center' useFull>
          <PinchZoom>
            <Image src={imageInfo.src} width='712px' height='260px' ariaDescribedby='img_desc' alt='' />
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
