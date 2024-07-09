import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 1', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며, 수호와 엘라의 기분이 어떤지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L01/C01/A05/EE4-L01-C01-A05-P02.mp4',
        srtFile: '/L01/C01/A05/EE4-L01-C01-A05-P02.srt',
        height: '394px',
      }}
    />
  );
};

export default P02;
