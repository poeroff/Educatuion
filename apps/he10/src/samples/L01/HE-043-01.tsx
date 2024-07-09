import { useState } from 'react';
import { Box, Image, Typography, TMainHeaderInfoTypes, IQuestionProps, List, BoxWrap, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

import star_yellow from '@maidt-cntn/assets/example/star_yellow.svg';

interface IData {
  text: string;
}

const HE04301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Topic Preview',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the reviews of Gathering of the Whakapapa.',
  };

  const [list] = useState<IData[]>([
    {
      text: 'This is a beautifully written tale about an old man trying to preserve the heritage of Maori people.',
    },
    {
      text: 'If you are interested in the culture of New Zealand, this is the right choice for you!',
    },
    {
      text: 'The short but touching story deals with family and vilage connections, generational differences, and the loss of cultural identity.',
    },
  ]);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box vAlign='flex-end' position='relative' margin='21px 0'>
        <List data={list} gap={10}>
          {({ value, index }) => (
            <BoxWrap key={index} borderBottom='1px solid var(--color-grey-300)' paddingBottom='10px'>
              <Box vAlign='flex-start' padding='12px 0' marginRight='12px'>
                {[...Array(5)].map((_, index) => {
                  return <SvgIcon key={index} size='17px' src={star_yellow} />;
                })}
              </Box>
              <Typography>{value?.text}</Typography>
            </BoxWrap>
          )}
        </List>
        <BackgroundImage>
          <Image src={'/example/HE1-L02-C05-A02.jpg'} alt='' />
        </BackgroundImage>
      </Box>
    </Container>
  );
};

export default HE04301;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: -32px;
  right: -54px;
`;
