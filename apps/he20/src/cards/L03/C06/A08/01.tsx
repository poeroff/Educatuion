import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, Image, PinchZoom, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C06A08 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A08);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Viewing Critically',
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
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!isNotEmptyString(cardData.p01.answer1) || cardData.p01.isSubmitted}
      onSubmit={onSubmitText}
    >
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L03/C06/A08/HE2-L03-C06-A08-P01.jpg'}
              width='346px'
              height='200px'
              alt={`이 이미지의 오른쪽에는 사람들을 바라보며 뭔가를 설명하고 있는 여성과 왼쪽에는 여성의 설명을 듣고 서 있는 세 명의 사람들이 있다.
              `}
            />
          </PinchZoom>
        </Box>
        <BoxWrap background='white' flexDirection='column' useFull>
          <Box width='100%' height='50%' hAlign='center'>
            <Typography>What do you think the woman on the right is doing? Have you ever seen someone like her at a museum?</Typography>
          </Box>
          <Textarea
            height='40%'
            rows={4}
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
