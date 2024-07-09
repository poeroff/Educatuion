import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02SP02 } from './store';
import { useEffect, useMemo, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';

const P13 = () => {
  const PAGE_NUMBER = 'P13';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP02);
  const [mark, setMark] = useState<TMarkType>('none');
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const choices = [
    'Yes, I have. I’ve been reading a lot of Hawaiian novels.',
    'Yes. I’ve been interested in writing about my culture for a long time.',
    'Not really. I have always been interested in learning Hawaiian customs.',
    'Of course. You need to make sure not to behave impolitely in Hawaii.',
    'That’s not true. I believe it is important to learn about your culture and history.',
  ];

  const headerInfo: TMainHeaderInfoTypes = useMemo(
    () => ({
      headerText: '[Listen & Speak] 확인문제',
      headerPattern: 'text',
    }),
    [],
  );

  const questionInfo: IQuestionProps = useMemo(
    () => ({
      text: '대화를 듣고, Andy의 마지막 말에 대한 여자의 응답으로 빈칸에 가장 적절한 것을 고르시오.',
      mark: mark,
    }),
    [mark],
  );

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
      ],
    },
  ];

  const solution = 4;

  const isCorrect = useMemo(() => cardData.p13.answer === solution, [cardData.p13.answer]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p13: {
            ...prev.p13,
            answer: userSubmissionList[0].inputData[0]?.value || prev.p13.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p13: { ...prev.p13, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p13.answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
  };

  const handleRowClick = (index: number) => {
    if (cardData.p13.isSubmitted) return;

    setCardData(prev => ({ ...prev, p13: { ...prev.p13, answer: index } }));
    changeData('P13', 1, 1, index);
  };

  const handleSubmitClick = () => {
    if (cardData.p13.isSubmitted) {
      setIsAnswerShow(!isAnswerShow);
    } else {
      submitAnswer();
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p13;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
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

  useEffect(() => {
    if (cardData.p13.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p13.isSubmitted, isCorrect]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p13.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p13.isSubmitted || !cardData.p13.answer) && !cardData.p13.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmitClick}
      useScroll
      vAlign='flex-start'
    >
      <Box width='910px' height={'234px'} padding='20px' background='white' useRound>
        <Box display='flex'>
          <Box marginTop='6px'>
            <Label value='W' type='paint' background='var(--color-blue-100)' marginRight={8} />
          </Box>
          <Typography>It seems that you’ve written many books about your culture, the Native Hawaiian culture.</Typography>
        </Box>
        <Box display='flex'>
          <Box marginTop='6px'>
            <Label value='M' type='paint' background='var(--color-blue-100)' marginRight={8} />
          </Box>
          <Box display='flex'>
            <Typography type='blank' width='330px' title='빈칸' boxColor='var(--color-black)'></Typography>
            <Typography>It is because some people have deep</Typography>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginLeft={40} />
          <Box display='flex'>
            <Typography>misunderstandings about Native Hawaiian</Typography>
          </Box>
        </Box>
      </Box>

      <Box marginTop={'20px'}>
        <List
          gap={4}
          data={choices}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question'}
              ariaLabel={`${index}번 보기`}
              value={index === cardData.p13.answer}
              onClick={() => handleRowClick(index)}
              readOnly={cardData.p13.isSubmitted}
              isError={cardData.p13.isSubmitted && cardData.p13.answer !== solution}
            >
              <Box vAlign='center'>
                <Label value={index} marginRight={8} />
                {value}
              </Box>
            </Radio>
          )}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>2</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              남자의 문화인 하와이 원주민 문화에 관해 많은 책을 썼다는 여자의 말에 자신의 책을 통해 하와이 원주민 문화의 진정한 아름다움을 공유하고
              싶다고 했으므로, 대화에 들어갈 알맞은 말은 2번이다.
            </Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>여: 흥미롭게 들리네요. 당신의 문화 즉, 하와이 원주민 문화에 관해 많은 책을 쓰신 것 같네요.</Typography>
            <Typography>
              남:
              <Typography useGap={false} textDecoration={'underline'}>
                네. 저는 오랫동안 제 문화에 대해 글을 쓰는 데 관심이 많았어요
              </Typography>{' '}
              일부 사람들이 하와이 원주민의 전통에 대해 깊은 오해를 가지고 있기 때문이었고, 제 책을 통해 그 문화의 진정한 아름다움을 공유하고 싶어요.
            </Typography>
            <Typography>여: 당신의 문화에 대한 열정과 사랑이 느껴집니다.</Typography>
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>1. 네, 그랬어요. 하와이 소설을 많이 읽었어요.</Typography>
            <Typography>3. 아니에요. 저는 항상 하와이의 관습을 배우는 데 관심이 많았어요.</Typography>
            <Typography>4. 물론이죠. 하와이에서 무례하게 행동하지 않도록 주의해야 해요.</Typography>
            <Typography>5. 그렇지 않아요. 저는 하와이의 문화와 역사에 대해 배우는 것이 중요하다고 생각해요.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
