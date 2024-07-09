import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  BottomSheet,
  Radio,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect, ReactNode } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C11A04 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A04);
  const [isShow, setShow] = useState<boolean>(false);

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };
  const questionInfo = {
    text: '1. What is the most appropriate title for the passage?',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const exampleData: ReactNode[] = [
    <Typography>Physical Strength: The Key to Survival</Typography>,
    <Typography>Neanderthals' Superior Hunting Ability</Typography>,
    <Typography>What Enabled Our Ancestors to Survive: Competition</Typography>,
    <Typography>
      How{' '}
      <Typography useGap={false} style={{ fontStyle: 'italic' }}>
        Homo Sapiens
      </Typography>{' '}
      Thrived While Neanderthals Died Out
    </Typography>,
  ];

  const { userId } = useRecoilValue(studentAtom);

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
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
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
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
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p01.answer !== 0 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!cardData.p01.isSubmitted && cardData.p01.answer === 0}
      onSubmit={submitAnswer}
    >
      <BoxWrap width={920}>
        <Box height='398px' width='394px' background='white' lineHeight='48px' useRound paddingRight='10px'>
          <Scroll height='100%' tabIndex={0}>
            <Typography useGap={false}>
              &nbsp;&nbsp;&nbsp;Now let's turn our attention to ourselves,{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>
              . How have we managed to survive for so long? Neanderthals existed together with{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>{' '}
              until about 40,000 years ago, and they were known to be intelligent and physically superior to{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>
              . Neanderthals were able to make tools and fire and <u>(A) had / having</u> strong bodies with well-developed muscles and broad
              shoulders. Despite these attributes, however, it was{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>{' '}
              who ultimately survived and thrived. One possible explanation is that our ancestors lived in larger communities <u> (B) that / what</u>{' '}
              promoted cooperation and the free exchange of knowledge, while Neanderthals tended to live in smaller groups. These social differences
              may have given{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>{' '}
              a competitive advantage over Neanderthals, <u> (C) allowed / allowing</u> them to adapt to an ever-changing environment.
            </Typography>
          </Scroll>
        </Box>
        <Box useFull flex='1'>
          <Scroll height='398px' tabIndex={0}>
            <List
              gap={10}
              data={exampleData}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  ariaLabel={index + '번 보기'}
                  value={index === cardData.p01.answer}
                  onClick={() => handleChange(index)}
                  disabled={cardData.p01.isSubmitted}
                  isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    {value}
                  </BoxWrap>
                </Radio>
              )}
            />
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
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
