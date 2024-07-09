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
      title={'Scanning'}
      description={'To locate specific details, scan the text. This helps you find what you need quickly without having to read everything.'}
    />
  );
};

export default P01;
