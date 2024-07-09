import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '목적격 보어로 to부정사를 쓰는 5형식 동사로는 advise, allow, ask, cause, enable, encourage, expect, want 등이 있다.',
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
            <Typography weight={'var(--font-weight-bold)'}>
              {'<'}5형식 동사+목적어+to부정사{'>'} 구조 파악하기
            </Typography>
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

export default P01;
