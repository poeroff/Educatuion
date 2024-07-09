import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, BoxWrap, IQuestionProps, Radio, Typography, TMainHeaderInfoTypes, EStyleButtonTypes, BottomSheet, ETagLine, Tag } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP01_2 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P06 = () => {
  const PAGE_NUMBER = 'P06';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_2);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 단어의 알맞은 뜻을 고르세요.',
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const providedWord = 'sign up for';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer: userSubmissionList[0].inputData[0]?.value || 0,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p06.isSubmitted) {
      const isCorrect = cardData.p06.answer === cardData.p06.solution;
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p06.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p06;

    if (!isSubmitted) {
      return answer > 0 ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleClickRadio = (selectedIndex?: number) => {
    if (selectedIndex) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer: selectedIndex } }));
      changeData(PAGE_NUMBER, 1, 1, selectedIndex);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      submitLabel={cardData.p06.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p06.isSubmitted || cardData.p06.answer < 1) && !cardData.p06.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box useFull flexDirection='column' hAlign='center' gap={'48px'}>
        <Box vAlign='center' width='685px' padding='48px 16px' hAlign='center' background='white' borderRadius={24} useShadow>
          <Typography fontSize='var(--font-size-36)' lineHeight='54px' weight='var(--font-weight-bold)'>
            {providedWord}
          </Typography>
        </Box>
        <BoxWrap>
          {cardData.p06.words.map((word, index) => {
            return (
              <Box flex='1' textAlign='center' key={`${word}${cardData.p06.answer}`}>
                <Radio
                  type={'box'}
                  align='vertical'
                  name={'radio-question'}
                  label={word}
                  ariaLabel={`${index + 1}번 보기`}
                  value={index + 1 === cardData.p06.answer}
                  onClick={() => handleClickRadio(index + 1)}
                  readOnly={cardData.p06.isSubmitted}
                  isError={cardData.p06.isSubmitted && !(cardData.p06.answer === cardData.p06.solution)}
                >
                  <Typography weight='var(--font-weight-medium)' fontSize='var(--font-size-28)'>
                    {word}
                  </Typography>
                </Radio>
              </Box>
            );
          })}
        </BoxWrap>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              <Typography>{cardData.p06.words[cardData.p06.solution - 1]}</Typography>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;