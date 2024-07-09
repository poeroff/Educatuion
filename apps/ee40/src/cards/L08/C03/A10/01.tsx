import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Culture',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 집 앞의 벼룩시장 ‘야드 세일’에 대해 알아 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L08/C03/A10/EE4-L08-C03-A10-P01.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P01;
