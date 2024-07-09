import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 2', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보고, 친구들이 무엇을 하고 있는지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L04/C02/A02/EE4-L04-C02-A02-P02.mp4',
        // srtFile: '/L04/C02/A02/EE4-L04-C02-A02-P02.srt',
        srtFile: '',
      }}
    />
  );
};

export default P02;
