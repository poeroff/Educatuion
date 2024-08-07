import { useEffect, useState } from 'react';
import { DialogContainer } from '@maidt-cntn/ui/math';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A04_0003_08 } from './store';
import usePageData from '@/hooks/usePageData';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A04_0003_08);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        식물에 생긴 진딧물을 없애기 위해 작은 온실 한 개에 23마리의 무당벌레를 넣으려고 합니다. 작은 온실이 3개라면 필요한 무당벌레는 모두 몇
        마리인가요?
      </>
    ),
    mark: getMarking(cardData.p06.isSubmitted, cardData.p06.isAllCorrect),
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
        {
          subKey: 2,
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
            answer1:
              { ...prev.p06.answer1, value: userSubmissionList[0]?.inputData[0]?.value, isCorrect: userSubmissionList[0]?.inputData[0]?.isCorrect } ||
              cardData.p06.answer1,
            answer2:
              { ...prev.p06.answer2, value: userSubmissionList[0]?.inputData[1]?.value, isCorrect: userSubmissionList[0]?.inputData[1]?.isCorrect } ||
              cardData.p06.answer2,
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

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer1: { ...prev.p06.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer2: { ...prev.p06.answer2, value } } }));
    }
    changeData('P06', 1, subKey, value);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p06.answer1.solution.includes(cardData.p06.answer1.value.replace(/\s+/g, ''));
    const isCorrect2 = cardData.p06.answer2.value === cardData.p06.answer2.solution;
    const isAllCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({
      ...prev,
      p06: {
        ...prev.p06,
        answer1: {
          ...cardData.p06.answer1,
          isCorrect: isCorrect1,
        },
        answer2: {
          ...cardData.p06.answer2,
          isCorrect: isCorrect2,
        },
        isSubmitted: true,
        isAllCorrect: isAllCorrect,
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
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p06.answer2.value,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P06', userSubmission, isAllCorrect);
  };

  const getAllInputFilled = () => {
    return cardData.p06.answer1.value && cardData.p06.answer2.value;
  };

  useEffect(() => {
    return () => {
      saveData('P06');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      bodyId={'targetContainer_p06'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p06.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getAllInputFilled() ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!getAllInputFilled()}
      onSubmit={cardData.p06.isSubmitted ? handleShowAnswer : handleSubmit}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              width='296px'
              value={cardData.p06.answer1.value}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p06.isSubmitted}
              ariaLabel={'무당벌레의 총 마리 수를 구하기 위한 식을 적어주세요.'}
              marginLeft={12}
              textAlign='center'
              status={
                !isNotEmptyString(cardData.p06.answer1.value)
                  ? InputStatus.DEFAULT
                  : cardData.p06.isSubmitted && !cardData.p06.answer1.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type={'number'}
              width='124px'
              value={cardData.p06.answer2.value}
              onChange={e => handleChange(2, e.target.value)}
              readOnly={cardData.p06.isSubmitted}
              ariaLabel={'무당벌레의 총 마리 수를 적어주세요'}
              marginLeft={12}
              textAlign='center'
              status={
                !isNotEmptyString(cardData.p06.answer2.value)
                  ? InputStatus.DEFAULT
                  : cardData.p06.isSubmitted && !cardData.p06.answer2.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
            />
            <Typography>마리</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId={`targetContainer_p06`} height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px'>
              <Typography size={EStyleFontSizes.MEDIUM}>23×3=69 또는 3×23=69 또는 23×3 또는 3×23, 69</Typography>
            </Box>
            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />
            </Box>
            <Typography size={EStyleFontSizes.MEDIUM}>작은 온실 3개에 넣어야 하므로 필요한 무당벌레는 모두 23×3=69(마리)입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P06;
