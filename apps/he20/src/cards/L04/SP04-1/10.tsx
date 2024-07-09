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

const P10 = ({ _page = 'P10' }: { _page?: string }) => {
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
        2. 다음 중 밑줄 친 부분의 쓰임이
        <Typography textDecoration='underline' fontSize='inherit'>
          다른
        </Typography>
        하나를 고르시오.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p10.isSubmitted ? (cardData.p10.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: (
        <>
          The fact
          <Typography textDecoration='underline' title='밑줄'>
            that
          </Typography>
          I got 19,000 likes on my post made me happy.
        </>
      ),
    },
    {
      text: (
        <>
          He has a dream
          <Typography textDecoration='underline' title='밑줄'>
            that
          </Typography>
          one day he will own a house by the sea.
        </>
      ),
    },
    {
      text: (
        <>
          She has a new business idea
          <Typography textDecoration='underline' title='밑줄'>
            that
          </Typography>
          she hasn't told anyone before.
        </>
      ),
    },
    {
      text: (
        <>
          There is a good news
          <Typography textDecoration='underline' title='밑줄'>
            that
          </Typography>
          the missing child has been found safe.
        </>
      ),
    },
    {
      text: (
        <>
          I don’t agree with his opinion
          <Typography textDecoration='underline' title='밑줄'>
            that
          </Typography>
          the letter was not sent by accident.
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
          p10: {
            ...prev.p10,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p10.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p10.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect = cardData.p10.answer === cardData.p10.solution;
      setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p10.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p10: { ...prev.p10, answer: index } }));
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
      submitLabel={!cardData.p10.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!cardData.p10.isSubmitted && cardData.p10.answer === 0}
      submitBtnColor={cardData.p10.answer !== 0 ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
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
                value={index === cardData.p10.answer}
                defaultValue={index === cardData.p10.answer}
                onClick={() => handleChange(index)}
                disabled={cardData.p10.isSubmitted}
                isError={cardData.p10.isSubmitted && cardData.p10.answer !== cardData.p10.solution}
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
          <Box marginTop='12px'>{cardData.p10.solution}</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              동격의 접속사 that 다음에는 완전한 절이 나오고 , 관계대명사 that 다음에는 불완전한 절이 나온다 . 3 번의 that 다음에는 직접목적어가 없는
              불완전한 절이 오기 때문에 , that 은 a new business idea 를 수식하는 목적격 관계대명사이다 . 반면 1, 2, 4, 5 번의 that 은 동격의 접속사로
              , that 다음에는 앞에 나온 명사를 부연 설명하는 절이 이어진다 .
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>1. 내 게시물에 19,000 개의 ‘좋아요’를 받았다는 사실이 나를 행복하게 했다 .</Typography>
            <Typography>2. 그는 언젠가 바다 옆에 집을 소유할 것이라는 꿈을 가지고 있다 .</Typography>
            <Typography>3. 그녀는 전에 아무에게도 말하지 않은 신사업 아이디어를 가지고 있다 .</Typography>
            <Typography>4. 실종된 아이가 안전하게 발견되었다는 좋은 소식이 있다 .</Typography>
            <Typography>5. 나는 그 편지가 우연히 보내진 것이 아니라는 그의 의견에 동의하지 않는다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
