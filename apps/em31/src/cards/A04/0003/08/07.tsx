import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  ETextViewColor,
  Input,
  InputStatus,
  IQuestionProps,
  Label,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';

import React, { useEffect, useState } from 'react';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A04_0003_08 } from '@/cards/A04/0003/08/store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P07 = () => {
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
        <Label type='icon' size='small' value={3} />
        세윤이와 친구들이 계획을 세워 윗몸 말아 올리기를 하고 있습니다. 하루에 윗몸 말아 올리기를 가장 많이 하는 친구는 누구인가요?
      </>
    ),
    mark: getMarking(cardData.p07.isSubmitted, cardData.p07.isAllCorrect),
  };

  const data = [
    { label: '세윤이의 계획', text: '13회씩 3번 하기' },
    { label: '민서의 계획', text: '21회씩 2번 하기' },
    { label: '호준이의 계획', text: '11회씩 3번 하기' },
  ];
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
    const pageId = pageIds.find(page => page.page === 'P07')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p07: {
            ...prev.p07,
            answer1:
              { ...prev.p07.answer1, value: userSubmissionList[0]?.inputData[0]?.value, isCorrect: userSubmissionList[0]?.inputData[0]?.isCorrect } ||
              cardData.p07.answer1,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P07', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p07: { ...prev.p07, answer1: { ...prev.p07.answer1, value } } }));
    changeData('P07', 1, 1, value);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p07.answer1.value.replace(/\s+/g, '') === cardData.p07.answer1.solution;
    setCardData(prev => ({
      ...prev,
      p07: {
        ...prev.p07,
        answer1: {
          ...cardData.p07.answer1,
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
            value: cardData.p07.answer1.value,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P07', userSubmission, isCorrect);
  };

  const getAllInputFilled = () => {
    return cardData.p07.answer1.value;
  };

  useEffect(() => {
    return () => {
      saveData('P07');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p07.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getAllInputFilled() ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!getAllInputFilled()}
      onSubmit={cardData.p07.isSubmitted ? handleShowAnswer : handleSubmit}
      bodyId='targetContainer_p07'
    >
      <Box useFull>
        <Box hAlign={'space-evenly'} flexDirection={'row'}>
          {data.map((value, index) => {
            return (
              <Box key={`list-item-${index}`}>
                <TextView title={value.label} type={ETextViewColor.DEFAULT} themeColor={'var(--color-pink-1000)'}>
                  <Box fontSize='var(--font-size-20)' lineHeight='34px' whiteSpace='pre-line' textAlign='center'>
                    하루에
                    {'\n'}
                    {value.text}
                  </Box>
                </TextView>
              </Box>
            );
          })}
        </Box>
        <Box hAlign='end' marginTop='26px' marginRight='45px'>
          <Input
            ariaLabel='윗몸 말아 올리기를 가장 많이 하는 친구의 이름 입력란'
            value={cardData.p07.answer1.value}
            readOnly={cardData.p07.isSubmitted}
            width='160px'
            onChange={e => handleChange(e.target.value)}
            status={
              !isNotEmptyString(cardData.p07.answer1.value)
                ? InputStatus.DEFAULT
                : cardData.p07.isSubmitted && !cardData.p07.answer1.isCorrect
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId={`targetContainer_p07`} height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px'>
              <Typography size={EStyleFontSizes.MEDIUM}>민서</Typography>
            </Box>
            <Box marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />
            </Box>
            <Typography size={EStyleFontSizes.MEDIUM}>
              세윤: 13×3=39(회), 민서: 21×2=42(회), 호준: 11×3=33(회) 따라서 하루에 윗몸 말아 올리기를 가장 많이 하는 친구는 민서입니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P07;