import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  Button,
  Scroll,
  EStyleSizes,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { textContentA07 } from '../A07/commonData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A07b } from './store';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

const P02 = () => {
  const pageNumber = 'P02';
  const [isShowText, setShowText] = useState<boolean>(false);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

  const { content } = textContentA07;

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A07b);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
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
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (5)',
  };
  const questionInfo: IQuestionProps = {
    text: (
      <span>
        <span style={{ fontWeight: 'var(--font-weight-extraBold)' }}>Q5. </span>Think of what kinds of human activity can harm animals.
      </span>
    ),
    size: 'medium',
    mark: 'none',
  };

  const getButtonColor = () => {
    if (!cardData.P02.isSubmitted) {
      return !cardData.P02.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const submitAnswer = () => {
    if (cardData.P02.isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
    } else {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P02.answer,
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
        <Box useFull hAlign='center'>
          <Typography lineHeight='38px'>
            <Input
              key={'text-input-1'}
              value={cardData.P02.answer}
              inputSize='x-small'
              width='280px'
              maxLength={cardData.P02.solution.length + 10}
              onChange={event => handleUserInput(event.target.value)}
              placeholder='내용을 넣어 주세요.'
              aria-label='답란.'
              marginLeft={0}
              readOnly={cardData.P02.isSubmitted}
            />
            &nbsp;can take away animals’ homes. I think this is a serious problem.
          </Typography>
        </Box>

        <Box useFull>
          <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
            {isShowText ? (
              <>
                <Box hAlign='flex-end' marginBottom='8px'>
                  <Button
                    color={EStyleButtonTypes.SECONDARY}
                    size={EStyleSizes.SMALL}
                    label='닫기'
                    minWidth='70px'
                    onClick={() => setShowText(!isShowText)}
                  />
                </Box>
                <Scroll height='calc(100% - 52px)' tabIndex={0}>
                  <Typography lineHeight={'48px'}>{content}</Typography>
                </Scroll>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={() => setShowText(!isShowText)} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
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
