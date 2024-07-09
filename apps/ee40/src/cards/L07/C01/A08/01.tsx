import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Culture',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 세계 여러 나라의 지역 축제를 알아 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L07/C01/A08/EE4-L07-C01-A08-P01.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P01;
