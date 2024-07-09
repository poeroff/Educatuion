import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE03001 from '@maidt-cntn/pages/HE-030-01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading Strategy',
    headerPattern: 'text',
  };

  const title = 'Finding the Main Idea & Details';
  const description = 'Find the main idea by identifying the key concept of a topic and the details that support the main idea.';

  return <HE03001 headerInfo={headerInfo} title={title} description={description} />;
};

export default P01;
