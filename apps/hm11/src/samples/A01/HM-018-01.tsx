import { useState } from 'react';

import { Box, BoxWrap, List, Input, Typography, SvgIcon, ESvgType, Label } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import icBasic from '@maidt-cntn/assets/icons/icBasic.svg';

type TValues = { [index: string]: string };

const HM01801 = () => {
  const [values, setValues] = useState<TValues>({});
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: <SvgIcon src={icBasic} type={ESvgType.IMG} alt='기본' />,
    headerPattern: 'icon',
    iconType: 'mathWrapUp',
    useExtend: true,
  };

  const data = [
    {
      question: '2x^3 + xy^3 - 3x^2y^2 + 6y + 1',
      target: 'x',
    },
    {
      question: '2xy^2 + 3x^4 + 4 - x^2y +y^3',
      target: 'y',
    },
  ];

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' submitLabel='채점하기' onSubmit={() => setIsShow(!isShow)}>
      <Box padding='7px 0'>
        <Typography useGap={false} fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)'>
          <Typography useGap={false} color='var(--color-grey-500)' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
            0
          </Typography>
          <Typography useGap={false} color='#D57E2F' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
            1
          </Typography>
          &nbsp; 다음 다항식을 &#91; &#93; 안의 방법으로 정리하시오.
        </Typography>
      </Box>

      <Box marginTop={24}>
        <List gap={24} data={data}>
          {({ value: item, index = 0 }) => (
            <Box key={index}>
              <BoxWrap>
                <Box>
                  ({index})&nbsp;
                  <MathExpression equation={`$${item?.question}$`} />
                </Box>
                <Box>
                  <Typography fontSize='var(--font-size-24)' color='var(--color-grey-700)' weight='var(--font-weight-bold)'>
                    &#91;
                    <MathExpression equation={`$${item?.target}$`} />에 대하여 내림차순 &#93;
                  </Typography>
                </Box>
              </BoxWrap>

              <Box hAlign='flex-end'>
                <Box vAlign='center' marginRight='8px'>
                  <Label
                    size='x-small'
                    value='답'
                    shape='square'
                    fontSize={20}
                    type='paint'
                    background='var(--color-h-math-primary-normal)'
                    color='var(--color-white)'
                  />
                </Box>
                <Input
                  placeholder=''
                  name={`value${index}`}
                  value={values[index]}
                  onChange={e => setValues({ ...values, [index]: e.target.value })}
                  width='257px'
                  ariaLabel={`답 입력란`}
                />
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </HContainer>
  );
};

export default HM01801;
