import { ReactNode } from 'react';
import { Box, EStyleFontSizes, Label, List, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface ISentence {
  text: string | ReactNode;
}

interface IME11301 {
  headerInfo: TMainHeaderInfoTypes;
  mainText: string;
  subText?: string;
  title: string;
  sentence: ISentence[];
}

const ME11301 = ({ headerInfo, mainText, subText, title, sentence }: IME11301) => {
  return (
    <Container headerInfo={headerInfo} vAlign='flex-start'>
      <Scroll tabIndex={0}>
        <Box height='48px' vAlign='center' justifyContent='space-between'>
          <Box background='var(--color-blue-1200)' borderRadius='0 32px 32px 0' padding='2px 10px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-white)'>
              {mainText}
            </Typography>
          </Box>
          {subText && (
            <Box useRound border='2px solid var(--color-yellow-600)' padding='2px 10px' marginTop={'5px'}>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>{subText}</Typography>
            </Box>
          )}
        </Box>
        <Box vAlign='start' flexDirection='column' padding='10px 0' marginTop='24px'>
          <Box vAlign='center' marginBottom='24px'>
            <Box padding='26px 10px'>
              <Label background='var(--color-blue-500)' type='paint' size='xx-small' />
            </Box>
            <Typography fontSize='32px' lineHeight='48px' weight='var(--font-weight-bold)'>
              {title}
            </Typography>
          </Box>
          <List
            gap={10}
            data={sentence}
            row={({ value }) => (
              <Box vAlign='flex-start'>
                <Box padding='4px 12px' marginRight='8px'>
                  <Label background='var(--color-black)' type='paint' size='xxx-small' />
                </Box>
                <Typography>{value?.text}</Typography>
              </Box>
            )}
          />
        </Box>
      </Scroll>
    </Container>
  );
};

export default ME11301;
