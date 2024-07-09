import HE01603 from '@maidt-cntn/pages/HE-016-03';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

interface IHE01603Info {
  id: string;
  altText?: string[];
  textTitle?: string;
  text: string[];
  imageSrc?: string[];
  imagePosition: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Tuning Out: The Science of Noise-Cancellation (전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A02/HE1-L03-C06-A02.mp3',
    captionSrc: '/L03/C06/A02/HE1-L03-C06-A02.srt',
  };

  const title = 'Tuning Out: The Science of Noise-Cancellation';

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: ['비행기에 앉아있는 사람이 노이즈 캔슬링 헤드폰을 끼고 핸드폰을 보며 웃고 있다.'],
      text: [
        '\nWhich is the better environment for studying: a noisy place or a quiet place? Rarely do people want to put up with a lot of noise because it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used across various fields to reduce unwanted noise. What is the scientific principle behind this achievement? To understand this, let’s examine how sound travels.',
      ],
      imageSrc: ['/L03/C06/A02/HE1-L03-C06-A02-01.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P2',
      altText: [
        'Constructive Interference와 Destructive Interference가 각각 어떻게 작용하는지를 설명해주는 그림이다. 이미지 제목: Constructive Interference, Destructive Interference 슬라이드 텍스트 Wave 1 Peak Wave 2 Peak Wave 1 Peak Wave 2',
        '음원에서 사람의 귀까지 소리가 전달되는 과정을 표현하는 그림이다.',
      ],
      textTitle: '\nThe Principle of Sound Waves and Interference\n',
      text: [
        'Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. The vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when you throw a stone. When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water might overlap if you throw two stones, sound waves can also interfere with each other when they meet. There are two types of interference: constructive and destructive. Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a louder sound. Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of another wave, so they cancel each other out and produce a quieter sound, or no sound at all.',
      ],
      imageSrc: ['/L03/C06/A02/HE1-L03-C06-A02-03.jpg', '/L03/C06/A02/HE1-L03-C06-A02-02.jpg'],
      imagePosition: 'both',
    },
    {
      id: 'P3',
      altText: [
        '노이즈캔슬링 헤드폰의 작동 원리를 설명하는 그림이다. 슬라이드 텍스트 Noise Microphone Noise-Cancelling Circuitry Speaker Reduced Noise Level',
      ],
      textTitle: '\nThe Science Behind Noise-Cancelling Headphones\n',
      text: [
        'Destructive interference is used in the noise-cancelling feature of headphones when we listen to music. Inside the headphones are microphones and noise-cancelling circuitry. The microphones pick up sounds from the outside, and the circuitry analyzes them to produce opposite sound waves. For example, if outside noise has a value of +1, the circuitry will generate an opposite noise of –1 and transmit it to the speakers. This cancels out the unwanted sound even in noisy surroundings, so you can hear the music sound clearly without turning up the volume. However, it is not easy to entirely eliminate external noise with this technology. To achieve full noise cancellation, the circuitry must convert the noise into digital data and instantly transmit the opposite sound to the speakers as soon as the noise reaches the microphones. Therefore, this noise-cancellation technology is effective for predictable sounds like those of car engines and subways that occur regularly or over a period of time. However, it’s relatively less effective for inconsistent sounds such as those of people talking close to you.',
      ],
      imageSrc: ['/L03/C06/A02/HE1-L03-C06-A02-04.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P4',
      altText: ['관광객 매표소, 드라이브 스루 음식점 등 노이즈 캔슬링 기술이 사용되는 예시들을 보여주는 사진이다.'],
      textTitle: '\nExploring the Technology and Its Applications\n',
      text: [
        'Noise-cancelling technology is not only used in music devices. Other fields also take advantage of this technology, such as ticket offices at tourist attractions which are often very noisy. Microphones are installed in ticket offices to detect external noise, and an opposite sound wave is generated and transmitted through a speaker, enabling the ticket agent to hear the customer’s voice clearly. Another area in which this technology is used is drive-through fast-food restaurants and coffee shops. They use noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise. These noise-cancelling headsets help drive-through employees take orders accurately. The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and road noise. Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.',
      ],
      imageSrc: ['/L03/C06/A02/HE1-L03-C06-A02-05.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P5',
      altText: ['윗층에서 6명의 사람이 축포를 터뜨리며 신나게 파티를 즐기고 있다.', '아래층의 두 사람이 괴로운 표정을 하며 귀를 막고 있다.'],
      text: [
        '\nAs technology advances, many people expect it will solve various social issues caused by noise pollution. A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents. Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.',
      ],
      imageSrc: ['/L03/C06/A02/HE1-L03-C06-A02-06.jpg', '/L03/C06/A02/HE1-L03-C06-A02-07.jpg'],
      imagePosition: 'doubleAfter',
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={title} info={HE01603Info} />;
};

export default P02;
