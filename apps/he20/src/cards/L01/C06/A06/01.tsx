import { Box, TMainHeaderInfoTypes, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary(4)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A06/HE2-L01-C06-A06-P01.mp3',
    captionSrc: '/L01/C06/A06/HE2-L01-C06-A06-P01.srt',
  };
  const info: IHE01602Info = {
    altText: '사람의 손이 긴 막대기를 잡고 코끼리의 발 쪽으로 그 손은 코끼리 다리로 뻗고 있다. 코끼리는 한 발을 들어 올리고 있다.',
    text: (
      <Box display='flex' flexDirection='column'>
        <Typography>
          This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant. After spending 25 years carrying
          tourists along rough roads, she developed a twisted spine and foot pain. In order to support Jane in taking care of Molly’s foot, we took
          part in positive reinforcement training, which involves using rewards to encourage desirable behaviors. When I gently touched her foot with
          a pole and called out, “foot,” she lifted it. We then rewarded her with a sweet piece of watermelon, her favorite fruit. This training helps
          reduce the stress that animals experience during controlled situations, such as treatment or a health examination. The good news is Molly
          seems to be adapting well, and I expect her to get better soon.
        </Typography>
      </Box>
    ),
    imageSrc: '/L01/C06/A06/HE2-L01-C06-A06-P01.jpg',
    title: ['July 31, Wednesday'],
    imageWidth: '310px',
    imageHeight: '180px',
  };
  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
