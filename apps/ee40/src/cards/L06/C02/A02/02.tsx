import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 2', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보고, 카밀라가 무엇을 하고 있는지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L06/C02/A02/EE4-L06-C02-A02-P02.mp4',
        // srtFile: '/L06/C02/A02/EE4-L06-C02-A02-P02.srt',
        srtFile: '',
        width: 'fit-content',
        height: '394px',
      }}
    />
  );
};

export default P02;
