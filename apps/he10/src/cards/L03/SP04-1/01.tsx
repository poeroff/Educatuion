import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '특정 어구를 강조하기 위해 해당 어구를 문장의 앞으로 옮긴 후, \n<주어＋동사>의 어순을 <동사＋주어>로 바꾸는 것이다.',
      highlight: '<동사＋주어>',
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
          <Typography weight='700'>도치란?</Typography>
        </Box>
        <List
          data={data}
          row={({ value }) => (
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xx-small'} background='' />
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
