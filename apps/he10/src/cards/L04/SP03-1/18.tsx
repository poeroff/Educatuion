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

const P18 = ({ _page = 'P18' }: { _page?: string }) => {
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
    text: <Typography>2. 글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.</Typography>,
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [{ text: '(1)' }, { text: '(2)' }, { text: '(3)' }, { text: '(4)' }, { text: '(5)' }];

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
    if (cardData.p18.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p18.answer === cardData.p18.solution;
      setCardData(prev => ({ ...prev, p18: { ...prev.p18, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p18.answer,
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
          p18: {
            ...prev.p18,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p18.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p18: { ...prev.p18, answer: index } }));
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
      submitLabel={cardData.p18.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p18.isSubmitted && cardData.p18.answer === 0}
      submitBtnColor={cardData.p18.answer != 0 ? (isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull>
          <Box background='white' useRound paddingRight='10px'>
            <Typography>However, neither of these waste management options takes into account the potential value of coffee grounds.</Typography>
          </Box>
          <Box background='white' useRound paddingRight='10px' marginTop='16px'>
            <Typography>
              &nbsp;&nbsp;What happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general
              waste and sent to landfills. (1) There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent
              than CO2. (2) Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. (3) Although the
              grounds contain valuable organic compounds and minerals, they are simply destroyed. (4) Fortunately, thanks to increased awareness of
              the coffee waste problem, companies, organizations, and governments around the world are working hard to improve the environmental
              impact of the coffee industry through circular economy measures. (5) A circular economy promotes the reuse of resources for as long as
              possible, reducing waste and environmental costs.
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
                  value={index === cardData.p18.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p18.isSubmitted}
                  isError={cardData.p18.isSubmitted && cardData.p18.answer !== cardData.p18.solution}
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
            <Typography>{cardData.p18.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              주어진 문장의 “these waste management options”가 가리키는 것은 3번 앞에서 언급된 커피 찌꺼기를 매립지로 보내 분해하는 방식과 소각하는
              방식 모두에 해당한다. 그리고 주어진 문장에서는 이러한 옵션이 커피 찌꺼기의 잠재적 가치를 고려하지 않는다고 했는데, 3번 다음 문장에서 이
              찌꺼기에 귀중한 유기 화합물과 미네랄이 포함되어 있다며 커피 찌꺼기의 잠재적 가치에 관해 설명하고 있다. 따라서 주어진 문장이 들어가기에
              가장 적절한 곳은 3번이다.
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='12px'>
              <Typography>
                &nbsp;&nbsp;커피 추출 과정에서 발생하는 모든 폐기물은 어떻게 될까? 사용된 커피 찌꺼기(SCG)는 일반폐기물로 분류되어 매립지로 보내진다.
                그곳에서 그것들은 분해되며 이산화탄소보다 약 25배 더 강력한 온실가스인 메탄을 배출한다. 일부 SCG는 매립되지 않고 소각되는데, 이에 따라
                톤당 338kg에 달하는 많은 양의 이산화탄소가 배출된다.{' '}
                <span style={{ textDecoration: 'underline' }}>
                  그러나 이러한 폐기물 관리 옵션 중 어느 것도 커피 찌꺼기의 잠재적 가치를 고려하지 않는다.
                </span>{' '}
                찌꺼기에는 귀중한 유기 화합물과 미네랄이 포함되어 있지만, 그냥 파괴될 뿐이다. 다행히 커피 폐기물 문제에 대한 높아진 인식 덕분에 전
                세계 기업, 단체, 정부는 순환 경제 조치를 통해 커피 산업이 환경에 미치는 영향을 개선하려고 열심히 노력하고 있다. 순환 경제는 가능한
                오랫동안 자원을 재사용하도록 촉진하여 폐기물과 환경 비용을 줄인다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P18;
