import { Typography, Label } from '@maidt-cntn/ui';
import HE2L02C08A05 from './HE2-L02-C08-A05';

const P04 = () => {
  const pageKey = 'p04';

  const beforeInput = <Typography>4. Recent studies suggest that vitamin D&nbsp;</Typography>;

  const afterInput = <Typography style={{ paddingLeft: '20px' }}>learning and memory.</Typography>;

  const suggestion = 'improve';

  const inputWidth = '380px';

  return <HE2L02C08A05 pageKey={pageKey} beforeInput={beforeInput} afterInput={afterInput} inputWidth={inputWidth} suggestion={suggestion} />;
};

export default P04;
