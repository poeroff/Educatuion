import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  Question,
  IAudioPlayerProps,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  List,
  ChipButton,
  EChipButtonType,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L03C03A02b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

interface IData {
  contents: string;
  answer: boolean | undefined;
  solution: boolean;
}

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02b);
  const { userId } = useRecoilValue(studentAtom);
  const pageNumber = 'P01';
  const pageKey = 'p01';

  const [isShow, isSetShow] = useState<boolean>(false);

  const list: IData[] = [
    {
      contents: '(1) Frances Gabe invented a self-cleaning house.',
      answer: cardData[pageKey].answer1,
      solution: cardData[pageKey].solution1,
    },
    {
      contents: '(2) The house was one story high and about 39 m2 in size.',
      answer: cardData[pageKey].answer2,
      solution: cardData[pageKey].solution2,
    },
    {
      contents: '(3) A network of tubes and sprayers released soapy water all over the house.',
      answer: cardData[pageKey].answer3,
      solution: cardData[pageKey].solution3,
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: undefined,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: undefined,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: undefined,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.mp3',
    captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-01.srt',
  };

  const questionInfo: IQuestionProps = {
    text: 'Check T (true) or F (false) according to the dialogue.',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const isSubmitDisabled =
    cardData[pageKey].answer1 === undefined || cardData[pageKey].answer2 === undefined || cardData[pageKey].answer3 === undefined;

  const handleSubmitClick = () => {
    if (cardData[pageKey].isSubmitted) {
      isSetShow(!isShow);
    } else {
      const isAnswer1 = cardData[pageKey].answer1 === cardData[pageKey].solution1;
      const isAnswer2 = cardData[pageKey].answer2 === cardData[pageKey].solution2;
      const isAnswer3 = cardData[pageKey].answer3 === cardData[pageKey].solution3;

      const isCorrect = isAnswer1 && isAnswer2 && isAnswer3;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData[pageKey].answer1,
              isAnswer: isAnswer1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData[pageKey].answer2,
              isAnswer: isAnswer2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData[pageKey].answer3,
              isAnswer: isAnswer3,
            },
          ],
          isCorrect,
        },
      ];
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleChangeValue = (value: boolean, index: number) => {
    switch (index) {
      case 1:
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer1: cardData[pageKey].answer1 === value ? undefined : value } }));
        changeData(pageNumber, 1, index, cardData[pageKey].answer1 === value ? undefined : value);
        break;
      case 2:
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer2: cardData[pageKey].answer2 === value ? undefined : value } }));
        changeData(pageNumber, 1, index, cardData[pageKey].answer2 === value ? undefined : value);
        break;
      case 3:
        setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer3: cardData[pageKey].answer3 === value ? undefined : value } }));
        changeData(pageNumber, 1, index, cardData[pageKey].answer3 === value ? undefined : value);
        break;
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData[pageKey].answer1,
            answer2: userSubmissionList[0].inputData[1]?.value !== undefined ? userSubmissionList[0].inputData[1]?.value : cardData[pageKey].answer2,
            answer3: userSubmissionList[0].inputData[2]?.value !== undefined ? userSubmissionList[0].inputData[2]?.value : cardData[pageKey].answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmitClick}
    >
      <BoxWrap flexDirection='column' justifyContent='space-around' useFull>
        <List data={list}>
          {({ value, index = 1 }) => (
            <BoxWrap justifyContent='space-between' useFull>
              <Box>
                <Question size={'small'}>{value?.contents}</Question>
              </Box>
              <Box vAlign='center'>
                <BoxWrap>
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.TRUE}
                    isActive={value?.answer === true}
                    size={'48px'}
                    onClick={() => handleChangeValue(true, index)}
                    readOnly={cardData[pageKey].isSubmitted}
                    isError={cardData[pageKey].isSubmitted && value?.answer === true && value.answer !== value.solution}
                    ariaLabel='T 버튼'
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.FALSE}
                    isActive={value?.answer === false}
                    size={'48px'}
                    onClick={() => handleChangeValue(false, index)}
                    readOnly={cardData[pageKey].isSubmitted}
                    isError={cardData[pageKey].isSubmitted && value?.answer === false && value.answer !== value.solution}
                    ariaLabel='F 버튼'
                  />
                </BoxWrap>
              </Box>
            </BoxWrap>
          )}
        </List>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {`(1) ${cardData[pageKey].solution1 ? 'T' : 'F'}\n(2) ${cardData[pageKey].solution2 ? 'T' : 'F'}\n(3) ${
                cardData[pageKey].solution3 ? 'T' : 'F'
              }`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
