import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Story 2', headerPattern: 'text' }}
      questionInfo={{ text: `영상을 보며 학급 게시판에 무슨 활동이 있는지 확인해 봅시다.` }}
      videoInfo={{
        videoSrc: '/L12/C02/A02/EE4-L12-C02-A02-P02.mp4',
        // srtFile:'/L12/C02/A02/EE4-L12-C02-A02-P02.srt',
        srtFile: '',
        height: '336px',
      }}
    />
  );
};

export default P02;
