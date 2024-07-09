import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Class Theater',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 이야기의 줄거리를 확인해 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L10/C04/A02/EE4-L10-C04-A02-P02.mp4',
        srtFile: '/L10/C04/A02/EE4-L10-C04-A02-P02.srt',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P02;
