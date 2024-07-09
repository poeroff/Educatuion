import { Container, Stamp } from '@maidt-cntn/ui/math';
import { Box, EStyleButtonTypes, BoxWrap, EStampType, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import A03_0002_08 from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P01 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0002_08);
  const { userId } = useRecoilValue(studentAtom);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathRevaluation',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '스스로 평가해 보세요.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer,
          },
        ],
      },
    ];

    submitData('P01', userSubmission);
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
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleanswer = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={'완료하기'}
      submitDisabled={cardData.p01.isSubmitted || cardData.p01.answer === -1}
      submitBtnColor={
        cardData.p01.isSubmitted ? EStyleButtonTypes.GRAY : cardData.p01.answer === -1 ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW
      }
      onSubmit={handleSubmit}
    >
      <BoxWrap justifyContent='center'>
        <Box>
          <Stamp
            isClicked={cardData.p01.answer === 0}
            onClick={() => handleanswer(0)}
            stampType={EStampType.Excellent}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={cardData.p01.answer === 1}
            onClick={() => handleanswer(1)}
            stampType={EStampType.Good}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={cardData.p01.answer === 2}
            onClick={() => handleanswer(2)}
            stampType={EStampType.Soso}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
