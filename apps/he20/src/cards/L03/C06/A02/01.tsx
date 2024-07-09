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
      title={'Comparing & Contrasting'}
      description={
        'Analyze the similarities and differences between two or more topics. This can help you identify key features and themes within the text.'
      }
    />
  );
};

export default P01;
