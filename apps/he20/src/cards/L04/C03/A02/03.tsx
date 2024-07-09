import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  Box,
  TMainHeaderInfoTypes,
  ChipButton,
  EChipButtonType,
  List,
  BoxWrap,
  EStyleButtonTypes,
  IAudioPlayerProps,
  BottomSheet,
  Typography,
  Question,
  IQuestionProps,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L04C03A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02);
  const { userId } = useRecoilValue(studentAtom);

  const [show, setShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: false,
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Check T (true) or F (false) according to the talk.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleChange = (newAnswer: boolean, index: number) => {
    if (index === 1) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          data: [
            {
              ...prev.p03.data[0],
              value: newAnswer === prev.p03.data[0].value ? undefined : newAnswer,
            },
            ...prev.p03.data.slice(1),
          ],
        },
      }));
    } else if (index === 2) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          data: [
            ...prev.p03.data.slice(0, 1),
            {
              ...prev.p03.data[1],
              value: newAnswer === prev.p03.data[1].value ? undefined : newAnswer,
            },
            ...prev.p03.data.slice(2),
          ],
        },
      }));
    } else if (index === 3) {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          data: [
            ...prev.p03.data.slice(0, 2),
            {
              ...prev.p03.data[2],
              value: newAnswer === prev.p03.data[2].value ? undefined : newAnswer,
            },
            ...prev.p03.data.slice(3),
          ],
        },
      }));
    }
    changeData('P03', 1, index, newAnswer);
  };

  const onGrade = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!show);
    } else {
      const isCorrect1 = cardData.p03.data[0].value === cardData.p03.solution[0];
      const isCorrect2 = cardData.p03.data[1].value === cardData.p03.solution[1];
      const isCorrect3 = cardData.p03.data[2].value === cardData.p03.solution[2];
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p03.data[0].value,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.p03.data[1].value,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.p03.data[2].value,
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
            data: [
              {
                ...prev.p03.data[0],
                value:
                  userSubmissionList[0].inputData[0]?.value !== undefined ? userSubmissionList[0].inputData[0]?.value : cardData.p03.data[0].value,
              },
              {
                ...prev.p03.data[1],
                value:
                  userSubmissionList[0].inputData[1]?.value !== undefined ? userSubmissionList[0].inputData[1]?.value : cardData.p03.data[1].value,
              },
              {
                ...prev.p03.data[2],
                value:
                  userSubmissionList[0].inputData[2]?.value !== undefined ? userSubmissionList[0].inputData[2]?.value : cardData.p03.data[2].value,
              },
            ],
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

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE2-L04-C03-A02-02.mp3',
    captionSrc: '/L04/C03/A02/HE2-L04-C03-A02-02.srt',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (show ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={cardData.p03.data?.some(val => val?.value === undefined) ? true : false}
      submitBtnColor={
        cardData.p03.data?.some(val => val?.value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : show
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
    >
      <List data={cardData.p03.data}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull>
            <Box>
              <Question type={'text'} size={'small'}>
                {value?.contents}
              </Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 참'}
                  status={EChipButtonType.TRUE}
                  isActive={value?.value === true}
                  isError={cardData.p03.isSubmitted && value?.value !== value?.answer}
                  size={'48px'}
                  onClick={() => handleChange(true, index)}
                  readOnly={cardData.p03.isSubmitted}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 거짓'}
                  status={EChipButtonType.FALSE}
                  isActive={value?.value === false}
                  isError={cardData.p03.isSubmitted && value?.value !== value?.answer}
                  size={'48px'}
                  onClick={() => handleChange(false, index)}
                  readOnly={cardData.p03.isSubmitted}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={show}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{`(1) F (2) T (3) F`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
