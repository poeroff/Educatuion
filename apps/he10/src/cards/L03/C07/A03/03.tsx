import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  Image,
  IQuestionProps,
  Label,
  List,
  PinchZoom,
  Radio,
  Scroll,
  SvgIcon,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import QuestionIconBar from '@maidt-cntn/assets/icons/QuestionIconBar.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03C07A03 } from './store';
import usePageData from '@/hooks/usePageData';

const P03 = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A03);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Match',
  };

  const questionInfo: IQuestionProps = {
    text: 'After read the review, match each review with the appropriate technique below based on the main text.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.answer === cardData.p03.solution ? 'correct' : 'incorrect') : 'none',
  };

  const modalText = [
    {
      heading: '',
      paragraph:
        'Which is the better environment for studying: a noisy place or a quiet place? ' +
        'Rarely do people want to put up with a lot of noise because it can be unpleasant and distracting.' +
        'Fortunately, scientists have invented noise-cancelling technology, which is now being used across various fields to reduce unwanted noise. ' +
        'What is the scientific principle behind this achievement? To understand this, let’s examine how sound travels.',
    },
    {
      heading: 'The Principle of Sound Waves and Interference',
      paragraph:
        'Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. ' +
        'The vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when you throw a stone. ' +
        'When these sound waves reach our ears, the brain interprets them as sound. ' +
        'Just as different ripples in water might overlap if you throw two stones, sound waves can also interfere with each other when they meet. ' +
        'There are two types of interference: constructive and destructive. ' +
        'Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a louder sound. ' +
        'Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of another wave, so they cancel each other out and produce a quieter sound, or no sound at all.',
    },
    {
      heading: 'The Science Behind Noise-Cancelling Headphones',
      paragraph:
        'Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. ' +
        'Inside the headphones are microphones and noise-cancelling circuitry. ' +
        'The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves. ' +
        'For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of –1 and transmit it to the speakers. ' +
        'This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume. ' +
        'However, it is not easy to entirely eliminate external noise with this technology. ' +
        'To achieve full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones. ' +
        'Therefore, this noise-cancellation technology is effective for predictable sounds like those of car engines and subways that occur regularly or over a period of time. ' +
        'However, it’s relatively less effective for inconsistent sounds such as those of people talking close to you.',
    },
    {
      heading: 'Exploring the Technology and Its Applications',
      paragraph:
        'Noise-cancelling technology is not only used in music devices. ' +
        'Other fields also take advantage of this technology, such as ticket offices at tourist attractions which are often very noisy. ' +
        'Microphones are installed in ticket offices to detect external noise, and an opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly. ' +
        'Another area in which this technology is used is drive-through fast-food restaurants and coffee shops. ' +
        'They use noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise. ' +
        'These noise-cancelling headsets help drive-through employees take orders accurately. ' +
        'The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and road noise. ' +
        'Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.',
    },
    {
      heading: '',
      paragraph:
        'As technology advances, many people expect it will solve various social issues caused by noise pollution. ' +
        'A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents. ' +
        'Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.',
    },
  ];

  const data = [
    {
      text: 'The audio system generates waves that cancel out distracting sounds, resulting in a more relaxed driving experience.',
    },
    {
      text: 'Microphones in offices pick up outside noise, and the opposite sound waves are then produced through speakers.',
    },
    {
      text: 'Noise-cancelling headsets eliminate vehicle noise, making it easier to take orders.',
    },
  ];

  const handleRadioClick = (index: number) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: index } }));
    changeData('P03', 1, 1, index);
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      checkAnswerCorrect();
    } else {
      setShowAnswer(!showAnswer);
    }
  };

  const checkAnswerCorrect = () => {
    const isCorrect = cardData.p03.answer === cardData.p03.solution;
    setCardData(prev => ({
      ...prev,
      p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect },
    }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value ?? cardData.p03.answer,
            isSubmitted: isSubmitted,
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
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={cardData.p03.answer === 0}
      submitBtnColor={cardData.p03.answer !== 0 ? (showAnswer ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap display={'block'} useFull>
        <Scroll>
          <Box hAlign={'center'}>
            <Box hAlign={'space-between'} useFull>
              <PinchZoom>
                <Image
                  width={'750px'}
                  height={'73px'}
                  alt='건물 앞 자동차 사진
                       A Drive-Through Employee from Coffee Delights 별 다섯 개 “We don’t put incorrect orders through anymore!”
                       네모 체크 박스'
                  src={'/L03/C07/A03/HE1-L03-C07-A03-P03.jpg'}
                />
              </PinchZoom>
              <Box hAlign='right'>
                <Button
                  minWidth='118px'
                  size={EStyleSizes.SMALL}
                  color={EStyleButtonTypes.SECONDARY}
                  label='지문보기'
                  useRound
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box vAlign='center' marginTop='20px'>
            <SvgIcon src={QuestionIconBar} width='6px' height='18px' />
            <Typography color='#37ACFF'>Techniques Applied</Typography>
          </Box>
          <Box marginTop={'12px'} flexDirection={'column'} useFull>
            <List
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  key={index}
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  onClick={() => handleRadioClick(index)}
                  label={value?.text}
                  value={index === cardData.p03.answer}
                  isError={cardData.p03.isSubmitted && cardData.p03.answer !== cardData.p03.solution}
                  readOnly={cardData.p03.isSubmitted}
                >
                  <Wrap>
                    <Box vAlign='baseline' padding='6px 0' gap='4px'>
                      <Label value={index} />
                      <Typography> {value?.text}</Typography>
                    </Box>
                  </Wrap>
                </Radio>
              )}
            />
          </Box>
        </Scroll>
      </BoxWrap>
      <Dialog
        useHeader
        header={() => {
          return (
            <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
              <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
                Tuning Out:
              </Typography>
              <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
                The Science of Noise-Cancellation
              </Typography>
            </Box>
          );
        }}
        topHeight={50}
        width={921}
        height={500}
        isShow={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        useFooter={true}
        closeLabel='지문 닫기'
        tabIndex={105}
      >
        <Typography>
          {modalText.map((item, index) => (
            <Typography key={index} useGap={false}>
              {item.heading && (
                <Typography useGap={false} weight={'var(--font-weight-extraBold)'} style={{ marginBottom: '20px' }}>
                  {item.heading}
                </Typography>
              )}
              &nbsp;&nbsp;{item.paragraph}
              <br />
              <br />
            </Typography>
          ))}
        </Typography>
      </Dialog>
      <BottomSheet bottomSheetTargetId='targetContainer' height='400px' show={showAnswer && cardData.p03.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box>
            <Typography>{cardData.p03.solution}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const Wrap = styled.div`
  display: flex;
  gap: 12px;
`;
