import styled from '@emotion/styled';
import { Box, Label, List, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM01202 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFormEvl',
  };

  const data = ['3x^3-8x+12', '3x^3+2x+9', '3x^3+6x+21', '5x^3-x+15', '5x^3+3x+11'];

  return (
    <HContainer headerInfo={headerInfo} useExtend submitLabel='채점하기' onSubmit={() => {}} vAlign='flex-start'>
      <Box marginLeft={12}>
        <Box padding='4px 12px'>
          <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px' weight={'var(--font-weight-semiBold)'}>
            <Typography
              useGap={false}
              color='var(--color-h-math-primary-normal)'
              fontSize='var(--font-size-36)'
              weight='var(--font-weight-extraBold)'
            >
              3
            </Typography>
            &nbsp; 다음 세 다항식에 대하여
            <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-bold)'>
              <MathExpression equation={'$2(A+B)-(3B-C)$'} />
            </Typography>
            를 계산하면?
          </Typography>
        </Box>
        <Box marginTop='24px' hAlign='center'>
          <Box padding={12} useRound columnGap={12} useShadow>
            <Typography>
              <MathExpression equation={'$A=x^3-x^2+2x+4$'} />,
            </Typography>
            <Typography>
              <MathExpression equation={'$B=-2x^2-3x+5$'} />,
            </Typography>
            <Typography>
              <MathExpression equation={'$C=x^3-5x+6$'} />
            </Typography>
          </Box>
        </Box>
        <ListWrapper>
          <List gap={0} data={data} align='horizontal'>
            {({ value, index }) => (
              <Box key={index} vAlign='center' height='50px' width='292px' marginBottom={12} marginRight={24}>
                <Box vAlign='center' padding={12}>
                  <Label value={index} size='x-small' />
                </Box>
                <Typography>
                  <MathExpression equation={`\\(${value}\\)`} />
                </Typography>
              </Box>
            )}
          </List>
        </ListWrapper>
      </Box>
    </HContainer>
  );
};
export default HM01202;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  ul {
    width: 948px;
  }
`;
