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
  TMainHeaderInfoTypes,
  Tag,
  Typography,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04SP03_1 } from './store';

const P16 = ({ _page = 'P16' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        1. 글의 흐름으로 보아 , 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.
      </Typography>
    ),
    mark: cardData.p16.isSubmitted ? (cardData.p16.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };


  const data = [
    {
      text: '',
    },
    {
      text: '',
    },
    {
      text: '',
    },
    {
      text: '',
    },
    {
      text: '',
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
    if (cardData.p16.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p16.answer === cardData.p16.solution;
      setCardData(prev => ({ ...prev, p16: { ...prev.p16, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p16.answer,
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
    if (cardData.p16.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p16.answer;
      const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p16: {
            ...prev.p16,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },    
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
      if (defaultAnswer > 0) {
        setIsSubmittable(true);
      }
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p16: { ...prev.p16, answer: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
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
      submitLabel={cardData.p16.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p16.isSubmitted && cardData.p16.answer === -1}
      submitBtnColor={
        cardData.p16.isSubmitted
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
      <Box useFull>
        <Box>
            <Box display='flex'>
            <Box height='398px' width='440px' background='white'  useRound paddingRight='10px' marginRight='20px'>
                <Scroll>
                    <Typography tabIndex={101}>
                        &nbsp;&nbsp;&nbsp;&nbsp; First, let’s explore how this fascinating technology has been applied. ( 1 ) The AI-powered neural implant has shown great
                        promise in medical applications, offering solutions to a range of problems. ( 2 ) For instance, neural implants are used to treat
                        brain disorders like Parkinson’s disease. ( 3 ) These implants electrically stimulate targeted regions of the brain at the right time
                        with the help of AI to restore normal brain activity. ( 4 ) When they think about moving their legs, the AI analyzes the brain
                        signals and sends them to their legs through the implants. ( 5 ) Similarly, those who have lost their arms can use artificial arms
                        operated by the same mechanism
                    </Typography>
                </Scroll>  
            </Box>
            <Box height='268px' width='420px' background='white'  useRound paddingRight='10px' >
                <Box>
                  <Typography>
                      In addition, paralyzed people
                      can have the ability to walk
                      again with the help of a
                      “digital bridge” between two
                      implants inserted into their
                      brain and spine.
                  </Typography>
                </Box>
                <Box>
                  <List
                    gap={0}
                    data={data}
                    align='horizontal'
                    row={({ value, index = 1 }) => (
                      <Radio
                        type={'square'}
                        align='vertical'
                        name={'radio-answer'}
                        label={value?.text}
                        value={index === cardData.p16.answer}
                        onClick={() => handleChange(index)}
                        readOnly={cardData.p16.isSubmitted}
                        isError={cardData.p16.isSubmitted && cardData.p16.answer !== cardData.p16.solution}
                      >
                        <BoxWrap alignItems='baseline'>
                          <Label value={index} />
                        </BoxWrap>
                      </Radio>
                    )}
                  />
                </Box>

              </Box>
          </Box>
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box>
                <Tag type={ETagLine.GREEN} label='답안' />
              </Box>
              <Box marginTop='12px'>
                <Typography>{cardData.p16.solution}</Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='문제해설' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                주어진 문장은 마비된 사람들이 뇌와 척추에 삽입된 두 개의 관 사이의 ' 디지털 다리 ' 를 통해 다시 걸을 수 있게 된다는 내용이다 . 4 번 다음에 나오는
                문장의 they 가 지칭하는 것은 내용상 paralyzed people 이고 ‘디지털 다리’가 어떻게 작용하는지에 대한 설명이 이어지기 때문에 , 주어진 문장은 4
                번에 들어가는 것이 적절하다.
                </Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                먼저 , 이 멋진 기술이 어떻게 적용되었는지 살펴봅시다 . AI 기반 신경 임플란트는 다양한 문제에 대한 해결책을 제시하며 의료 분야에서 큰
                가능성을 보여주었습니다 . 예를 들어 , 신경 임플란트는 파킨슨병과 같은 뇌 질환을 치료하는 데 사용됩니다 . 이러한 임플란트는 AI 의 도움을 받아
                적시에 뇌의 표적 부위를 전기적으로 자극하여 정상적인 뇌 활동을 회복시킵니다.&nbsp; 
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                또한 마비된 사람들은 뇌와 척추에 삽입된 두 개의 임플란트 사이
                의 ' 디지털 다리 ' 의 도움을 받아 다시 걸을 수 있게 됩니다.
                </u>
                &nbsp;그들이 다리를 움직이려고 생각할 때 , AI 가 뇌 신호를 분석하여 임플란트를 통해 다리로
                신호를 보냅니다 . 마찬가지로 , 팔을 잃은 사람들도 동일한 방법으로 작동되는 의수를 사용할 수 있습니다.
                </Typography>
              </Box>
            </Box>
          </BottomSheet>
        </Box>
      </Box>
    </Container>
  );
};

export default P16;