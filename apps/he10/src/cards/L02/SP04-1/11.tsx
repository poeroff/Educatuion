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
import { L02CP041 } from './store';

interface pageType {
  _page?: string;
}

const P11 = ({ _page = 'P11' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02CP041);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '3. 다음 중 어법상 옳은 것만으로 묶인 것을 고르시오.',
    mark: cardData.p11.isSubmitted ? (cardData.p11.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: 'a, b',
    },
    {
      text: 'a, c',
    },
    {
      text: 'b, c',
    },
    {
      text: 'b, d',
    },
    {
      text: 'c, d',
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
              <Typography>a. The child is crying as if she lost her favorite toy.</Typography>
              <Typography>b. He knows everything about the restaurant as if he owned it.</Typography>
              <Typography>c. He noticed how brightly did the sun shine in the sky.</Typography>
              <Typography>d. I was amazed at how wonderful the stars painted the sky.</Typography>
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
            <Typography>1</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='문제해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              c. {'<'}how+형용사/부사{'>'} 다음에는 {'<'}주어+동사{'>'} 순서로 와야 하므로, how brightly the sun shone in the sky로 고쳐야 한다.
            </Typography>
            <Typography>
              d. the stars painted the sky가 완전한 절이므로 how 다음에 나오는 형용사 wonderful을 부사 wonderfully로 고쳐야 한다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>a. 그 아이는 마치 그녀가 가장 좋아하는 장난감을 잃어버린 것처럼 울고 있다.</Typography>
            <Typography>b. 그는 마치 그 식당을 소유한 것처럼 식당에 대한 모든 것을 안다.</Typography>
            <Typography>c. 그는 태양이 하늘에서 얼마나 밝게 빛났는지 알아차렸다.</Typography>
            <Typography>d. 나는 별들이 하늘을 얼마나 멋지게 수놓는지에 놀랐다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
