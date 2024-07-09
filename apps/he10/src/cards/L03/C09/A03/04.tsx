import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Input,
  Typography,
  List,
  Image,
  Question,
  PinchZoom,
  EImageType,
  EStyleButtonTypes,
  InputStatus,
  Tag,
  Scroll,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C09A03 } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

const P04 = () => {
  const PAGE_NUMBER = 'P04';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C09A03);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p04.answer,
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
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const answerChecker = (answer: string, solution: string) => {
    const formattedInput = answer.replace(/\s+/g, '').toLowerCase();
    const formattedAnswer = solution.replace(/\s+/g, '').toLowerCase();

    if (answer.trim().includes(' ')) {
      return false;
    }

    return formattedInput === formattedAnswer;
  };

  const handleSubmit = () => {
    const { answer, isSubmitted, solution } = cardData.p04;
    if (!isSubmitted) {
      const isCorrect = answerChecker(answer, solution);
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
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

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: event.target.value } }));
    changeData(PAGE_NUMBER, 1, 1, event.target.value);
  };

  const getButtonColor = () => {
    const { isSubmitted, answer } = cardData.p04;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan and Write',
  };

  const questionInfo = {
    text: 'Complete the project board with the given words.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const wordArr = ['cold', 'freezer', 'ice', 'pour', 'rise', 'upside down'];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p04.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p04.isSubmitted || !cardData.p04.answer) && !cardData.p04.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={'/L03/C09/A03/HE1-L03-C09-A03-P04.jpg'} width='378px' height='266px' />
            <Box type='hidden'>
              alt='이 이미지는 과학 실험을 설명하는 글을 작성하는 템플릿 입니다. I’m going to introduce a fun experiment called “빈칸.” This
              experiment aims to 빈칸. The materials needed are 빈칸. Here’s the procedure. First, 빈칸. Be careful. Only if 빈칸 will the experiment
              work properly. Next, 빈칸. Finally, 빈칸. Then, you will observe 빈칸. That’s because 빈칸. It will be 빈칸 for you to 빈칸 in this
              experiment!'
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Scroll>
            <Box hAlign='center' background='violet'>
              <Typography weight={700}>Reasoning</Typography>
            </Box>
            <Box useFull>
              <Question size={'small'}>When very 6)</Question>
              <Input
                width='228px'
                value={cardData.p04.answer}
                onChange={handleAnswerChange}
                placeholder=''
                status={
                  cardData.p04.answer
                    ? cardData.p04.isSubmitted
                      ? cardData.p04.isCorrect
                        ? InputStatus.ENABLE
                        : InputStatus.ERROR
                      : InputStatus.ENABLE
                    : InputStatus.DEFAULT
                }
                readOnly={cardData.p04.isSubmitted}
              />
              <Box hAlign='center' vAlign='flex-start'>
                <Box flex={1}>
                  <Question size={'small'}>water meets ice, the ice can speed up the freezing process.</Question>
                </Box>
              </Box>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <Box marginTop='12px'>
        <TextView title='보기'>
          <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>
      {isAnswerShow && (
        <Box marginTop='25px' background='gray' padding='18px' useRound>
          <Tag fontSize='22px' height='auto' label='답안' type='green' width='auto' />
          <Typography>{cardData.p04.solution}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default P04;
