import {
  BoxWrap,
  Box,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  IQuestionProps,
  Tag,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import L04SP041State from './store';

const P11 = ({ _page = 'P11' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(L04SP041State);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };
  const questionInfo: IQuestionProps = {
    text: '3. 다음 중 어법상 옳은 것만으로 묶인 것을 고르시오.',
    markSize: 'middle',
    mark: cardData.p11.isSubmitted ? (cardData.p11.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'a, b',
    },
    {
      text: 'b, c',
    },
    {
      text: 'a, e',
    },
    {
      text: 'c, d',
    },
    {
      text: 'b, e',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p11: {
            ...prev.p11,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p11.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p11.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = cardData.p11.answer === cardData.p11.solution;
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p11.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p11: { ...prev.p11, answer: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
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
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p11.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p11.isSubmitted && cardData.p11.answer === 0}
      submitBtnColor={cardData.p11.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap flexDirection='column'>
        <Box height='100%' width='910px' background='white' lineHeight='48px' useRound paddingRight='10px' marginRight='20px'>
          <Box>
            <Scroll tabIndex={0}>
              <Typography>a. With the rain pouring outside, we decided to stay in.</Typography>
              <Typography>b. My best friend, Anna, is not only kind but also helpful.</Typography>
              <Typography>c. Judy walked out of the library with her backpack filling with books.</Typography>
              <Typography>d. To sign up for the class, you can either visit our website or to call us.</Typography>
              <Typography>e. They could find their cat neither in the living room or in the kitchen.</Typography>
            </Scroll>
          </Box>
        </Box>
        <Box useFull flex='1'>
          <Scroll tabIndex={0}>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p11.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p11.isSubmitted}
                  isError={cardData.p11.isSubmitted && cardData.p11.answer !== cardData.p11.solution}
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              {cardData.p11.solution}
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>c. 명사구 her backpack과 fill의 관계가 수동이므로 filling을 filled로 고쳐야 한다.</Typography>
            <Typography>d. 상관접속사 {'<'}either A or B{'>'}로 연결되는 말은 문법적으로 대등한 형태여야 하고, 조동사 can 다음의 동사가 {'<'}either A or B{'>'}로 연결되는 것이므로 to call을 call로 고쳐야 한다.</Typography>
            <Typography>e. {'<'}neither A nor B{'>'} 구문을 써야 하므로 or는 nor로 고쳐야 한다.</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='12px'>
            <Typography>a. 밖에 비가 쏟아져서 우리는 안에 머물기로 결정했다.</Typography>
            <Typography>b. 나의 가장 친한 친구인 Anna는 친절할 뿐만 아니라 도움도 많이 준다.</Typography>
            <Typography>c. Judy는 그녀의 가방이 책으로 가득 찬 채 도서관 밖으로 나왔다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
