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
import { L02SP03_1 } from './store';

const P17 = ({ _page = 'P17' }: { _page?: string }) => {
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
    text: <Typography>2. 다음 글의 밑줄 친 부분 중, 어법상 틀린 것은?</Typography>,
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

  const wordArr = ['The bonobos, on the other hand, got along much better than the chimpanzees.'];

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
      <BoxWrap>
        <Box width='594px'>
          <Box height='398px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <Typography>
                When I arrived at Auntie’s place, I was shocked to see how (1)
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>thin</u> Nani Tama was. “Look, Nani,” I said. “I’m not
                taking you anywhere. You could die on me!” Nani looked at me in anger. “You want me to die here in this room? Looking at these four
                walls? When the whakapapa is not yet finished?” The old man (2)
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>held</u> on tightly to the side of the bed and cried out as
                he stood up. Every slow, painful step hurt him, but he tried to walk. I could not help but (3)
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>carry</u> him to the car, and we set off with Auntie. We
                traveled all night, mostly in silence, listening to Nani chanting in the darkness. (4)
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>It</u> was strange but wonderful to hear him. Sometimes, he
                burst into a song (5)<u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>what</u> he had taught Auntie. They
                sang together, lifting up their voices to send the song flying like a bird through the sky.
              </Typography>
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
          </Scroll>
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
          <Box marginTop='22px'>
            <Typography>
              관계대명사 what은 이미 the thing이라는 선행사를 포함하고 있기 때문에 선행사와 함께 쓰이지 않는다. 그러나 5번의 what 앞에는 a song이라는
              선행사가 있으므로, 5번 what을 that이나 which로 고쳐야 한다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              고모 집에 도착했을 때 나는 할아버지가 얼마나 야위었는지를 보고 충격을 받았다. “보세요, 할아버지.” 내가 말했다. “저는 할아버지를 아무
              데도 모셔가지 않을 거예요. 제 앞에서 돌아가실 수도 있다고요!” 할아버지는 화가 나서 나를 쳐다보았다. “너는 내가 이 방에서 죽기를 바라는
              것이냐? 이 사방의 벽을 보면서? 와카파파를 끝내지도 못한 채로?” 할아버지는 침대 옆을 꽉 붙잡고 일어서며 소리쳤다. 느리고 고통스러운 매
              발걸음이 그를 아프게 했지만, 그는 걸으려고 애썼다. 나는 그를 차까지 모셔갈 수밖에 없었고, 우리는 고모와 함께 출발했다. 우리는 어둠
              속에서 할아버지의 낭송을 들으며, 조용히 밤새 달렸다. 그의 낭송을 듣는 것은 이상하면서도 경이로웠다. 가끔 그는 자신이 고모에게 가르쳐
              주었던 노래를 갑자기 부르기도 했다. 그들은 새처럼 하늘을 가로지르며 날아가는 노래를 부르며 목소리를 높였다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P17;
