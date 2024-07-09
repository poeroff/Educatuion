import { useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  SvgIcon,
  ESvgType,
  EDefaultInequalitySignType,
  Tag,
  ETagLine,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { DialogContainer, IInequalitySignBoxProps, InequalitySignBox } from '@maidt-cntn/ui/math';
import empty_circle from '@/assets/icon/math_empty_circle.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A05_0008_07 } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P08 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05_0008_07);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const [questionData, setQuestionData] = useState<IInequalitySignBoxProps>({
    toolTipId: 'tooltip-1',
    leftQuestionText: '105+573',
    rightQuestionText: '362+304',
    value: undefined,
  });

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleOnChange = (type: EDefaultInequalitySignType, toolTipId: string) => {
    const newQuestionData = questionData.toolTipId === toolTipId ? { ...questionData, value: type } : questionData;
    setQuestionData(newQuestionData);
    setCardData(prev => ({ ...prev, p08: { ...prev.p08, answer1: { ...prev.p08.answer1, value: type } } }));
    changeData('P08', 1, 1, type);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p08.answer1.value.trim() === cardData.p08.answer1.solution;
    setCardData(prev => ({
      ...prev,
      p08: {
        ...prev.p08,
        answer1: {
          ...cardData.p08.answer1,
          isCorrect: isCorrect,
        },
        isAllCorrect: isCorrect,
        isSubmitted: true,
      },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p08.answer1.value,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P08', userSubmission, isCorrect);
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
    const pageId = pageIds.find(page => page.page === 'P08')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p08: {
            ...prev.p08,
            answer1: {
              ...prev.p08.answer1,
              value: userSubmissionList[0].inputData[0]?.value || cardData.p08.answer1.value,
              isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p08.answer1.isCorrect,
            },
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
        setQuestionData({ ...questionData, value: userSubmissionList[0].inputData[0]?.value || undefined });
      }
      initData('P08', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
            <SvgIcon type={ESvgType.IMG} alt='부등호' src={empty_circle} size='48px' />
            &nbsp;{'임시페이지'}
          </>
        ),
        mark: cardData.p08.isSubmitted ? (cardData.p08.isAllCorrect ? 'correct' : 'incorrect') : 'none',
      }}
      bodyId='targetContainer8'
      submitLabel={cardData.p08.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p08.answer1.value ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={cardData.p08.isSubmitted ? handleShowAnswer : handleSubmit}
      submitDisabled={cardData.p08.answer1.value === ''}
    >
      <Box hAlign='center' paddingTop='20px'>
        <Box width='calc(50% - 12px)' hAlign='center' key={questionData.toolTipId}>
          <InequalitySignBox
            {...questionData}
            size='large'
            onChange={handleOnChange}
            isError={cardData.p08.isSubmitted && !cardData.p08.answer1.isCorrect}
            readOnly={cardData.p08.isSubmitted}
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer8' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='10px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box>
            <Typography size={EStyleFontSizes.MEDIUM}>{'>'}</Typography>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>{`105 + 573 = 678, 362 + 304 = 666  ➡  678 > 666`}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P08;
