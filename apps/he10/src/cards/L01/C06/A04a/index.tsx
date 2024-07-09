// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { IAudioPlayerProps, Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P02 from './02';
import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import usePageData from '@/hooks/usePageData';
import { L01C06A04a } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function A04a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01C06A04a);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-C06-A04a`);
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
    headerText: 'The Power of Friendliness: Soft but Strong  (2)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A04/HE1-L01-C06-A04.mp3',
    captionSrc: '/L01/C06/A04/HE1-L01-C06-A04.srt',
    top: -10,
  };

  const info: IHE01602Info = {
    altText: ``,
    hiddenAltText: (
      <>
        <p>남자 선생님이 개와 늑대 사진 아래 각각의 설명이 적힌 인포그래픽 슬라이드를 설명하고 있다.</p>
        <p>남자 선생님이 개와 늑대 사진 아래 각각의 설명이 적힌 인포그래픽 슬라이드를 설명하고 있다.</p>
        <p>이미지 제목</p>
        <p>Dogs vs. Wolves (Case 1)</p>
        <p>슬라이드 텍스트</p>
        <p>Dogs followed Dr. Hare’s Gestures {'->'} found the cup with the food easily</p>
        <p>Wolves paid no attention to his gestures {'->'} struggled and chose cups randomly</p>
      </>
    ),
    text: `The responsive behavior of dogs also caught the attention of an evolutionary anthropologist, Brian Hare.
    He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor.
    He placed two cups on the ground with food hidden under only one of them.
    When he pointed to the cup with the food, the dogs found it easily.
    The wolves, however, struggled and chose cups at random, paying no attention to his gestures.
    Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves.
    He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness.
    This explanation sounds reasonable according to several evolutionary biologists. They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves.
    Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.
    `,
    imageSrc: '/L01/C06/A04/HE1-L01-C06-A04.jpg',
    imageWidth: '346px',
    imageHeight: '200px',
  };
  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'The responsive behavior of dogs also caught the attention of an evolutionary anthropologist, Brian Hare.',
      translation: '개들의 이런 반응하는 행동은 진화 인류학자인 Brian Hare 의 관심도 끌었습니다.',
    },
    {
      originText:
        'He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor.',
      translation: '그는 같은 조상을 공유하는 늑대와 비교하여 개가 인간의 제스처에 어떻게 반응하는지 알아보기 위해 실험을 진행했습니다.',
    },
    {
      originText: 'He placed two cups on the ground with food hidden under only one of them.',
      translation: '그는 두 개의 컵을 바닥에 놓고 그 중 하나에만 먹이를 숨겼습니다.',
    },
    {
      originText: 'When he pointed to the cup with the food, the dogs found it easily.',
      translation: '그가 먹이가 있는 컵을 가리키자 개들은 쉽게 먹이를 찾았습니다.',
    },
    {
      originText: 'The wolves, however, struggled and chose cups at random, paying no attention to his gestures.',
      translation: '하지만 늑대들은 그의 제스처에 전혀 관심을 기울이지 않고 아무 컵이나 골라 먹었습니다.',
    },
    {
      originText: 'Dr. Hare concluded that the dogs’ ability to read human gestures allowed them to perform better than the wolves.',
      translation: 'Hare 박사는 개가 인간의 몸짓을 읽을 수 있는 능력 덕분에 늑대보다 더 나은 성과를 낼 수 있었다고 결론지었습니다.',
    },
    {
      originText: 'He explained that dogs, unlike wolves, have developed communicative skills with humans and a sense of friendliness.',
      translation: '그는 개는 늑대와 달리 인간과의 의사소통 능력과 친근감을 발달시켜 왔다고 설명했습니다.',
    },
    {
      originText: 'This explanation sounds reasonable according to several evolutionary biologists.',
      translation: '이 설명은 여러 진화 생물학자에 따르면 합리적으로 들립니다.',
    },
    {
      originText:
        'They say that from the common ancestors of these two species, those that acted friendly toward humans evolved into dogs, and those that didn’t became wolves.',
      translation: '그들은 이 두 종의 공통 조상에서 인간에게 우호적으로 행동한 종은 개로 진화했고, 그렇지 않은 종은 늑대로 진화했다고 말합니다.',
    },
    {
      originText:
        'Furthermore, Dr. Hare suggested that the friendly nature of dogs probably provided them a survival advantage that allowed their population to grow larger than that of wolves.',
      translation: '또한 Hare 박사는 개의 친근한 성격이 늑대보다 개체 수가 더 많이 늘어날 수 있는 생존 이점을 제공했을 것이라고 제안했습니다.',
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

export default A04a;
