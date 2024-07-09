import { Location } from 'react-router-dom';
import { IRouteObject } from '@maidt-cntn/router';

export const useLayoutStyle = (navigate: Location, routers: IRouteObject[]) => {
  const pathname = navigate.pathname.split('/');
  const pathIdx = pathname.length > 0 ? pathname.length - 1 : 0;
  const hasSamples = pathname.includes('samples');
  const target = hasSamples ? 'samples' : '';

  const children = routers.reduce((pre: IRouteObject[], next: IRouteObject) => {
    if (next.path === target && next?.children) {
      return [...pre, ...next.children];
    }
    return pre;
  }, []);

  let params = null;
  for (let i = 0; i < children.length; i++) {
    if (children[i].path === pathname[pathIdx]) {
      params = children[i].params ?? null;
      break;
    }
  }
  return params;
};
