import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04SP02 } from './store';
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
  Scroll,
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
  const [cardData, setCardData] = useRecoilState(L04SP02);
  const [mark, setMark] = useState<TMarkType>('none');
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const choices = [
    'I believe AI will work better than humans in the future.',
    'I’m sure that AI programs will bring changes to real art.',
    'I don’t think AI will ever take the place of human artists.',
    'Human artists also need to create artworks using AI programs.',
    'I suppose the quality of AI-generated art is better than that of human art.',
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
      text: '다음 대화의 빈칸에 들어갈 말로 알맞은 것을 고르시오.',
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

  const solution = 3;

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
      <Box width='910px' height='234px' padding='20px' background='white' useRound>
        <Scroll tabIndex={1}>
          <Box display='flex'>
            <Box marginTop='6px'>
              <Label value='G' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Typography>I’ve seen some AI-generated artworks, and they’re really amazing! I don’t see any difference between AI art and human art. I think AI can be just as creative and innovative as human artists.</Typography>
          </Box>
          <Box display='flex'>
            <Box marginTop='6px'>
              <Label value='B' type='paint' background='var(--color-blue-100)' marginRight={8} />
            </Box>
            <Box display='flex'>

              <Typography>I don’t agree with the idea that AI-generated art is real art. AI just copies human works of art based on big data.<Typography type='blank' width='330px' title='빈칸' boxColor='var(--color-black)'></Typography></Typography>
            </Box>
          </Box>
        </Scroll>
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
            <Typography>3</Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='10px'>
            <Typography>
              남학생은 AI 생성 예술이 진정한 예술이라는 의견에 동의하지 않는다고 말하며, AI는 빅데이터를 기반으로 인간의 예술작품을 모방할 뿐이라고 했으므로 남학생이 이어서 할 말로 가장 적절한 것은 AI가 인간 예술가를 대체할 수 없다고 말하는 3번이다.
            </Typography>
          </Box>

          <Box marginTop={20}>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>여: 저는 AI 생성 예술작품을 본 적이 있는데, 그것들은 정말 대단했어요! 저는 AI 예술과 인간의 예술 사이에 차이가 없다고 생각합니다. AI도 인간 예술가만큼 창의적이고 혁신적일 수 있다고 생각합니다.</Typography>
            <Typography>
              남: 저는 AI 생성 예술이 진정한 예술이라는 생각에 동의하지 않습니다. AI는 빅데이터를 기반으로 인간의 예술작품을 모방할 뿐이죠. <Typography type='blank' width='330px' title='빈칸' boxColor='var(--color-black)'></Typography>
            </Typography>

          </Box>
          <Box marginTop='10px' display='flex' flexDirection='column'>
            <Typography>(1) AI가 미래에 인간보다 일을 더 잘 할 것이라고 생각합니다.</Typography>
            <Typography>(2) AI 프로그램은 진정한 예술에 변화를 가져올 것을 확신합니다.</Typography>
            <Typography>(3) AI가 인간 예술가를 대신할 수는 없다고 생각합니다.</Typography>
            <Typography>(4) 인간 예술가들도 AI 프로그램을 사용하여 예술작품을 만들어야 합니다.</Typography>
            <Typography>(5) AI 생성 예술의 품질이 인간의 예술의 품질보다 낫다고 생각합니다</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P13;
