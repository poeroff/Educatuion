import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, TextView, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C05A02 } from './store';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C05A02);
  const { userId } = useRecoilValue(studentAtom);
  const isSubmittable = cardData.p01.userInputs !== '';

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };
  const questionInfo = {
    text: '인터넷에서 school survival kit에 대해 검색해 보고, 검색 내용을 써 봅시다.',
  };
  const tip = 'Survival kit는 생존에 필요한 물건 꾸러미인데, 이 의미에서 따온 school survival kit는 학교 생활에 필요한 물건을 담은 꾸러미예요.';
  const imageInfo = {
    src: `/L01/C05/A02/ME1-L01-C05-A02-P01.jpg`,
    alt: [
      `인터넷 검색창의 school survival kit 검색 결과로 나온 네 종류의 키트.`,
      `첫 번째 키트에는 칫솔과 치약, 머리끈, 립밤, 핸드크림, 컵, 사탕, 노트, 샤프, 샤프심, 지우개, 테니스 공이 담겨 있다.`,
      `두 번째 키트에는 칫솔과 치약, 빗, 머리끈과 머리핀, 물티슈, 다섯 색상의 색연필, 수첩, 사탕, 풀, 테니스 공이 담겨 있다.`,
      `세 번재 키트에는 가위, 풀, 접착식 메모지, 거울, 초콜렛, 휴지, 형광펜, 연필, 가글, 핸드크림이 담겨 있다.`,
      `네 번째 키트에는 다이어리와 펜, 다섯 색상의 사인펜, 칫솔 통, 안경, 밴드, 막대사탕, 구급약, 공이 담겨 있다.`,
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
    setCardData(prev => {
      return { ...prev, p01: { ...prev.p01, userInputs: value } };
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
        <Box width='47%'>
          <PinchZoom>
            <Image src={imageInfo.src} width='440px' height='260px' ariaDescribedby='img_desc' style={{ borderRadius: '8px' }} />
            <Box type='hidden' id='img_desc'>
              {imageInfo.alt.map((item, idx) => (
                <p key={idx}> {item} </p>
              ))}
            </Box>
          </PinchZoom>
        </Box>
        <Box flex='1'>
          <TextView title='TIP' height='230px' line-height='48px' padding='20px 16px'>
            <Scroll>
              <Typography>{tip}</Typography>
            </Scroll>
          </TextView>
        </Box>
      </BoxWrap>
      <Box vAlign='center' marginTop={'20px'}>
        <Textarea
          value={cardData.p01.userInputs}
          onChange={e => handleInputOnChange(e.target.value)}
          width='100%'
          height='130px'
          placeholder='내용을 넣어 주세요.'
          alt='답안 입력란'
          readOnly={cardData.p01.isSubmitted}
        />
      </Box>
    </Container>
  );
};

export default P01;
