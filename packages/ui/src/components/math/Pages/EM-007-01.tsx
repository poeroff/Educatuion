import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import EM00701question from '@/assets/icon/EM00701question-mark.svg';

export interface IExplainInfo {
  explainImgSrc?: string;
  explainImgAlt?: string;
  explainInfo: IQuestionProps;
}

export interface IEM00701 {
  explainInfo: IExplainInfo;
  questionText: string;
  backgroundStyle?: { bottom?: string; right?: string };
}

const EM00701 = ({ explainInfo, questionText, backgroundStyle }: IEM00701) => {
  return (
    <Container headerInfo={null} questionInfo={explainInfo.explainInfo} background={'var(--color-white)'} useRound useExtend useScroll={false}>
      <Box useFull marginTop={4}>
        <Box display='flex' marginLeft={40} position='relative' zIndex={1}>
          <Box marginTop='10px'>
            <SvgIcon src={EM00701question} size='35px' />
          </Box>
          <Typography usePre color='var(--color-red-900)' fontSize='36px' lineHeight='50px'>
            {questionText}
          </Typography>
        </Box>
      </Box>
      {explainInfo?.explainImgSrc && (
        <BackgroundImage bottom={backgroundStyle?.bottom} right={backgroundStyle?.right}>
          <Image src={explainInfo.explainImgSrc} alt={explainInfo.explainImgAlt} width='560px' height='auto' />
        </BackgroundImage>
      )}
    </Container>
  );
};

export const BackgroundImage = styled.div<{ bottom?: string; right?: string }>`
  position: absolute;
  bottom: ${props => props.bottom || '0px'};
  right: ${props => props.right || '-16px'};
`;

export default EM00701;
