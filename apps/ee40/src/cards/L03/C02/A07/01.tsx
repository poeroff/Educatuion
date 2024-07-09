import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Culture', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며 여러 나라의 반려동물 보호법을 알아 봅시다.' }}
      videoInfo={{
        videoSrc: '/L03/C02/A07/EE4-L03-C02-A07-P01.mp4',
        // srtFile: '/L03/C02/A07/EE4-L03-C02-A07-P01.srt',
        srtFile: '',
      }}
    />
  );
};

export default P01;
