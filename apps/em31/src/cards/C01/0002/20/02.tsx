import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  Input,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0002_20 } from '@/cards/C01/0002/20/store';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0002_20);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={1} type='icon' size='small' />수 모형을 보고 367+122를 구해 보세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      console.log('userSubmissionList', userSubmissionList);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0] || cardData.p02.answer1,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: { ...prev.p02.answer1, value } } }));
    changeData('P02', 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p02.answer1.value === cardData.p02.answer1.solution;
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer1: {
          ...cardData.p02.answer1,
          isCorrect: isCorrect,
        },
        isSubmitted: true,
        isAllCorrect: isCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1.value,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p02.answer1.value ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!cardData.p02.answer1.value}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
      background={'var(--color-white)'}
      bodyId={'targetContainer'}
      useRound
    >
      <Box useFull vAlign='center' flexDirection='column'>
        <Box type='line' padding='20px 40px' useRound>
          <Image
            src='/C01/0002/20/DEC311001_2.png'
            alt='백 모형 3개, 십 모형 6개, 일 모형 7개와 백 모형 1개, 십 모형 2개, 일 모형 2개가 있습니다.'
            width='400px'
            height='200px'
          />
        </Box>
        <Box marginTop='24px'>
          <Typography>367+122=</Typography>
          <Input
            width='130px'
            value={cardData.p02.answer1.value}
            onChange={e => handleChange(e.target.value.trim())}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel={'367+122의 값'}
            maxLength={4}
            status={cardData.p02.isSubmitted && cardData.p02.answer1.solution !== cardData.p02.answer1.value ? 'error' : ''}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p02.answer1.solution}</Typography>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Typography size={EStyleFontSizes.MEDIUM}>
              수 모형이 모두 몇 개인지 세어 보면 백 모형이 4개, 십 모형이 8개, 일 모형이 9개이므로 367 + 122 = 489 입니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
