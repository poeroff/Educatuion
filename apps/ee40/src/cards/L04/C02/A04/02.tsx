import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Talk and Act', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며 도서관 사서 선생님과 루시가 어떤 대화를 나누고 있는지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L04/C02/A04/EE4-L04-C02-A04-P02.mp4',
        // srtFile: '/L04/C02/A04/EE4-L04-C02-A04-P02.srt',
        srtFile: '',
        width: 684,
        height: 336,
      }}
    />
  );
};

export default P02;
