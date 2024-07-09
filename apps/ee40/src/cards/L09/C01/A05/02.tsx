import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 1', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며, 어떤 일이 일어났는지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L09/C01/A05/EE4-L09-C01-A05-P02.mp4',
        // srtFile: '/L09/C01/A05/EE4-L09-C01-A05-P02.srt',
        srtFile: '',
      }}
    />
  );
};

export default P02;
