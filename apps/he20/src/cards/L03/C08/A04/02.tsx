import { useEffect, useState } from 'react';
import { TMainHeaderInfoTypes, Typography, Input, Box, List, Image, EStyleButtonTypes, InputStatus } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C08A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const { changeData, initData, submitData, saveData } = usePageData();

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L03C08A04);

  const questionText = 'What do the red words refer to, and what is the function of “,”?';

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));

        if (isSubmitted) {
          setIsSaved(true);
        }
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: value,
      },
    }));

    changeData('P02', 1, 1, value);
  };

  const handleSubmit = () => {
    if (!isSaved) {
      setIsSaved(!isSaved);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2',
  };

  const questionInfo = {
    text: 'Discovering the Patterns',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitDisabled={isSaved || !cardData.p02.answer}
      submitBtnColor={cardData.p02.answer && !isSaved ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
      submitLabel='완료하기'
    >
      <Box>
        <Image
          src={'/L03/C08/A04/HE2-L03-C08-A04-01.jpg'}
          width={'100%'}
          height={'63px'}
          alt='She even studied abroad in Paris, which was unusual for women at the time.
          She 부터 Paris까지 파란 색자로, 빨간 색자 which 가 이끄는 절이 하늘색 음영으로 강조되어 있다.'
        />
        <Image
          src={'/L03/C08/A04/HE2-L03-C08-A04-02.jpg'}
          width={'100%'}
          height={'63px'}
          alt='Lewis went to live with her aunt in Digby, where she met her future husband.
          Digby가 파란 색자로, 빨간 색자 where가 이끄는 절은 하늘색 음영으로 강조되어 있다.'
        />
      </Box>
      <Box marginTop={'20px'}>
        <Typography>{questionText}</Typography>
        <Box marginTop={'8px'}>
          <Input
            width='100%'
            value={cardData.p02.answer}
            onChange={e => handleChange(e.target.value)}
            maxLength={100}
            placeholder='내용을 넣어 주세요.'
            status={isSaved ? InputStatus.DEFAULT : InputStatus.ENABLE}
            readOnly={isSaved}
            ariaLabel='서술형 답안을 입력해 주세요'
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
