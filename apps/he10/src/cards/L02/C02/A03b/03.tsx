import {
  Box,
  ChipButton,
  EChipButtonType,
  List,
  BoxWrap,
  IAudioPlayerProps,
  BottomSheet,
  Typography,
  IQuestionProps,
  EStyleButtonTypes,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { IProps } from '.';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C02A03b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = ({ headerInfo }: IProps) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A03b);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    text: 'Check T (true) or F (false) according to the dialogue.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE1-L02-C02-A03-02.mp3',
    captionSrc: '/L02/C02/A03/HE1-L02-C02-A03-02.srt',
  };
  const contents: string[] = [
    '(1) The boy finds novels a bit boring.',
    '(2) The girl says everyone can interpret a poem differently.',
    '(3) The speakers will attend a poetry reading event this Saturday',
  ];

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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p03.answer1 === cardData.p03.solution1;
      const isCorrect2 = cardData.p03.answer2 === cardData.p03.solution2;
      const isCorrect3 = cardData.p03.answer3 === cardData.p03.solution3;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
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

  const getAnswer = (index: number) => {
    if (index === 1) {
      return cardData.p03.answer1;
    } else if (index === 2) {
      return cardData.p03.answer2;
    } else if (index === 3) {
      return cardData.p03.answer3;
    }
    return undefined;
  };

  const isCorrect = (index: number) => {
    if (index === 1) {
      return cardData.p03.answer1 === cardData.p03.solution1;
    } else if (index === 2) {
      return cardData.p03.answer2 === cardData.p03.solution2;
    } else if (index === 3) {
      return cardData.p03.answer3 === cardData.p03.solution3;
    }
    return undefined;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)}
      submitBtnColor={
        !(cardData.p03.answer1 && cardData.p03.answer2 && cardData.p03.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
    >
      <List data={contents}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull marginTop={'20px'}>
            <Box>
              <Typography>{value}</Typography>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.TRUE}
                  isActive={getAnswer(index) === 'T'}
                  size={'48px'}
                  onClick={() => handleChange(index, getAnswer(index) === 'T' ? '' : 'T')}
                  ariaLabel={'True'}
                  readOnly={cardData.p03.isSubmitted}
                  isError={cardData.p03.isSubmitted && !isCorrect(index)}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  status={EChipButtonType.FALSE}
                  isActive={getAnswer(index) === 'F'}
                  size={'48px'}
                  onClick={() => handleChange(index, getAnswer(index) === 'F' ? '' : 'F')}
                  ariaLabel={'False'}
                  readOnly={cardData.p03.isSubmitted}
                  isError={cardData.p03.isSubmitted && !isCorrect(index)}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>(1) F (2) T (3) T</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
