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
import { L03SP01_2 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P16 = () => {
  const PAGE_NUMBER = 'P16';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03SP01_2);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '음원을 듣고 빈칸에 들어갈 알맞은 표현을 고르세요.',
    mark: cardData.p16.isSubmitted ? (cardData.p16.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-2/HE2-L03-SP01-2-P16.mp3',
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
      const newAnswers = userSubmissionList[0]?.inputData?.map((data: { value?: string }) => data.value) || cardData.p16.answers;
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p16: {
            ...prev.p16,
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
    if (!cardData.p16.isSubmitted) {
      const { answers, solutions } = cardData.p16;
      const isCorrectAll = answers.every((answer, index) => answer === solutions[index]);

      setCardData(prev => ({ ...prev, p16: { ...prev.p16, isSubmitted: true, isCorrect: isCorrectAll } }));

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
              value: cardData.p16.answers[1],
              isAnswer: true,
              isCorrect: answers[1] === solutions[1],
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p16.answers[2],
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
    const { answers, isSubmitted } = cardData.p16;
    if (!isSubmitted) {
      return !answers.some(answers => answers === '') ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleClickDropdown = (index: number, value?: string) => {
    if (value) {
      const newAnswers = [...cardData.p16.answers];
      newAnswers[index] = value;
      setCardData(prev => ({ ...prev, p16: { ...prev.p16, answers: newAnswers } }));
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
      submitLabel={cardData.p16.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p16.isSubmitted || cardData.p16.answers.some(answer => answer === '')) && !cardData.p16.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <BoxWrap>
        <Box useFull display='flex' flexDirection='column' gap={'10px'}>
          <Box>
            <Label value='W' type='paint' background='var(--color-blue-100)' />
            <Typography>Before the show begins, we'd like to remind you of a few things</Typography>
          </Box>

          <Box display='flex' marginLeft={'40px'}>
            <Box>
              <Box display='flex' alignItems='end'>
                <Typography>to make sure everyone has an</Typography>
                <Dropdown
                  width='200px'
                  selectedValue={cardData.p16.answers[0]}
                  dropdownList={cardData.p16.dropdownList[0]}
                  onClick={value => handleClickDropdown(0, value)}
                  readOnly={cardData.p16.isSubmitted}
                  isError={cardData.p16.isSubmitted && cardData.p16.answers[0] !== cardData.p16.solutions[0]}
                  ariaLabel='첫 번째 선지 드롭박스'
                />
                <Typography>experience.</Typography>
              </Box>
            </Box>
          </Box>

          <Box display='flex' marginLeft={'40px'}>
            <Box>
              <Box display='flex' alignItems='end'>
                <Typography>First, please turn off or</Typography>
                <Dropdown
                  width='200px'
                  type='up'
                  selectedValue={cardData.p16.answers[1]}
                  dropdownList={cardData.p16.dropdownList[1]}
                  onClick={value => handleClickDropdown(1, value)}
                  readOnly={cardData.p16.isSubmitted}
                  isError={cardData.p16.isSubmitted && cardData.p16.answers[1] !== cardData.p16.solutions[1]}
                  ariaLabel='두 번째 선지 드롭박스'
                />
                <Typography>any electronic</Typography>
              </Box>

              <Box display='flex' alignItems='end'>
                <Typography>devices can</Typography>
                <Dropdown
                  width='200px'
                  type='up'
                  selectedValue={cardData.p16.answers[2]}
                  dropdownList={cardData.p16.dropdownList[2]}
                  onClick={value => handleClickDropdown(2, value)}
                  readOnly={cardData.p16.isSubmitted}
                  isError={cardData.p16.isSubmitted && cardData.p16.answers[2] !== cardData.p16.solutions[2]}
                  ariaLabel='세 번째 선지 드롭박스'
                />
                <Typography>the performers and the audience.</Typography>
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
              <Typography>{cardData.p16.solutions.join(',')}</Typography>
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px' display='flex' flexDirection='column'>
            <Typography>
              {' '}
              여: 공연이 시작되기 전에, 모두가 즐거운 경험을 할 수 있도록 몇 가지 사항을 상기시켜 드리겠습니다. 먼저, 휴대 전화를 포함한 모든
              전자기기의 전원을 끄거나 무음 처리 해주셔야 하는데, 이 기기들이 공연자와 관객들의 주의를 산만하게 할 수 있기 때문입니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P16;
