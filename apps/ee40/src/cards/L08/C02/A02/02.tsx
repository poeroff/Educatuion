import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Story 2',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보고, 엘라와 앤디는 무엇을 사려고 하는지 확인해 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L08/C02/A02/EE4-L08-C02-A02-P02.mp4',
        srtFile: '',
        width: '684px',
        height: '394px',
      }}
    />
  );
};

export default P02;
