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

const P18 = ({ _page = 'P18' }) => {
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
    text: <Typography>2. 다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?</Typography>,
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
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
      <BoxWrap>
        <Box useFull display='flex'>
          <Box background='white' useRound marginRight='8px' flex='0.7'>
            <Scroll height='360px'>
              <Typography>
                &nbsp;&nbsp;Next, we have Maud Lewis, a renowned artist known for her heart-warming paintings. Born in a small Canadian town in 1903,
                Lewis suffered from physical weaknesses such as distorted shoulders and fingers. This limited her&nbsp;
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                  <span style={{ fontWeight: 700 }}>(1)</span> mobility
                </u>
                &nbsp;and caused her to drop out of school. To make a living, she began to paint and sell Christmas cards. When her parents passed
                away, Lewis went to live with her aunt in Digby, Nova Scotia, where she met her future husband, Everett Lewis. After marrying, the
                couple spent the rest of their lives there, and Lewis&nbsp;
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                  <span style={{ fontWeight: 700 }}>(2)</span> continued
                </u>
                &nbsp;to paint. She often &nbsp;
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                  <span style={{ fontWeight: 700 }}>(3)</span> depicted
                </u>
                &nbsp;the Digby landscapes in paintings such as Edge of Digby Harbor. Her artwork used a mixture of bright and vivid oil paints and
                simple forms, generating an original,&nbsp;
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                  <span style={{ fontWeight: 700 }}>(4)</span> innovative
                </u>
                &nbsp;style. Although her physical limitations confined her to a small cottage, her talent and imagination were both &nbsp;
                <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                  <span style={{ fontWeight: 700 }}>(5)</span> limited
                </u>
                . In Red Sleigh, red maple leaves appear on a special winter landscape, and Pair of Oxen shows decorated cows standing in a flower
                field. With these features, Lewis’ paintings create a magical quality, like that of a fairy tale.
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
          <Box marginTop='22px'>
            <Typography>
              그녀는 작은 오두막집에 ‘갇혀’ 지냈지만, 그녀의 재능과 상상력은 ‘무한’하다는 것이 문맥상 자연스러우므로 5번 limited(제한된)는
              limitless(무한한)등으로 바꿔야 한다.
            </Typography>
            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='22px'>
              <Typography>
                &nbsp;&nbsp;
                {`다음은 마음이 따뜻해지는 그림으로 유명한 예술가 Maud Lewis입니다. 1903년 캐나다의 작은 마을에서 태어난 Lewis는 뒤틀린 어깨와 손가락 같은 신체적 결함으로 고생했습니다. 이러한 결함으로 그녀는 거동이 불편해졌고 학교를 중퇴하게 되었습니다. 생계를 위해 그녀는 크리스마스 카드를 그려서 팔기 시작했습니다. 부모님이 돌아가신 후, Lewis는 노바 스코샤 주 딕비에 있는 이모와 함께 살게 되었고, 그곳에서 미래의 남편인 Everett Lewis를 만났습니다. 결혼 후, 부부는 남은 삶을 그곳에서 보냈고 Lewis는 계속해서 그림을 그렸습니다. 그녀는 <딕비 항구의 가장자리>와 같은 그림에서 딕비의 풍경을 자주 묘사했습니다. 그녀의 작품은 밝고 선명한 유화물감과 단순한 형태를 혼합하여 독창적이고 혁신적인 스타일을 만들어 냈습니다. 비록 신체적 제약으로 인해 작은 오두막집에 갇혀 지냈지만, 그녀의 재능과 상상력은 제한되었습니다(→무한했습니다). <붉은 썰매>에는 붉은 단풍잎이 특별한 겨울 풍경에 등장하고, <한 쌍의 소>는 꽃밭에 서 있는 장식된 소를 보여줍니다. 이러한 특징을 통해 Lewis의 그림은 마치 동화의 그것과 같은, 마법 같은 분위기를 자아냅니다.`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P18;
