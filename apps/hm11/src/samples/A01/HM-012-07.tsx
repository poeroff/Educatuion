import { Box, BoxWrap, EStyleFontSizes, Label, Typography, Image, Radio } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM01207 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBenefit',
  };

  const data = [9, 13, 15, 18, 19];

  return (
    <HContainer vAlign='flex-start' headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => {}}>
      <BoxWrap>
        <Box>
          <Typography fontSize='var(--font-size-32)' lineHeight='48px' weight='var(--font-weight-semiBold)'>
            <Typography useGap={false} color='var(--color-h-math-primary-normal)' fontSize='var(--font-size-36)' weight='var(--font-weight-semiBold)'>
              4
            </Typography>
            &nbsp; 오른쪽 그림과 같이 길이가 12m인 철망으로 직사각형 모양의 텃받을 만들려고 한다. 벽에는 철망을 사용하지 않을 때, 이 텃밭의 최대
            넓이는?
          </Typography>
          <Box>
            <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-900)'>
              (단, 철망의 두께는 생각하지 않는다.)
            </Typography>
          </Box>
        </Box>
        <Box>
          <Image
            src='/example/HM-012-07/D1-2-2-02-10.png'
            alt='오른쪽 그림은 직사각형 모양의 텃밭이 있다. 텃밭의 위쪽은 벽으로 막혀있다.'
            width='310px'
            height='194px'
          />
        </Box>
      </BoxWrap>

      <Box marginTop='24px' vAlign='center' flexWrap='wrap' gap='12px 24px'>
        {data.map((value, index) => (
          <Radio name='radio-group' gap={0} type='square' key={`radio-group-${index}`}>
            <Box width='268px' key={index} vAlign='center'>
              <Label svgWidth={24} svgHeight={24} fontSize={20} value={index + 1} />
              &nbsp;
              <Typography useGap={false}>
                <MathExpression equation={`$${value}m^2$`} />
              </Typography>
            </Box>
          </Radio>
        ))}
      </Box>
    </HContainer>
  );
};
export default HM01207;
