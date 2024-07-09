import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 1', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며, 수호가 누구를 만났는지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L02/C01/A05/EE4-L02-C01-A05-P02.mp4',
        // srtFile: '/L02/C01/A05/EE4-L02-C01-A05-P02.srt',
        srtFile: '',
      }}
    />
  );
};

export default P02;
