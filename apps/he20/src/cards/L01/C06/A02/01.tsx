import HE03001 from '@maidt-cntn/pages/HE-030-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading Strategy',
    headerPattern: 'text',
  };
  return (
    <HE03001
      headerInfo={headerInfo}
      title={'Sequencing'}
      description={'Find the main idea by identifying the key concept of a topic and the details that support the main idea.'}
    />
  );
};

export default P01;
