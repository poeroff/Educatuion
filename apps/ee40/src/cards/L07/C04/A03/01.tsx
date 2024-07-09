import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Act Out',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '‘시계를 볼 줄 모르는 곰’ 영상을 다시 한번 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L07/C04/A03/EE4-L07-C04-A03-P01.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P01;
