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

const P17 = ({ _page = 'P17' }: { _page?: string }) => {
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
    text: <Typography>1. (A), (B), (C)의 각 네모 안에서 어법에 맞는 표현으로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p17.isSubmitted ? (cardData.p17.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    { text: '(A) springing - (B) consuming - (C) making' },
    { text: '(A) springing - (B) consumed - (C) make' },
    { text: '(A) springing - (B) consuming - (C) make' },
    { text: '(A) sprung - (B) consumed - (C) make' },
    { text: '(A) sprung- (B) consuming - (C) making' },
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
    if (cardData.p17.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p17.answer === cardData.p17.solution;
      setCardData(prev => ({ ...prev, p17: { ...prev.p17, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p17.answer,
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
          p17: {
            ...prev.p17,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p17.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p17: { ...prev.p17, answer: index } }));
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
      submitLabel={cardData.p17.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p17.isSubmitted && cardData.p17.answer === 0}
      submitBtnColor={cardData.p17.answer != 0 ? (isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box useFull>
          <Box background='white' useRound paddingRight='10px'>
            <Typography>
              &nbsp;&nbsp;The famous German musician Johann Sebastian Bach once said, “Without my morning coffee, I’m just like a dried-up piece of
              goat.” Today this sentiment is shared by many, with coffee shops (A)[springing / sprung] up on almost every street corner, and it is
              common to see city residents walking around with a cup of coffee in hand. According to the International Coffee Organization (ICO),
              approximately 10 billion tons of coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to
              this huge total, (B)[consuming / consumed] 150,780 tons of coffee.
            </Typography>
            <Typography>
              &nbsp;&nbsp;The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates
              significant waste. Only 0.2 percent of a coffee bean is used to (C)[make / making] coffee, with the remaining 99.8 percent disposed of
              as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.
            </Typography>
          </Box>
          <Box marginTop='10px'>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p17.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p17.isSubmitted}
                  isError={cardData.p17.isSubmitted && cardData.p17.answer !== cardData.p17.solution}
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
            <Typography>{cardData.p17.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (A): {`<`}with+명사+분사{`>`}의 형태에서 coffee shops와 spring up의 관계가 능동이므로, springing이 적절하다.
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (B): 주절의 주어 Koreans와 분사구문의 consume은 능동의 관계이므로, consuming이 적절하다.
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                (C): {`<`}be used to + 동사원형{`>`}은 ‘~하기 위해 사용되다’의 의미이고, {`<`}be used to + ~ing{`>`}는 ‘~하는 것에 익숙해 있다’의
                의미이다. 여기서는 ‘커피 원두 중 0.2%만이 커피를 만들기 위해 사용된다’의 의미가 되어야 하므로 make가 적절하다.
              </Box>
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='12px'>
              <Typography>
                &nbsp;&nbsp;독일의 유명한 음악가 Johann Sebastian Bach는 “모닝커피가 없다면 나는 삐쩍 마른 염소 한 마리에 불과하다”라고 말했다. 오늘날
                이러한 정서는 거의 모든 길모퉁이에 커피숍이 생겨나는 가운데 많은 사람에 의해 공유되고 있으며, 도시 주민들이 손에 커피 한잔을 들고
                돌아다니는 모습을 흔히 볼 수 있다. 있으며, 도시 주민들이 손에 커피 한잔을 들고 돌아다니는 모습을 흔히 볼 수 있다. 국제 커피
                기구(ICO)에 따르면 2020년부터 2021년까지 전 세계적으로 약 100억 톤의 커피가 소비되었으며, 한국인은 150,780톤의 커피를 소비하며 이
                엄청난 총량에 상당한 기여를 했다.
              </Typography>
              <Typography>
                &nbsp;&nbsp;커피에 대한 전 세계의 광범위한 사랑은 추출 과정에서 상당한 폐기물이 발생하기 때문에 상당한 환경 비용을 초래한다. 커피 원두
                중 0.2%만이 커피를 만드는 데 사용되며, 나머지 99.8%는 폐기물로 처리된다. 그 결과, 전 세계적으로 소비되는 엄청난 양의 커피로 인해 매년
                수백만 톤의 커피 폐기물이 발생한다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P17;
