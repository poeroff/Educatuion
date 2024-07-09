import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 1', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며, 럭키와 카밀라가 친구들에게 어떤 영상을 소개하고 있는지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L03/C01/A05/EE4-L03-C01-A05-P02.mp4',
        // srtFile: '/L03/C01/A05/EE4-L03-C01-A05-P02.srt',
        srtFile: '',
      }}
    />
  );
};

export default P02;
