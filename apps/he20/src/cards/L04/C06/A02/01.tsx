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
      title={'Identifying Fact & Opinion'}
      description={
        'Determine whether the given information is based on fact or the author’s personal opinion. This will help you assess the reliability and credibility of the content.'
      }
    />
  );
};

export default P01;
