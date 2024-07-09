import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import HE1L02C08A05 from './HE1L02C08A05';
import usePageData from '@/hooks/usePageData';
import { L02C08A05 } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function A05() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C08A05);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;

    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C08-A05`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
  }, []);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <HE1L02C08A05 pageNumber={1} text1='1. Burj Khalifa in Dubai looks as if it ' text2=' the sky.' />
      <HE1L02C08A05 pageNumber={2} text1='2. The athlete runs as if she ' text2=' wings on her feet. ' />
      <HE1L02C08A05 pageNumber={3} text1='3. The child speaks to the cats as if they ' text2=' humans.' />
      <HE1L02C08A05 pageNumber={4} text1='4. The woods where  I got lost seemed as if fairies ' text2=' in them.' />
      <HE1L02C08A05 pageNumber={5} text1='5. In the packed bus, they talked as if there ' text2=' no other people around.' />
    </Page>
  );
}

export default A05;
