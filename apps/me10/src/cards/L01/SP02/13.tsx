import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Label,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  Radio,
  IQuestionProps,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01SP02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P13 = () => {
  const pageNo = 'P13';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP02);

  const [ready, setReady] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const isAllFilled = useMemo(() => Boolean(cardData.p13.select), [cardData.p13.select]);
  const disabled = useMemo(() => !cardData.p13.isSubmitted && !isAllFilled, [cardData, isAllFilled]);

  const submitBtnColor = useMemo(() => {
    if (cardData.p13.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData.p13.isSubmitted, isAllFilled, isShowAnswer]);

  const mark = useMemo(
    () => (cardData.p13.isSubmitted ? (cardData.p13.isCorrect ? 'correct' : 'incorrect') : 'none'),
    [cardData.p13.isSubmitted, cardData.p13.isCorrect],
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '확인 문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '1. 다음 대화의 빈칸에 들어갈 말로 가장 알맞은 것을 고르시오.',
    mark: mark,
  };

  const data = [
    { text: 'How about you?' },
    { text: 'Do you like comedies?' },
    { text: 'What class are you in?' },
    { text: "What's your favorite movie?" },
    { text: 'What kind of music do you like?' },
  ];

  const explanation = 'B가 가장 좋아하는 영화에 대해 답변하고 있으므로, 빈칸에는 가장 좋아하는 영화를 묻는 질문이 들어가는 것이 적절하다.';

  const interpretation = [
    'A: 나는 액션 영화를 좋아해. 너도 액션 영화를 좋아하니?',
    'B: 아니, 나는 코미디를 좋아해.',
    <>
      A:&nbsp;
      <Typography useGap={false} textDecoration='underline' style={{ textUnderlinePosition: 'under' }}>
        네가 가장 좋아하는 영화는 뭐니?
      </Typography>
    </>,
    "B: 내가 가장 좋아하는 영화는 '쿵푸팬더'야.",
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
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p13: {
            ...prev.p13,
            select: userSubmissionList[0].inputData[0]?.value || cardData.p13.select,
            isSubmitted: isSubmitted ?? false,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      (async () => {
        await init();
        setReady(true);
      })();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const handleClickOption = (index: number) => {
    setCardData(prev => ({ ...prev, p13: { ...prev.p13, select: index } }));
    changeData(pageNo, 1, 1, index);
  };

  const handleSubmit = () => {
    if (!cardData.p13.isSubmitted) {
      const isCorrect = String(cardData.p13.select) === cardData.p13.solution;
      setCardData(prev => ({ ...prev, p13: { ...prev.p13, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p13.select,
              isAnswer: true,
              isCorrect: cardData.p13.isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p13.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={disabled}
      submitBtnColor={submitBtnColor}
    >
      <Box useFull hAlign='center' height='100%' paddingTop='12px'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='10px' background='white' useRound borderRadius='8px'>
            <Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>A: I like action movies. Do you like them, too?</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>B: No, I don't. I like comedies.</Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                A:&nbsp;
                <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false} type='blank' width='300px' title='빈칸' boxColor='var(--color-black)'>
                  {'\u00A0'}
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                B: My favorite movie is&nbsp;
                <Typography
                  size={EStyleFontSizes['X-MEDIUM']}
                  fontStyle='italic'
                  useGap={false}
                  style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
                >
                  Kung Fu Panda
                </Typography>
                .
              </Typography>
            </Box>
          </Box>

          <Scroll width='910px' tabIndex={1}>
            <List gap={10} data={data}>
              {({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  key={'radio-option' + index}
                  label={value?.text}
                  ariaLabel={value?.text}
                  value={ready ? index === cardData.p13.select : undefined}
                  onClick={() => handleClickOption(index)}
                  isError={cardData.p13.isSubmitted && String(cardData.p13.select) !== cardData.p13.solution}
                  readOnly={cardData.p13.isSubmitted}
                  tabIndex={102}
                >
                  <Box>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </Box>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData.p13.solution}</Typography>
          </Box>
          <Box marginTop='36px'>
            <Tag type={ETagLine.GREEN} label='문제해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{explanation}</Typography>
          </Box>
          <Box marginTop='36px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='12px'>
            {interpretation.map((text, index) => (
              <Box key={`interpretation-${index + 1}`}>
                <Typography usePre>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
