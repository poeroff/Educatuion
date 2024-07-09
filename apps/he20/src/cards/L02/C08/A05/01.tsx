import { Typography, Label } from '@maidt-cntn/ui';
import HE2L02C08A05 from './HE2-L02-C08-A05';

const P01 = () => {
  const pageKey = 'p01';

  const beforeInput = <Typography>1. The company insists customers&nbsp;</Typography>;

  const afterInput = (
    <>
      <Typography useGap={false}>&nbsp;delivery fees&nbsp;</Typography>
      <Typography style={{ paddingLeft: '20px' }}>from now on.</Typography>
    </>
  );

  const suggestion = 'pay';

  const inputWidth = '290px';

  return <HE2L02C08A05 pageKey={pageKey} beforeInput={beforeInput} afterInput={afterInput} inputWidth={inputWidth} suggestion={suggestion} />;
};

export default P01;
