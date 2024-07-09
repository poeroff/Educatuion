import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
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
import { L03SP04_1 } from './store';

const P07 = ({ _page = 'P07' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP04_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 문장쓰기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography>밑줄 친 부분을 바르게 고쳐 문장을 다시 써 봅시다.</Typography>,
    mark: cardData.p07.isSubmitted ? (cardData.p07.isCorrect ? 'correct' : 'incorrect') : 'none',
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

  const cleanString = (str: string) => {
    return str
      .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '')
      .trim()
      .normalize();
  };

  const submitAnswer = () => {
    if (cardData.p07.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrectA = cleanString(cardData.p07.answer.toString()) === cleanString(cardData.p07.solution.split('^')[0].toString());
      const isCorrectB = cleanString(cardData.p07.answer.toString()) === cleanString(cardData.p07.solution.split('^')[1].toString());
      const isCorrect = isCorrectA || isCorrectB === true ? true : false;

      setCardData(prev => ({ ...prev, p07: { ...prev.p07, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p07.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];

      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p07.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p07;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p07: { ...prev.p07, answer: value } }));
    }
    changeData(_page, 1, subKey, value);
    if (value !== '') {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
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
      submitLabel={cardData.p07.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p07.isSubmitted && cardData.p07.answer === ''}
      submitBtnColor={getButtonColor()}
      onSubmit={submitAnswer}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='840px' height='226px' flexDirection='column' hAlign={'center'} background='white' useRound useShadow>
          <Typography>
            I love novels written by Ernest Hemingway,{' '}
            <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
              <span>which</span>
            </u>{' '}
            I admire more than any other writer.
          </Typography>
          <Box color='var(--color-blue-900)'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>
              나는 Ernest Hemingway가 쓴 소설을 좋아하는데, 나는 그 어떤 작가보다도 더 그를 존경한다.
            </Typography>
          </Box>
        </Box>
        <BoxWrap>
          <Box flex='1' textAlign='center'>
            <Input
              name='value'
              placeholder={'내용을 넣어 주세요.'}
              maxLength={100}
              value={cardData.p07.answer.toString()}
              width='75%'
              readOnly={cardData.p07.isSubmitted}
              onChange={e => {
                handleChange(1, e.target.value);
              }}
              status={cardData.p07.isSubmitted ? (cardData.p07.isCorrect ? InputStatus.DEFAULT : InputStatus.ERROR) : InputStatus.ENABLE}
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
            <Typography>{cardData.p07.solution.split('^')[0]}</Typography>
            <Typography>/</Typography>
            <Typography>{cardData.p07.solution.split('^')[1]}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P07;
