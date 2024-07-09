import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (2)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: ' Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance.',
      translation: '소리는 음원에서 발생하는 진동을 통해 생성됩니다. 예를 들어 기타의 현을 연주할 때 처럼 말이죠.',
    },
    {
      originText:
        'The vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when      you throw a stone.',
      translation: '음원의 진동으로 인해 공기가 진동하고 소리가 파동으로 이동합니다. 이는 마치 호수에 돌을 던질 때 생성되는 잔물결과 유사합니다.',
    },
    {
      originText: 'When these sound waves reach our ears, the brain interprets them as sound.',
      translation: '이 음파가 우리 귀에 도달하면 뇌는 이를 소리로 해석합니다.',
    },
    {
      originText:
        'Just as different ripples in water might overlap if you throw two stones, sound waves can also interfere with each other when they meet.',
      translation: '두 개의 돌을 던지면 물 속의 서로 다른 잔물결이 겹칠 수 있는 것처럼 음파도 만나면 서로 간섭할 수 있습니다.',
    },
    {
      originText: 'There are two types of interference: constructive and destructive.',
      translation: '두 가지 간섭이 있습니다. 보강 간섭과 상쇄 간섭입니다.​',
    },
    {
      originText: 'Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a louder sound.',
      translation: '보강 간섭은 두 파동의 정점이 겹칠 때 발생하여 파동이 더 커지고 소리가 커집니다.​',
    },
    {
      originText:
        'Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of another wave, so they cancel each other out and produce a quieter sound, or no sound at all.',
      translation:
        '반면에 상쇄 간섭은 한 파동의 정점이 다른 파동의 계곡과 겹쳐서 서로 상쇄되어 더 조용한 소리를 생성하거나 전혀 소리가 나지 않을 때 발생합니다.​',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
