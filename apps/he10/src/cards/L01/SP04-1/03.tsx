import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '선행사가 사람인 경우 관계대명사 who(주격), who(m)(목적격)을 쓴다.',
      highlight: 'who(주격), who(m)(목적격)',
    },
    {
      text: '선행사가 사람 이외의 사물이나 동물일 경우 관계대명사\nwhich(주격, 목적격)을 쓴다.',
      highlight: 'which(주격, 목적격)',
    },
    {
      text: 'who와 which를 대신하여 선행사가 사람, 동물, 사물 모두에 that(주격, 목적격)을 쓴다.',
      highlight: 'that(주격, 목적격)',
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
      <Box flexDirection='column' width='840px' height='400px' padding='28px' hAlign={'center'} background='white' useRound useShadow>
        <Box padding='8px 12px'>
          <Typography weight='700'>관계사절 내에서 관계대명사의 역할에 따라 격이 바뀐다.</Typography>
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
