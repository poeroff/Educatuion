import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { TMainHeaderInfoTypes, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (5)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A07/HE2-L01-C06-A07-P01.mp3',
    captionSrc: '/L01/C06/A07/HE2-L01-C06-A07-P01.srt',
  };

  const HE01602Info: IHE01602Info = {
    altText: '새에게 주사기로 물을 주는 사진. 말풍선 속 글자 So sad!가 적혀 있다.',
    text: (
      <Typography>
        <Typography>
          {`\u00A0 On the last day, we were called to the rescue center due to a sudden emergency. Some dehydrated birds had fallen out of the sky in the city and were brought to the center. Following the veterinarian’s guidance, we provided water to the birds while the vets treated their broken wings and legs and injected them with vitamins for a speedy recovery. It was shocking that this type of accident happens every year since the high temperatures dry up water sources in the city. Caring for the birds, I couldn’t help but reflect on the impact of human activities on climate change and how it harms animals.`}
        </Typography>
        <Typography>
          {`\u00A0 Saying goodbye to the animals and staff, I felt grateful for the opportunity to volunteer. From this experience, I learned the importance of treating animals with respect and care. I also came to realize that humans are just another kind of animal and share the Earth with all other living creatures. To improve animal welfare, I’ll work hard with Care for Animals members. Hopefully, I'll have the chance to volunteer at another sanctuary next summer.`}
        </Typography>
      </Typography>
    ),

    title: ['August 1, Thursday'],
    imageSrc: '/L01/C06/A07/HE2-L01-C06-A07-P01.jpg',
    imageWidth: '250px',
    imageHeight: '200px',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={HE01602Info} />;
};

export default P01;
