import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE03001 from '@maidt-cntn/pages/HE-030-01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening Strategy',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const title = 'Tasking Notes';
  const description = 'Write down important information as you listen. This will help you remember key ideas for later reference and review.';

  return <HE03001 headerInfo={headerInfo} title={title} description={description} />;
};

export default P01;
