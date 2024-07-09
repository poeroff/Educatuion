import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, Input, Label, PinchZoom, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C05A02 } from './store';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C05A02);
  const { userId } = useRecoilValue(studentAtom);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meTopic',
  };
  const questionInfo = {
    text: '가족과 함께하는 여행을 계획해 봅시다.',
  };
  const imageInfo = {
    src: `/L04/C05/A02/ME1-L04-C05-A02-P01.jpg`,
    alt: [
      `여행 계획표가 그려져 있다.`,
      `Trip Planner`,
      `가고 싶은 곳 : 빈 칸 세 개에 돌고래, 산, 빌딩이 각각 그려져 있다.`,
      `교통수단 : 빈 칸 세 개에 버스, 자동차, 비행기가 각각 그려져 있다.`,
      `여행 가서 하고 싶은 것 : 빈 칸이 있다.`,
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleInputChange = (answerNo: number, value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`answer${answerNo}`]: truncateValue } }));
    changeData('P01', 1, answerNo, value);
  };

  const isSubmittable = isNotEmptyString(cardData.p01.answer1) && isNotEmptyString(cardData.p01.answer2) && isNotEmptyString(cardData.p01.answer3);

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
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
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
            <Image src={imageInfo.src} width='349px' height='260px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imageInfo.alt.map((item, idx) => (
                <p key={idx}> {item} </p>
              ))}
            </Box>
          </PinchZoom>
        </Box>
        <Box width='100%' height='260px'>
          <Box>
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xxx-small'} background={'var(--color-black)'} />
              </Box>
              <Typography>가고 싶은 곳</Typography>
            </BoxWrap>
            <Box marginTop={'8px'} paddingLeft={'40px'}>
              <Input
                width='100%'
                value={cardData.p01.answer1}
                maxLength={100}
                placeholder='내용을 넣어 주세요.'
                ariaLabel={`답안 입력란 1`}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleInputChange(1, e.target.value)}
              />
            </Box>
          </Box>
          <Box marginTop={'20px'}>
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xxx-small'} background={'var(--color-black)'} />
              </Box>
              <Typography>교통수단</Typography>
            </BoxWrap>
            <Box marginTop={'8px'} paddingLeft={'40px'}>
              <Input
                width='100%'
                value={cardData.p01.answer2}
                maxLength={100}
                placeholder='내용을 넣어 주세요.'
                ariaLabel={`답안 입력란 2`}
                readOnly={cardData.p01.isSubmitted}
                onChange={e => handleInputChange(2, e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <Box marginTop={'20px'}>
        <BoxWrap>
          <Box>
            <Label type={'paint'} size={'xxx-small'} background={'var(--color-black)'} />
          </Box>
          <Typography>여행 가서 하고 싶은 것</Typography>
        </BoxWrap>
        <Textarea
          value={cardData.p01.answer3}
          onChange={e => handleInputChange(3, e.target.value)}
          width='100%'
          height='90px'
          placeholder='내용을 넣어 주세요.'
          ariaLabel='답안 입력란 3'
          readOnly={cardData.p01.isSubmitted}
        />
      </Box>
    </Container>
  );
};

export default P01;
