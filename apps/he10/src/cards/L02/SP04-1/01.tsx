import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '<how+형용사/부사+주어+동사> 절에서, 형용사와 부사의 사용에 주의해야 한다.',
      highlight: '',
    },
    {
      text: '형용사나 부사가 들어갈 자리 이후의 절이 완전하면 부사를, 주격보어가 빠진 불완전한 절이 나오면 how 다음에 형용사를 쓴다.',
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
              {'<'}how+형용사/부사+주어+동사{'>'} 구조 파악하기
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
