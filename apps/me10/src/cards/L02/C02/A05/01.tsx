import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  ChipButton,
  EChipButtonType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  List,
  Question,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C02A05 } from './store';

const page = 'P01';
const pageKey = 'p01';

const imgSrc = '/L02/C02/A05/ME1-L02-C02-A05-P01.jpg';
const imgAlt = '선글라스, 시계, 옷가지, 신발, 모자 등이 널려 있다.';

const data = [
  { question: '1. Sujin is at a clothing shop.', answer: false },
  { question: '2. Sujin is looking for a T-shirt.', answer: true },
];

const displayAnswer = data.map((item, idx) => `${idx + 1}. ${item.answer ? 'T' : 'F'}`).join('\n');

const P01 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C02A05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { answer, solution, isSubmitted, isCorrect } = cardData[pageKey];
  const [isShowAnswer, setShowAnswer] = useState(false);
  const isDisabled = !answer.every(value => value !== undefined);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Check',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: 'Check T (True) or F (False).',
    mark: getMarking(isSubmitted, isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A05/ME1-L02-C02-A05-P01.mp3',
    captionSrc: '/L02/C02/A05/ME1-L02-C02-A05-P01.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData?.map((v: { value: boolean }) => v.value) || answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = answer.map((value, index) => value === solution[index]);
      const isAllCorrect = isCorrect.every(value => value === true);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isAllCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: answer[0],
              isAnswer: true,
              isCorrect: isCorrect[0],
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: answer[1],
              isAnswer: true,
              isCorrect: isCorrect[1],
            },
          ],
          isCorrect: isAllCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isAllCorrect);
    }
  };

  const handleChipButtonClick = (value: boolean, index: number) => {
    const newValue = value === answer[index] ? undefined : value;
    const newAnswer = [...answer];
    newAnswer[index] = newValue;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newAnswer } }));
    changeData(page, 1, index + 1, newValue);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <Box display='flex'>
        <Box height={'400px'} alignContent='center' useFull>
          <List
            data={data}
            row={({ value, index = 1 }) => (
              <BoxWrap justifyContent='space-between' useFull key={index}>
                <Box>
                  <Question size={'small'}>{value?.question}</Question>
                </Box>
                <Box alignContent='center'>
                  <BoxWrap>
                    <ChipButton
                      type='radio'
                      name={`chip-radio`}
                      ariaLabel={index + '번 참'}
                      tabIndex={101 + index}
                      status={EChipButtonType.TRUE}
                      readOnly={isSubmitted}
                      isError={isSubmitted && answer[index - 1] !== solution[index - 1]}
                      isActive={answer[index - 1] === true}
                      isDisabled={isSubmitted}
                      size={'48px'}
                      onClick={() => handleChipButtonClick(true, index - 1)}
                    />
                    <ChipButton
                      type='radio'
                      name={`chip-radio`}
                      ariaLabel={index + '번 거짓'}
                      tabIndex={102 + index}
                      status={EChipButtonType.FALSE}
                      readOnly={isSubmitted}
                      isError={isSubmitted && answer[index - 1] !== solution[index - 1]}
                      isActive={answer[index - 1] === false}
                      isDisabled={isSubmitted}
                      size={'48px'}
                      onClick={() => handleChipButtonClick(false, index - 1)}
                    />
                  </BoxWrap>
                </Box>
              </BoxWrap>
            )}
          />
        </Box>
        <Box padding={'0 20px'} display='flex' flexDirection='column' hAlign='end'>
          <Image src={imgSrc} alt={imgAlt} width='200px' />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='12px'>
            <Typography usePre>{displayAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
