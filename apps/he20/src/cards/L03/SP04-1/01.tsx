import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '접속사는 주어와 동사가 있는 절과 함께 쓰고, 전치사는 명사구와 함께 쓴다.',
    },
    {
      text: '의미가 비슷한 접속사와 전치사의 쓰임을 헷갈리지 않도록 주의한다.',
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
      <Box flexDirection='column' width='840px' height='280px' padding='28px' hAlign={''} background='white' useRound useShadow>
        <Box padding='8px 12px'>
          <Label type={'paint'} size={'xx-small'} background='var(--color-black)' />
          <Typography weight='700'>접속사 vs. 전치사 </Typography>
        </Box>
        <List
          data={data}
          row={({ value }) => (
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xxx-small'} background={'black'} />
              </Box>
              <Typography>{value?.text || ''}</Typography>
            </BoxWrap>
          )}
        />
      </Box>
    </Container>
  );
};

export default P01;
