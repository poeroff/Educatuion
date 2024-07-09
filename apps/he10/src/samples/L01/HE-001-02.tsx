import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography } from '@maidt-cntn/ui';

const HE00102 = () => {
  const data = [
    {
      text: 'They set up a device which required two individuals to pull both ends of a rope at the same time.',
      highlight: 'which',
    },
    {
      text: '(When) Paired with new partners, the chimpanzees usually failed to get the food',
      highlight: 'Paired',
    },
  ];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 'var(--font-weight-bold)' }}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
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
            row={({ value }) => (
              <BoxWrap>
                <Box>
                  <Label type={'paint'} size={'xx-small'} background={'var(--color-blue-500)'} />
                </Box>
                <Typography>{highlightText(value?.text || '', value?.highlight || '')}</Typography>
              </BoxWrap>
            )}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE00102;
