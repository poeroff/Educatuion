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
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP03_1 } from './store';

const P19 = ({ _page = 'P19' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <Typography>3. 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.</Typography>,
    mark: cardData.p19.isSubmitted ? (cardData.p19.isCorrect ? 'correct' : 'incorrect') : 'none',
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
      submitBtnColor={
        cardData.p19.isSubmitted
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
      <BoxWrap>
        <Box useFull>
          <Box background='white' useRound paddingRight='10px'>
            <Typography>
              The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and
              road noise.
            </Typography>
          </Box>
          <Box background='white' useRound paddingRight='10px' marginTop='16px'>
            <Typography>
              &nbsp;&nbsp;Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as
              ticket offices at tourist attractions which are often very noisy. (1) Microphones are installed in ticket offices to detect external
              noise, and an opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice
              clearly. (2) Another area in which this technology is used is drive-through fast-food restaurants and coffee shops. (3) They use
              noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise. (4) These
              noise-cancelling headsets help drive-through employees take orders accurately. (5) Thanks to noise-cancelling devices, it is possible
              for drivers to focus on driving without being disturbed by distracting noises.
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
          <Box marginTop='22px'>
            <Typography>
              주어진 글에서 노이즈 캔슬링 기술이 사용된 예시들을 나열하고 있으므로 주어진 문장의 The same technology는 노이즈 캔슬링 기술을 의미한다.
              해당 기술이 자동차에 사용된 내용은 5번 뒤에 나오는데, 노이즈 캔슬링 장치 덕분에 운전자가 소음에 방해받지 않고 운전에 집중하는 것이
              가능하다고 했으므로, 주어진 문장은 5에 들어가는 것이 가장 자연스럽다.
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='22px'>
              <Typography>
                노이즈 캔슬링 기술은 음악 기기에만 사용되는 것이 아니다. 보통 매우 시끄러운 관광 명소의 매표소와 같은 다른 분야에서도 이 기술을
                활용한다. 매표소에 마이크가 설치되어 외부 소음을 감지하고 반대 음파가 생성되어 스피커를 통해 전달됨으로써, 매표소 직원이 고객의
                목소리를 명확하게 들을 수 있게 한다. 이 기술이 사용되는 또 다른 분야는 드라이브 스루 패스트푸드 식당과 커피숍이다. 그곳에선 노이즈
                캔슬링 헤드셋을 사용하여 차량 소음을 제거함으로써 직원과 고객 간의 의사소통을 개선한다. 이러한 노이즈 캔슬링 헤드셋은 드라이브 스루
                직원이 정확하게 주문을 받도록 돕는다. 동일한 기술은 오디오 시스템이 엔진, 바람, 도로 소음과 같은 불쾌한 소리를 상쇄하기 위해 파동을
                생성하는 자동차에도 사용된다. 노이즈 캔슬링 장치 덕분에 운전자는 산만하게 하는 소음에 방해받지 않고 운전에 집중하는 것이 가능하다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P19;
