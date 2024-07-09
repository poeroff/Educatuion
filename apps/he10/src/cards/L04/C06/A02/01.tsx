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
      title={'Identifying Problem & Solution'}
      description={
        'In the text, identify the problem and possible solutions to it. This will help you understand the organizational structure of problem‒solution texts.'
      }
    />
  );
};

export default P01;
