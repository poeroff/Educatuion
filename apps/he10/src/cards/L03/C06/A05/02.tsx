import { useEffect, useRef, useState } from 'react';
import {
  Box,
  BoxWrap,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Button,
  EStyleSizes,
  Dialog,
  List,
  Question,
  ChipButton,
  EChipButtonType,
  IQuestionProps,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L03C06A05 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Tuning Out: The Science of Noise-Cancellation (3)',
};

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        Tuning Out: The Science of Noise-Cancellation (3)
      </Typography>
    </Box>
  );
};

const P02 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A05);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    text: 'Q3. Is it true (T) or false (F)?',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const openModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);

    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const modalText =
    'Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are microphones and noise-cancelling circuitry. The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves. For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of -1 and transmit it to the speakers. This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume. However, it is not easy to entirely eliminate external noise with this technology. To achieve full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones. Therefore, this noise-cancellation technology is effective for predictable sounds like those of car engines and subways that occur regularly or over a period of time. However, it’s relatively less effective for inconsistent sounds such as those of people talking close to you.';

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
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.data[0].userAnswer === cardData.p02.solution[0];
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p02.data[0].userAnswer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleChange = (newAnswer: boolean | undefined, index: number) => {
    if (index === 1) {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          data: [
            {
              ...prev.p02.data[0],
              userAnswer: newAnswer,
            },
            ...prev.p02.data.slice(1),
          ],
        },
      }));
    }
    changeData('P02', 1, index, newAnswer);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            data: [
              {
                ...prev.p02.data[0],
                userAnswer:
                  userSubmissionList[0].inputData[0]?.value !== undefined
                    ? userSubmissionList[0].inputData[0]?.value
                    : cardData.p02.data[0].userAnswer,
              },
            ],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onGrade}
      submitDisabled={!(cardData.p02.data[0].userAnswer !== undefined)}
      submitBtnColor={
        !(cardData.p02.data[0].userAnswer !== undefined) ? EStyleButtonTypes.SECONDARY : !isShow ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.GRAY
      }
      vAlign='flex-start'
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button tabIndex={101} label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>
      <List data={cardData.p02.data}>
        {({ value, index = 1 }) => (
          <BoxWrap justifyContent='space-between' useFull>
            <Box>
              <Question size={'small'}>{value?.contents}</Question>
            </Box>
            <Box>
              <BoxWrap>
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 참 버튼'}
                  status={EChipButtonType.TRUE}
                  isActive={value?.userAnswer === true}
                  isError={
                    cardData.p02.isSubmitted && value?.userAnswer === true
                      ? value?.userAnswer === cardData.p02.solution[index - 1]
                        ? false
                        : true
                      : false
                  }
                  size={'48px'}
                  readOnly={cardData.p02.isSubmitted}
                  onClick={() => handleChange(true, index)}
                />
                <ChipButton
                  type='radio'
                  name={`chip-radio-${index}`}
                  ariaLabel={index + '번 보기 거짓 버튼'}
                  status={EChipButtonType.FALSE}
                  isActive={value?.userAnswer === false}
                  isError={
                    cardData.p02.isSubmitted && value?.userAnswer === false
                      ? value?.userAnswer === cardData.p02.solution[index - 1]
                        ? false
                        : true
                      : false
                  }
                  size={'48px'}
                  readOnly={cardData.p02.isSubmitted}
                  onClick={() => handleChange(false, index)}
                />
              </BoxWrap>
            </Box>
          </BoxWrap>
        )}
      </List>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow} marginTop={48}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{`False`}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        useHeader
        header={DialogHeader}
        topHeight={50}
        width={921}
        height={500}
        isShow={isShowModal}
        onClose={closeModal}
        useFooter={true}
        closeLabel='지문 닫기'
        tabIndex={101}
        tabIndexCount={3}
      >
        <Typography>
          <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
            {modalText}
          </Typography>
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P02;
