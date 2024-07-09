import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Dropdown,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  Button,
  EStyleSizes,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C06A06b } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A06b);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const currentPage = 'P02';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p02.answer.every((a, idx = 0) => a === cardData.p02.solution[idx]);

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect: cardData.p02.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p02.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Turning Out: The Science of Noise-Cancellation (4)',
  };
  const questionInfo: IQuestionProps = {
    text: <Typography useGap={false}>Q4. Choose the correct word to complete the sentence.</Typography>,
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleOpenOnClick = () => {
    setOpened(!opened);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={Array.isArray(cardData.p02.answer) && cardData.p02.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        Array.isArray(cardData.p02.answer) && cardData.p02.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box useFull lineHeight={'56px'} marginRight='24px' flexDirection={'column'} hAlign='center' vAlign={'flex-start'}>
          <Typography>Noise-cancelling headsets</Typography>
          <Box vAlign={'center'}>
            <Dropdown
              width='190px'
              marginLeft={'12px'}
              dropdownList={cardData.p02.dropArr[0]}
              readOnly={cardData.p02.isSubmitted}
              isOpen={openDropdown[0]}
              selectedValue={cardData.p02.answer[0]}
              isError={cardData.p02.isSubmitted && cardData.p02.answer[0] !== cardData.p02.solution[0]}
              onClick={value => handleDropdownClick(0, value)}
              ariaLabel='1번 답란'
            />
            <Typography>communication</Typography>
          </Box>
          <Typography>between drive-through employees and customers by</Typography>
          <Box vAlign={'center'}>
            <Dropdown
              width='190px'
              dropdownList={cardData.p02.dropArr[1]}
              marginLeft={'12px'}
              readOnly={cardData.p02.isSubmitted}
              isError={cardData.p02.isSubmitted && cardData.p02.answer[1] !== cardData.p02.solution[1]}
              isOpen={openDropdown[1]}
              selectedValue={cardData.p02.answer[1]}
              onClick={value => handleDropdownClick(1, value)}
              type={'up'}
              ariaLabel='2번 답란'
            />
            <Typography>vehicle noise.</Typography>
          </Box>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleOpenOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {cardData.p02.content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleOpenOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box hAlign='left' margin='20px 5px'>
            {cardData.p02.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 1}) ${ans}`}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
