import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Culture', headerPattern: 'text' }}
      questionInfo={{ text: `영상을 보며 세계의 자전거 친화 정책을 알아 봅시다.` }}
      videoInfo={{
        videoSrc: '/L12/C01/A08/EE4-L12-C01-A08-P01.mp4',
        // srtFile:'/L12/C01/A08/EE4-L12-C01-A08-P01.srt',
        srtFile: '',
      }}
    />
  );
};

export default P01;
