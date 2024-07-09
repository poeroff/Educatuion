import { Typography } from '@maidt-cntn/ui';
import HE2L03C05A03, { IData } from './HE2-L03-C05-A03';
import { TL03C05A03Keys } from './store';

const P01 = () => {
  const pageKey: TL03C05A03Keys = 'p01';

  const sentence = (
    <>
      Rome is&nbsp;
      <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'>
        {'\u00A0'}
      </Typography>
      &nbsp;for its historic architecture and rich cultural heritage.
    </>
  );

  const data: IData[] = [
    { word: 'distorted', meaning: 'changed in a way that makes things look different from how they originally were' },
    { word: 'conventional', meaning: 'following commonly accepted standards or traditional customs' },
    { word: 'renowned', meaning: 'widely known for a particular quality, achievement, or skill' },
  ];

  return <HE2L03C05A03 sentence={sentence} data={data} pageKey={pageKey} />;
};

export default P01;
