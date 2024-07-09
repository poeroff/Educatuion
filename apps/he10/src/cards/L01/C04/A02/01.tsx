import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE03001 from '@maidt-cntn/pages/HE-030-01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening Strategy',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const title = 'Predicting Content';
  const description = 'Before listening, look at the heading, instructions, and pictures for clues in order to make a guess about the content.';

  return <HE03001 headerInfo={headerInfo} title={title} description={description} />;
};

export default P01;
