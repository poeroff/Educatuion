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
      title={'Identifying Cause & Effect'}
      description={
        'See how different events or actions are connected and how one event leads to another. This will help you understand the causal relationships between events.'
      }
    />
  );
};

export default P01;
