import { useEffect, useMemo, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import simpleRightArrow from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { textContentA07 } from '../A07/commonData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C06A07b } from './store';
import { studentAtom } from '@/stores/student';

const P03 = () => {
  const pageNumber = 'P03';
  const { content } = textContentA07;

  const [opened, setOpened] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A07b);
  const { userId } = useRecoilValue(studentAtom);
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
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
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const submitBtnColor = useMemo(() => {
    if (!cardData.P03.isSubmitted) {
      return cardData.P03.answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  }, [cardData.P03.isSubmitted, isShowAnswer, cardData.P03.answer]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (1)',
  };

  const questionInfo = {
    text: (
      <>
        <Typography useGap={false} weight='var(--font-weight-extraBold)'>
          Q6.&nbsp;
        </Typography>
        Choose the one to fill in the sentence.
      </>
    ),
    mark: cardData.P03.isSubmitted ? (cardData.P03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const radioText = ['grateful', 'ashamed', 'thoughtful'];

  const submitAnswer = () => {
    if (cardData.P03.isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.P03.answer === cardData.P03.solution;
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.P03.answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleChange = (value: number) => {
    setCardData(prev => ({ ...prev, P03: { ...prev.P03, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.P03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.P03.isSubmitted && !cardData.P03.answer}
      onSubmit={submitAnswer}
      submitBtnColor={submitBtnColor}
    >
      <Box useRound background='white' width='100%'>
        <Box vAlign='center'>
          <Typography useGap={false}>How did Mia feel as she left the sanctuary?</Typography>
        </Box>
        <Box vAlign='center'>
          <SvgIcon src={simpleRightArrow} type={ESvgType.IMG} />
          <Typography useGap={false}>&nbsp;She felt&nbsp;</Typography>
          <Typography useGap={false} type='blank' width='300px' title='빈칸' boxColor='var(--color-black)'>
            &nbsp;
          </Typography>
          <Typography useGap={false}>&nbsp;for the opportunity to volunteer.</Typography>
        </Box>
      </Box>

      <BoxWrap height='calc(100% - 156px)' marginTop='8px'>
        <Box vAlign='center' hAlign='center' useFull>
          <List gap={4} data={radioText}>
            {({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value}
                value={index === cardData.P03.answer}
                onClick={() => handleChange(index)}
                isError={cardData.P03.isSubmitted && cardData.P03.answer !== cardData.P03.solution}
                readOnly={cardData.P03.isSubmitted}
                tabIndex={101 + index + 1}
              >
                <Box vAlign='flex-start'>
                  <Label value={index} />
                  &nbsp;{value}
                </Box>
              </Radio>
            )}
          </List>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  tabIndex={111}
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={() => setOpened(!opened)}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button
                tabIndex={110}
                color={EStyleButtonTypes.SECONDARY}
                label='지문보기'
                minWidth='118px'
                useRound
                onClick={() => setOpened(!opened)}
              />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.P03.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
