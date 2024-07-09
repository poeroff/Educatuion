import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  EImageType,
  EStyleButtonTypes,
  Image,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  EStyleSizes,
  PinchZoom,
} from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState } from 'recoil';
import { L03C07A02a } from './store';

export const Paragraph = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
  return (
    <Dialog
      topHeight={50}
      width={893}
      height={458}
      isShow={isOpen}
      onClose={handleClose}
      useFooter={true}
      useHeader
      header={() => {
        return (
          <Box background={'var(--color-grey-100)'} marginBottom='20px' useRound>
            <Typography weight={'var(--font-weight-bold)'}>Tuning Out: The Science of Noise-Cancellation</Typography>
          </Box>
        );
      }}
      closeLabel={'지문 닫기'}
      tabIndex={101}
    >
      <Box lineHeight={'40px'}>
        <div>
          <Typography>
            Which is the better environment for studying: a noisy place or a quiet place? Rarely do people want to put up with a lot of noise because
            it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used across
            various fields to reduce unwanted noise. What is the scientific principle behind this achievement? To understand this, let’s examine how
            sound travels.
          </Typography>
          <br />
          <br />
          <Typography weight={'var(--font-weight-bold)'}>The Principle of Sound Waves and Interference</Typography>
          <Typography>
            Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. The vibrations
            of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when you throw a
            stone. When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water might overlap if you
            throw two stones, sound waves can also interfere with each other when they meet. There are two types of interference: constructive and
            destructive. Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a louder sound.
            Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of another wave, so they cancel each
            other out and produce a quieter sound, or no sound at all.
          </Typography>
          <br />
          <br />
          <Typography weight={'var(--font-weight-bold)'}>The Science Behind Noise-Cancelling Headphones</Typography>
          <Typography>
            Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are
            microphones and noise-cancelling circuitry. The microphones pick up sounds from the outside, and the circuitry analyzes them to produce
            opposite sound waves. For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of –1 and transmit it
            to the speakers. This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning
            up the volume. However, it is not easy to entirely eliminate external noise with this technology. To achieve full noise cancellation, the
            circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches
            the microphones. Therefore, this noise-cancellation technology is effective for predictable sounds like those of car engines and subways
            that occur regularly or over a period of time. However, it’s relatively less effective for inconsistent sounds such as those of people
            talking close to you.
          </Typography>
          <br />
          <br />
          <Typography weight={'var(--font-weight-bold)'}>Exploring the Technology and Its Applications</Typography>
          <Typography>
            Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as ticket offices
            at tourist attractions which are often very noisy. Microphones are installed in ticket offices to detect external noise, and an opposite
            sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly. Another area in
            which this technology is used is drive-through fast-food restaurants and coffee shops. They use noise-cancelling headsets to improve
            communication between employees and customers by eliminating vehicle noise. These noise-cancelling headsets help drive-through employees
            take orders accurately. The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such
            as engine, wind, and road noise. Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being
            disturbed by distracting noises.
          </Typography>
          <br />
          <br />
          <Typography>
            As technology advances, many people expect it will solve various social issues caused by noise pollution. A common source of these
            problems is noisy neighbors, as the noise they make can lead to conflict among residents. Noise-cancellation technology can help address
            these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.
          </Typography>
        </div>
      </Box>
    </Dialog>
  );
};

const P01 = () => {
  const [cardData] = useRecoilState(L03C07A02a);

  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarizing the main text.',
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: cardData.headerText,
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <Box hAlign='right'>
        <Button
          minWidth='96px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          ariaLabel='지문보기'
          onClick={handleButtonClick}
          useRound
        />
      </Box>

      <Box hAlign='center'>
        <PinchZoom pinchType={'image'}>
          <Image type={EImageType.IMG} src={'/L03/C07/A02/HE1-L03-C07-A02a-P01.jpg'} width={'320px'} height='377px' ariaDescribedby='img_desc' />
          <Box type='hidden' id='img_desc'>
            <p>글의 구조가 보이는 인포그래픽</p>
            <p>제목 How Noise-Cancellation Works</p>
            <p>소제목1 Scientific Principle</p>
            <p>내용1 Constructive Interference와 3 D 빈칸 Interference에 대한 문장</p>
            <p>아래로 이어지는 화살표</p>
            <p>소제목2 Noise-Cancelling Headphones</p>
            <p>내용2 첫 번째 칸 Microphones에 관한 문장</p>
            <p>두 번째 칸 Noise-Cancelling Circuitry에 관한 문장</p>
            <p>세 번째 칸 Speakers에 관한 문장</p>
            <p>아래로 이어지는 화살표</p>
            <p>소제목3 Effect</p>
            <p>내용3 The outside noise is effectively reduced, allowing you to hear the music clearly.</p>
            <p>아래로 이어지는 화살표</p>
            <p>소제목4 Limitation</p>
            <p>내용4 More Effective for 와 Less Effective for에 관한 문장</p>
          </Box>
        </PinchZoom>
      </Box>

      <Paragraph isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </Container>
  );
};

export default P01;
