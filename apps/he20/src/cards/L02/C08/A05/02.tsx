import { Typography, Label } from '@maidt-cntn/ui';
import HE2L02C08A05 from './HE2-L02-C08-A05';

const P02 = () => {
  const pageKey = 'p02';

  const beforeInput = <Typography>2. She insisted that she&nbsp;</Typography>;

  const afterInput = (
    <>
      <Typography useGap={false}>&nbsp;no phone call from Sam&nbsp;</Typography>
      <Typography style={{ paddingLeft: '20px' }}>yesterday.</Typography>
    </>
  );

  const suggestion = 'receive';

  const inputWidth = '290px';

  return <HE2L02C08A05 pageKey={pageKey} beforeInput={beforeInput} afterInput={afterInput} inputWidth={inputWidth} suggestion={suggestion} />;
};

export default P02;
