import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '부사절 접속사 생략',
      highlight: '접속사',
    },
    {
      text: '부사절의 주어 생략',
      highlight: '주어',
    },
    {
      text: '부사절의 동사를 분사로 변경',
      highlight: '동사를 분사로',
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
      <Box flexDirection='column' width='840px' height='280px' padding='28px' hAlign={'center'} background='white' useRound useShadow>
        <Box padding='8px 12px'>
          <Typography weight='700'>분사구문 만드는 법</Typography>
        </Box>
        <List
          data={data}
          row={({ index, value }) => (
            <BoxWrap>
              <Typography>
                {`${index}. `}
                {highlightText(value?.text || '', value?.highlight || '')}
              </Typography>
            </BoxWrap>
          )}
        />
      </Box>
    </Container>
  );
};

export default P07;
