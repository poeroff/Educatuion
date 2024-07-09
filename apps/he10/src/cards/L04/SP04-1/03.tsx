import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '짝으로 이루어진 접속사를 뜻한다.',
      highlight: '',
    },
    {
      text: '상관접속사로 연결된 어구들은 문법적으로 대등한 형태를 써야 한다.',
      highlight: '문법적으로 대등한 형태',
    },
  ];

  const escapeRegExp = (str: string) => {
    return str.replace(/[<>()+]/g, '\\$&');
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const escapedHighlight = escapeRegExp(highlight);
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part === highlight ? (
            <span key={index} style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {highlight}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' width='840px' padding='28px' background='white' useRound useShadow>
        <Box padding='8px 12px'>
          <Typography weight='700'>상관 접속사란?</Typography>
        </Box>
        <List
          data={data}
          row={({ value }) => (
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xx-small'} background='var(--color-blue-500)' />
              </Box>
              <Typography>{highlightText(value?.text || '', value?.highlight || '')}</Typography>
            </BoxWrap>
          )}
        />
      </Box>
    </Container>
  );
};

export default P03;
