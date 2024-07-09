import EEL01C02A03P01, { PageProps } from '@/Pages/EEL01C02A03P01';

const pageInfo: PageProps = {
  headerInfo: {
    headerText: 'Story Song',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '노래를 따라 부르며 익혀 봅시다.',
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
  video: '/L02/C02/A03/E4-L02-C02-A03-P01.mp4',
};

const P01 = () => {
  const { headerInfo, questionInfo, srtFile, video } = pageInfo;

  return <EEL01C02A03P01 headerInfo={headerInfo} questionInfo={questionInfo} srtFile={srtFile} video={video} />;
};

export default P01;
