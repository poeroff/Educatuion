import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  IQuestionProps,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Typography,
  ETagLine,
  Tag,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C05A03 } from './store';

const P01 = () => {
  const currentPage = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C05A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Match the underlined words and their correct meaning.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.answer === cardData.p01.solution ? 'correct' : 'incorrect') : 'none',
  };

  const context = 'Scientist have discovered a new species of insect in the mountains.';
  const underlineText = 'species';

  const data = [
    { text: 'being done or used instead' },
    { text: 'a group of animals or plants sharing biological characteristics' },
    { text: 'relating to the way in which living things develop over a long period of time' },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p01.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p01.answer === cardData.p01.solution;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };
  const parts = context.split(underlineText);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p01.answer === 0}
      submitBtnColor={cardData.p01.answer !== 0 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
    >
      <Box useFull hAlign='center' padding='45px 0px' height='100%' width={920}>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='4px 12px' height='45%' background='white' useRound>
            <Typography>
              {parts[0]}{' '}
              <Typography
                useGap={false}
                textDecoration={'underline'}
                style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}
                weight={700}
              >
                {underlineText}
              </Typography>{' '}
              {parts[1]}
            </Typography>
          </Box>
          <Scroll height='70%' width='910px' tabIndex={0}>
            <List
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p01.answer}
                  onClick={() => handleChange(index)}
                  isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                  readOnly={cardData.p01.isSubmitted}
                >
                  <Box vAlign='baseline' padding='6px 0' gap='4px'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </Box>
                </Radio>
              )}
            />
          </Scroll>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={cardData.p01.isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
