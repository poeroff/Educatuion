import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, VideoPlayer, Textarea, BoxWrap, EStyleButtonTypes } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L02C10A02 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C10A02);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Beauty of Poems',
  };

  const questionInfo = {
    text: 'Think and write what captures your interest after read the three poems.',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: e.target.value } }));
    changeData('P04', 1, 1, e.target.value);
  };

  const handleSubmit = () => {
    if (!cardData.p04.isSubmitted) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer1,
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      submitLabel='제출하기'
      submitBtnColor={!isNotEmptyString(cardData.p04.answer1) || cardData.p04.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={cardData.p04.isSubmitted ? true : !isNotEmptyString(cardData.p04.answer1)}
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        <Box width={'500px'}>
          {/* todo : srt 파일 경로 추가 /L02/C10/A02/HE1-L02-C10-A02-P04.srt */}
          <VideoPlayer videoSrc={'/L02/C10/A02/HE1-L02-C10-A02-P04.mp4'} srtFile={''} />
        </Box>
        <Box useFull width='calc(100% - 430px)'>
          <Textarea
            placeholder='내용을 넣어 주세요.'
            value={cardData.p04.answer1}
            onChange={handleInputChange}
            readOnly={cardData.p04.isSubmitted}
            ariaLabel='답란'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P04;
