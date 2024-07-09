import { Box, BoxWrap, List, Radio, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01206 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: (
      <>
        <Box backgroundColor='var(--color-h-math-blue-strong)' color='var(--color-white)' borderRadius='50px' padding='0 12px'>
          맞춤형
        </Box>
      </>
    ),
    headerTextColor: 'var(--color-white)',
    headerPattern: 'icon',
    iconType: 'mathWrapUp',
    useExtend: true,
  };
  const data = [{ equation: 'y=x^2-3x+2' }, { equation: 'y=x^2+4x+6' }, { equation: 'y=x^2-6x+9' }];
  const [radio, setRadio] = useState<number>(0);
  const handleClick = (index: number) => {
    setRadio(index);
  };
  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => {}}>
      <Box useFull>
        <Box padding='7px 0'>
          <Typography useGap={false} fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)'>
            <Typography useGap={false} color='var(--color-grey-500)' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
              0
            </Typography>
            <Typography useGap={false} color='#D57E2F' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
              1
            </Typography>
            &nbsp; 다음 이차함수의 그래프와 <MathExpression equation={'$x$'} />
            축의 위치 관계를{' '}
            <Typography
              useGap={false}
              fontSize='var(--font-size-32)'
              weight='var(--font-weight-semiBold)'
              underlineColor='var(--color-h-math-purple-strong)'
            >
              말하시오
            </Typography>
            .
          </Typography>
        </Box>
        <Box>
          {data.map((value, idx) => {
            return (
              <BoxWrap marginTop={24}>
                <Typography>
                  ({idx + 1})&nbsp;
                  <MathExpression equation={`$${value.equation}$`} />
                </Typography>
                <Typography>
                  <List gap={5} align='horizontal' data={['(서로 다른 두 점에서 만난다,', '한 점에서 만난다,', '만나지 않는다)']}>
                    {({ value, index = 1 }) => (
                      <Radio name={'radio-group'} onClick={() => handleClick(index - 1)}>
                        <Typography useGap={false} color='var(--color-grey-800)'>
                          {value}
                        </Typography>
                      </Radio>
                    )}
                  </List>
                </Typography>
              </BoxWrap>
            );
          })}
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM01206;
