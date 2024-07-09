import { useEffect, useMemo, useState } from 'react';
import { Box, BoxWrap, Input, List, Scroll } from '@maidt-cntn/ui';
import { IRouteObject } from '@maidt-cntn/router';

export const Demo: React.FC<{ paths: IRouteObject[]; name?: string }> = ({ paths, name }) => {
  const contextPath = import.meta.env.VITE_APP_CODE;
  const [url, setUrl] = useState<any>(`/${contextPath}/samples/HE-017-03`);
  const [searchText, setSearchText] = useState('');

  const demos = useMemo(() => {
    const data = paths.reduce((pre: IRouteObject[], next: IRouteObject) => {
      if (next?.children) {
        return [...pre, ...next.children];
      }
      return pre;
    }, []);
    return searchText.trim() ? data.filter(row => row.path?.includes(searchText.trim().toUpperCase())) : data;
  }, [paths, searchText]);

  useEffect(() => {
    const demo = localStorage.getItem('demo') || '';
    setUrl(demo);
  }, []);

  const path = useMemo(() => {
    if (name) {
      return `${contextPath}/${name}`;
    }
    return contextPath;
  }, [name]);

  const isActive = (path: string) => {
    return url === path;
  };

  const handleRouter = (value: string) => {
    setUrl(value);
    localStorage.setItem('demo', value);
  };

  return (
    <BoxWrap height='608px'>
      <Box width='200px' useFull>
        <Input placeholder='검색어' value={searchText} onChange={e => setSearchText(e.target.value)}></Input>
        <Scroll width='inherit'>
          <List<IRouteObject> data={demos}>
            {({ value }) => (
              <Box
                color={isActive(`/#/${path}/${value?.path}`) ? 'red' : 'black'}
                onClick={() => handleRouter(`/#/${path}/${value?.path}`)}
                fontSize='var(--font-size-15)'
                fontWeight='700'
                height='30px'
                padding='0'
                vAlign='center'
                hAlign='center'
              >
                {value?.path}
              </Box>
            )}
          </List>
        </Scroll>
      </Box>
      <Box useFull>
        <iframe src={url} width='1084px' height='612px' title='demo' style={{ border: '2px solid gray', overflow: 'hidden' }}></iframe>
      </Box>
    </BoxWrap>
  );
};

export default Demo;
