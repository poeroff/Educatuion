import { Typography } from '@maidt-cntn/ui';
import HE2L03C05A03, { IData } from './HE2-L03-C05-A03';
import { TL03C05A03Keys } from './store';

const P06 = () => {
  const pageKey: TL03C05A03Keys = 'p06';

  const sentence = (
    <>
      The teacher used new&nbsp;
      <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'>
        {'\u00A0'}
      </Typography>
      &nbsp;methods, like virtual reality,{''}
      to make learning fun for students.
    </>
  );

  const data: IData[] = [
    { word: 'distorted', meaning: 'changed in a way that makes things look different from how they originally were' },
    { word: 'innovative', meaning: "generating new and creative ideas or ways of doing things that haven't been done before" },
    { word: 'renowned', meaning: 'widely known for a particular quality, achievement, or skill' },
  ];

  return <HE2L03C05A03 sentence={sentence} data={data} pageKey={pageKey} />;
};

export default P06;
