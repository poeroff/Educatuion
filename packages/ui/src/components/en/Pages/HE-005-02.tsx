import {
  Box,
  BoxWrap,
  IAudioPlayerProps,
  IQuestionProps,
  List,
  ListHeader,
  Scroll,
  TMainHeaderInfoTypes,
  ToggleButton,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

interface IData {
  label?: string;
  labelColor?: string;
  labelbgColor?: string;
  content: string | React.ReactNode;
  desc: string | React.ReactNode;
  isTitle?: boolean;
  color?: string;
}

interface IHE00502 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  labelAlign?: 'center' | 'left' | 'right';
  data: IData[];
}

const HE00502 = ({ headerInfo, questionInfo, audioInfo, labelAlign = 'center', data }: IHE00502) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='center'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IData>
          data={data}
          row={({ value }) =>
            value?.isTitle ? (
              <Box textAlign='center'>
                <Typography color={value.color} fontWeight='var(--font-weight-bold)'>
                  {value.content}
                </Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen && value.desc}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <BoxWrap boxGap={10}>
                <Box
                  width='145px'
                  padding='4px 0'
                  textAlign={labelAlign}
                  color={value?.labelColor ?? 'var(--color-grey-700)'}
                  background={value?.labelbgColor}
                  height='fit-content'
                  borderRadius='8px'
                >
                  <Typography useGap={false} weight='var(--font-weight-bold)'>
                    {value?.label}
                  </Typography>
                </Box>
                <Box width='800px'>
                  <Typography useGap={true}>{value?.content}</Typography>
                  <Box height='72px'>
                    <Typography color={'var(--color-blue-900)'} fontSize='var(--font-size-22)' lineHeight='var(--font-size-32)'>
                      {isOpen && value?.desc}
                    </Typography>
                  </Box>
                </Box>
              </BoxWrap>
            )
          }
        />
      </Scroll>
    </Container>
  );
};

export default HE00502;
