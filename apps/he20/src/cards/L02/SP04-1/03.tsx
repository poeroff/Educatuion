import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo = { headerText: '[Write] 주요 내용 이해하기' };
  const title = '<주장, 제안, 명령, 요구 등을 나타내는 동사+that+주어+(should)+동사>';
  const data = [
    {
      text: '주장, 제안, 명령, 요구 등을 나타내는 동사의 목적어로 쓰인 that절이 당위성을 나타내는 경우, that절의 동사는 <(should+)동사원형>의 형태로 쓴다.',
      highlight: '<(should+)동사원형>',
    },
    {
      text: '대표적인 동사로는 insist, suggest, recommend, demand, propose, order, request 등이 있다.',
      highlight: '',
    },
    {
      text: '당위성이 없이 객관적인 사실을 나타내는 경우 that절의 시제는 주절의 시제와 일치해야 한다.',
      highlight: '',
    },
  ];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const highlight_format = highlight.replace('<', '\\<').replace('>', '\\>').replace('(', '\\(').replace(')', '\\)').replace('+', '\\+');
    const parts = text.split(new RegExp(`(${highlight_format})`, 'gi'));

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
    <Container headerInfo={headerInfo}>
      <Box margin={0} paddingLeft={50}>
        <Box>
          <Typography weight={700}>{title}</Typography>
        </Box>

        <Box>
          <List
            data={data}
            row={({ value }) => (
              <BoxWrap marginTop={20}>
                <Box>
                  <Label type={'paint'} size={'xx-small'} background={'var(--color-blue-500)'} />
                </Box>
                <Typography>{highlightText(value?.text || '', value?.highlight || '')}</Typography>
              </BoxWrap>
            )}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P03;
