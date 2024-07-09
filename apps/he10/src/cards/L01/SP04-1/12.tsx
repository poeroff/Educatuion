import {
  Box,
  BoxWrap,
  IQuestionProps,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Input,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L01SP04_1 } from './store';

const P12 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L01SP04_1);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 문장쓰기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '밑줄 친 부분을 바르게 고쳐 문장을 다시 써 봅시다.',
    markSize: 'middle',
    mark: cardData.p12.isSubmitted ? (cardData.p12.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isBtnDisabled = () => {
    return !isNotEmptyString(cardData.p12.answer);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P12')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p12.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P12', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p12.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p12.answer, cardData.p12.solution);
      setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p12.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P12', userSubmission, isCorrect);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCardData(prev => ({ ...prev, p12: { ...prev.p12, answer: value } }));
    changeData('P12', 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P12');
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
      onSubmit={handleSubmit}
      submitLabel={!cardData.p12.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={isBtnDisabled()}
      submitBtnColor={
        isBtnDisabled()
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p12.isSubmitted || !showAnswer
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.DEFAULT
      }
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='775px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Box display='flex' hAlign='center' flexDirection='column' alignItems='flex-start'>
            <Typography>
              <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }} title='밑줄'>
                Knowing
              </Typography>
              for their unique design, these shoes are always popular among teenagers.
            </Typography>
          </Box>
        </Box>
        <BoxWrap>
          <Box flex='1' hAlign={'center'}>
            <Input
              name='value'
              value={cardData.p12.answer}
              width='85%'
              maxLength={100}
              placeholder='내용을 넣어 주세요.'
              onChange={handleChange}
              status={
                !isNotEmptyString(cardData.p12.answer)
                  ? InputStatus.DEFAULT
                  : cardData.p12.isSubmitted && !isAnswer(cardData.p12.answer, cardData.p12.solution)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p12.isSubmitted}
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
            <Typography>{cardData.p12.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P12;
