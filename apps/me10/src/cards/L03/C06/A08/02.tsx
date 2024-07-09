import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dropdown,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C06A08 } from './store';

const P02 = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A08);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'We Have a Cat on Our Team! (5)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct word.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [{ subKey: 1, type: 'TEXT_LIST', value: [''], isCorrect: false, isAnswer: true }],
      isCorrect: false,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || '',
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect || false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsAnswerOpen(!isAnswerOpen);
    } else {
      const isCorrect = cardData.p02.answer.every((a, idx = 0) => a === cardData.p02.solution[idx]);
      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true, isCorrect },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [{ subKey: 1, type: 'TEXT_LIST', value: cardData.p02.answer, isCorrect, isAnswer: true }],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const renderDropdown = (index: number): React.ReactNode => (
    <Dropdown
      width='200px'
      dropdownList={cardData.p02.dropArr}
      isOpen={openDropdown[index]}
      selectedValue={cardData.p02.answer[index]}
      readOnly={cardData.p02.isSubmitted}
      onClick={value => handleDropdownClick(index, value)}
      ariaLabel={`${index + 1}번째 답 선택칸`}
      isError={cardData.p02.isSubmitted && cardData.p02.answer[index] !== cardData.p02.solution[index]}
      type={index > 2 ? 'up' : 'down'}
      isInline={true}
    />
  );

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
    changeData('P02', 1, 1, updatedAnswers);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const handleParagraphOpen = () => {
    setIsParagraphOpen(!isParagraphOpen);
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');

  const isSubmitDisabled = () => !Array.isArray(cardData.p02.answer) || cardData.p02.answer.some(value => value === '' || value === undefined);

  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return isSubmitDisabled() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const content = (
    <Typography style={{ textIndent: 'var(--font-size-28)' }}>
      After the game, everyone talked about Cathy. “We have a cat on our team now. I’m so glad!” said Max. “Great!” Coach Biscuit said, “We have
      another new member.” “A dog or a cat?” Everyone got excited. “Cookie! Please come out.” Coach Biscuit called out to the new member.
    </Typography>
  );

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={getButtonColor()}
      submitDisabled={isSubmitDisabled()}
    >
      <BoxWrap useFull>
        <Box vAlign={'center'} hAlign={'center'} useFull useRound>
          <Box padding={'0px 20px 0px 20px'}>
            Coach Biscuit called out to the new{' '}
            <Box marginTop={'10px'} display={'inline-block'}>
              {renderDropdown(0)}
            </Box>{' '}
            , Cookie.
          </Box>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isParagraphOpen ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  tabIndex={103}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handleParagraphOpen}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={104}>
                <Typography lineHeight={'48px'}>{content}</Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button tabIndex={105} color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleParagraphOpen} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
