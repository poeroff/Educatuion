import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Box, BoxWrap, IAudioPlayerProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  interface IListenAndAnswer {
    label: string;
    labelColor: string;
    text: string;
  }

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (3)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A06/ME1-L01-C06-A06-P01.mp3',
    captionSrc: '/L01/C06/A06/ME1-L01-C06-A06-P01.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'Mrs.Seo',
      labelColor: 'var(--color-green-500)',
      text: 'Now, what do you want in your school survival kit?',
    },
    {
      label: 'Somin',
      labelColor: 'var(--color-purple-400)',
      text: 'A mirror! I look in the mirror and say, “Just be you!”',
    },
    {
      label: 'Jiwon',
      labelColor: 'var(--color-red-500)',
      text: 'For me, a stress ball. I hold the ball tightly. Then my stress goes away.',
    },
    {
      label: 'Mike',
      labelColor: 'var(--color-blue-800)',
      text: 'An eraser! It erases my mistakes. I start all over again!',
    },
    {
      label: 'Emily',
      labelColor: 'var(--color-purple-900)',
      text: `I need a Band-Aid! My feelings get hurt sometimes. But with the Band-Aid, I'm okay.`,
    },
    {
      label: 'Mrs.Seo',
      labelColor: 'var(--color-green-500)',
      text: `Great! Now make your own survival kit. Let's have a great year!`,
    },
  ];

  const dialog = (
    <List<IListenAndAnswer>
      data={data}
      row={({ value }) => (
        <BoxWrap boxGap={0}>
          <Box color={value?.labelColor} height='fit-content'>
            <Typography useGap={true} weight='var(--font-weight-bold)'>
              {value?.label || ``}
            </Typography>
          </Box>
          <Box>
            <Typography useGap={true}>{value?.text}</Typography>
          </Box>
        </BoxWrap>
      )}
    />
  );

  const info: IHE01602Info = {
    altText: '테이블 위에 상자가 놓여 있다. 학생 다섯 명과 여자 선생님은 상자가 놓여 있는 테이블 앞에 모여 있다.',
    text: dialog,
    imageSrc: '/L01/C06/A06/ME1-L01-C06-A06-P01.jpg',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};

export default P01;
