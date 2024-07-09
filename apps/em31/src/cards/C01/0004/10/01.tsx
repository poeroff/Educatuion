import {
  Box,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  EStyleFontSizes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { C01_0004_10 } from './store';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString, getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_10);
  const { userId } = useRecoilValue(studentAtom);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        안전 체험관에 물놀이 안전을 위한 구명조끼가 356개 있습니다 . 198개를 더 샀다면 구명조끼는 모두 몇 개 인가요 ?
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const setSubmitBtnColor = () => {
    if (!isNotEmptyString(cardData.p01.answer1) || !isNotEmptyString(cardData.p01.answer2)) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (showAnswer) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && showAnswer) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !showAnswer) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      const isCorrect1 = cardData.p01.solution1.includes(cardData.p01.answer1.replace(/(\s*)/g, ''));
      const isCorrect2 = cardData.p01.solution2 === cardData.p01.answer2.trim();
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={!isNotEmptyString(cardData.p01.answer1) || !isNotEmptyString(cardData.p01.answer2)}
      vAlign='flex-start'
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='300px'
              marginLeft={12}
              maxLength={20}
              textAlign='center'
              ariaLabel='1번 답란'
              value={cardData.p01.answer1}
              readOnly={cardData.p01.isSubmitted}
              onChange={event => handleChange(1, event.target.value)}
              status={
                !cardData.p01.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p01.solution1.includes(cardData.p01.answer1.replace(/(\s*)/g, ''))
                  ? InputStatus.ENABLE
                  : InputStatus.ERROR
              }
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='124px'
              marginLeft={12}
              textAlign='center'
              ariaLabel='2번 답란'
              value={cardData.p01.answer2}
              readOnly={cardData.p01.isSubmitted}
              onChange={event => handleChange(2, event.target.value)}
              status={
                !cardData.p01.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p01.solution2 === cardData.p01.answer2.trim()
                  ? InputStatus.ENABLE
                  : InputStatus.ERROR
              }
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>356 + 198 = 554, 554</Typography>
          </Box>

          <Box marginTop={'20px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>(안전 체험관에 있는 구명조끼 수) + (더 산 구명조끼 수) </Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>= 356 + 198 = 554</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
