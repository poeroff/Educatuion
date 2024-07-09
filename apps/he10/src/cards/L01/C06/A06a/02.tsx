import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE01703, { IApiInfo } from '@maidt-cntn/pages/HE-017-03-api';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const P02 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const apiInfo: IApiInfo = {
    pageId: 'P02',
    changeData,
    initData,
    pageIds,
    saveData,
    submitData,
    userId,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (4)',
  };

  const questionInfo = {
    text: 'Q4. In addition to friendliness and cooperation, what other characteristics do you think we need today?',
  };

  const content = `Now let’s turn our attention to ourselves, Homo sapiens.
  How have we managed to survive for so long? 
  Neanderthals existed together with Homo sapiens until about 40,000 years ago, 
  and they were known to be intelligent and physically superior to Homo sapiens. 
  Neanderthals were able to make tools and fire and had strong bodies with 
  well-developed muscles and broad shoulders. 
  Despite these attributes, however, it was Homo sapiens who ultimately survived and thrived. 
  One possible explanation is that our ancestors lived in larger communities 
  that promoted cooperation and the free exchange of knowledge, 
  while Neanderthals tended to live in smaller groups. 
  These social differences may have given Homo sapiens a competitive advantage over Neanderthals, 
  allowing them to adapt to an ever-changing environment.
  `;

  const [input, setInput] = useState({
    value1: '',
  });

  const answer = {
    value1: `
    I think creativity is required. 
    The world is changing rapidly, so people need to be creative in order to keep up with the changes. 
    Those who are creative are able to come up with better solutions.`,
  };

  return <HE01703 apiInfo={apiInfo} answer={answer} content={content} headerInfo={headerInfo} questionInfo={questionInfo} />;
};

export default P02;
