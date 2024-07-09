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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02CP041 } from './store';

interface pageType {
  _page?: string;
}

const P09 = ({ _page = 'P09' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02CP041);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        1. 다음 중 밑줄 친 부분이 어법상&nbsp;
        <Typography fontSize='18' textDecoration='underline'>
          틀린
        </Typography>{' '}
        &nbsp;것을 고르시오.
      </>
    ),
    markSize: 'middle',
    mark: cardData.p09.isSubmitted ? (cardData.p09.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  const data = [
    {
      text: (
        <>
          The doctor asked him how{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            often
          </Typography>{' '}
          he worked out.
        </>
      ),
      stext: 'The doctor asked him how often he worked out.',
      id: 1,
    },
    {
      text: (
        <>
          They were surprised at how{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            accurate
          </Typography>{' '}
          the data was.
        </>
      ),
      stext: 'They were surprised at how accurate the data was.',
      id: 2,
    },
    {
      text: (
        <>
          He was amazed to see how{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            easily
          </Typography>{' '}
          the dancer performed her dance.
        </>
      ),
      stext: 'He was amazed to see how easily the dancer performed her dance.',
      id: 3,
    },
    {
      text: (
        <>
          The team was relieved to see how{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            good
          </Typography>{' '}
          the project was progressing.
        </>
      ),
      stext: 'The team was relieved to see how good the project was progressing.',
      id: 4,
    },
    {
      text: (
        <>
          They were impressed to learn how{' '}
          <Typography textDecoration='underline' useGap={false} title='밑줄'>
            deeply
          </Typography>{' '}
          their friend had researched
          <Typography>the topic.</Typography>
        </>
      ),
      stext: 'They were impressed to learn how deeply their friend had researched the topic.',
      id: 5,
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
      <Box useFull hAlign='center' padding='50px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <List
            gap={25}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.stext}
                value={value?.id === cardData.p09.answer}
                onClick={() => setAnswerIdx(value ? value.id : 0)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.answer !== cardData.p09.solution}
              >
                <Label value={index} /> {value?.text}
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
          <Box marginTop='12px'>4</Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              {'<'}how+형용사/부사{'>'} 다음에 나오는 절이 완전하면 how 다음에 부사를, 불완전하면 how 다음에 주격보어 역할을 할 수 있는 형용사를 써야
              한다. 4번에서 the project was progressing은 완전한 절에 해당하여, how 다음에 형용사 good이 아닌 부사 well 등을 쓰는 것이 적절하므로
              4번이 어법상 틀린 문장이다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>1. 그 의사는 그에게 얼마나 자주 운동하는지 물어봤다.</Typography>
            <Typography>2. 그들은 그 데이터가 얼마나 정확한지에 놀랐다.</Typography>
            <Typography>3. 그는 무용수가 얼마나 쉽게 춤추는지를 보고 놀랐다.</Typography>
            <Typography>4. 그 팀은 그 프로젝트가 얼마나 잘 진행되고 있는지를 보고 안심했다.</Typography>
            <Typography>5. 그들은 그들의 친구가 그 주제를 얼마나 깊이 연구했는지를 알고 감명을 받았다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
