import { Typography, Label } from '@maidt-cntn/ui';
import HE2L02C08A05 from './HE2-L02-C08-A05';

const P03 = () => {
  const pageKey = 'p03';

  const beforeInput = <Typography>3. I suggest that we&nbsp;</Typography>;

  const afterInput = (
    <>
      <Typography useGap={false}>&nbsp;a while before making&nbsp;</Typography>
      <Typography style={{ paddingLeft: '20px' }}>important decisions.</Typography>
    </>
  );

  const suggestion = 'wait';

  const inputWidth = '360px';

  return <HE2L02C08A05 pageKey={pageKey} beforeInput={beforeInput} afterInput={afterInput} inputWidth={inputWidth} suggestion={suggestion} />;
};

export default P03;
