import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo = { headerText: '[Write] 주요 내용 이해하기' };
  const title = '<조동사+have p.p.>';
  const data = [
    {
      text: '과거의 일에 대한 후회, 추측, 유감, 가정 등을 나타낼 수 있는 표현이다.',
      highlight: '',
    },
    {
      text: '조동사의 쓰임에 따라 그 뜻을 정확히 알고 쓰도록 주의한다.',
      highlight: '',
      list: [
        '1) must have p.p.: ~했음이 틀림없다',
        '2) should have p.p.: ~했어야 했는데 (하지 않았다)',
        '3) can’t[cannot] have p.p.: ~했을 리가 없다',
        '4) may[might] have p.p.: ~했을지도 모른다',
      ],
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
              <>
                <BoxWrap marginTop={20}>
                  <Box>
                    <Label type={'paint'} size={'xx-small'} background={'var(--color-blue-500)'} />
                  </Box>
                  <Typography>{highlightText(value?.text || '', value?.highlight || '')}</Typography>
                </BoxWrap>

                {value?.list && (
                  <Box>
                    {value?.list?.map((item, index) => (
                      <Typography key={index}>{item}</Typography>
                    ))}
                  </Box>
                )}
              </>
            )}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
