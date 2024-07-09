import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Culture', headerPattern: 'text' }}
      questionInfo={{ text: `영상을 보며 재활용품을 새로 탄생시키는 ‘업사이클링'에 대해 알아 봅시다.` }}
      videoInfo={{
        videoSrc: '/L09/C02/A07/EE4-L09-C02-A07-P01.mp4',
        // srtFile: '/L09/C02/A07/EE4-L09-C02-A07-P01.srt',
        srtFile: '',
        height: 336,
      }}
    />
  );
};

export default P01;
