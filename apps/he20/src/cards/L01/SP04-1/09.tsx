import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  IQuestionProps,
  Radio,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  List,
  Label,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP041 } from './store';

interface pageType {
  _page?: string;
}

const P09 = ({ _page = 'P09' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP041);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: <>1. 다음 중 어법상 옳은 문장으로 짝지어진 것을 고르시오.</>,
    markSize: 'middle',
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : undefined,
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p09.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
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
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
  };

  const setAnswerIdx = (answerIndex: number) => {
    setCardData(prev => ({ ...prev, p09: { ...prev.p09, answer: answerIndex } }));
    changeData(_page.toUpperCase(), 1, 1, answerIndex);
    if (answerIndex > 0) {
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
      onSubmit={handleSubmit}
      submitLabel={cardData.p09.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!cardData.p09.isSubmitted && cardData.p09.answer === 0}
      submitBtnColor={
        cardData.p09.answer !== 0
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : isSubmittable
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box useFull>
        <Box>
          <Box tabIndex={101} width='100%' background='white' lineHeight='48px' useRound>
            <BoxWrap>
              <Box>a.</Box>
              <Typography>My classmates persuaded me participate in the charity event.</Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>b.</Box>
              <Typography>Their family members told them to try out for the school play.</Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>c.</Box>
              <Typography>The community leaders inspired them volunteered at the nursing home.</Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>d.</Box>
              <Typography>Her family allowed her to follow her dream of studying abroad.</Typography>
            </BoxWrap>
            <BoxWrap>
              <Box>e.</Box>
              <Typography>Our neighbors encouraged us taken part in the community cleaning project.</Typography>
            </BoxWrap>
          </Box>
          <Box marginTop={20}>
            <List
              gap={2}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p09.answer}
                  onClick={() => setAnswerIdx(index)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.answer !== cardData.p09.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography tabIndex={150 + index}>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Box>
        </Box>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Box>
            <Box marginTop='12px'>
              <Typography useGap={false}>4</Typography>
            </Box>
            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='문제해설' />
            </Box>
            <Box marginTop='22px'>
              <Typography useGap={false}>
                a, c, e의 persuade, inspire, encourage는 목적격 보어 자리에 to 부정사를 취하는 동사이므로 participate, volunteered, taken을 각각 to
                participate, to volunteer, to take로 고쳐야 한다.
              </Typography>
            </Box>
            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='22px'>
              <Typography useGap={false}>a. 우리 반 친구들은 내가 자선 행사에 참여하도록 설득했다.</Typography>
              <Typography useGap={false}>b. 그들의 가족들은 그들에게 학교 연극에 지원해 보라고 말했다.</Typography>
              <Typography useGap={false}>c. 지역 사회 지도자들은 그들이 양로원에서 봉사활동을 하도록 격려했다.</Typography>
              <Typography useGap={false}>d. 그녀의 가족들은 그녀가 유학하는 꿈을 따르도록 허락했다.</Typography>
              <Typography useGap={false}>e. 이웃 주민들은 우리가 지역 청소 프로젝트에 참여하도록 격려했다.</Typography>
            </Box>
          </Box>
        </BottomSheet>
      </Box>
    </Container>
  );
};

export default P09;
