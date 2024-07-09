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
  PinchZoom,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

export interface IListenAndAnswer {
  originText: string;
  translation: string;
}

interface IHE04001 {
  headerInfo: TMainHeaderInfoTypes;
  imageSrc: string;
  altText: string;
  hiddenAltText?: React.ReactNode;
  data: IListenAndAnswer[];
  isSeperate?: boolean;
}

const HE04001 = ({ headerInfo, imageSrc, altText, hiddenAltText, data, isSeperate = false }: IHE04001) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <BoxWrap useFull>
        <Box useFull maxWidth='340px' vAlign='center'>
          <PinchZoom>
            <Image size='100%' src={imageSrc} alt={altText} ariaDescribedby={hiddenAltText ? 'img_desc' : undefined} />
            {hiddenAltText && (
              <Box type='hidden' id='img_desc'>
                {hiddenAltText}
              </Box>
            )}
          </PinchZoom>
        </Box>
        {isSeperate ? (
          <Box useFull paddingTop='4px'>
            <Scroll height='420px' tabIndex={0}>
              <List<IListenAndAnswer>
                data={data}
                row={({ value }) => (
                  <Box background='white' useRound paddingBottom='28px'>
                    <Typography color='var(--color-grey-900)'>{value?.originText}</Typography>
                    <Box height='72px'>
                      {isOpen && (
                        <Typography color='var(--color-blue-900)' fontSize='22px' lineHeight='32px'>
                          {value?.translation}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
              />
            </Scroll>
          </Box>
        ) : (
          <Box background='white' useFull useRound>
            <Scroll height={'370px'} tabIndex={0}>
              <List<IListenAndAnswer> data={data}>
                {({ value, index = 1 }) => (
                  <BoxWrap boxGap={10}>
                    <Box>
                      <Typography color='var(--color-grey-900)'>{value?.originText}</Typography>
                      <Box height='72px'>
                        {isOpen && (
                          <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                            {value?.translation}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </BoxWrap>
                )}
              </List>
            </Scroll>
          </Box>
        )}
      </BoxWrap>
    </Container>
  );
};

export default HE04001;
