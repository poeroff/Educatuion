import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '관계대명사는 앞의 명사(선행사)를 대신하는 대명사이자 동시에 관계대명사가 이끄는 절을 주절과 연결한다는 점에서 접속사의 기능도 하는 <접속사+대명사>이다.',
      highlight: '<접속사+대명사>',
    },
    {
      text: '형용사처럼 앞의 명사(선행사)를 수식한다.',
      highlight: '명사(선행사)를 수식',
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
          <Typography weight='700'>관계대명사란?</Typography>
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
