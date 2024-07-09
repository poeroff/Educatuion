import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { userSubmissionType } from 'packages/api/types/pageData';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { textContentA04 } from '../A04/commonData';
import { contentInfo } from './contentInfo';
import { L02C06A04b } from './store';

const P02 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const toggleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const pageKey = 'p02';
  const pageNumber = 'P02';

  const { initData, changeData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A04b);
  const { userId } = useRecoilValue(studentAtom);

  const isSubmittable = cardData.p02.userInput !== -1;

  /* default 제출 값 */
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
          isAnswer: true,
          isCorrect: cardData.p02.userInput === cardData.p02.solution,
        },
      ],
    },
  ];

  const content = textContentA04.content;

  const data = [
    {
      text: contentInfo.P02.text[0],
    },
    {
      text: contentInfo.P02.text[1],
    },
    {
      text: contentInfo.P02.text[2],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (2)',
  };

  const questionText = (
    <Typography useGap={false}>
      <Typography weight={'var(--font-weight-bold)'} useGap={false}>
        Q2.
      </Typography>{' '}
      How long did it take Nani Tama to gather most of the whakapapa?
    </Typography>
  );

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleRadioOnChange = (value: number) => {
    setCardData(prev => {
      return { ...prev, [pageKey]: { ...prev[pageKey], userInput: value } };
    });
    changeData(pageNumber, 1, 1, value);
  };

  const onGrade = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData[pageKey].userInput === cardData[pageKey].solution;
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageKey].userInput,
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId || 2;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            userInput: userSubmissionList[0].inputData[0].value || cardData[pageKey].userInput,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    init();
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData[pageKey].isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={!isSubmittable ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={cardData[pageKey].isSubmitted ? () => toggleShowAnswer() : () => onGrade()}
    >
      <BoxWrap useFull>
        <Box hAlign={'center'} useFull>
          <List
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={cardData[pageKey].userInput === index}
                disabled={cardData[pageKey].isSubmitted}
                isError={cardData[pageKey].isSubmitted && cardData[pageKey].userInput !== cardData[pageKey].solution}
                onClick={e => {
                  handleRadioOnChange(index);
                }}
              >
                <Box>
                  <Label value={index} marginRight={4} /> <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          />
        </Box>
        <Box background='blue' useRound useFull>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom={'24px'}>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight='48px' useGap={false}>
                  &nbsp;{content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{contentInfo.P02.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
