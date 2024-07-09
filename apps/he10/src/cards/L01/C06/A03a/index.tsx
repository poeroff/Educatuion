import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { IAudioPlayerProps, Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P02 from './02';
import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import usePageData from '@/hooks/usePageData';
import { L01C06A03a } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export interface IHeaderInfo {
  headerInfo: TMainHeaderInfoTypes;
}

export function A03a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01C06A03a);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-C06-A03a`);
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
    headerText: 'The Power of Friendliness: Soft but Strong  (1)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A03/HE1-L01-C06-A03.mp3',
    captionSrc: '/L01/C06/A03/HE1-L01-C06-A03.srt',
    top: -10,
  };

  const info: IHE01602Info = {
    altText: '학교 복도에서 남자 선생님과 책가방을 맨 여학생이 걸어가며 이야기를 나누고 있다.',
    text: `It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I
    had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations
    like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and
    why is it important?`,
    imageSrc: '/L01/C06/A03/HE1-L01-C06-A03.jpg',
    imageWidth: '320px',
    imageHeight: '228.91px',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'It’s good to see you, everyone!',
      translation: '반갑습니다, 여러분!',
    },
    {
      originText: 'I’m Dr. Edward Wilson, an evolutionary biologist.',
      translation: '저는 진화 생물학자, Edward Wilson 박사입니다.',
    },
    {
      originText: 'Thank you for inviting me here today.',
      translation: '오늘 저를 여기에 초대해 주셔서 감사합니다',
    },
    {
      originText: 'On my way, I had trouble locating this room.',
      translation: '오늘 저는 여기 오는 길에, 이 방을 찾는 데에 어려움이 있었습니다.',
    },
    {
      originText: 'Luckily, a friendly student came up to me and walked me here.',
      translation: '다행히, 친절한 학생 한 분이 저에게 와서 여기까지 바래다 주었습니다.',
    },
    {
      originText: 'It’s fascinating how, in situations like this, we want to help someone in need.',
      translation: '이런 상황들 속에 우리가 도움이 필요한 누군가를 도와주려고 하는 방식은 흥미롭습니다.',
    },
    {
      originText: 'Now, this raises some interesting questions: where does our friendliness come from, and why is it important?',
      translation: '이제, 이것은 몇 가지 의문이 들게 합니다. 우리의 친절함은 어디에서 모여, 이것이 왜 중요할까요?',
    },
  ];

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />
      <P02 />
      <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />
    </Page>
  );
}

export default A03a;
