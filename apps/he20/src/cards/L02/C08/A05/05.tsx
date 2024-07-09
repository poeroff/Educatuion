import { Typography, Label } from '@maidt-cntn/ui';
import HE2L02C08A05 from './HE2-L02-C08-A05';

const P05 = () => {
  const pageKey = 'p05';

  const beforeInput = <Typography>5. The organization recommends that people&nbsp;</Typography>;

  const afterInput = <Typography style={{ paddingLeft: '20px' }}>money to build a medical center.</Typography>;

  const suggestion = 'raise';

  const inputWidth = '330px';

  return <HE2L02C08A05 pageKey={pageKey} beforeInput={beforeInput} afterInput={afterInput} inputWidth={inputWidth} suggestion={suggestion} />;
};

export default P05;
