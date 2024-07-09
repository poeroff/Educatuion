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
import { L01C02A03b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

interface IData {
  contents: string;
  answer: boolean | undefined;
  solution: boolean;
}

const P03 = ({ headerInfo, audioInfo }: { headerInfo: TMainHeaderInfoTypes; audioInfo: IAudioPlayerProps }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C02A03b);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, isSetShow] = useState<boolean>(false);

  const list: IData[] = [
    {
      contents: '(1) (1) They are talking about what to bring to the charity​ market.',
      answer: cardData.p03.answer1,
      solution: cardData.p03.solution1,
    },
    {
      contents: '(2) The girl is thinking of baking some cookies.',
      answer: cardData.p03.answer2,
      solution: cardData.p03.solution2,
    },
    {
      contents: '(3) The money they earn will be donated to a children’s ​hospital.',
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

  const questionInfo: IQuestionProps = {
    text: 'Check T (true) or F (false) according to the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const isSubmitDisabled = cardData.p03.answer1 === undefined || cardData.p03.answer2 === undefined || cardData.p03.answer3 === undefined;

  const handleSubmitClick = () => {
    if (cardData.p03.isSubmitted) {
      isSetShow(!isShow);
    } else {
      const isAnswer1 = cardData.p03.answer1 === cardData.p03.solution1;
      const isAnswer2 = cardData.p03.answer2 === cardData.p03.solution2;
      const isAnswer3 = cardData.p03.answer3 === cardData.p03.solution3;

      const isCorrect = isAnswer1 && isAnswer2 && isAnswer3;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p03.answer1,
              isAnswer: isAnswer1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.p03.answer2,
              isAnswer: isAnswer2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.p03.answer3,
              isAnswer: isAnswer3,
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
