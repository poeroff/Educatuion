import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '<had+p.p.> 형태로 쓰는 과거완료는 과거 이전에 일어난 일이 과거까지 영향을 미칠 때 쓴다.',
      highlight: '',
    },
    {
      text: '대과거: 과거에 일어난 두 가지 일 중 먼저 일어난 일을 나타낼 때 쓰는 과거완료를 대과거라 한다.',
      highlight: '',
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
    <Container headerInfo={headerInfo}>
      <BoxWrap>
        <Box useFull>
          <Box>
            <Typography weight={'var(--font-weight-bold)'}>과거완료란?</Typography>
          </Box>
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

export default P03;
