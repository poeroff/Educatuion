import { Box, BoxWrap, EStyleFontSizes, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface ITranslation {
  en: string;
  ko: string;
}

const P10 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const contents: ITranslation[] = [
    {
      en: 'I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked.',
      ko: '나는 두 노인이 탁자에 앉아서 이야기를 나눌 때 들리던 부드러운 마오리 언어가 기억난다.',
    },
    {
      en: 'All through the quiet afternoon and into the evening, they recalled missing names.',
      ko: '고요한 오후 내내 그리고 저녁까지 그들은 빠진 이름을 기억해 내었다.',
    },
    {
      en: 'I felt as if people from the past were looking over the shoulders of the two old men to see if the work was correct.',
      ko: '마치 과거에서 온 사람들이 두 노인의 어깨너머로 그 작업이 정확한지 보고 있는 것처럼 느껴졌다.',
    },
    {
      en: 'After a moment of silence, the old man whispered to Nani, “Goodbye, friend.” Crying, they pressed their noses together to say goodbye.',
      ko: '잠시 침묵이 흐른 후, 그 노인은 할아버지에게 속삭였다. “잘 가게, 친구.” 울면서 그들은 작별을 고하기 위해 서로 코를 비볐다.',
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

export default P10;
