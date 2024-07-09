import { Box, Typography, SvgIcon, ESvgType, Label, BoxWrap } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icons/do_together.svg';

const HM01701 = () => {
  return (
    <HContainer headerInfo={null}>
      <Box>
        <Typography fontSize='var(--font-size-32)' fontWeight='var(--font-weight-semiBold)' lineHeight='50px'>
          <Box display='inline-flex' marginRight='8px'>
            <SvgIcon src={headerIcon} type={ESvgType.IMG} />
          </Box>
          세 다항식 <MathExpression equation={`$A=x^2-xy+2y^2, B=-3xy+y^2, C=4xy$`} />가 있다.
        </Typography>
      </Box>

      <Box marginTop='24px'>
        <Box vAlign='center'>
          <Label value={1} type='rhombus' background='var(--color-h-math-primary-normal)' cssStyle={{ marginLeft: 12 }} />
          <Typography>
            <MathExpression equation={`$A+B$`} />와 <MathExpression equation={`$B+A$`} />를 계산하고, 그 결과를 비교해 보자.
          </Typography>
        </Box>
        <BoxWrap boxGap={12} marginLeft='171px'>
          <Box>
            <Typography>
              <MathExpression equation={`$A+B=$`} />
              <Typography useSticker>
                <MathExpression equation={`$x^2-4xy+3y^2$`} />
              </Typography>
              ,
            </Typography>
          </Box>
          <Box>
            <Typography>
              <MathExpression equation={`$B+A=$`} />
              <Typography useSticker>
                <MathExpression equation={`$x^2-4xy+3y^2$`} />
              </Typography>
            </Typography>
          </Box>
        </BoxWrap>
        <Box marginLeft='171px'>
          <Typography>
            따라서&nbsp;
            <MathExpression equation={`$A+B$`} />
            <Typography useGap={false} useSticker>
              +
            </Typography>
            <MathExpression equation={`$B+A$`} />
          </Typography>
        </Box>
      </Box>

      <Box marginTop='24px'>
        <Box vAlign='center'>
          <Label value={2} type='rhombus' background='var(--color-h-math-primary-normal)' cssStyle={{ marginLeft: 12 }} />
          <Typography>
            <MathExpression equation={`$(A+B)+C$`} />와 <MathExpression equation={`$A+(B+C)$`} />를 계산하고, 그 결과를 비교해 보자.
          </Typography>
        </Box>
        <Box marginLeft='183px'>
          <Typography lineHeight='50px'>
            <MathExpression equation={`$(A+B)+C=$`} />
            <Typography useSticker useGap={false}>
              <MathExpression equation={`$x^2-4xy-3y^2$`} />
            </Typography>
            <MathExpression equation={`$+4xy=$`} />
            <Typography useSticker useGap={false}>
              <MathExpression equation={`$x^2+3y^2$`} />
            </Typography>
            ,
            <MathExpression equation={`$A+(B+C)=x^2-xy+2y^2+$`} />
            <Typography useSticker useGap={false}>
              <MathExpression equation={`$xy+y^2$`} />
            </Typography>
            <MathExpression equation={`$=$`} />
            <Typography useSticker useGap={false}>
              <MathExpression equation={`$x^2+3y^2$`} />
            </Typography>
          </Typography>

          <Typography>
            따라서
            <MathExpression equation={`$(A+B)+C$`} />
            <Typography useSticker useGap={false}>
              +
            </Typography>
            <MathExpression equation={`$A+(B+C)$`} />
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM01701;
