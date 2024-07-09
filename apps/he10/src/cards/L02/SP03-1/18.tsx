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

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP03_1 } from './store';

const P18 = ({ _page = 'P18' }: { _page?: string }) => {
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
    text: <Typography>3. 주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?</Typography>,
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const questionList = [
    {
      label: '(A)',
      text: 'He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We must hurry.” Now that day seems like a dream to me. I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked.',
    },
    {
      label: '(B)',
      text: 'He did not reply, but he was searching inside himself, staring at the small houses. Then, at a street corner, he told us to turn. After turning the corner, we saw an old man standing in front of a house.',
    },
    {
      label: '(C)',
      text: 'All through the quiet afternoon and into the evening, they recalled missing names. I had a strange feeling that there were other people in the room. I felt as if people from the past were looking over the shoulders of the two old men to see if the work was correct.',
    },
  ];

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
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (cardData.p18.answer > 0) {
      setIsSubmittable(true);
    }
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const defaultAnswer = userSubmissionList[0]?.inputData[0]?.value || cardData.p18.answer;
      const defaultCorrect = isSubmitted ? userSubmissionList[0]?.isCorrect : false;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p18: {
            ...prev.p18,
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
    setCardData(prev => ({ ...prev, p18: { ...prev.p18, answer: index } }));
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p18.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p18.isSubmitted && cardData.p18.answer === 0}
      submitBtnColor={
        cardData.p18.isSubmitted
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
      <Box useFull hAlign='center' flexDirection='column' gap='10px'>
        <Box width='100%' vAlign='center' display='inline' alignContent='center' padding='10px' height='30%' background='white' useRound>
          <Typography>Just before noon, we arrived at a small town called Murupara.</Typography>
          <Typography>“Where do we go now?” I asked Nani.</Typography>
        </Box>
        <BoxWrap>
          <Box height='300px' width='630px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              {questionList.map(data => (
                <BoxWrap key={data.label}>
                  <Box width={30}>
                    <Typography>{data.label}</Typography>
                  </Box>
                  <Box>
                    <Typography>{data.text}</Typography>
                  </Box>
                </BoxWrap>
              ))}
            </Scroll>
          </Box>
          <Box useFull flex='1'>
            <Scroll height='300px' tabIndex={0}>
              <List
                gap={2}
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
            </Scroll>
          </Box>
        </BoxWrap>
      </Box>
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
          <Box marginTop='22px'>
            <Typography>
              주어진 문장은 정오가 되기 직전 Murupara에 도착하여 필자가 할아버지에게 어디로 갈지를 묻는 내용이므로, 할아버지가 이에 대답하지 않고 깊은
              생각에 잠겨 있다가 모퉁이를 돌라고 하여 한 노인이 있던 집에 도착했다는 내용인 (B)로 이어지는 것이 적절하다. 그다음으로 (A)의 He는 (B)의
              an old man을 의미하므로 (B) 다음에 (A)가 오는 것이 적절하며, 문맥상 필자가 그 당시 일을 회상하며 두 노인이 작업하는 모습을 묘사한 내용이
              (A)와 (C) 순서로 이어지는 것이 자연스럽다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              정오가 되기 직전, 우리는 Murupara라고 불리는 작은 마을에 도착했다. “우리 이제 어디로 가면 돼요?” 나는 할아버지에게 여쭈었다. (B)그는
              대답은 하지 않고, 작은 집들을 쳐다보면서 그의 기억 속에서 길을 찾고 있었다. 그런 다음 길모퉁이에서 그는 우리에게 모퉁이를 돌라고 말했다.
              모퉁이를 돌자, 우리는 한 노인이 집 앞에 서 있는 것을 보았다. (A) 그는 온화한 미소로 할아버지를 맞이했지만, 그의 눈에서 나는 이런
              메시지를 읽을 수 있었다. “서둘러야겠구나. 그날은 나에게는 꿈처럼 느껴진다. 나는 두 노인이 탁자에 앉아서 이야기를 나눌 때 들리던 부드러운
              마오리 언어가 기억난다. (C) 고요한 오후 내내 그리고 저녁까지 그들은 빠진 이름을 기억해 내었다. 나는 방에 꼭 다른 사람들이 있는 것만 같은
              이상한 느낌이 들었다. 마치 과거에서 온 사람들이 두 노인의 어깨너머로 그 작업이 정확한지 보고 있는 것처럼 느껴졌다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P18;
