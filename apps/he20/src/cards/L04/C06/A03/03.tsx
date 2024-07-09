import { useState } from 'react';
import { Box, Scroll, List, ListHeader, Typography, ToggleButton, EStyleFontSizes, TMainHeaderInfoTypes, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface ITranslation {
  en: string;
  ko: string;
}

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Will AI-Powered Neural Implants Make Us Super-Humans? (1)`,
    headerPattern: 'text',
  };

  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  const questionInfo = {
    text: 'Translations',
  };

  const contents: ITranslation[] = [
    {
      en: 'Neuroscience has a long history of exploring treatments for disorders of the nervous system, including the brain and spinal cord.',
      ko: '신경과학은 뇌와 척수를 포함한 신경계 장애에 대한 치료법을 탐구해 온 오랜 역사가 있습니다.',
    },
    {
      en: 'Traditionally, researchers have studied various functions of neural implants, which are medical devices like computer chips that can be implanted in the nervous system.',
      ko: '전통적으로 연구자들은 신경계에 이식할 수 있는, 마치 컴퓨터 칩과 같은 의료 기기인 신경 임플란트의 다양한 기능을 연구해 왔습니다.',
    },
    {
      en: 'But here’s the exciting part: with the rapid advancement of artificial intelligence (AI), researchers have begun to integrate AI into neural implants.',
      ko: '하지만 흥미로운 점은 여기 있습니다. 그건 바로 인공지능(AI)의 급속한 발전과 함께 연구자들이 신경 임플란트에 AI를 통합하기 시작했다는 점입니다.',
    },
    {
      en: 'In this post, we’ll examine the incredible benefits of AI-powered neural implants, their amazing potential for the future, and the ethical concerns surrounding them.',
      ko: '이 글에서는 AI 기반 신경 임플란트의 뛰어난 장점과 미래의 놀라운 잠재력, 그리고 이를 둘러싼 윤리적 우려에 대해 살펴보겠습니다.',
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
          ariaLabel={isTranslated ? '해석 보이기' : '해석 안 보이기'}
        />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<ITranslation>
          data={contents}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box key={index}>
                <Typography>{value?.en}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
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
