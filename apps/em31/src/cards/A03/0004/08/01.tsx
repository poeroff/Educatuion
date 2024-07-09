import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Box, BoxWrap, EStyleButtonTypes, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, EStampType, Stamp } from '@maidt-cntn/ui/math';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03_0004_08 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0004_08);
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

  const handleRadio = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
  };

  const submitAnswer = () => {
    if (!cardData.p01.isSubmitted) {
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitBtnColor={
        cardData.p01.isSubmitted ? EStyleButtonTypes.SECONDARY : cardData.p01.answer === 0 ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW
      }
      submitDisabled={cardData.p01.isSubmitted || cardData.p01.answer === 0}
      onSubmit={submitAnswer}
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box>
          <Stamp
            isClicked={cardData.p01.answer === 1}
            ariaLabel={'최고예요'}
            readOnly={cardData.p01.isSubmitted}
            onClick={() => handleRadio(1)}
            stampType={EStampType.Excellent}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={cardData.p01.answer === 2}
            ariaLabel={'잘했어요'}
            readOnly={cardData.p01.isSubmitted}
            onClick={() => handleRadio(2)}
            stampType={EStampType.Good}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={cardData.p01.answer === 3}
            ariaLabel={'아쉬워요'}
            readOnly={cardData.p01.isSubmitted}
            onClick={() => handleRadio(3)}
            stampType={EStampType.Soso}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
