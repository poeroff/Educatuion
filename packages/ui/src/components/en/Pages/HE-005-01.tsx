import {
  Box,
  BoxWrap,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  List,
  ListHeader,
  Scroll,
  TMainHeaderInfoTypes,
  ToggleButton,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

export interface IHE00501 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  data: IListenAndAnswer[];
}

export interface IListenAndAnswer {
  label?: string;
  labelColor?: string;
  originText: React.ReactNode;
  translation: React.ReactNode;
  inLine?: boolean;
  isTitle?: boolean;
  isGap?: boolean;
}

const HE00501 = ({ headerInfo, questionInfo, audioInfo, data }: IHE00501) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 숨기기' : '해석 보기'}
        />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer> data={data}>
          {({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              {value?.label && (
                <Box padding={'4px 0px'}>
                  <Label value={value?.label} type={'paint'} background={value?.labelColor} />
                </Box>
              )}
              <Box marginLeft={value?.inLine ? '51px' : '0px'}>
                {value?.isTitle ? (
                  <Typography fontWeight='var(--font-weight-extraBold)'>{value?.originText}</Typography>
                ) : (
                  <Typography>
                    {value?.isGap ? '\u00A0\u00A0' : ''}
                    {value?.originText}
                  </Typography>
                )}

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
    </Container>
  );
};

export default HE00501;
