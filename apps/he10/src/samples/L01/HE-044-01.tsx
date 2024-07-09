import { useState } from 'react';
import {
  Box,
  Image,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  List,
  BoxWrap,
  IAudioPlayerProps,
  Radio,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

const HE04401 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '2',
    text: 'Check all that are mentioned in the talk.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    right: -5,
    top: -5,
  };

  const [radio, setRadio] = useState<number | null>(null);
  const handleRadio = (index: number) => {
    setRadio(index);
  };

  const [radio2, setRadio2] = useState<number | null>(null);
  const handleRadio2 = (index: number) => {
    setRadio2(index);
  };

  const data = [
    'About the 40,000 cultural heritage piece on display',
    'Iconic treasures like the gold crown and pottery from Goryeo',
    'Special exhibition of items from the Vienna Museum of Art History',
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start' useExtend>
      <BoxWrap>
        <Box width='211px' padding='10px'>
          {/* 폰트 사이즈 32px 없음 */}
          <Typography width='160px' weight={800} color='#275CE7'>
            National Museum of Korea
          </Typography>
        </Box>
        <Box height='100%' width='calc(100% - 235px)'>
          <List data={data} gap={4}>
            {({ value, index = 1 }) => (
              <Radio type={'circle'} name={'radio-question-A'} label={value} value={radio === index} onClick={() => handleRadio(index)} />
            )}
          </List>

          <Box marginTop='10px' display='flex'>
            <Typography weight={700}>Notice :</Typography>

            <Box width='calc(100% - 129px)' marginLeft='8px'>
              <Radio type={'circle'} name={'radio-question-B'} label={'No photography'} value={radio2 === 0} onClick={() => handleRadio2(0)} />
              <Radio type={'circle'} name={'radio-question-B'} label={'No flash'} value={radio2 === 1} onClick={() => handleRadio2(1)} />
              <Box marginLeft='0px'>
                <Radio
                  type={'circle'}
                  name={'radio-question-B'}
                  label={'Turn off mobile phones'}
                  value={radio2 === 2}
                  onClick={() => handleRadio2(2)}
                />
              </Box>
            </Box>
          </Box>

          <Box marginTop='10px'>
            {/* 폰트 사이즈 22px 없음 */}
            <Typography size={EStyleFontSizes.SMALL} weight={700} color='var(--color-grey-600)'>
              Enjoy our remarkable collection!
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
      <BackgroundImage>
        <Image src={'/example/HE2-L03-C04-A02-2.png'} alt='국립중앙박물관 전경' width='1000px' height='412px' />
      </BackgroundImage>
    </Container>
  );
};

const BackgroundImage = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  z-index: -1;
`;

export default HE04401;
