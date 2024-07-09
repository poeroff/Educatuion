// Page: EE4-L01-C02-A03-P01

import EEL01C02A03P01, { PageProps } from '@/Pages/EEL01C02A03P01';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '영상을 보며 수아와 윌이 어떤 대화를 나누고 있는지 확인해 봅시다.',
  },
  srtFile: `
    1
    00:00:00,000 --> 00:00:02,500
    Welcome to the Example Subtitle File!

    2
    00:00:03,000 --> 00:00:06,000
    This is a demonstration of SRT subtitles.

    3
    00:00:07,000 --> 00:00:10,500
    You can use SRT files to add subtitles to your videos
  `,
  video: '/L01/C02/A04/EE4-L01-C02-A04-P06.mp4',
};

const P06 = () => {
  return <EEL01C02A03P01 {...pageInfo} />;
};

export default P06;
