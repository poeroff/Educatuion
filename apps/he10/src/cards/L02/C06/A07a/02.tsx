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
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C06A07a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageNumber = 'P02';
  const content =
    'It was early morning and still dark when we returned to Auntie’s place. All the lights were on, and the village people were waiting for us. Smiling, Nani Tama lifted up the whakapapa and offered it to the village. Our hearts were full because our grandfather had saved our past for us. Our Nani Tama smiled again. His smile grew tired. He sighed. “At last, I may go now.” Then, he closed his eyes. “No, Dad!” Auntie Hiraina cried. The sun burst across the hills.';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (5) ',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q5. How did the villagers probably feel when Nani Tama offered them the whakapapa?',
    mark: 'none',
  };

  const [opened, setOpened] = useState<boolean>(false);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A07a);
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
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
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
    if (cardData.p02.isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXTAREA',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData(pageNumber, userSubmission);
  };

  const handleUserInput = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return !cardData.p02.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getButtonColor()}
      submitLabel={getSubmitLabel()}
      submitDisabled={!cardData.p02.answer && !cardData.p02.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel={'답란'}
            value={cardData.p02.answer}
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
            <Typography usePre>{cardData.p02.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
