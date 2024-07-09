import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE03001 from '@maidt-cntn/pages/HE-030-01';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Speaking Strategy',
    headerPattern: 'text',
  };

  const title = 'Ensuring Reliability';
  const description = 'When preparing content, be sure to check multiple sources. It is important to use accurate and reliable information.';

  return <HE03001 headerInfo={headerInfo} title={title} description={description} />;
};

export default P04;
