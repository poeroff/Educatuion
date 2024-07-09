import { useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  SvgIcon,
  ESvgType,
  IQuestionProps,
  Label,
  EDefaultInequalitySignType,
  Tag,
  ETagLine,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { IInequalitySignBoxProps, InequalitySignBox } from '@maidt-cntn/ui/math';
import empty_circle from '@/assets/icon/math_empty_circle.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C01_0002_20 } from '@/cards/C01/0002/20/store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P04 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0002_20);
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

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='부등호' src={empty_circle} size='48px' />
          &nbsp;{'안에 >, =, < 를 알맞게 써 넣으세요.'}
        </Box>
      </>
    ),
    mark: cardData.p04.isSubmitted ? (cardData.p04.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleOnChange = (type: EDefaultInequalitySignType, toolTipId: string) => {
    const newQuestionData = questionData.toolTipId === toolTipId ? { ...questionData, value: type } : questionData;
    setQuestionData(newQuestionData);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: { ...prev.p04.answer1, value: type } } }));
    changeData('P04', 1, 1, type);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p04.answer1.value.trim() === cardData.p04.answer1.solution;
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        answer1: {
          ...cardData.p04.answer1,
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
            value: cardData.p04.answer1.value,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P04', userSubmission, isCorrect);
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
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      console.log('userSubmissionList', userSubmissionList);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0] || cardData.p04.answer1,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
        console.log('userSubmissionList[0].inputData[0]?.value:', userSubmissionList[0].inputData[0]);
        setQuestionData({ ...questionData, value: userSubmissionList[0].inputData[0]?.value || undefined });
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={cardData.p04.answer1.value ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={cardData.p04.answer1.value === ''}
      onSubmit={cardData.p04.isSubmitted ? handleShowAnswer : handleSubmit}
      bodyId={'targetContainer'}
      useRound
    >
      <Box display='flex' justifyContent='center' flexWrap='wrap' gap='48px 24px'>
        <Box width='calc(50% - 12px)' hAlign='center' key={questionData.toolTipId}>
          <InequalitySignBox
            {...questionData}
            size='large'
            onChange={handleOnChange}
            isError={cardData.p04.isSubmitted && !cardData.p04.answer1.isCorrect}
            readOnly={cardData.p04.isSubmitted}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
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
    </Container>
  );
};

export default P04;
