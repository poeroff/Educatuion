import usePageData from '@/hooks/usePageData';
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
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP03_1 } from './store';

const P17 = ({ _page = 'P17' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>1. 글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.</Typography>,
    mark: cardData.p17.isSubmitted ? (cardData.p17.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(1)',
    },
    {
      text: '(2)',
    },
    {
      text: '(3)',
    },
    {
      text: '(4)',
    },
    {
      text: '(5)',
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
    if (cardData.p17.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p17.answer;
      const defaultCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p17: {
            ...prev.p17,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultCorrect,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);

      if (defaultAnswer > 0) {
        setIsSubmittable(true);
      }
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
    init();
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p17.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p17.isSubmitted && cardData.p17.answer === 0}
      submitBtnColor={
        !cardData.p17.isSubmitted && cardData.p17.answer === 0
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.DEFAULT
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <Box useFull>
        <Box>
          <Box tabIndex={101} width='100%' background='white' lineHeight='48px' useRound>
            For example, when users want to cancel their subscription, they are offered two options: “I want to keep my benefits” and “I want to give
            up my benefits.”
          </Box>
          <Box width='100%' background='white' lineHeight='48px' useRound marginTop={20}>
            <BoxWrap>
              Another common type of dark pattern is known as “hidden fees.” This design suddenly adds extra fees at the last step of the ordering
              process. ( 1 ) On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the
              seller has added to increase the final cost of the order. ( 2 ) “Confirm-shaming” is another online trick that users should be aware of.
              ( 3 ) This technique manipulates users into feeling ashamed for cancelling their membership or requesting a refund for an order. ( 4 )
              Companies use this to keep their members subscribed, even if it goes against the members’ intentions. ( 5 ) The first option is
              presented in an appealing way, while the second option seems like a bad choice.
            </BoxWrap>
          </Box>

          <Box marginTop={20}>
            <List
              gap={2}
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
              <Box marginTop='22px'>
                <Typography>
                  주어진 문장은 구독을 취소하고 싶은 사용자가 두 가지 선택 사항을 제안받는 것과 관련된 내용이므로, 기업들이 회원들의 구독 상태를
                  유지하기 위해 ‘컨펌 쉐이밍’이라는 기법을 사용한다는 내용과 첫 번째 선택 사항은 매력적인 방식으로 제시되는 반면, 두 번째 옵션은 나쁜
                  선택처럼 보인다는 내용 사이인 5번에 들어가는 것이 적절하다.
                </Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                  다크 패턴의 또 다른 흔한 유형은 ‘숨겨진 요금’이라고 알려져 있다. 이 기법은 주문 과정의 마지막 단계에서 갑자기 추가 요금을 부과한다.
                  마지막 페이지에서 소비자는 판매자가 주문의 최종 비용을 증가시키기 위해 추가한 배송 비용 또는 처리 비용과 같은 추가 요금을 발견하고
                  놀란다. ‘컨펌 쉐이밍’은 사용자들이 알아야 할 또 다른 온라인 속임수이다. 이 기술은 멤버십을 취소하거나 주문에 대한 환불을 요청하는
                  것에 대해 부끄러움을 느끼도록 사용자들을 조종한다. 기업들은 회원들의 의도에 어긋난다고 할지라도 회원들의 구독 상태를 유지하기 위해서
                  이를 사용한다. 예를 들어, 사용자들이 구독을 취소하고 싶을 때, 그들은 "나는 내 혜택을 유지하고 싶다."와 "나는 내 혜택을 포기하고
                  싶다."라는 두 가지 선택 사항을 제안받는다. 첫 번째 선택 사항은 매력적인 방식으로 제시되는 반면, 두 번째 옵션은 나쁜 선택처럼 보인다.
                </Typography>
              </Box>
            </Box>
          </BottomSheet>
        </Box>
      </Box>
    </Container>
  );
};

export default P17;
