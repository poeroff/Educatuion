import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Story 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며, 물건을 잃어버렸다가 찾은 친구가 누구인지 확인해 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L10/C01/A05/EE4-L10-C01-A05-P02.mp4',
        // srtFile: '/L10/C01/A05/EE4-L10-C01-A05-P02.srt',
        srtFile:'',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P02;
