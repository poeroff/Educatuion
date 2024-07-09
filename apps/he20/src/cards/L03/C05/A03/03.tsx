import { Typography } from '@maidt-cntn/ui';
import HE2L03C05A03, { IData } from './HE2-L03-C05-A03';
import { TL03C05A03Keys } from './store';

const P03 = () => {
  const pageKey: TL03C05A03Keys = 'p03';

  const sentence = (
    <>
      The fashion show will&nbsp;
      <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'>
        {'\u00A0'}
      </Typography>
      &nbsp;new collections{''}
      from the world’s top designers.
    </>
  );

  const data: IData[] = [
    { word: 'confine', meaning: 'to limit something or someone to a certain area' },
    { word: 'distorted', meaning: 'changed in a way that makes things look different from how they originally were' },
    { word: 'showcase', meaning: 'to display something in a way that highlights its qualities, features, or importance' },
  ];

  return <HE2L03C05A03 sentence={sentence} data={data} pageKey={pageKey} />;
};

export default P03;
