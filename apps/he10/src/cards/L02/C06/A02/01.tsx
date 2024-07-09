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
      title={'Inferring Mood & Characters’ Feelings'}
      description={
        'Pay attention to the descriptions of the setting, objects, and events and the characters’ actions and words. This can help you understand the mood and the characters’ feelings.'
      }
    />
  );
};

export default P01;
