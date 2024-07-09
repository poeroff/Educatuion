import { Box, BoxWrap, Image, Typography, EImageType, Label, Input, Button, Tag, EStyleButtonTypes, ETagLine } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01506 = () => {
  const [value, setValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  return (
    <HContainer headerInfo={null} vAlign='flex-start' useExtend>
      <BoxWrap>
        <Box>
          <Typography>고대 중국의 수학책인 『구장산술』에는 '부러진 대나무 문제'가 실려 있다.</Typography>
          <Box fontSize='var(--font-size-20)' padding='16px 24px' background='var(--color-yellow-100)' useRound>
            높이가 9자인 대나무가 바람에 부러져서 그 끝이 대나무로부터 3자 떨어진 곳에 닿았다.
          </Box>
          <Typography>
            오른쪽 그림과 같이 대나무가 부러져서 생긴 두 부분의 길이를 각각 <MathExpression equation={`$x$`} />
            자와 <MathExpression equation={`$y$`} />
            자라 하자.
          </Typography>
        </Box>
        <Box>
          <Image
            type={EImageType.IMG}
            src='/example/HM-015-06/HM_015_06.png'
            width='226px'
            height='218px'
            alt='대나무가 부러져서 생긴 직각삼각형 모양에서 밑변의 길이는 3자, 높이는 x자, 빗변의 길이는 y자로 표시한 그림이다.'
          />
        </Box>
      </BoxWrap>
      <Box marginTop='24px' vAlign='center'>
        <Typography fontWeight='var(--font-weight-bold)' color='var(--color-grey-700)'>
          활동
        </Typography>
        <Label type='math_icon' value={1} background='var(--color-h-math-difficulty)' />
        <Typography fontWeight='var(--font-weight-regular)'>
          대나무의 높이가 9자임을 이용하여 <MathExpression equation={`$x$`} />와 <MathExpression equation={`$y$`} />에 대한 방정식을 세워보자.
        </Typography>
      </Box>
      <BoxWrap marginTop='24px' justifyContent='flex-end' alignItems='center'>
        <Box>
          <Label size='x-small' value='답' shape='square' type='paint' background='var(--color-h-math-primary-normal)' color='var(--color-white)' />
        </Box>
        <Box>
          <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='210px' ariaLabel={`답 입력란`} />
        </Box>
      </BoxWrap>
      {value.length > 0 && (
        <Box marginTop='40px'>
          <Button color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
            <Tag type={ETagLine.GREEN} label='풀이' fontSize='24px' height='38px' useTypoPadding={false} />
          </Button>
          {show && (
            <Box marginTop='22px'>
              <Typography weight='var(--font-weight-medium)'>
                <MathExpression equation={'$x+y=9$'} />
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </HContainer>
  );
};

export default HM01506;
