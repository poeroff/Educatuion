import { Box, BoxWrap, IQuestionProps, List, ListHeader, Scroll, TMainHeaderInfoTypes, ToggleButton, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';
import { contentInfo } from './contentInfo';

interface IListenAndAnswer {
  originText: string;
  translation: string;
  label?: string;
  labelColor?: string;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Amazing Facts About the World (2)',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = contentInfo.P03.body;

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              {value?.labelColor && value?.label ? (
                <Box width='145px' textAlign='center' background={value?.labelColor} height='fit-content' padding='4px 0' borderRadius='8px'>
                  <Typography useGap={false} weight='var(--font-weight-bold)'>
                    {value?.label}
                  </Typography>
                </Box>
              ) : (
                <Box width='145px' textAlign='center' height='fit-content' padding='4px 0' borderRadius='8px'></Box>
              )}
              <Box>
                <Typography useGap={true}>{value?.originText}</Typography>
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
