import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, EStyleButtonTypes, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, Stamp, EStampType } from '@maidt-cntn/ui/math';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0007_09 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0007_09);
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
    if (cardData.p01.isSubmitted) {
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, radio: index } }));
    changeData('P01', 1, 1, index);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      return;
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.radio,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId || 1;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            radio: userSubmissionList[0].inputData[0].value,
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
      submitBtnColor={
        cardData.p01.isSubmitted ? EStyleButtonTypes.GRAY : cardData.p01.radio === undefined ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW
      }
      submitDisabled={cardData.p01.isSubmitted || cardData.p01.radio === undefined}
      submitLabel={'완료하기'}
      onSubmit={handleSubmit}
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box>
          <Stamp
            isClicked={cardData.p01.radio === 0}
            onClick={() => handleRadio(0)}
            stampType={EStampType.Excellent}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={cardData.p01.radio === 1}
            onClick={() => handleRadio(1)}
            stampType={EStampType.Good}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={cardData.p01.radio === 2}
            onClick={() => handleRadio(2)}
            stampType={EStampType.Soso}
            readOnly={cardData.p01.isSubmitted}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
