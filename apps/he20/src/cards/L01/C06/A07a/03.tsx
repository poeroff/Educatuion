import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  IQuestionProps,
  Scroll,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { textContentA07 } from '../A07/commonData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C06A07a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const pageNumber = 'P03';
  const { content } = textContentA07;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (5)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q6. How did Mia feel as she left the sanctuary?',
    mark: 'none',
  };

  const [opened, setOpened] = useState<boolean>(false);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A07a);
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
          P03: {
            ...prev.P03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P03.answer,
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
    if (cardData.P03.isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
    } else {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.P03.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const handleUserInput = (value: string) => {
    setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getButtonColor = () => {
    if (!cardData.P03.isSubmitted) {
      return !cardData.P03.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const getSubmitLabel = () => (cardData.P03.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getButtonColor()}
      submitLabel={getSubmitLabel()}
      submitDisabled={!cardData.P03.answer && !cardData.P03.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.P03.isSubmitted}
            ariaLabel={'답란'}
            value={cardData.P03.answer}
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
            <Typography usePre>{cardData.P03.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
