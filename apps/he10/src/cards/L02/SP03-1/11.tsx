import { Box, BoxWrap, EStyleFontSizes, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface ITranslation {
  en: string;
  ko: string;
}

const P11 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const contents: ITranslation[] = [
    {
      en: 'It was early morning and still dark when we returned to Auntie’s place.',
      ko: '우리가 고모의 집으로 돌아왔을 때는 여전히 어두운 이른 아침이었다.',
    },
    {
      en: 'All the lights were on, and the village people were waiting for us.',
      ko: '모든 불이 켜져 있었고, 마을 사람들이 우리를 기다리고 있었다.',
    },
    {
      en: 'Smiling, Nani Tama lifted up the whakapapa and offered it to the village.',
      ko: '할아버지는 웃으면서 와카파파를 들어 올리더니 마을 사람들에게 건네주었다.',
    },
    {
      en: 'Our hearts were full because our grandfather had saved our past for us.',
      ko: '할아버지가 우리를 위해 과거를 구해냈기 때문에 우리의 가슴은 벅차 올랐다.',
    },
    {
      en: 'Our Nani Tama smiled again. Then, he closed his eyes.',
      ko: '할아버지는 다시 웃으셨다. 그리고 눈을 감으셨다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull marginTop='4px'>
          <Scroll height='100%' tabIndex={0}>
            <Box background='white' useRound paddingBottom='28px'>
              <List<ITranslation>
                data={contents}
                row={({ value, index = 1 }) => (
                  <Box>
                    <Typography size={EStyleFontSizes.MEDIUM}>{value?.en}</Typography>
                    <Box height='60px'>
                      <Typography size={EStyleFontSizes['X-MEDIUM']} color={'var(--color-blue-900)'}>
                        {value?.ko}
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P11;
