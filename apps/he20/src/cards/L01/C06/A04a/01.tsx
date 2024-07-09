import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (2)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A04a/HE2-L01-C06-A04-P01.mp3',
    captionSrc: '/L01/C06/A04a/HE2-L01-C06-A04-P01.srt',
  };

  const info: IHE01602Info = {
    title: ['July 29, Monday'],
    text: 'Our club arrived at the Free Animals sanctuary. Jane, the staff member in charge of animal care, welcomed us with a big smile and gave us a tour of the facility. It was amazing to see bears and elephants moving freely in a large field. Our tasks for the day included cleaning the shelter and preparing food for the animals. While cleaning the habitats, we checked if there were any hazards that could harm the animals. Then, we helped prepare the food by cutting up fruits and vegetables and dividing them into several large baskets. For old elephants with weak teeth, we chopped bananas instead of the sugarcane that they usually eat. Spending the whole day helping out with the animals was an incredible experience for me. It was a rewarding experience, and I was impressed with the attention the staff members gave to all the animals.',
    imageSrc: '/L01/C06/A04a/HE2-L01-C06-A04-P01.jpg',
    altText: '벽을 청소하고 있는 여성의 모습과 과일을 손질하고 있는 사람들 모습의 사진',
    imageHeight: '230px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
