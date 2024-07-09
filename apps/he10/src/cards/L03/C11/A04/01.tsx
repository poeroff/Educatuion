import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
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
  EStyleButtonTypes,
  Tag,
  ETagLine,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L03C11A04 } from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C11A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '1. What is the most appropriate place for the given sentence?',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const data = [
    {
      text: '(a)',
    },
    {
      text: '(b)',
    },
    {
      text: '(c)',
    },
    {
      text: '(d)',
    },
  ];

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);
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
      submitDisabled={cardData.p01.answer === 0}
      onSubmit={submitAnswer}
      submitBtnColor={cardData.p01.answer === 0 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap gap='24px'>
        <Box height='398px' width='394px' background='white' lineHeight='48px' useRound paddingRight='10px'>
          <Scroll height='100%' tabIndex={0}>
            <Typography useGap={false}>
              <Typography useGap={false} style={{ textIndent: 'var(--font-size-28)' }}>
                Which is the better environment for studying: a noisy place or a quiet place?{' '}
              </Typography>
              <Typography useGap={false} textDecoration={'underline'} style={{ display: 'inline', textUnderlinePosition: 'under' }}>
                People rarely want to put up with a lot of noise
              </Typography>{' '}
              because it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used
              across various fields to reduce unwanted noise.{' '}
              <Typography weight='var(--font-weight-bold)' useGap={false}>
                ( a )
              </Typography>{' '}
              What is the scientific principle behind this achievement?{' '}
              <Typography weight='var(--font-weight-bold)' useGap={false}>
                ( b )
              </Typography>{' '}
              Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance.{' '}
              <Typography weight='var(--font-weight-bold)' useGap={false}>
                ( c )
              </Typography>{' '}
              The vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake
              when you throw a stone.{' '}
              <Typography weight='var(--font-weight-bold)' useGap={false}>
                ( d )
              </Typography>{' '}
              When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water might overlap if you throw
              two stones, sound waves can also interfere with each other when they meet.
            </Typography>
          </Scroll>
        </Box>
        <Box useFull flex='1'>
          <Scroll height='398px' tabIndex={0}>
            <Box vAlign='center' hAlign='center' padding='20px' margin='8px 0px' background='white' useRound>
              <Typography useGap={false}>To understand this, let’s examine how sound travels.</Typography>
            </Box>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={cardData.p01.answer === index}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p01.isSubmitted}
                  isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            ></List>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{cardData.p01.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
