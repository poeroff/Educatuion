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
import { L01SP041 } from './store';

interface pageType {
  _page?: string;
}

const P11 = ({ _page = 'P11' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP041);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        3. 다음 밑줄 친 부분 중, 어법상 &nbsp;
        <Typography fontSize='18' textDecoration='underline' useGap={false}>
          틀린
        </Typography>
        &nbsp;것을 고르시오.
      </>
    ),
    mark: cardData.p11.isSubmitted ? (cardData.p11.isCorrect ? 'correct' : 'incorrect') : 'none',
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
    if (cardData.p11.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p11.answer === cardData.p11.solution;
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p11.answer,
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
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p11: {
            ...prev.p11,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p11.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p11: { ...prev.p11, answer: index } }));
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
      submitLabel={cardData.p11.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p11.isSubmitted && cardData.p11.answer === 0}
      submitBtnColor={
        cardData.p11.answer !== 0
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
        <Box width='594px' hAlign={'center'}>
          <Box height='395px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <Typography>
                This summer, I went to Busan with my family. I heard it (1)
                <Typography textDecoration='underline' useGap={false}>
                  had rained
                </Typography>{' '}
                for three days, but when we arrived at Busan Station, the sun (2)
                <Typography textDecoration='underline' useGap={false}>
                  was shining
                </Typography>{' '}
                brightly. First, we went (3)
                <Typography textDecoration='underline' useGap={false}>
                  swimming
                </Typography>{' '}
                at Haeundae Beach. Then, after (4)
                <Typography textDecoration='underline' useGap={false}>
                  eating
                </Typography>{' '}
                street food at Gukje Market, we visited Busan Tower. It was so much fun, and I expect Busan (5)
                <Typography textDecoration='underline' useGap={false}>
                  become
                </Typography>{' '}
                a more popular tourist attraction!
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
                  value={index === cardData.p11.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p11.isSubmitted}
                  isError={cardData.p11.isSubmitted && cardData.p11.answer !== cardData.p11.solution}
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
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>5</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='문제해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography useGap={false}>동사 expect는 목적격 보어 자리에 to 부정사를 취하는 동사이므로 become을 to become으로 고쳐야 한다.</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography useGap={false}>
              올해 여름에 나는 가족과 함께 부산에 갔다. 나는 부산에 3일 동안 비가 내렸다고 들었는데, 우리가 부산역에 도착했을 때, 해는 밝게 빛나고
              있었다. 먼저, 우리는 해운대 해수욕장에 수영하러 갔다. 그러고 나서, 국제 시장에서 길거리 음식을 먹고 난 후, 우리는 부산 타워를 방문했다.
              그것은 매우 재미있었고, 나는 부산이 더 인기 있는 관광 명소가 될 것이라고 기대한다!
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
