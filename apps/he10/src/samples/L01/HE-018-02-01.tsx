import React from 'react';
import { useEffect, useState } from 'react';
import {
  BottomSheet,
  BoxWrap,
  Dialog,
  Dropdown,
  EStyleFontSizes,
  Image,
  PinchZoom,
  Scroll,
  SvgIcon,
  Typography,
  Box,
  Button,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

import arrow_right from '@/assets/icon/arrow_right_gray.svg';

const textContentA02 = {
  title: `Tuning Out: The Science of Noise-Cancellation`,
  content: `Which is the better environment for studying: a noisy place or a quiet place? Rarely do people want to put up with a lot of noise because it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used across various fields to reduce unwanted noise. What is the scientific principle behind this achievement? To understand this, let’s examine how sound travels.
    The Principle of Sound Waves and Interference
    Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. The vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when you throw a stone. When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water might overlap if you throw two stones, sound waves can also interfere with each other when they meet. There are two types of interference: constructive and destructive. Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a louder sound. Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of another wave, so they cancel each other out and produce a quieter sound, or no sound at all.
    The Science Behind Noise-Cancelling Headphones
    Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are microphones and noise-cancelling circuitry. The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves. For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of –1 and transmit it to the speakers. This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume. However, it is not easy to entirely eliminate external noise with this technology. To achieve full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones. Therefore, this noise-cancellation technology is effective for predictable sounds like those of car engines and subways that occur regularly or over a period of time. However, it’s relatively less effective for inconsistent sounds such as those of people talking close to you.
    Exploring the Technology and Its Applications
    Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as ticket offices at tourist attractions which are often very noisy. Microphones are installed in ticket offices to detect external noise, and an opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly. Another area in which this technology is used is drive-through fast-food restaurants and coffee shops. They use noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise. These noise-cancelling headsets help drive-through employees take orders accurately. The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and road noise. Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.
    As technology advances, many people expect it will solve various social issues caused by noise pollution. A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents. Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.`,
  subTitleIndexes: new Set([1, 3, 5]),
};

const imgContentA02P01 = {
  imgSrc: `/HE1-L01-C07-A02-P01.jpg`,
  imgAlt: `글의 구조가 보이는 인포그래픽 Topic: The Importance of Friendliness Examples : Dogs vs. Wolves Chimpanzees vs. Bonobos Neanderthals vs. Homo Sapiens Differences: Finding a Cup with Hidden Food Pulling a Rope Together to Get Food on a Board Size of Social Groups Conclusion : Friendliness can be the key to survival and 8)`,
};

const HE0180201 = () => {
  const { title, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P01;

  const dropArr1: string[] = ['adapted', 'communicative', 'cooperative', 'exchanging'];
  const dropArr2: string[] = ['adapted', 'communicative', 'cooperative', 'exchanging'];
  const dropAnswer: string[] = ['adapted', 'cooperative'];

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitCompleted, setSubmitCompleted] = useState(false); // submitDisabled과 반대 관계가 아님
  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Fill in the blanks to summarize the main text.',
    mark: submitCompleted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  const handleSubmit = () => {
    if (!submitCompleted) {
      // 채점하기
      const isCorrect = answer.every((a, idx) => a === dropAnswer[idx]);

      if (isCorrect) {
        setIsCorrect(true);
      }
      setSubmitCompleted(true);
    } else {
      // 답안보기
      setShowAnswer(!showAnswer);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));

    const newAnswer = [...answer];
    if (value !== undefined) newAnswer[index - 1] = value;
    setAnswer(newAnswer);
  };

  useEffect(() => {
    const allAnswered = answer.filter(a => a !== undefined && a !== '').length === dropAnswer.length;
    if (allAnswered) {
      setSubmitDisabled(!allAnswered);
    }
  }, [answer, dropAnswer.length]);

  const getSubmitBtnColor = () => {
    if (!submitCompleted && submitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (!submitCompleted && !submitDisabled) {
      return EStyleButtonTypes.PRIMARY;
    } else if (submitCompleted && !showAnswer) {
      return EStyleButtonTypes.PRIMARY;
    } else if (submitCompleted && showAnswer) {
      return EStyleButtonTypes.DEFAULT;
    }
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getSubmitBtnColor()}
      submitLabel={submitCompleted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={submitDisabled}
      useExtend
    >
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>

      <BoxWrap>
        <Box vAlign='center' flex='1'>
          <PinchZoom>
            <Image src={imgSrc} width='460px' height='240px' />
            <Box type='hidden'>{imgAlt}</Box>
          </PinchZoom>
        </Box>
        <Box width='490px' height='342px'>
          <Scroll tabIndex={0}>
            <Typography weight='var(--font-weight-bold)'>Dogs</Typography>
            <Typography>easily found the cup by following the human's pointing gestures</Typography>
            <Box marginTop='20px'>
              <Typography weight='var(--font-weight-bold)'>Wolves</Typography>
            </Box>
            <Typography>chose cups randomly,</Typography>
            <Box vAlign='center' padding='0 12px'>
              <Box padding='4px 6px'>
                <Typography useGap={false}>(1)</Typography>
              </Box>
              <Dropdown width='264px' dropdownList={dropArr1} isOpen={openDropdown[0]} onClick={value => handleDropdownClick(1, value)} />
            </Box>
            <Typography>the human’s gestures.</Typography>
            <Box vAlign='center' marginTop='20px' marginLeft='12px'>
              <SvgIcon src={arrow_right} size='24px' />
              <Typography>dogs' (2)</Typography>
              <Dropdown width='264px' dropdownList={dropArr2} isOpen={openDropdown[1]} onClick={value => handleDropdownClick(2, value)} />
            </Box>
            <Typography>skills with humans and friendly nature may have helped them survive better than wolves.</Typography>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight='var(--font-weight-bold)' size={EStyleFontSizes.MEDIUM}>
              {title}
            </Typography>
          </Box>
        )}
        isShow={isMainTextOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        {content.split('\n').map((paragraph, index, arr) => (
          <React.Fragment key={index}>
            <Typography useGap={false} weight={!subTitleIndexes.has(index) ? 'normal' : 'semi-bold'} size={EStyleFontSizes.MEDIUM}>
              {paragraph}
            </Typography>
            <br />
            {index !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Dialog>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'40%'}
        show={showAnswer}
        closeOption={{ useYn: true, onClose: () => setShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>
              {dropAnswer.map((elem, idx) => (
                <React.Fragment key={idx}>
                  ({idx + 1}) {elem}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;

export default HE0180201;
