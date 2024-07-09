import React from 'react';

import { Box, BoxWrap, Image, Label, Scroll, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM02801 = () => {
  const terms = ['a^2', 'b^2', 'c^2', '2ab', '2bc', '2ca'];

  return (
    <HContainer headerInfo={null}>
      <Scroll tabIndex={0}>
        <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)' lineHeight='50px'>
          곱셈 공식과 도형의 넓이
        </Typography>
        <Box marginTop='24px'>
          <Typography lineHeight='42px'>
            곱셈공식
            <Box marginLeft={60}>
              <MathExpression equation={`$(a+b+c)^2=a^2+b^2+c^2+2ab+2bc+2ca$`} />
            </Box>
            는 다음과 같이 직사각형의 넓이를 이용하여 확인할 수도 있다.
          </Typography>
        </Box>

        <BoxWrap marginTop='24px'>
          <Box flex={1}>
            <Typography lineHeight='42px'>
              오른쪽 그림은 한 변의 길이가 <MathExpression equation={`$a+b+c$`} />인 정사각형을 9개의 직사각형으로 자른 것이다.
            </Typography>
            <Box marginTop='12px'>
              <Box>
                <Typography>
                  <Label
                    value={1}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  의 넓이:&nbsp;
                  <Typography useGap={false} useSticker>
                    <MathExpression equation={`$a×a=a^2$`} />
                  </Typography>
                  ,
                </Typography>
                <Typography>
                  <Label
                    value={2}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  ,
                  <Label
                    value={4}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  의 넓이:&nbsp;
                  <Typography useGap={false} useSticker>
                    <MathExpression equation={`$a×b=ab$`} />
                  </Typography>
                </Typography>
              </Box>
              <Box>
                <Typography>
                  <Label
                    value={5}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  의 넓이:&nbsp;
                  <Typography useGap={false} useSticker>
                    <MathExpression equation={`$b×b=b^2$`} />
                  </Typography>
                  ,
                </Typography>
                <Typography>
                  <Label
                    value={6}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  ,
                  <Label
                    value={8}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  의 넓이:&nbsp;
                  <Typography useGap={false} useSticker>
                    <MathExpression equation={`$b×c=bc$`} />
                  </Typography>
                </Typography>
              </Box>
              <Box>
                <Typography>
                  <Label
                    value={9}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  의 넓이:&nbsp;
                  <Typography useGap={false} useSticker>
                    <MathExpression equation={`$c×c=c^2$`} />
                  </Typography>
                  ,
                </Typography>
                <Typography>
                  <Label
                    value={3}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  ,
                  <Label
                    value={7}
                    size='x-small'
                    svgWidth={24}
                    svgHeight={24}
                    lineColor='var(--color-grey-900)'
                    cssStyle={{ verticalAlign: '4px' }}
                  />
                  의 넓이:&nbsp;
                  <Typography useGap={false} useSticker>
                    <MathExpression equation={`$c×a=ca$`} />
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Image
              src='/example/HM-028-01/M1-1-1-02-01.png'
              width='239px'
              height='245px'
              alt='한 변의 길이가 a+b+c인 정사각형을 넓이가 , , , , , 인 직사각형으로 잘라 각 직사각형에 1번부터 9번까지 번호를 붙인 그림이다'
            />
          </Box>
        </BoxWrap>
        <Box marginTop='24px'>
          <Typography>
            큰 정사각형의 넓이는&nbsp;
            <Typography useGap={false} useSticker>
              <MathExpression equation={`$(a+b+c)^2$`} />
            </Typography>
            이므로 다음이 성립한다.
            <Box marginLeft='50px' marginTop='9px'>
              <MathExpression equation={`$(a+b+c)^2=$`} />
              {terms.map((term, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ' + '}
                  <Typography useGap={false} useSticker>
                    <MathExpression equation={`$${term}$`} />
                  </Typography>
                </React.Fragment>
              ))}
            </Box>
          </Typography>
        </Box>
      </Scroll>
    </HContainer>
  );
};

export default HM02801;
