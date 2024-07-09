import { useEffect, useState } from 'react';
import { BoxWrap, Box, TMainHeaderInfoTypes, Textarea, VideoPlayer, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C10A02 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C10A02);
  const [isShow, setShow] = useState(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '활동',
  };
  const questionInfo = {
    text: 'Think and write what captures your interest after watch the trailer for the movie CoCo.',
  };

  const { userId } = useRecoilValue(studentAtom);

  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p04.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P04', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData('P04', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
      submitLabel='완료하기'
      submitBtnColor={
        cardData.p04.isSubmitted ? EStyleButtonTypes.SECONDARY : cardData.p04.answer === '' ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      submitDisabled={!cardData.p04.isSubmitted && cardData.p04.answer === ''}
    >
      <BoxWrap>
        <Box hAlign={'center'} useFull>
          {/* TODO : HE1-L01-C10-A02-P02.crt 현재 자막 파일 미존재 */}
          <VideoPlayer videoSrc={'/L01/C10/A02/HE1-L01-C10-A02-P02.mp4'} srtFile={''} />
        </Box>
        <Box useFull padding='4px 12px'>
          <Textarea
            value={cardData.p04.answer}
            onChange={event => handleChange(event.target.value)}
            width='100%'
            height='100%'
            placeholder='내용을 넣어주세요.'
            readOnly={cardData.p04.isSubmitted}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P04;
