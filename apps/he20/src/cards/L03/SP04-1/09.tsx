import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP04_1 } from './store';

const P09 = ({ _page = 'P09' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP04_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>1. 다음 중 어법상 옳은 문장의 개수로 적절한 것을 고르시오.</Typography>,
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '1개',
    },
    {
      text: '2개',
    },
    {
      text: '3개',
    },
    {
      text: '4개',
    },
    {
      text: '5개',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p09.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p09.answer === cardData.p09.solution;
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p09.answer,
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
          p09: {
            ...prev.p09,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p09.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p09;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer: index } }));
    changeData(_page, 1, 1, index);
    if (index !== 0) {
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
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p09.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p09.isSubmitted && cardData.p09.answer === 0}
      submitBtnColor={getButtonColor()}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box width='594px'>
          <Box height='350px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <BoxWrap>
                <Box>a.</Box>
                <Typography>My sister is looking forward to this Christmas, where she can get a present.</Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>b.</Box>
                <Typography>I feel grateful for my teacher Mr. Han, whom always supports me.</Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>c.</Box>
                <Typography>The bookstore, where the owner sells hard-to-find books, is a favorite among readers.</Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>d.</Box>
                <Typography>The coffee shop, which is known for its tasty cake, is always busy with customers.</Typography>
              </BoxWrap>
              <BoxWrap>
                <Box>e.</Box>
                <Typography>The park, which families gather on weekends, is a popular place for fun.</Typography>
              </BoxWrap>
            </Scroll>
          </Box>
        </Box>
        <Box useFull flex='1'>
          <Scroll height='398px' tabIndex={0}>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p09.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.answer !== cardData.p09.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p09.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              a. where she can get a present의 선행사는 this Christmas로, 시간을 나타내는 선행사이기 때문에 where가 아닌 when을 써야 한다.
            </Typography>
            <Typography>
              b. always supports me는 주어가 빠진 불완전한 절이므로, 목적격 관계대명사 whom이 아닌 주겨 관계대명사 who를 써야 한다.
            </Typography>
            <Typography>e. families gather on weekends는 완전한 절이므로, 관계대명사 which가 아닌 관계부사 where를 써야 한다.</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>a. 내 여동생은 이번 크리스마스를 고대하는데, 그때 그녀는 선물을 받을 수 있다.</Typography>
            <Typography>b. 나는 우리 선생님인 Han 선생님에게 고마움을 느끼는데, 그는 항상 나를 지지해 준다.</Typography>
            <Typography>c. 희귀한 책을 판매하는 서점은 수집가들 사이에서 인기가 많다.</Typography>
            <Typography>d. 맛있는 케이크로 유명한 커피숍은 항상 손님으로 붐빈다.</Typography>
            <Typography>e. 주말에 가족들이 모이는 공원은 즐거운 장소로 유명하다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
