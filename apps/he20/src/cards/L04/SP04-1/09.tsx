import {
  Box,
  Label,
  List,
  TMainHeaderInfoTypes,
  Typography,
  Radio,
  EStyleButtonTypes,
  Tag,
  ETagLine,
  BottomSheet,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { SP04_1 } from './store';

const P09 = ({ _page = 'P09' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(SP04_1);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        1. 다음 중 밑줄 친 부분의 쓰임이
        <Typography textDecoration='underline' fontSize='inherit'>
          다른
        </Typography>
        하나를 고르시오.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: (
        <>
          Your dream is great, but you have to make
          <Typography textDecoration='underline' title='밑줄'>
            it
          </Typography>
          real.
        </>
      ),
    },
    {
      text: (
        <>
          She finds
          <Typography textDecoration='underline' title='밑줄'>
            it
          </Typography>
          fun to sing and dance in front of others.
        </>
      ),
    },
    {
      text: (
        <>
          Please consider
          <Typography textDecoration='underline' title='밑줄'>
            it
          </Typography>
          important to arrive on time for meetings.
        </>
      ),
    },
    {
      text: (
        <>
          The new software will make
          <Typography textDecoration='underline' title='밑줄'>
            it
          </Typography>
          possible to complete the project.
        </>
      ),
    },
    {
      text: (
        <>
          I find
          <Typography textDecoration='underline' title='밑줄'>
            it
          </Typography>{' '}
          difficult to focus when there's a lot of noise around me.
        </>
      ),
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p09.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p09.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = cardData.p09.answer === cardData.p09.solution;
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p09.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer: index } }));
    changeData(_page.toUpperCase(), 1, 1, index);
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
      onSubmit={handleSubmit}
      submitLabel={!cardData.p09.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p09.isSubmitted && cardData.p09.answer === 0}
      submitBtnColor={cardData.p09.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box useFull hAlign='center' height='100%'>
        <Box useFull hAlign='center' flexDirection='column'>
          <List gap={5} data={data}>
            {({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p09.answer}
                defaultValue={index === cardData.p09.answer}
                onClick={() => handleChange(index)}
                disabled={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.answer !== cardData.p09.solution}
              >
                <Box>
                  <Label value={index} /> {value?.text}
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p09.solution}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              1 번의 it 은 대명사로 , 앞에 나온 your dream 을 지칭한다 . 반면 2, 3, 4, 5 번의 it 은 가목적어이며 , 목적격 보어인 형용사 뒤에 나오는 to
              부정사구가 진목적어이다
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>1. 당신의 꿈은 훌륭하지만 , 그것을 현실로 만들어야 한다 .</Typography>
            <Typography>2. 그녀는 다른 사람들 앞에서 노래하고 춤추는 것을 재밌다고 생각한다 .</Typography>
            <Typography>3. 회의에 제시간에 맞게 도착하는 것을 중요하게 생각해 주세요 .</Typography>
            <Typography>4. 새로운 소프트웨어는 프로젝트를 마치는 것을 가능하게 만들 것이다 .</Typography>
            <Typography>5. 나는 주위에 소음이 많으면 집중하기 어렵다 .</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
