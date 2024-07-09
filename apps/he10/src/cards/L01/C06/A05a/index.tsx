import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from './01';
import P02 from './02';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import usePageData from '@/hooks/usePageData';
import { L01C06A05a } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function A05a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01C06A05a);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-C06-A05a`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong  (3)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'I’ll give you another example of how friendliness is related to survival.',
      translation: '친근함이 생존과 어떤 관련이 있는지에 대한 또 다른 예를 들어보겠습니다.',
    },
    {
      originText: 'Dr. Hare and his colleagues designed an experiment with chimpanzees and bonobos.',
      translation: 'Hare 박사와 그의 동료들은 침팬지와 보노보를 대상으로 실험을 설계했습니다.',
    },
    {
      originText: 'Although the two are genetically similar, they are different in nature.',
      translation: '두 종은 유전적으로 비슷하지만 본질적으로 다릅니다.',
    },
    {
      originText:
        'To study their cooperative behavior, Dr. Hare’s team set up a device which required two individuals to pull both ends of a rope at the same time in order to access food on a board.',
      translation:
        '침팬지와 보노보의 협동 행동을 연구하기 위해 Hare 박사팀은 두 사람이 동시에 줄의 양쪽 끝을 당겨 보드에 있는 먹이에 접근해야 하는 장치를 설치했습니다.',
    },
    {
      originText: 'When placed with partners that the chimpanzees knew, they were able to work together to get the food.',
      translation: '침팬지들이 알고 있는 파트너와 짝을 이뤘을 때는 서로 협력하여 먹이를 얻을 수 있었습니다.',
    },
    {
      originText:
        'However, when paired with new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share  the food with their partner.',
      translation:
        '그러나 새로운 파트너와 짝을 이룬 침팬지들은 대부분 먹이를 얻는 데 실패했고, 간혹 성공하더라도 파트너와 먹이를 공유하지 않았습니다.',
    },
    {
      originText: 'The bonobos, on the other hand, got along much better than the chimpanzees.',
      translation: '반면 보노보는 침팬지보다 훨씬 더 잘 어울렸습니다. ',
    },
    {
      originText: 'They solved the problem regardless of which individual they were paired with, and they were also more willing to share the food.',
      translation: '보노보는 짝을 이룬 개체에 관계없이 문제를 해결했으며, 먹이를 더 기꺼이 공유했습니다.',
    },
    {
      originText: 'This research shows that bonobos have a cooperative and friendly nature.',
      translation: '이 연구는 보노보가 협동적이고 우호적인 본성을 가지고 있음을 보여줍니다.',
    },
    {
      originText: 'Experts suggest that their nature has helped their species survive.',
      translation: '전문가들은 보노보의 이러한 본성이 종의 생존에 도움이 되었다고 말합니다.',
    },
    {
      originText: 'Without these characteristics, they could have faced extinction.',
      translation: '이러한 특성이 없었다면 보노보는 멸종 위기에 직면했을 수도 있습니다.',
    },
  ];

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />
    </Page>
  );
}

export default A05a;
