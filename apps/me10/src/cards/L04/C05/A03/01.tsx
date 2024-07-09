import { useEffect } from 'react';
import { Box, BoxWrap, PinchZoom, Image, TMainHeaderInfoTypes, Typography, Textarea, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C05A03 } from './store';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C05A03);
  const { userId } = useRecoilValue(studentAtom);

  const pageNum = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meWords',
  };

  const questionInfo = {
    text: (
      <>
        만화를 보고, 밑줄 친 <Typography textDecoration={'underline'}>plan B</Typography>의 의미를 추측하여 써 봅시다.
      </>
    ),
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
      return { ...prev, p01: { ...prev.p01, input: value } };
    });

    changeData(pageNum, 1, 1, value);
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
              value: cardData.p01.input,
            },
          ],
        },
      ];
      submitData(pageNum, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            input: userSubmissionList[0].inputData[0].value || cardData.p01.input,
            isSubmitted,
          },
        }));
      }
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNum);
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
      questionInfo={questionInfo}
      vAlign='start'
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitDisabled={cardData.p01.isSubmitted}
      submitBtnColor={cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap marginTop={'50px'}>
        <Box hAlign={'center'} useFull width={'50%'}>
          <PinchZoom>
            <Image src={'/L04/C05/A03/ME1-L04-C05-A03-P01.jpg'} width='100%' alt={''} ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>4컷 만화.</p>
              <p>여자 친구 둘이 제주 여행을 왔다.</p>
              <p>A: Let’s go to the Jeju Haenyeo Museum.</p>
              <p>B: Yeah! I can’t wait.</p>
              <p>2. 해녀 박물관이 휴관일이라 문을 닫았다.</p>
              <p>B: Uh-oh. What’s our plan B?</p>
              <p>3. 친구 A는 해녀박물관이 문을 닫아서 해녀를 직접 만날 생각을 한다.</p>
              <p>A: ‘It’s visiting Heanyeo Village.</p>
              <p>4. 해녀를 직접 만나서 이야기 나누는 친구 둘의 모습</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull width={'50%'}>
          <Textarea
            value={cardData.p01.input}
            readOnly={cardData.p01.isSubmitted}
            onChange={e => handleInputOnChange(e.target.value)}
            placeholder='내용을 넣어 주세요.'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
