import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L03C06A08 } from './store';

const imgContentA08P01_1 = {
  imgSrc: `/L03/C06/A08/HE1-L03-C06-A08-P01-01.jpg`,
  imgAlt: `음원에서 사람의 귀까지 소리가 전달되는 과정을 표현하는 그림과 글자 Sound Source Air Vibrations Sound Waves`,
};

const imgContentA08P01_2 = {
  imgSrc: `/L03/C06/A08/HE1-L03-C06-A08-P01-02.jpg`,
  imgAlt: (
    <>
      <h1>Constructive Interference와 Destructive Interference가 각각 어떻게 작용하는지를 설명해주는 그래프</h1>
      <h2>Constructive Interference, Wave 1 지점과 Peak 지점이 물결 그래프로 이어져 있다</h2>
      <p>Wave 2 지점과 Peak 지점이 물결 그래프로 이어져 있다</p>
      <p>두 개의 그래프가 합쳐진 물결 그래프</p>
      <h2>Destructive Interference</h2>
      <p>Wave 1 지점과 Peak 지점이 물결 그래프로 이어져 있다</p>
      <p>Wave 2 지점과 valley 지점이 물결 그래프로 이어져 있다</p>
      <p>두 개의 그래프가 합쳐진 그래프는 물결이 없다.</p>
    </>
  ),
};

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A08);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Viewing Critically',
  };

  const questionText = `Look at the picture and guess what happens inside your ear when you hear sound.`;

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
            <Image src={`${imgContentA08P01_1.imgSrc}`} width='320px' height='160px' alt={`${imgContentA08P01_1.imgAlt}`} />
          </PinchZoom>
          <div style={{ height: '16px' }} />
          <PinchZoom>
            <Image src={`${imgContentA08P01_2.imgSrc}`} width='320px' height='80px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              {imgContentA08P01_2.imgAlt}
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
