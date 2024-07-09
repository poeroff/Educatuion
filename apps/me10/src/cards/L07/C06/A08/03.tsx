import { useState } from 'react';
import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  ListHeader,
  Typography,
  ToggleButton,
  EStyleFontSizes,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  interface IListenAndAnswer {
    label?: string;
    labelColor?: string;
    originText: string;
    translation: string;
  }

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Amazing Facts About the World (5)`,
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'Thanks, Joe.',
      translation: '고마워요, Joe.',
    },
    {
      originText: 'We have two winners today.',
      translation: '오늘 우승자가 두 명 있네요.',
    },
    {
      originText: 'Congratulations, Namjun and Sara!',
      translation: '축하합니다, 남준과 사라!',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 숨기기' : '해석 보기'}
        />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box minWidth='84px' textAlign='left' color={value?.labelColor} height='fit-content' borderRadius='8px'>
                <Typography weight='var(--font-weight-bold)'>{value?.label || ``}</Typography>
              </Box>
              <Box>
                <Typography>{value?.originText}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen && value?.translation}
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
