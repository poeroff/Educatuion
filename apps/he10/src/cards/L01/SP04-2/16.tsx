import {
  Box,
  BoxWrap,
  IQuestionProps,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Input,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useState, useEffect } from 'react';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SP04_2 } from './store';

const P16 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP04_2);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const inputAnswer = cardData.p16.solution;

  const [input, setInput] = useState({
    value: '',
  });

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 문장쓰기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '밑줄 친 부분을 바르게 고쳐 문장을 다시 써 봅시다.',
    markSize: 'middle',
    mark: !cardData.p16.isSubmitted ? 'none' : isAnswer(cardData.p16.answer, inputAnswer) ? 'correct' : 'incorrect',
  };

  const isBtnDisabled = () => {
    return !isNotEmptyString(cardData.p16.answer);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p16.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    } else {
      const isCorrect = isAnswer(cardData.p16.answer, cardData.p16.solution);
      setCardData(prev => ({ ...prev, p16: { ...prev.p16, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p16.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitData('P16', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P16')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p16: {
            ...prev.p16,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p16.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P16', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCardData(prev => ({ ...prev, p16: { ...prev.p16, answer: value } }));
    changeData('P16', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P16');
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
      onSubmit={submitAnswer}
      submitLabel={cardData.p16.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isBtnDisabled()}
      submitBtnColor={
        isBtnDisabled()
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p16.isSubmitted || !showAnswer
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.DEFAULT
      }
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='775px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Box display='flex' hAlign='center' flexDirection='column' alignItems='flex-start'>
            <Typography useGap={false}>
              <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                Accepted
              </Typography>{' '}
              different opinions and perspectives, we can make better decisions.
            </Typography>
          </Box>
        </Box>
        <BoxWrap>
          <Box flex='1' hAlign={'center'}>
            <Input
              name='value'
              value={cardData.p16.answer}
              width='85%'
              maxLength={100}
              placeholder='내용을 넣어 주세요.'
              onChange={handleChange}
              status={
                !cardData.p16.answer
                  ? InputStatus.DEFAULT
                  : cardData.p16.isSubmitted && !isAnswer(cardData.p16.answer, cardData.p16.solution)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p16.isSubmitted}
              ariaLabel='답란'
            />
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{inputAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P16;
