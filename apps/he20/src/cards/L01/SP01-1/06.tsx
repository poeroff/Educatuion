import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP01_1 } from './store';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

interface pageType {
  _page?: string;
}

const P06 = ({ _page = 'P06' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP01_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 단어 연습',
  };

  const questionInfo: IQuestionProps = {
    text: '다음 뜻의 알맞은 영어 단어를 쓰세요.',
    mark: cardData.p06.isSubmitted ? (cardData.p06.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
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
    if (cardData.p06.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = isAnswer(cardData.p06.answer, cardData.p06.solution);
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p06.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer: value } }));
    }
    changeData(_page.toUpperCase(), 1, subKey, value);
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
      submitLabel={cardData.p06.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p06.isSubmitted && cardData.p06.answer === ''}
      submitBtnColor={
        cardData.p06.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p06.answer !== ''
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography fontSize='36px' weight='var(--font-weight-bold)'>
            셀 수 없이 많은
          </Typography>
        </Box>
        <BoxWrap>
          <Box flex='1' textAlign='center'>
            <Input
              name='value'
              placeholder={'내용을 넣어 주세요.'}
              maxLength={100}
              value={cardData.p06.answer.toString()}
              width='245px'
              readOnly={cardData.p06.isSubmitted}
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              status={
                cardData.p06.isSubmitted
                  ? cardData.p06.isCorrect
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : cardData.p06.answer
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              ariaLabel='1번 답 입력란'
            />
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{cardData.p06.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;
