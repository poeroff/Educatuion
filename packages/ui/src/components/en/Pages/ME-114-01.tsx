import { Box, BoxWrap, IAudioPlayerProps, IQuestionProps, Image, List, PinchZoom, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

export interface IData {
  label?: string;
  labelColor?: string;
  content: string | React.ReactNode;
  isTitle?: boolean;
  color?: string;
}

interface IME11401 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  imgSrc: string;
  imgAlt: string[];
  imgWidth?: string;
  labelWidth?: string;
  data: IData[];
  labelAlign?: 'center' | 'left' | 'right';
}

const ME11401 = ({
  headerInfo,
  questionInfo,
  audioInfo,
  imgSrc,
  imgAlt,
  imgWidth = '300px',
  labelWidth = '30%',
  data,
  labelAlign = 'center',
}: IME11401) => {
  return (
    <Container bodyId='targetContainer' headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='center'>
      <BoxWrap useFull>
        <Box>
          <PinchZoom>
            <Image src={imgSrc} width={imgWidth} />
            <Box type='hidden' id='img_desc'>
              {imgAlt.map((alt, index) => (
                <p key={index}>{alt}</p>
              ))}
            </Box>
          </PinchZoom>
        </Box>
        <Box>
          <List<IData>
            data={data}
            row={({ value, index }) => {
              return value?.isTitle ? (
                <Box textAlign='center' padding='6px 11px'>
                  <Typography color={value.color} fontWeight='var(--font-weight-bold)'>
                    {value?.content}
                  </Typography>
                </Box>
              ) : (
                <Box display='flex'>
                  {value?.label && (
                    <Box vAlign='baseline' key={index} width={labelWidth} textAlign={labelAlign}>
                      <Box width='100%' padding='6px 11px'>
                        <Typography color={value.labelColor ?? 'var(--color-grey-700)'} fontWeight='var(--font-weight-bold)' useGap={false}>
                          {value.label}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Box flex={1}>
                    <Typography usePre>{value?.content}</Typography>
                  </Box>
                </Box>
              );
            }}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default ME11401;
