import EM01901, { IApiInfo } from '@maidt-cntn/math/pages/EM-019-01';

import { useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { useEffect, useState } from 'react';

const P07 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [linkPageNodes, setLinkPageNodes] = useState<JSX.Element[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(-1);

  //페이지 아직 미개발
  //   useEffect(() => {
  //     if (correctCount > 4) {
  //       setLinkPageNodes([<P01 key={'P01'} />, <P02 key={'P02'} />]);
  //     } else {
  //       setLinkPageNodes([<P01 key={'P01'} />]);
  //     }
  //   }, [correctCount]);

  const apiInfo: IApiInfo = {
    userId,
    pageIds,
  };

  return (
    <EM01901
      setCorrectCount={setCorrectCount}
      linkPageNodes={linkPageNodes}
      problemPages={['P01', 'P02', 'P03', 'P04', 'P05', 'P06']}
      apiInfo={apiInfo}
    />
  );
};

export default P07;
