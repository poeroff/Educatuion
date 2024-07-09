import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Radio,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
  List,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP01_2 } from './store';

interface pageType {
  _page: 'P03' | 'P04' | 'P05' | 'P06';
  selectList: {
    text: string;
    id: number;
  }[];
  word: string

}

const HE03701SELECT = ({ _page, selectList, word }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP01_2);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak]  단어  연습​',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography>다음 단어의 알맞은 뜻을 고르세요.</Typography>,
    mark: cardData[_page].isSubmitted ? (cardData[_page].isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const answer = '용돈';

  const data = [
    {
      text: '용돈',
      id: 1,
    },
    {
      text: '명성​',
      id: 2,
    },
    {
      text: '성분​',
      id: 3,
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData[_page].isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData[_page].answer === cardData[_page].solution;

      setCardData(prev => ({ ...prev, [_page]: { ...prev[_page], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[_page].answer,
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
          [_page]: {
            ...prev[_page],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[_page].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: number) => {
    setCardData(prev => ({ ...prev, [_page]: { ...prev[_page], answer: value } }));
    changeData(_page, 1, 1, value);
    if (value !== null) {
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
      submitLabel={cardData[_page].isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[_page].isSubmitted && cardData[_page].answer === null}
      submitBtnColor={
        cardData[_page].isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
            ? isShowAnswer
              ? EStyleButtonTypes.GRAY
              : EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <Box useFull flexDirection='column' hAlign='center' gap='48px' width={920}>
        <Box vAlign='center' width='685px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-36)'>
            {word}
          </Typography>
        </Box>
        <BoxWrap>
          <Box vAlign='center' useFull>
            <List
              data={selectList}
              align='horizontal'
              gap={25}
              row={({ value, index = 1 }) => (
                <Box flex={1} textAlign='center' width={'287px'}>
                  <Radio
                    type={'box'}
                    align='vertical'
                    name={'radio-question-A'}
                    label={value?.text}
                    key={index}
                    value={value?.id === cardData[_page].answer}
                    onClick={() => handleChange(index)}
                    readOnly={cardData[_page].isSubmitted}
                    isError={cardData[_page].isSubmitted && cardData[_page].answer !== cardData[_page].solution}
                  >
                    <Typography weight='var(--font-weight-medium)' fontSize='var(--font-size-28)'>
                      {value?.text}
                    </Typography>
                  </Radio>
                </Box>
              )}
            ></List>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px' padding='4px 12px'>
            <Typography>{selectList.find(v => v.id == cardData[_page].solution)?.text}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE03701SELECT;
