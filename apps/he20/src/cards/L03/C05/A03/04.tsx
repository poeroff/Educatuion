import { Typography } from '@maidt-cntn/ui';
import HE2L03C05A03, { IData } from './HE2-L03-C05-A03';
import { TL03C05A03Keys } from './store';

const P04 = () => {
  const pageKey: TL03C05A03Keys = 'p04';

  const sentence = (
    <>
      Her&nbsp;
      <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'>
        {'\u00A0'}
      </Typography>
      &nbsp;perspective about the issue{''}
      had a negative influence on her group.
    </>
  );

  const data: IData[] = [
    { word: 'distorted', meaning: 'changed in a way that makes things look different from how they originally were' },
    { word: 'innovative', meaning: "generating new and creative ideas or ways of doing things that haven't been done before" },
    { word: 'renowned', meaning: 'widely known for a particular quality, achievement, or skill' },
  ];

  return <HE2L03C05A03 sentence={sentence} data={data} pageKey={pageKey} />;
};

export default P04;
