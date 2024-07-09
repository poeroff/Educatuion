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

const P05 = () => {
  const currentPage = 'P05';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C05A03);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Word Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Match the underlined words and their correct meaning.',
    mark: cardData.p05.isSubmitted ? (cardData.p05.answer === cardData.p05.solution ? 'correct' : 'incorrect') : 'none',
  };

  const context = ' Tourism in Korea is expected to flourish more thanks to the global popularity of K-pop.';
  const underlineText = 'flourish';

  const data = [
    { text: 'to develop well and be successful' },
    { text: 'to have a good relationship with somebody' },
    { text: 'to work with others to achieve a common goal' },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
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
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
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
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: index } }));
    changeData(currentPage, 1, 1, index);
  };

  const submitAnswer = () => {
    if (cardData.p05.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p05.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(currentPage, userSubmission);
  };
  const parts = context.split(underlineText);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p05.answer === 0}
      submitBtnColor={cardData.p05.answer !== 0 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
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
                  value={index === cardData.p05.answer}
                  onClick={() => handleChange(index)}
                  isError={cardData.p05.isSubmitted && cardData.p05.answer !== cardData.p05.solution}
                  readOnly={cardData.p05.isSubmitted}
                  ariaLabel={`${index}번째 답`}
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={cardData.p05.isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p05.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
