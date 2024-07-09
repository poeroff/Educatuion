import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  Input,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05_0008_07 } from './store';
import { studentAtom } from '@/stores/student';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P06 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05_0008_07);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
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
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer1: {
              ...prev.p06.answer1,
              value: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer1.value,
              isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p06.answer1.isCorrect,
            },
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: { ...prev.p06.answer1, value } } }));
    changeData('P06', 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p06.answer1.value === cardData.p06.answer1.solution;
    setCardData(prev => ({
      ...prev,
      p06: {
        ...prev.p06,
        answer1: {
          ...prev.p06.answer1,
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
            value: cardData.p06.answer1.value,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P06', userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={{
        type: 'icon',
        text: (
          <>
            <Label value={1} type='icon' size='small' />
            임시페이지
          </>
        ),
        mark: cardData.p06.isSubmitted ? (cardData.p06.isAllCorrect ? 'correct' : 'incorrect') : 'none',
      }}
      bodyId='targetContainer6'
      submitLabel={cardData.p06.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p06.answer1.value ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={cardData.p06.isSubmitted ? handleShowAnswer : handleSubmit}
      submitDisabled={!cardData.p06.answer1.value}
    >
      <Box type='line' useRound hAlign='center' padding='20px 40px'>
        <Image
          src='/C01/0002/20/DEC311001_2.png'
          alt='백 모형 3개, 십 모형 6개, 일 모형 7개와 백 모형 1개, 십 모형 2개, 일 모형 2개가 있습니다.'
          width='300px'
          height='auto'
        />
      </Box>
      <Box marginTop='24px' hAlign='center'>
        <Typography>367+122=</Typography>
        <Input
          width='130px'
          value={cardData.p06.answer1.value}
          onChange={e => handleChange(e.target.value.trim())}
          readOnly={cardData.p06.isSubmitted}
          ariaLabel={'367+122의 값'}
          maxLength={4}
          status={cardData.p06.isSubmitted && cardData.p06.answer1.solution !== cardData.p06.answer1.value ? 'error' : ''}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer6' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.p06.answer1.solution}</Typography>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Typography size={EStyleFontSizes.MEDIUM}>
              수 모형이 모두 몇 개인지 세어 보면 백 모형이 4개, 십 모형이 8개, 일 모형이 9개이므로 367 + 122 = 489 입니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P06;
