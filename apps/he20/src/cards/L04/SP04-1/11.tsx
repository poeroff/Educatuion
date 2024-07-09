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
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { SP04_1 } from './store';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P11 = ({ _page = 'P11' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(SP04_1);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: <>3. (A), (B), (C) 에 들어갈 말로 알맞게 짝지어진 것을 고르시오</>,
    markSize: 'middle',
    mark: cardData.p11.isSubmitted ? (cardData.p11.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: '(A)that - (B)it - (C)that',
    },
    {
      text: '(A)that - (B)them - (C)where',
    },
    {
      text: '(A)that - (B)it - (C)where',
    },
    {
      text: '(A)which - (B)them - (C)where',
    },
    {
      text: '(A)which - (B)it - (C)that',
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
      bodyId='targetContainer'
      useExtend={true}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={!cardData.p11.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p11.isSubmitted && cardData.p11.answer === 0}
      submitBtnColor={cardData.p11.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap>
        <Box height='398px' width='400px' background='white' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>
            <Typography>
              In the world of start-ups, there is a risk
              <Typography weight={'var(--font-weight-extraBold)'}>(A) [that / which]</Typography>the business will fail within the first few years.
              People start a start-up with passion, but soon find <Typography weight={'var(--font-weight-extraBold)'}>(B) [it / them]</Typography>
              difficult to survive in the face of tough competition. This is more challenging particularly in the technology industry,{' '}
              <Typography weight={'var(--font-weight-extraBold)'}>(C) [that / where]</Typography>staying up-to-date with trends is required.
            </Typography>
          </Scroll>
        </Box>
        <Box useFull height='398px' flex='1'>
          <Scroll>
            <List gap={10} data={data}>
              {({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p11.answer}
                  defaultValue={index === cardData.p11.answer}
                  onClick={() => handleChange(index)}
                  disabled={cardData.p11.isSubmitted}
                  isError={cardData.p11.isSubmitted && cardData.p11.answer !== cardData.p11.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p10.solution}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              (A) “the business will fail within the first few years” 는 완전한 절이고 앞에 나온 the risk 에 대한 내용이므로 , 동격의 접속사 that 이
              와야 한다 .
            </Typography>
            <Typography>
              (B) 5 형식 ( 동사 + 목적어 + 목적격 보어 ) 형태에서 , 목적격 보어로 difficult 가 쓰였고 목적격 보어 뒤의 to survive in the face of tough
              competition 은 진목적어이다 . 따라서 find 의 목적어 자리에 가목적어인 it 이 오는 것이 적절하다 .
            </Typography>
            <Typography>
              (C) “staying up-to-date with trends is required” 는 완전한 절이므로 관계부사 where 가 나와서 , 앞에 나온 the technology industry 를 부연
              설명하는 절을 이끌어야 한다 .
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              스타트업의 세계에는 처음 몇 년 안에 사업이 실패할 위험이 존재한다 . 사람들은 열정을 가지고 스타트업을 시작하지만 , 곧 심한 경쟁 속에서
              살아남는 것이 어렵다는 것을 알게 된다 . 이것은 특히 기술 산업에서 더욱 어려운데 , 그 산업은 최신 트렌드를 파악하는 것이 요구된다 .
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
