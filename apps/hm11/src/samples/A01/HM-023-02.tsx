import { useState } from 'react';

import { Box, BoxWrap, IQuestionProps, Image, Input, Label, PinchZoom, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM02302 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCreativeUpProject',
    headerText: '평면도 속 교실의 넓이, 다항식으로 구해 보자!',
    headerTextColor: 'var(--color-h-math-blue-strong)',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='50px' weight='var(--font-weight-semiBold)'>
        <Box display='inline-flex' alignItems='center'>
          <Typography useGap={false} color='var(--color-h-math-blue-strong)' weight='var(--font-weight-bold)'>
            활동
          </Typography>
          <Label value={5} type='rhombus' background='var(--color-h-math-blue-strong)' cssStyle={{ margin: '0 12px 0 4px' }} />
          <Typography useGap={false} color='var(--color-h-math-blue-strong)' weight='var(--font-weight-bold)'>
            활동
          </Typography>
          <Label value={4} type='rhombus' background='var(--color-h-math-blue-strong)' cssStyle={{ marginLeft: 4 }} />
        </Box>
        &nbsp;에서 구한 <MathExpression equation={`$x$`} />와 <MathExpression equation={`$y$`} />의 값을 이용하여 컴퓨터실, 음악실, 미술실, 과학실의
        넓이를 구해 보자.
      </Typography>
    ),
  };

  return (
    <HContainer headerInfo={headerInfo} questionInfo={questionInfo} useExtend submitLabel='채점하기' onSubmit={() => {}}>
      <PinchZoom>
        <Box background='var(--color-grey-100)' height='204px' hAlign='center' useRound>
          <Image
            src={'/example/HM-022-01/_M1-1-창-01.png'}
            width='306px'
            height='180px'
            alt='학교 건물의 평면도에 왼쪽부터 컴퓨터실, 음악실, 복도, 미술실, 과학실의 5개의 공간이 그려져 있습니다.'
          />
        </Box>
      </PinchZoom>

      <BoxWrap justifyContent='center' marginTop={24}>
        <Box vAlign='flex-end' flexDirection='column'>
          <Box>
            <Typography>
              (컴퓨터실의 넓이) =
              <Input value={value1} onChange={e => setValue1(e.target.value)} width='100px' ariaLabel='답 입력란' />
              &#13217;
            </Typography>
          </Box>
          <Box marginTop={12}>
            <Typography>
              (미술실의 넓이) =
              <Input value={value2} onChange={e => setValue2(e.target.value)} width='100px' ariaLabel='답 입력란' />
              &#13217;
            </Typography>
          </Box>
        </Box>
        <Box vAlign='center' flexDirection='column'>
          <Box>
            <Typography>
              (음악실의 넓이) =
              <Input value={value3} onChange={e => setValue3(e.target.value)} width='100px' ariaLabel='답 입력란' />
              &#13217;
            </Typography>
          </Box>
          <Box marginTop={12}>
            <Typography>
              (과학실의 넓이) =
              <Input value={value4} onChange={e => setValue4(e.target.value)} width='100px' ariaLabel='답 입력란' />
              &#13217;
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM02302;
