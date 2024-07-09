import {
  Image,
  Box,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  TMainHeaderInfoTypes,
  PinchZoom,
  Dialog,
  Typography,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P01 = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Match',
  };
  const questionInfo = {
    text: 'After read the review, match each review with the appropriate technique below based on the main text.',
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

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} position={'relative'} height={'100vh'}>
        <Box position={'absolute'} left={'50%'} transform={'translateX(-50%)'}>
          <PinchZoom>
            <Image height='350px' alt='' src={'/L03/C07/A03/HE1-L03-C07-A03-P01.jpg'} ariaDescribedby={'img_desc'} />
            <Box type={'hidden'} id={'img_desc'}>
              <p>웹사이트 SOUND TECH</p>
              <p>사이트 메뉴 Home, About Us, Our Solutions, Sales & Support, Help</p>
              <p>Our Solutions 페이지</p>
              <p>We provide high quality noise-cancellation solutions for companies.</p>
              <p>Explore our customers’ feedback and consider using our solutions for your business.</p>
              <p>Top Reviews</p>
              <p>티켓 사진</p>
              <p>A Ticket Office Agent from Heritage National Park 별 다섯 개</p>
              <p>“I can hear the customers’ voices clearly and communicate with them easily.”</p>
              <p>Technique 네모 체크 박스</p>
              <p>건물 앞 자동차 사진</p>
              <p>A Drive-Through Employee from Coeffe Delights 별 다섯 개</p>
              <p>“We don’t put incorrect orders through anymore!”</p>
              <p>Technique 네모 체크 박스</p>
              <p>버스 사진</p>
              <p>A Tour Bus Driver from Sunshine Tours 별 다섯 개</p>
              <p>“Driving is a peaceful and quiet experience for me now.”</p>
              <p>Technique 네모 체크 박스</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box position={'absolute'} top={'0'} right={'0'}>
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
      {/* 지문 모달 */}
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
        tabIndex={102}
      >
        <Typography>
          {modalText.map((item, index) => (
            <Typography useGap={false} key={index}>
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
        {/* </Scroll> */}
      </Dialog>
    </Container>
  );
};

export default P01;
