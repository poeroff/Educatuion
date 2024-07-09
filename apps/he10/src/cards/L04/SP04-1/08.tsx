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
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import L04SP041State from './store';

const P08 = ({ _page = 'P08' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L04SP041State);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 문장쓰기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '밑줄 친 부분을 바르게 고쳐 문장을 다시 써 봅시다.',
    markSize: 'middle',
    mark: cardData.p08.isSubmitted ? (cardData.p08.isCorrect ? 'correct' : 'none') : 'none',
  };

  const isBtnDisabled = () => {
    return !isNotEmptyString(cardData.p08.answer);
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
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p08: {
            ...prev.p08,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p08.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p08.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p08.answer, cardData.p08.solution);
      setCardData(prev => ({ ...prev, p08: { ...prev.p08, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p08.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer: value } }));
    changeData(_page.toUpperCase(), 1, 1, value);
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
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
      submitLabel={!cardData.p08.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={isBtnDisabled()}
      submitBtnColor={
        isBtnDisabled()
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p08.isSubmitted || !showAnswer
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.DEFAULT
      }
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='775px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Box display='flex' hAlign='center' flexDirection='column' alignItems='flex-start'>
            <Typography>
              She told her grandson to eat
              <Typography textDecoration={'underline'} title='밑줄'>
                either
              </Typography>
              cookies nor chocolate before lunch.
            </Typography>
            <Box color='var(--color-blue-900)'>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                그녀는 자신의 손자에게 점심 식사 전에 쿠키도 초콜릿도 먹지 말라고 말했다.
              </Typography>
            </Box>
          </Box>
        </Box>
        <BoxWrap>
          <Box flex='1' hAlign={'center'}>
            <Input
              name='value'
              value={cardData.p08.answer}
              width='85%'
              maxLength={100}
              placeholder='내용을 넣어 주세요.'
              onChange={handleChange}
              status={
                !isNotEmptyString(cardData.p08.answer)
                  ? InputStatus.DEFAULT
                  : cardData.p08.isSubmitted && !isAnswer(cardData.p08.answer, cardData.p08.solution)
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
              }
              readOnly={cardData.p08.isSubmitted}
              ariaLabel='답란'
            />
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{cardData.p08.solution.join(', ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P08;
