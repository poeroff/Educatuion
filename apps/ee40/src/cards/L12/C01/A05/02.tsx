import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 1', headerPattern: 'text' }}
      questionInfo={{ text: `영상을 보며, 올리와 친구들이 무엇에 대해 이야기하고 있는지 확인해 봅시다.` }}
      videoInfo={{
        videoSrc: '/L12/C01/A05/EE4-L12-C01-A05-P02.mp4',
        // =srtFile: '/L12/C01/A05/EE4-L12-C01-A05-P02.srt',
        srtFile: '',
        height: 336,
      }}
    />
  );
};

export default P02;
