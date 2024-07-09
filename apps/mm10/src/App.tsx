import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { timerAtom } from '@/stores/timer';
import { useEffect, useState } from 'react';
import { routers } from './router';
import { ELayout, TChapterInfoTypes, TFooterinfoTypes, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { layouts } from './constants/layout';
import { pageAtom, studentAtom } from '@/stores';
import { MLayout, RightIconsType, TMMLayoutBackColorTypes } from '@maidt-cntn/ui/math';
import { useLayoutStyle } from './hooks/useMMLayout';
import { getAccessToken } from '@maidt-cntn/api';
import { isExpiredAccessToken } from '@maidt-cntn/util/CommonUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';

export interface IMMLayoutDataTypes extends TChapterInfoTypes, TMainHeaderInfoTypes {
  backGroundColor: TMMLayoutBackColorTypes;
  footerInfo?: TFooterinfoTypes;
  footerBackColor?: string;
  rightIcons?: RightIconsType;
}

export function App() {
  const [page, setPage] = useRecoilState(pageAtom);
  const setStudentState = useSetRecoilState(studentAtom);
  const setTokenState = useSetRecoilState(tokenAtom);
  const { seconds, isVisible } = useRecoilValue(timerAtom);
  const [layout, setLayout] = useState<IMMLayoutDataTypes>(layouts[ELayout.DEFAULT]);

  const handleLayoutStyle = useLayoutStyle;
  const location = useLocation();
  const navigate = useNavigate();

  const APP_ID = import.meta.env.VITE_APP_ID;
  const subjectCode = import.meta.env.VITE_APP_CODE;

  useEffect(() => {
    const params = handleLayoutStyle(location, routers);
    if (params) {
      setLayout(params);
    }
  }, [location]);

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
    const handler = ({ data }: any) => {
      const type = data?.type;
      if (!type) return;

      if (type === 'topping:onStart') {
        if (!APP_ID) return;

        const userId = data.args.userId;
        const path = data.args.path;
        const pcp = data.args.pcp;
        const lrsAccessToken = data.args.lrsAccessToken;
        const sessionId = data.args.sessionId;

        setStudentState({ userId, activeCardId: `${APP_ID}_${path}`, pcp, lrsAccessToken, sessionId });
        navigate(path);
      } else if (type === 'topping:onStop') {
        // console.log('onStop')
      } else if (type === 'topping:onDestory') {
        window.parent.postMessage({ type: 'topping:done', appId: APP_ID }, '*');
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
    <MLayout
      backColor={layout.backGroundColor}
      chapterInfo={{
        chapterNum: layout.chapterNum,
        mainChapter: layout.mainChapter,
        subChapter: layout.subChapter,
        minorChapter: layout.minorChapter,
      }}
      footerInfo={layout.footerInfo}
      seconds={seconds}
      isVisible={isVisible}
      selectedPage={page.selectedPage}
      pageTotalNums={page.pageTotalNums}
      setPage={setPage}
      classInfo='middle'
      subjectInfo='math'
      footerBackColor={layout.footerBackColor}
      rightIcons={layout.rightIcons}
    >
      <Outlet />
    </MLayout>
  );
}

export default App;
