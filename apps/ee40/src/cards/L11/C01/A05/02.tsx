import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Story 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며, 친구들이 함께 간 축제의 이름과 그 축제에서 무엇을 했는지 확인해 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L11/C01/A05/EE4-L11-C01-A05-P02.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P02;
