import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Typography,
  PinchZoom,
  List,
  EImageType,
  Image,
  Scroll,
  BottomSheet,
  Tag,
  ETagLine,
  Input,
  InputStatus,
  EStyleButtonTypes,
  Label,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C09A03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

interface QuestionList {
  text1: string;
  text2: string;
}

const P02 = () => {
  const PAGE_NUMBER = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const questionList: QuestionList[] = [
    {
      text1: 'Put a water bottle in the',
      text2: 'for about two hours, but take it out before it is completely frozen.',
    },

    {
      text1: 'Turn a glass',
      text2: 'and place an ice cube on top.',
    },

    {
      text1: 'Slowly',
      text2: 'the water over the ice cube.',
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };

  const questionInfo = {
    text: 'Complete the project board with the given words.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
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
        const newAnswers = userSubmissionList[0].inputData?.map((data: { value: string }) => data.value.toString()) || cardData.p02.answers;
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answers: newAnswers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const { answers } = cardData.p02;
      const isCorrectAll = answers.every((answer, index) => isAnswer(answer, cardData.p02.solutions[index]));
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrectAll } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answers[0],
              isAnswer: true,
              isCorrect: isAnswer(answers[0], cardData.p02.solutions[0]),
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answers[1],
              isAnswer: true,
              isCorrect: isAnswer(answers[1], cardData.p02.solutions[1]),
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answers[2],
              isAnswer: true,
              isCorrect: isAnswer(answers[2], cardData.p02.solutions[2]),
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p02;

    if (!isSubmitted) {
      return !answers.some(answers => answers === '') ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChangeAnswer = (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { answers } = cardData.p02;
    const newAnswers = [...answers];
    newAnswers[i] = event.target.value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answers: newAnswers } }));
    changeData(PAGE_NUMBER, 1, i + 1, event.target.value);
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
      submitLabel={cardData.p02.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p02.isSubmitted || cardData.p02.answers.some(answer => answer === '')) && !cardData.p02.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box display='flex' gap={'8px'}>
        <Box hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={'/L03/C09/A03/HE1-L03-C09-A03-P02.jpg'} width='460px' height='242px' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>이 이미지는 "Instant Tower of Ice" 실험을 설명하는 안내서입니다. 각 섹션에 빈칸을 채워야 하는 부분이 포함되어 있습니다.</p>

              <p>Purpose</p>
              <p>To see if water can be turned into 빈칸 instantly.</p>

              <p>Materials</p>
              <p>a bottle of water</p>
              <p>a freezer</p>
              <p>a glass</p>
              <p>an ice cube</p>

              <p>Procedure</p>
              <p>Put a water bottle in the 빈칸 for about two hours, but take it out before it is completely frozen.</p>
              <p>Turn a glass 빈칸 and place an ice cube on top.</p>
              <p>Slowly 빈칸 the water over the ice cube.</p>

              <p>Caution</p>
              <p>Don’t shake the bottle.</p>

              <p>Expected Results</p>
              <p>The ice tower will 빈칸 instantly.</p>

              <p>Reasoning</p>
              <p>When very 빈칸 water meets ice, the ice can speed up the freezing process.</p>

              <p>
                이미지에는 실험에 필요한 물병, 냉동고, 유리잔, 얼음 조각의 사진이 포함되어 있으며, 오른쪽에는 물을 얼음 위에 부어서 순간적으로 얼음
                탑을 만드는 과정을 보여주는 사진이 있습니다.
              </p>
            </Box>
          </PinchZoom>
        </Box>

        <Box height={'266px'}>
          <Scroll tabIndex={0}>
            <Box width='100%' flexDirection='column' vAlign='center'>
              <Box backgroundColor='var(--color-green-600)' width='fit-content' margin={'30px 0'}>
                <Typography weight={'var(--font-weight-bold)'} color='var(--color-white)'>
                  Procedure
                </Typography>
              </Box>

              <Box gap={'6px'}>
                {questionList.map((question, index) => {
                  const { answers, isSubmitted, solutions } = cardData.p02;
                  const isError = !isAnswer(answers[index] || '', solutions[index]);
                  return (
                    <Box display='flex' key={index}>
                      <Label value={index + 1} />
                      <Typography lineHeight='1.3em'>
                        {question!.text1} {index! + 2})
                        <Input
                          value={answers[index]}
                          onChange={handleChangeAnswer(index!)}
                          maxLength={100}
                          ariaLabel={`서술 답안 입력란 ${index + 2}`}
                          status={isSubmitted ? (isError ? InputStatus.ERROR : InputStatus.DEFAULT) : InputStatus.ENABLE}
                          readOnly={isSubmitted}
                          width='220px'
                        />{' '}
                        {question!.text2}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Scroll>
        </Box>
      </Box>

      <Box marginTop='20px'>
        <TextView title='보기'>
          <List align='horizontal' data={cardData.examples} row={({ value }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {cardData.p02.solutions.map((solution, index) => (
                <Typography key={solution + index}>
                  {index + 2}) {solution}
                </Typography>
              ))}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
