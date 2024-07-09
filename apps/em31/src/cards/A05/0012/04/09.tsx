import EM01901, { IApiInfo } from '@maidt-cntn/math/pages/EM-019-01';

import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

//import CEM310500121001 from '../../C05/0012/10/01';
//import CEM310500121002 from '../../C05/0012/10/02';
//import CEM310500121003 from '../../C05/0012/10/03';

//import CEM310500122001 from '../../C05/0012/20/01';
//import CEM310500122002 from '../../C05/0012/20/02';
//import CEM310500122003 from '../../C05/0012/20/03';
//import CEM310500122004 from '../../C05/0012/20/04';
//import CEM310500122005 from '../../C05/0012/20/05';
//import CEM310500122006 from '../../C05/0012/20/06';
//import CEM310500122007 from '../../C05/0012/20/07';
//import CEM310500122008 from '../../C05/0012/20/08';
//import CEM310500122009 from '../../C05/0012/20/09';
//import CEM310500122010 from '../../C05/0012/20/10';
//import CEM310500122011 from '../../C05/0012/20/11';
//import CEM310500122012 from '../../C05/0012/20/12';
//import CEM310500122013 from '../../C05/0012/20/13';

const P09 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [linkPageNodes, setLinkPageNodes] = useState<JSX.Element[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(-1);

  //페이지 아직 미개발
  //   useEffect(() => {
  //     if (!correctCount < 2) {
  //       setLinkPageNodes([<CEM310500121001 key={'P01'} />, <CEM310500121002 key={'P02'} />, <CEM310500121003 key={'P03'} />]);
  //     } else {
  //       setLinkPageNodes([<CEM310500122001 key={'P01'} />, <CEM310500122002 key={'P02'} />, <CEM310500122003 key={'P03'} />, <CEM310500122004 key={'P04'} />, <CEM310500122005 key={'P05'} />, <CEM310500122006 key={'P06'} />, <CEM310500122007 key={'P07'} />, <CEM310500122008 key={'P08'} />, <CEM310500122002 key={'P02'} />, <CEM310500122009 key={'P09'} />, <CEM310500122010 key={'P10'} />, <CEM310500122011 key={'P11'} />, <CEM310500122012 key={'P12'} />, <CEM310500122013 key={'P13'} />]);
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
      problemPages={['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08']}
      apiInfo={apiInfo}
    />
  );
};

export default P09;
