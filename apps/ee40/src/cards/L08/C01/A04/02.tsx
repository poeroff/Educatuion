import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Words',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '찬트를 들으며 단어를 익혀 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L08/C01/A04/EE4-L08-C01-A04-P02.mp4',
        srtFile: '',
        width: 'fit-content',
        height: '394px',
      }}
    />
  );
};

export default P02;
