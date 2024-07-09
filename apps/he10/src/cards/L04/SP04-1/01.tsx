import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '동시동작을 나타내는 분사구문의 하나로, <with＋(대)명사＋분사>의 형태로 쓴다.',
      highlight: '',
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
        <Box padding='8px 12px' >
          <Typography weight='700'>with 분사구문이란?</Typography>
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

export default P01;
