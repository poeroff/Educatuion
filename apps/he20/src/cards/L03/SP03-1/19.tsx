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
  Scroll,
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
    text: <Typography>3. 다음 글의 빈칸에 들어갈 말로 가장 적절한 것을 고르시오.</Typography>,
    mark: cardData.p19.isSubmitted ? (cardData.p19.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: 'embraced',
    },
    {
      text: 'suggested',
    },
    {
      text: 'highlighted',
    },
    {
      text: 'discussed',
    },
    {
      text: 'challenged',
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
        <Box useFull display='flex'>
          <Box background='white' useRound marginRight='8px' flex='0.7'>
            <Scroll height='360px'>
              <Typography>
                &nbsp;&nbsp;Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school. After that, she even
                studied abroad in Paris, which was unusual for women at the time. Thanks to her mother’s encouragement, she was able to take advantage
                of these opportunities. Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women
                were to solely focus on household duties. Ancher differed from other artists of that era, who depicted women as still life subjects.
                In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing
                Fisherman’s Wife. She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark. In her
                painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed. Ancher&nbsp;&nbsp;
                <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>&nbsp;&nbsp;the conventional roles of
                women in the 20th century and displayed her exceptional artistic talent. Her paintings continue to amaze us to this day.
              </Typography>
            </Scroll>
          </Box>
          <Box flex='0.3' vAlign='center'>
            <Scroll height='360px'>
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
            </Scroll>
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
              기혼 여성은 가사에만 전념해야 한다는 사회적 압력에 반대하며 그림을 계속 그렸고, 여성을 정물화 소재로 묘사한 당시의 다른 예술가들과는
              달리 여성을 일상 업무에 적극적으로 참여하는 사람으로 보여주었다고 했다. 따라서 20세기 여성의 전통적인 역할에 도전했다고 보는 것이 가장
              자연스러우므로, 빈칸에 들어갈 말로 가장 적절한 것은 5번이다.
            </Typography>

            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='22px'>
              <Typography>
                {`1859년 덴마크 스카겐에서 태어난 Anna Ancher는 나중에 코펜하겐으로 이주하여 사립 회화학교에 다녔습니다. 그 후 그녀는 파리에서 유학도 했는데, 이는 당시 여성으로서는 드문 일이었습니다. 어머니의 격려 덕분에 그녀는 이러한 기회를 활용할 수 있었습니다. 결혼 후에도 Ancher는 기혼 여성은 가사에만 집중해야 한다는 사회적 압력에 저항하며 그림을 계속 그렸습니다. Ancher는 여성을 정물화 소재로 묘사한 당시의 다른 예술가들과는 달랐습니다. 대조적으로, 그녀는 <부엌의 하녀>와 <바느질하는 어부의 아내>라는 그녀의 작품에서 볼 수 있듯이 여성을 일상 업무에 적극적으로 참여하는 사람으로 보여주었습니다. 그녀는 또한 빛과 색채를 능숙하게 탐구하여 덴마크의 풍부한 인상주의 운동에 기여했습니다. 그녀의 그림 <푸른 방의 햇빛>에서는 푸른 벽에 반사되는 햇빛이 멋지게 묘사되어 있습니다. Ancher는 20세기 여성의 전통적인 역할에 도전하며 뛰어난 예술적 재능을 발휘했습니다. 그녀의 그림은 오늘날까지도 우리를 놀라게 합니다.`}
                <br />
                <br />
                (1) 받아들였다
                <br />
                (2) 제안했다
                <br />
                (3) 강조했다
                <br />
                (4) 토론했다
                <br />
                (5) 도전했다
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P19;
