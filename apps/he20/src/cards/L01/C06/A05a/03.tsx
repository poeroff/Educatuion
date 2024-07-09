import { Box, BoxWrap, EStyleFontSizes, List, ListHeader, Scroll, TMainHeaderInfoTypes, ToggleButton, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface ITranslation {
  en: string;
  ko: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Volunteering at an Animal Sanctuary(3)',
};

const P03 = () => {
  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  const questionInfo = {
    text: 'Translations',
  };

  const contents: ITranslation[] = [
    {
      en: 'July 30, Tuesday',
      ko: '7월 30일 화요일',
    },
    {
      en: 'Today, we did something special for Ben and Lily.',
      ko: '오늘 우리는 Ben 과 Lily를 위해 특별한 일을 했다.',
    },
    {
      en: 'These two baby bears were rescued after they had been raised illegally in a tiny cage on a farm for many years.',
      ko: '두 마리 아기곰은 수년간 농장의 작은 우리안에서 불법으로 길러진후에 구조 되었다.',
    },
    {
      en: 'To help the bears restore their natural instincts, we carried out some special activities known as “behavioral enrichment.”',
      ko: '곰들이 본연의 본능을 회복하게 도와주기 위해서, 우리는 behavioral enrichment (행동의 다양성강화)로 알려진 특별한 동작들을 시행했다.',
    },
    {
      en: 'For example, we made honey-log feeders for the bears.',
      ko: '예를 들어 우리는 통나무 꿀 먹이통을 만들었다.',
    },
    {
      en: 'First, we made several holes in a log and filled them with honey.',
      ko: '먼저 통나무에 구멍을 몇 개 내고 그 안에 꿀을 채워 넣었다.',
    },
    {
      en: 'Then, we hung the honey-log feeders on trees near the bears’ habitat.',
      ko: '그리고 나서 먹이통을 곰들의 서식지 옆에 나무에 걸어 두었다.',
    },
    {
      en: 'As bears are intelligent and curious creatures, they can become bored and stressed when lacking mental and physical stimulation.',
      ko: '곰은 똑똑하고 호기심 많은 동물이므로 정신적이고 육체적 자극이 없으면 곧 지루해 한다.',
    },
    {
      en: 'The honey-log feeders stimulate their natural curiosity and keep them as active as they would be in the wild.',
      ko: '통나무 꿀 먹이통은 그들의 본능적인 호기심을 자극하고 야생에서만큼 활동적이 되도록 해준다.',
    },
    {
      en: 'After a while, Ben and Lily approached the feeders and started eating the honey inside.',
      ko: '잠시 후 Ben과 Lily는 먹이통으로 다가가서 그 안에 있는 꿀을 먹기 시작했다.',
    },
    {
      en: 'They are so cute!',
      ko: '정말 귀여웠다.',
    },
  ];

  const handleClickToggle = () => {
    setIsTranslated(!isTranslated);
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='1'
          isChecked={isTranslated}
          onClick={handleClickToggle}
          isTranslation
          width={64}
          height={32}
          buttonSize={25}
          clickedLeft={33}
        />
      </ListHeader>
      <Scroll tabIndex={102}>
        <List<ITranslation>
          data={contents}
          row={({ value, index = 1 }) => (
            <BoxWrap>
              <Box>
                <Typography tabIndex={Number(`1${index}2`)} size={EStyleFontSizes.MEDIUM} weight={value?.en === 'July 30, Tuesday' ? 'bold' : ''}>
                  {value?.en}
                </Typography>
                <Box height='108px'>
                  <Typography tabIndex={Number(`1${index}3`)} size={EStyleFontSizes['X-MEDIUM']} color={'var(--color-blue-900)'}>
                    {isTranslated && value?.ko}
                  </Typography>
                </Box>
              </Box>
            </BoxWrap>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default P03;
