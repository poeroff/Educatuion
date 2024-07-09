import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L01SP042 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P08 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP042);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubmittable, setIsSubmittable] = useState(false);
  const currentPage = 'P08';

  const data = [
    {
      text: 'seen',
      id: 1,
    },
    {
      text: 'was seen',
      id: 2,
    },
    {
      text: 'had seen',
      id: 3,
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p08: {
            ...prev.p08,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p08.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
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
    if (cardData.p08.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p08.answer === cardData.p08.solution;
    setCardData(prev => ({ ...prev, p08: { ...prev.p08, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p08.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P08', userSubmission, isCorrect);
  };

  const setAnswerIdx = (answerIndex: number) => {
    setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer: answerIndex } }));
    changeData('P08', 1, 1, answerIndex);
    if (answerIndex > 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P08');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 어법 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.',
    markSize: 'middle',
    mark: cardData.p08.isSubmitted ? (cardData.p08.isCorrect ? 'correct' : 'incorrect') : undefined,
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={cardData.p08.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!cardData.p08.isSubmitted && cardData.p08.answer === 0}
      submitBtnColor={
        cardData.p08.answer !== 0
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
      <Box useFull flexDirection='column' hAlign='center' gap='48px'>
        <Box vAlign='center' width='775px' height='156px' hAlign={'center'} background='white' useRound useShadow>
          <Box display='flex' hAlign='center'>
            <Typography>
              Yesterday, she told me that her grandfather{' '}
              <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography> a doctor two days before.
            </Typography>
          </Box>
        </Box>
        <BoxWrap>
          <List
            align={'horizontal'}
            gap={25}
            data={data}
            row={({ value, index = 1 }) => (
              <Box flex='1' textAlign='center' width={287}>
                <Radio
                  type={'box'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={value?.id === cardData.p08.answer}
                  onClick={() => setAnswerIdx(value ? value.id : 0)}
                  readOnly={cardData.p08.isSubmitted}
                  isError={cardData.p08.isSubmitted && cardData.p08.answer !== cardData.p08.solution}
                >
                  {value ? value.text : ''}
                </Radio>
              </Box>
            )}
          />
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='0px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>had seen</Typography>
          </Box>
          <Box marginTop='30px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='해석' />
            </Box>
            <Box marginTop='10px'>
              <Typography useGap={false}>어제 그녀는 그녀의 할아버지가 이틀 전에 병원을 갔었다고 내게 말했다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P08;
