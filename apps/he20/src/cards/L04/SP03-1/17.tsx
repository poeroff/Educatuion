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

const P17 = ({ _page = 'P17' }: { _page?: string }) => {
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
        2. 주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은 ?
      </Typography>
    ),
    mark: cardData.p17.isSubmitted ? (cardData.p17.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const data = [
    {
      text: '(A)-(C)-(B)',
    },
    {
      text: '(B)-(A)-(C)',
    },
    {
      text: '(B)-(C)-(A)',
    },
    {
      text: '(C)-(A)-(B)',
    },
    {
      text: '(C)-(B)-(A)',
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
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (cardData.p17.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p17.answer;
      const defaultIsCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p17: {
            ...prev.p17,
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
    setCardData(prev => ({ ...prev, p17: { ...prev.p17, answer: index } }));
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
      submitLabel={cardData.p17.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p17.isSubmitted && cardData.p17.answer === -1}
      submitBtnColor={
        cardData.p17.isSubmitted
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
      <BoxWrap useFull>
        <Box>
            <Box display='flex' useFull>
            <Scroll>
            <Box>
            <Box height='275px' width='480px'  useRound >
                <Box marginTop='20px'  background='white' useRound>
                    <Typography tabIndex={101}>
                        Some futurists predict that
                        these implants will become
                        commercially available in the
                        next 20 to 30 years and
                        significantly change our daily
                        lives.
                    </Typography>
                </Box>
                <Box marginTop='20px' width='420px'  useRound>
                    <Typography>
                      (A) The role of the brain would shift from learning and storing information to processing the vast amounts of
                      data provided by the implants. Instead of simply memorizing information, we would be able to download
                      knowledge, use our creativity to interpret it, and generate new ideas.
                    </Typography>
                    <Typography>
                      (B) For example, advances in neural implant technology will make it possible to install in our brains software
                      that can read our minds. This could enable us to play games, type social media messages, and stream
                      music simply by thinking. There is also great potential for memory-enhancing brain implants, similar to
                      computer memory chips.
                    </Typography>
                    <Typography>
                      (C) Such devices would allow us to capture and enhance memories, and even upload and download them
                      using the digital cloud. We could look through our memories like a social media feed, vividly recall our
                      favorite life moments, share memories with others, and back up our most valuable memories. Finally, AI-
                      powered neural implants would revolutionize the way our brains work
                    </Typography>
                </Box>
            </Box>  
            </Box>
            </Scroll>
            <Box height='268px'  paddingLeft='10px' marginTop='10px' marginLeft='10px' >
            <List
              gap={0}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                gap={0}
                  type={'square'}
                  align='horizontal'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p17.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p17.isSubmitted}
                  isError={cardData.p17.isSubmitted && cardData.p17.answer !== cardData.p17.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography tabIndex={110 + index}>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
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
                <Tag type={ETagLine.GREEN} label='문제해설' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                임플란트 기술이 미래에 우리의 일상을 크게 변화시킬 것이라는 내용의 주어진 문장 다음에 , For example 로 시작하면서 주어진 문장의 구체적인 예가
                시작되는 글인 (B) 가 오는 것이 자연스럽다 . (C) 의 Such devices 는 (B) 의 computer memory chips 를 지칭하므로 (B) 다음에 (C) 가 이어지는 것이
                자연스럽고 , (C) 의 마지막에 언급된 the way our brains work 의 구체적인 내용이 (A) 에 언급되므로 , (C) 다음에 (A) 가 나와야 한다.
                </Typography>
              </Box>

              <Box marginTop='40px'>
                <Tag type={ETagLine.GREEN} label='해석' />
              </Box>
              <Box marginTop='22px'>
                <Typography>
                일부 미래학자들은 이러한 임플란트가 향후 20-30 년 안에 상업적으로 이용할 수 있게 되어 우리의 일상을 크게 변화시킬 것으로 예측합니다 . (B) 예를
                들어 , 신경 임플란트 기술의 발전으로 우리의 마음을 읽을 수 있는 소프트웨어를 뇌에 설치하는 것이 가능해질 것입니다 . 이렇게 되면 생각만으로 게임을
                하고 , 소셜 미디어 메시지를 입력하고 , 음악을 스트리밍할 수 있게 될 것입니다 . 기억력을 향상하는 뇌 임플란트에서도 큰 잠재력을 가지고 있는데 , 이는
                컴퓨터 메모리 칩과 유사합니다 . (C) 이러한 장치를 사용하면 기억을 포착하고 강화할 수 있으며 , 디지털 클라우드를 사용하여 기억을 업로드 및 다운로드할
                수도 있습니다 . 우리는 소셜 미디어 피드처럼 기억을 살펴보고 , 인생에서 가장 좋았던 순간을 생생하게 회상하고 , 다른 사람들과 기억을 공유하고 , 가장
                소중한 기억을 백업할 수 있을 것입니다 . 마지막으로 , AI 기반 신경 임플란트는 우리 뇌가 작동하는 방식에 혁명을 일으킬 것입니다 . (A) 뇌의 역할이 정보를
                학습하고 저장하는 것에서 신경 임플란트가 제공하는 방대한 양의 데이터를 처리하는 것으로 바뀌게 될 것입니다 . 단순히 정보를 암기하는 대신에 , 우리는
                지식을 다운로드하고 , 창의력을 발휘하여 그 지식을 해석하고 , 새로운 아이디어를 만들어 낼 수 있게 될 것입니다 .                                                           
                </Typography>
              </Box>
            </Box>
          </BottomSheet>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P17;