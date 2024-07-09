// Page: EE4-L01-C02-A03-P01

import EEL01C02A03P01, { PageProps } from '@/Pages/EEL01C02A03P01';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Talk and Act',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '영상을 보며 선생님과 루시가 어떤 대화를 나누고 있는지 확인해 봅시다.',
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
  video: '/L01/C02/A04/EE4-L01-C02-A04-P02.mp4',
};

const P01 = () => {
  const { headerInfo, questionInfo, srtFile, video } = pageInfo;

  return <EEL01C02A03P01 headerInfo={headerInfo} questionInfo={questionInfo} srtFile={srtFile} video={video} />;
};

export default P01;
