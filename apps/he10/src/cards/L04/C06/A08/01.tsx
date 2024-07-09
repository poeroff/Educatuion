import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L04C06A08 } from './store';

const imgContentA08P01 = {
  imgSrc: `/L04/C06/A08/HE1-L04-C06-A08-P01.jpg`,
  imgAlt: (
    <>
      <p>이 이미지는 커피 찌꺼기의 선형 및 순환 경제를 나타내고 있다.</p>
      <p>Coffee Beans: 커피콩에서 시작한다.</p>
      <p>Coffee Shop: 커피숍에서는 커피콩을 사용해 커피를 만든다.</p>
      <p>Spent Coffee Grounds (SCGs): 커피를 만드는 과정에서 커피 찌꺼기가 발생한다.</p>
      <p>Methane, CO₂: 커피 찌꺼기는 매립되거나 소각되어 메탄과 이산화탄소가 발생할 수 있다.</p>
      <p>Collection Center: 순환 경제에서는 커피 찌꺼기가 수집 센터로 이동 한다.</p>
      <p>Fertilizer Company: 수집 센터에서 커피 찌꺼기는 비료 회사로 보내 진다.</p>
      <p>Organic Fertilizer: 비료 회사는 커피 찌꺼기를 유기농 비료로 가공 한다.</p>
      <p>Eco-Friendly Farm: 유기농 비료는 친환경 농장에서 농산물을 재배하는 데 사용 된다.</p>
      <p>Farm Produce: 재배된 농산물은 식품 아이템으로 가공 된다.</p>
      <p>Food Items: 이 식품 아이템은 다시 커피숍 체인으로 돌아가며 순환이 완료 된다.</p>
      <p>이 과정은 커피 찌꺼기를 단순히 폐기하는 대신, 자원으로 재활용하여 환경 영향을 줄이는 순환 경제를 보여 준다.</p>
    </>
  ),
};

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A08);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Viewing Critically',
  };

  const questionText = `Look at the picture and write about how we can recycle coffee grounds at home.`;

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
      onSubmit={onSubmitText}
      submitDisabled={!isNotEmptyString(cardData.p01.answer1) || cardData.p01.isSubmitted}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull>
        <Box flexDirection='column' hAlign='center'>
          <PinchZoom>
            <Image src={`${imgContentA08P01.imgSrc}`} width='320px' height='224px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imgContentA08P01.imgAlt}
            </Box>
          </PinchZoom>
        </Box>
        <BoxWrap background='white' flexDirection='column' useFull>
          <Box height='50%' hAlign='center'>
            <Typography>{questionText}</Typography>
          </Box>
          <Textarea
            height='40%'
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
