import { useRecoilState } from 'recoil';
import { pageAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import HE0180201 from './HE-018-02-01';
import HE0180202 from './HE-018-02-02';
import HE0180203 from './HE-018-02-03';
import HE0180204 from './HE-018-02-04';

export const HE01802 = () => {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <HE0180201 />
      <HE0180202 />
      <HE0180203 />
      <HE0180204 />
    </Page>
  );
};

export default HE01802;
