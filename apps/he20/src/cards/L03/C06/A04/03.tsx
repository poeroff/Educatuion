import { Box, BoxWrap, EStyleFontSizes, List, ListHeader, Scroll, TMainHeaderInfoTypes, ToggleButton, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { useState } from 'react';
import { contentInfo } from './contentInfo';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'From Shadows to Spotlights (2)',
  headerPattern: 'text',
};

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const questionInfo = {
    text: 'Translations',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'}>
        <List<IListenAndAnswer>
          data={contentInfo}
          row={({ value }) => (
            <BoxWrap boxGap={10}>
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
