import { BoxWrap, Box, List, Label, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface IHE00102 {
  value1: string;
  highlight1: string[];
  value2: string;
  highlight2: string[];
}

const HE00102 = ({ value1, highlight1, value2, highlight2 }: IHE00102) => {
  const data = [
    {
      text: value1,
      highlight: highlight1,
    },
    {
      text: value2,
      highlight: highlight2,
    },
  ];

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const highlightText = (text: string, highlights: string[] = []) => {
    if (!highlights.length) return text;

    // Handle exact phrases and single words separately
    const exactPhrases = highlights.filter(term => term.includes(' '));
    const singleWords = highlights.filter(term => !term.includes(' '));

    // Create regex for exact phrases without word boundaries
    const exactPhrasesRegex = exactPhrases.length ? `(${exactPhrases.map(escapeRegExp).join('|')})` : null;

    // Create regex for single words with word boundaries
    const singleWordsRegex = singleWords.length ? `\\b(${singleWords.map(escapeRegExp).join('|')})\\b` : null;

    // Combine both regex parts
    const combinedRegex = [exactPhrasesRegex, singleWordsRegex].filter(Boolean).join('|');
    const regex = new RegExp(combinedRegex, 'gi');

    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => {
          // Check if the part matches any highlight term exactly
          const isHighlight = highlights.some(h => new RegExp(`^${escapeRegExp(h)}$`, 'i').test(part));
          return isHighlight ? (
            <span key={index} style={{ fontWeight: 700 }}>
              {part}
            </span>
          ) : (
            part
          );
        })}
      </>
    );
  };

  return (
    <Container headerInfo={null}>
      <BoxWrap>
        <Box>
          <Typography weight={700}>Structures</Typography>
        </Box>
        <Box useFull>
          <List
            data={data}
            row={({ value, index = 1 }) => (
              <BoxWrap key={index}>
                <Box>
                  <Label type={'paint'} size={'xx-small'} background={'var(--color-blue-500)'} />
                </Box>
                <Typography>{highlightText(value?.text || '', value?.highlight)}</Typography>
              </BoxWrap>
            )}
            gap={20}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE00102;
