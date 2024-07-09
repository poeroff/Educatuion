import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  InputStatus,
  Scroll,
  Tag,
  Textarea,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04C06A03a } from '@/cards/L04/C06/A03a/store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A03a);

  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isParagraphOpen, setIsParagraphOpen] = useState<boolean>(false);
  const currentPage = 'P02';
  const content =
    'Neuroscience has a long history of exploring treatments for disorders of the nervous system, including the brain and spinal cord. Traditionally, researchers have studied various functions of neural implants, which are medical devices like computer chips that can be implanted in the nervous system. But here’s the exciting part: with the rapid advancement of artificial intelligence (AI), researchers have begun to integrate AI into neural implants. In this post, we’ll examine the incredible benefits of AI-powered neural implants, their amazing potential for the future, and the ethical concerns surrounding them.';

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
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (1)',
  };

  const questionInfo = {
    text: 'Q1. Where can neural implants be inserted?',
  };

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
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(currentPage, userSubmission);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const handleParagraphOpen = () => {
    setIsParagraphOpen(!isParagraphOpen);
  };

  const handleUserInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = truncateToMaxBytes(e.target.value, 2000);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(currentPage, 1, 1, value);
  };

  const handleInputStatus = (userAnswer: string): InputStatus => {
    return isNotEmptyString(userAnswer) ? InputStatus.ENABLE : InputStatus.DEFAULT;
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');

  const isSubmitDisabled = () => !cardData.p02.answer && !cardData.p02.isSubmitted;

  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return !cardData.p02.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

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
        <Box useFull marginRight='24px'>
          <Textarea
            tabIndex={101}
            value={cardData.p02.answer}
            onChange={handleUserInput}
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel={'답란'}
            status={handleInputStatus(cardData.p02.answer)}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isParagraphOpen ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  tabIndex={102}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handleParagraphOpen}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={103}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button tabIndex={104} color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleParagraphOpen} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre useGap={false}>
              {cardData.p02.solution}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
