import { useState } from 'react';

import { Box, EStampType, ESvgType, ETagLine, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, Stamp } from '@maidt-cntn/ui/math';

import XIcon from '@/assets/icons/x_icon.svg';

const HM02701 = () => {
  const [stamp, setStamp] = useState<boolean | null>(null);

  return (
    <HContainer headerInfo={null} submitLabel='채점하기' onSubmit={() => {}} vAlign='flex-start'>
      <Typography fontSize='var(--font-size-32)' lineHeight='50px' weight='var(--font-weight-semiBold)' usePre>
        <Typography
          useGap={false}
          color='var(--color-h-math-primary-normal)'
          fontSize='var(--font-size-36)'
          weight='var(--font-weight-extraBold)'
          lineHeight='48px'
        >
          1
        </Typography>
        &nbsp;다항식&nbsp;
        <MathExpression equation={'$2x+x^2-3x^3+4$'} />
        를&nbsp;
        <MathExpression equation={'$x$'} />에 대하여 내림차순으로 정리하면&nbsp;
        <Box marginLeft={50}>
          <MathExpression equation={'$4+2x+x^2-3x^3$'} />
        </Box>
        이다.
      </Typography>

      <Box hAlign='space-between' marginTop='24px' paddingInline={200}>
        <Stamp stampType={EStampType.O} height='108px' isClicked={!!stamp} onClick={() => setStamp(true)} />
        <Stamp stampType={EStampType.X} height='108px' isClicked={stamp === false} onClick={() => setStamp(false)} />
      </Box>

      <Box marginTop='24px' hAlign='flex-start'>
        <Box marginRight='24px'>
          <Tag type={ETagLine.GREEN} label='정답' fontSize='24px' height='38px' useTypoPadding={false} />
        </Box>
        <SvgIcon type={ESvgType.IMG} src={XIcon} size='18px' alt='X' />
      </Box>
      <Box marginTop='8px' display='flex'>
        <Box margin='5px 8px 0 0'>
          <Tag type={ETagLine.GREEN} label='풀이' fontSize='24px' height='38px' useTypoPadding={false} />
        </Box>

        <Typography color='var(--color-h-math-primary-strong)' weight='var(--font-weight-bold)'>
          다항식&nbsp;
          <MathExpression equation={'$2x+x^2-3x^3+4$'} />
          를&nbsp;
          <MathExpression equation={'$x$'} />에 대하여 내림차순으로 정리하면
          <MathExpression equation={'$-3x^3+x^2+2x+4$'} />
          이다.
        </Typography>
      </Box>
    </HContainer>
  );
};
export default HM02701;
