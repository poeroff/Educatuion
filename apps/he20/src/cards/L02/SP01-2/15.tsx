import { useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  Dropdown,
  IQuestionProps,
  IAudioPlayerProps,
  Label,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02SP01_2 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P15 = () => {
  const PAGE_NUMBER = 'P15';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_2);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '음원을 듣고 빈 칸에 들어갈 알맞은 표현을 고르세요.',
    mark: cardData.p15.isSubmitted ? (cardData.p15.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-2/HE2-L02-SP01-2-P15.mp3',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newAnswers = userSubmissionList[0]?.inputData?.map((data: { value?: string }) => data.value) || cardData.p15.answers;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p15: {
            ...prev.p15,
            answers: newAnswers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p15.isSubmitted) {
      const { answers, solutions } = cardData.p15;
      const isCorrectAll = answers.every((answer, index) => answer === solutions[index]);

      setCardData(prev => ({ ...prev, p15: { ...prev.p15, isSubmitted: true, isCorrect: isCorrectAll } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answers[0],
              isAnswer: true,
              isCorrect: answers[0] === solutions[0],
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p15.answers[1],
              isAnswer: true,
              isCorrect: answers[1] === solutions[1],
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p15.answers[2],
              isAnswer: true,
              isCorrect: answers[2] === solutions[2],
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];

      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p15;

    if (!isSubmitted) {
      return !answers.some(answers => answers === '') ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleClickDropdown = (index: number, value?: string) => {
    if (value) {
      const newAnswers = [...cardData.p15.answers];
      newAnswers[index] = value;
      setCardData(prev => ({ ...prev, p15: { ...prev.p15, answers: newAnswers } }));
      changeData(PAGE_NUMBER, 1, 1 + index, value);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      audioInfo={audioInfo}
      submitLabel={cardData.p15.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p15.isSubmitted || cardData.p15.answers.some(answer => answer === '')) && !cardData.p15.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box display='flex'>
            <Box marginTop={16}>
              <Label value='M' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Box display='flex' alignItems='end'>
                <Typography>I know you do, but you shouldn’t shop so</Typography>
                <Dropdown
                  width='200px'
                  selectedValue={cardData.p15.answers[0]}
                  dropdownList={cardData.p15.dropdownList[0]}
                  onClick={value => handleClickDropdown(0, value)}
                  readOnly={cardData.p15.isSubmitted}
                  isError={cardData.p15.isSubmitted && cardData.p15.answers[0] !== cardData.p15.solutions[0]}
                  ariaLabel='첫 번째 선지 드롭박스'
                />
                <Typography>.</Typography>
              </Box>

              <Box display='flex' alignItems='end'>
                <Typography>You need to make a spending plan to</Typography>
                <Dropdown
                  width='200px'
                  selectedValue={cardData.p15.answers[1]}
                  dropdownList={cardData.p15.dropdownList[1]}
                  onClick={value => handleClickDropdown(1, value)}
                  readOnly={cardData.p15.isSubmitted}
                  isError={cardData.p15.isSubmitted && cardData.p15.answers[1] !== cardData.p15.solutions[1]}
                  ariaLabel='두 번째 선지 드롭박스'
                />
                <Typography>your money</Typography>
              </Box>
              <Typography>more effectively.</Typography>
            </Box>
          </Box>
          <Box>
            <Label value='G' type='paint' background='var(--color-yellow-100)' />
            <Typography>Okay, Dad. I’ll try.</Typography>
          </Box>
          <Box display='flex'>
            <Box marginTop={16}>
              <Label value='M' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Box display='flex' alignItems='end'>
                <Typography>Thanks, I believe you’ll make</Typography>
                <Dropdown
                  width='200px'
                  type='up'
                  selectedValue={cardData.p15.answers[2]}
                  dropdownList={cardData.p15.dropdownList[2]}
                  onClick={value => handleClickDropdown(2, value)}
                  readOnly={cardData.p15.isSubmitted}
                  isError={cardData.p15.isSubmitted && cardData.p15.answers[2] !== cardData.p15.solutions[2]}
                  ariaLabel='세 번째 선지 드롭박스'
                />
                <Typography>choices.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              <Typography>{cardData.p15.solutions.join(' - ')}</Typography>
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>남: 나도 알지만, 그렇게 경솔하게 물건을 사면 안 돼. 돈을 더 효과적으로 관리하려면 지출 계획을 세워야 해.</Typography>
            <Typography>여: 알았어요, 아빠. 노력할게요.</Typography>
            <Typography>남: 고맙구나. 나는 네가 합리적인 선택을 할 거라 믿어.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P15;
