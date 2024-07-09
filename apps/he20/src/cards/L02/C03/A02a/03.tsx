import {
  Box,
  TMainHeaderInfoTypes,
  ChipButton,
  EChipButtonType,
  List,
  BoxWrap,
  Question,
  IAudioPlayerProps,
  BottomSheet,
  Typography,
  IQuestionProps,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IData {
  contents: string;
  answer: boolean | undefined;
  solution: boolean;
}

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, isSetShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    text: 'Check T (true) or F (false) according to the dialogue.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE2-L02-C03-A02-02.mp3',
    captionSrc: '/L02/C03/A02/HE2-L02-C03-A02-02.srt',
  };

  const list: IData[] = [
    {
      contents: '(1) The boy has decided what to bring to the charity market.',
      answer: cardData.p03.answer1,
      solution: cardData.p03.solution1,
    },
    {
      contents: '(2) The girl will likely bake cookies to sell at the charity market.',
      answer: cardData.p03.answer2,
      solution: cardData.p03.solution2,
    },
    {
      contents: '(3) The money raised will be donated to a children’s hospital.',
      answer: cardData.p03.answer3,
      solution: cardData.p03.solution3,
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

  const isSubmitDisabled = cardData.p03.answer1 === undefined || cardData.p03.answer2 === undefined || cardData.p03.answer3 === undefined;

  const handleSubmitClick = () => {
    if (cardData.p03.isSubmitted) {
      isSetShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer1 === cardData.p03.solution1;
      const isCorrect2 = cardData.p03.answer2 === cardData.p03.solution2;
      const isCorrect3 = cardData.p03.answer3 === cardData.p03.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const handleChangeValue = (value: boolean, index: number) => {
    switch (index) {
      case 1:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: cardData.p03.answer1 === value ? undefined : value } }));
        changeData('P03', 1, index, cardData.p03.answer1 === value ? undefined : value);
        break;
      case 2:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: cardData.p03.answer2 === value ? undefined : value } }));
        changeData('P03', 1, index, cardData.p03.answer2 === value ? undefined : value);
        break;
      case 3:
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: cardData.p03.answer3 === value ? undefined : value } }));
        changeData('P03', 1, index, cardData.p03.answer3 === value ? undefined : value);
        break;
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value !== undefined ? userSubmissionList[0].inputData[1]?.value : cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value !== undefined ? userSubmissionList[0].inputData[2]?.value : cardData.p03.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
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
                    readOnly={cardData.p03.isSubmitted}
                    isError={cardData.p03.isSubmitted && value?.answer === true && value.answer !== value.solution}
                    ariaLabel='T 버튼'
                  />
                  <ChipButton
                    type='radio'
                    name={`chip-radio-${index}`}
                    status={EChipButtonType.FALSE}
                    isActive={value?.answer === false}
                    size={'48px'}
                    onClick={() => handleChangeValue(false, index)}
                    readOnly={cardData.p03.isSubmitted}
                    isError={cardData.p03.isSubmitted && value?.answer === false && value.answer !== value.solution}
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
              {`(1) ${cardData.p03.solution1 ? 'T' : 'F'}\n(2) ${cardData.p03.solution2 ? 'T' : 'F'}\n(3) ${cardData.p03.solution3 ? 'T' : 'F'}`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
