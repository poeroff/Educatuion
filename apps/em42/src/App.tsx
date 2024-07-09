import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Layout } from '@maidt-cntn/ui/math';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { pageAtom } from '@/stores/page';
import { timerAtom } from '@/stores/timer';
import { alertAtom } from '@/stores/alert';
import { useEffect, useState } from 'react';
import { routers } from './router';
import { EMathLayout, ILayoutDataTypes, useLayoutStyle } from '@maidt-cntn/ui';
import { layouts } from './constants/layout';
import { studentAtom } from './stores/student';
import { getAccessToken } from '@maidt-cntn/api';
import { isExpiredAccessToken } from '@maidt-cntn/util/CommonUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';

export function App() {
  const [{ selectedPage, pageTotalNums }, setPage] = useRecoilState(pageAtom);
  const setStudentState = useSetRecoilState(studentAtom);
  const setTokenState = useSetRecoilState(tokenAtom);
  const { seconds, isVisible } = useRecoilValue(timerAtom);
  const [alert] = useRecoilState(alertAtom);
  const [layout, setLayout] = useState<ILayoutDataTypes>(layouts[EMathLayout.DEFAULT]);
  const location = useLocation();
  const navigate = useNavigate();
  const APP_ID = import.meta.env.VITE_APP_ID;
  const subjectCode = import.meta.env.VITE_APP_CODE;

  const handleLayoutStyle = useLayoutStyle;

  useEffect(() => {
    const loadToken = async () => {
      try {
        const tokenData = await getAccessToken(subjectCode);
        setTokenState(prev => ({ ...prev, accessToken: tokenData.accessToken }));
        sessionStorage.setItem(subjectCode + 'accessToken', tokenData.accessToken);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    if (sessionStorage.getItem(subjectCode + 'accessToken') === null) {
      loadToken();
    } else {
      if (isExpiredAccessToken(String(sessionStorage.getItem(subjectCode + 'accessToken')))) {
        loadToken();
      } else {
        setTokenState(prev => ({ ...prev, accessToken: String(sessionStorage.getItem(subjectCode + 'accessToken')) }));
      }
    }
  }, [setTokenState]);

  useEffect(() => {
    const params = handleLayoutStyle(location, routers);
    if (params) {
      setLayout(params);
    }
  }, [location]);

  useEffect(() => {
    const handler = ({ data }: any) => {
      const type = data?.type;
      if (!type) return;

      if (type === 'topping:onStart') {
        const userId = data.args.userId;
        const path = data.args.path;

        setStudentState(prev => ({ ...prev, userId, activeCardId: path }));
        navigate(path);
      } else if (type === 'topping:onStop') {
        // console.log('onStop')
      } else if (type === 'topping:onDestory') {
        window.parent.postMessage({ type: 'topping:done', appId: APP_ID }, '*');
      } else if (type === 'demo:changeId') {
        setStudentState(prev => ({ ...prev, userId: data.value }));
      }
    };
    window.addEventListener('message', handler);

    // addEventListener 이후 반드시 호출
    window.parent.postMessage({ type: 'topping:ready', appId: APP_ID }, '*');

    if (localStorage.getItem('userId')) setStudentState(prev => ({ ...prev, userId: Number(localStorage.getItem('userId')) }));

    return () => {
      window.parent.postMessage({ type: 'shell:stopTopping', appId: APP_ID }, '*');
      window.removeEventListener('message', handler);
    };
  }, []);

  return (
    <Layout
      backColor={layout.backGroundColor}
      chapterInfo={{
        chapterNum: layout.chapterNum,
        mainChapter: layout.mainChapter,
        subChapter: layout.subChapter,
        minorChapter: layout.minorChapter,
      }}
      footerInfo={layout.footerInfo}
      alert={alert}
      seconds={seconds}
      isVisible={isVisible}
      selectedPage={selectedPage}
      pageTotalNums={pageTotalNums}
      setPage={setPage}
    >
      <Outlet />
    </Layout>
  );
}

export default App;
