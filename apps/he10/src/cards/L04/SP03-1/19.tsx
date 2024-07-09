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
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP011State from './store';

const P19 = ({ _page = 'P19' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP011State);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>3. 다음 글의 내용과 일치하지 않는 것을 고르시오.</Typography>,
    mark: cardData.p19.isSubmitted ? (cardData.p19.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    { text: '재활용된 커피 찌꺼기는 땔감으로도 사용될 수 있다.' },
    { text: '커피 찌꺼기로 만든 직물은 빠르게 건조된다.' },
    { text: '커피 찌꺼기로 만든 재사용 가능 컵은 겉모습이 볼품없다.' },
    { text: '기업들은 커피 폐기물의 새로운 용도를 연구하고 있다.' },
    { text: '커피 찌꺼기의 재활용이 앞으로 증가할 것으로 예상된다.' },
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
    if (cardData.p19.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p19.answer === cardData.p19.solution;
      setCardData(prev => ({ ...prev, p19: { ...prev.p19, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p19.answer,
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
          p19: {
            ...prev.p19,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p19.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p19: { ...prev.p19, answer: index } }));
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
      submitLabel={cardData.p19.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p19.isSubmitted && cardData.p19.answer === 0}
      submitBtnColor={cardData.p19.answer != 0 ? (isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull>
          <Box background='white' useRound paddingRight='10px' marginTop='16px'>
            <Typography>
              &nbsp;&nbsp;Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups.
              Coffee logs, for instance, generate more heat and burn for a longer time than wood. Fabric made from coffee grounds absorbs sweat, dries
              quickly, and provides UV protection. Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve
              the taste of the coffee.
            </Typography>
            <Typography>
              &nbsp;&nbsp;Korea has shown a growing interest in recycling spent coffee grounds in recent years. The government is taking steps toward
              the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and
              developing new uses for coffee waste. By recycling materials such as coffee waste, individuals can also help protect the environment.
              With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying
              coffee for years to come.
            </Typography>
          </Box>
          <Box marginTop='10px'>
            <List
              gap={1}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p19.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p19.isSubmitted}
                  isError={cardData.p19.isSubmitted && cardData.p19.answer !== cardData.p19.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p19.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              재사용 가능한 컵은 시각적으로 매력적인 외관을 지닐 뿐만 아니라 커피의 맛도 보존한다고 했으므로, 글의 내용과 일치하지 않는 것은 3번이다.
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='12px'>
              <Typography>
                &nbsp;&nbsp;재활용된 커피 찌꺼기는 커피 땔감, 의류 및 신발용 직물, 재사용할 수 있는 컵 등 다양한 용도로 사용된다. 예를 들어, 커피
                땔감은 장작보다 더 많은 열을 발생시키고 더 오랫동안 탄다. 커피 찌꺼기로 만든 직물은 땀을 흡수하고 빠르게 건조되며 자외선 차단 기능을
                제공한다. 커피 찌꺼기로 만든 재사용 가능한 컵은 시각적으로 매력적인 외관을 지닐 뿐만 아니라 커피의 맛도 보존한다.
              </Typography>
              <Typography>
                &nbsp;&nbsp;최근 몇 년간 한국은 커피 찌꺼기 재활용에 대해 높은 관심을 보여왔다. 정부가 커피 산업에서 지속 가능한 재활용 시스템 구축을
                향해 나아가는 동안에, 기업들은 커피 폐기물의 새로운 용도를 연구하고 개발하는 데 전념하고 있다. 커피 찌꺼기와 같은 물질을
                재활용함으로써 개인도 환경을 보호하는 데 도움을 줄 수 있다. 지속적인 노력을 통해 앞으로 수년간 커피를 즐길 수 있는 더 지속 가능한
                방법을 장려하며, 사용된 커피 찌꺼기의 재활용이 증가할 것으로 예상된다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P19;
