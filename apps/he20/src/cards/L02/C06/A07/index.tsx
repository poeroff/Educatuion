import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, Typography } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { HE20L02C06A07Atom } from './store';

export const L02C06A07Content = () => (
  <Typography useGap={false}>
    Dark patterns, in contrast, not only manipulate customers to act against their intentions, but they can also lead to financial losses and personal
    data leaks. To tackle this problem, extensive research across various websites and applications is being conducted to document the prevalence of
    dark patterns and come up with solutions. In addition to research, governments are actively discussing on how to regulate these deceptive design
    patterns. The EU’s Digital Service Act, which banned dark patterns on online platforms in 2022, is a good example of such regulation in this area.
    Such regulations are expected to increase, limiting companies’ deceptive marketing practices in the digital market. However, regulations alone may
    not be sufficient. As individuals, we should take steps to combat dark patterns and be responsible for our online shopping behavior. This includes
    being cautious while making purchases, reading terms and conditions carefully, and recognizing that companies’ interests may not be the same as
    our own. Developing an awareness of dark patterns is also essential to avoid potential harm and economic loss. Ultimately, our attention and
    efforts will protect us from manipulation and enable us to make wise decisions in this digital age.
  </Typography>
);

const A07 = () => {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(HE20L02C06A07Atom);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C06-A07`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(newPageIds);
    };
    getIds();
  }, [setPageIds]);

  useEffect(
    () => () => {
      clearData();
      resetCardData();
    },
    [],
  );
  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
    </Page>
  );
};

export default A07;
