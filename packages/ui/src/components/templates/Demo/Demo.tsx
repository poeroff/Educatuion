import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, BoxWrap, Button, EStyleFontSizes, Input, List, Scroll, Typography } from '@maidt-cntn/ui';
import { IRouteObject } from '@maidt-cntn/router';

interface IStudent {
  userId: number;
  schoolLevelCode: string;
  gradeLevelCode: string;
  classBandCode: string;
  activeCardId: string;
}
interface DemoProps {
  paths: IRouteObject[];
  name?: string;
  student?: IStudent;
  setStudent?: (student: (prev: IStudent) => IStudent) => void;
}

export const Demo: React.FC<DemoProps> = ({ paths, name, student, setStudent }: DemoProps) => {
  const contextPath = import.meta.env.VITE_APP_CODE;
  const [url, setUrl] = useState<any>(`/${contextPath}/samples/HE-017-03`);
  const [searchText, setSearchText] = useState('');
  const [newId, setNewId] = useState<string>(student ? String(student.userId) : '');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendMessageToIframe = () => {
    if (iframeRef.current) {
      const message = { type: 'demo:changeId', value: newId };
      iframeRef.current.contentWindow?.postMessage(message, '*');
      localStorage.setItem('userId', newId);
    }
  };

  const demos = useMemo(() => {
    const data = paths.reduce((pre: IRouteObject[], next: IRouteObject) => {
      if (next?.children) {
        return [...pre, ...next.children];
      }
      return pre;
    }, []);
    return searchText.trim()
      ? data.filter(row => row.path?.replace(/-/g, '').trim().toUpperCase()?.includes(searchText.replace(/-/g, '').trim().toUpperCase()))
      : data;
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

  const onChangeId = () => {
    setStudent?.(prev => ({ ...prev, userId: Number(newId) }));
    sendMessageToIframe();
  };

  return (
    <BoxWrap position='fixed' left='0' top={0} height='608px'>
      <Box width='300px' useFull>
        {student && (
          <>
            <Box>
              <Typography size={EStyleFontSizes.SMALL}>userId : {student.userId}</Typography>
            </Box>
            <Box margin={10} display='flex' gap={10} alignItems='end'>
              <Input
                width='180px'
                value={newId}
                onChange={e => {
                  if (/^\d*$/.test(e.target.value)) {
                    setNewId(e.target.value);
                  }
                }}
                placeholder='new userId'
              />
              <Button onClick={onChangeId}>변경</Button>
            </Box>
          </>
        )}
        <Box margin='10px'>
          <Input width='280px' placeholder='검색어' value={searchText} onChange={e => setSearchText(e.target.value)} maxLength={100}></Input>
        </Box>
        <Scroll width='inherit'>
          <List<IRouteObject> data={demos}>
            {({ value }) => (
              <Box
                color={isActive(`/${path}/${value?.path}`) ? 'red' : 'black'}
                onClick={() => handleRouter(`/${path}/${value?.path}`)}
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

      <Box useFull marginTop={30}>
        <iframe
          ref={iframeRef}
          src={url}
          width='1084px'
          height='612px'
          title='demo'
          style={{ border: '2px solid gray', overflow: 'hidden' }}
        ></iframe>
      </Box>
    </BoxWrap>
  );
};

export default Demo;
