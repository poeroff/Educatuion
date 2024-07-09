import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C06A06a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageNumber = 'P02';
  const content = `Before we can fully embrace the era of AI-powered neural implants, many tricky ethical issues should be addressed. The integration of AI technology with the human brain raises concerns about what it means to be human. Our brains are believed to be central to our identity, existence, and value as human beings. However, an over-reliance on technology may delay our natural development and create confusion about whether we are human, AI, or something in between. Another critical issue is privacy. There’s a risk that organizations or hackers could access personal data without permission through AI-connected implants. This means that our thoughts, emotions, and behaviors could be controlled by hackers. There’s an additional risk that this technology could lead to even greater social inequality, given that it may not be available to all due to its high cost. Such unequal access to the technology could intensify the division between those who can afford the implants and those who cannot.`;
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (4)',
  };
  const questionText = (
    <Typography useGap={false}>
      <Typography weight={'var(--font-weight-bold)'} useGap={false}>
        Q4.
      </Typography>{' '}
      What problem would occur if hackers could freely access personal data through neural implants?
    </Typography>
  );
  const questionInfo = {
    text: questionText,
  };

  const [opened, setOpened] = useState<boolean>(false);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A06a);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const submitAnswer = () => {
    if (cardData.P02.isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
    } else {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.P02.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const handleUserInput = (value: string) => {
    setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getButtonColor = () => {
    if (!cardData.P02.isSubmitted) {
      return !cardData.P02.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const getSubmitLabel = () => (cardData.P02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getButtonColor()}
      submitLabel={getSubmitLabel()}
      submitDisabled={!cardData.P02.answer && !cardData.P02.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.P02.isSubmitted}
            ariaLabel={'답란'}
            value={cardData.P02.answer}
            onChange={e => handleUserInput(e.target.value)}
          />
        </Box>
        <Box useFull>
          <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom='8px'>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Scroll height='calc(100% - 52px)' tabIndex={0}>
                  <Typography lineHeight={'48px'}>{content}</Typography>
                </Scroll>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData.P02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
