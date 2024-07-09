import { Box, BoxWrap, Label, List, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM01202 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFormEvl',
  };

  const data = [
    '(2x+3)^3=8x^3+36x^2+54x+27',
    '(2x-y)(4x^2+2xy+y^2)=8x^3-y^3',
    '(3x+y-z)^2=9x^2+y^2+z^2+6xy-2yz-6zx',
    '(x+2)(x^2-4x+4)=x^3+8',
    '(3x-y)^3=27x^3-9x^2y+27xy^2-y^3',
  ];

  return (
    <HContainer vAlign='flex-start' headerInfo={headerInfo} useExtend submitLabel='채점하기' onSubmit={() => {}}>
      <Box marginLeft={12}>
        <Box padding='4px 12px'>
          <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px' weight={'var(--font-weight-semiBold)'}>
            <Typography useGap={false} color='var(--color-h-math-primary-normal)' fontSize='var(--font-size-36)' weight='var(--font-weight-semiBold)'>
              1
            </Typography>
            &nbsp; 다음 중에서 옳지{' '}
            <Typography textDecoration='underline' useGap={false} fontSize='var(--font-size-32)'>
              않은
            </Typography>{' '}
            것은?
          </Typography>
        </Box>
        <Box marginTop='24px' useFull>
          <List gap={0} data={data}>
            {({ value, index }) => (
              <Box key={index} vAlign='center' height='50px' marginBottom='12px'>
                <Box vAlign='center' padding={12}>
                  <Label value={index} size='x-small' />
                </Box>
                <Typography>
                  <MathExpression equation={`\\(${value}\\)`} />
                </Typography>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </HContainer>
  );
};
export default HM01202;
