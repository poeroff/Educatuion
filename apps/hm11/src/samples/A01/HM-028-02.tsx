import { Box, Label, Typography, Image, Scroll, List } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

interface IListenAndAnswer {
  content: React.ReactNode;
}

const HM02802 = () => {
  const data: IListenAndAnswer[] = [
    {
      content: (
        <>
          <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' useGap={false}>
            [그림 1]
          </Typography>
          과 같이 한 모서리의 길이가 <MathExpression equation={'\\(a\\)'} />인 정육면체 위에 한 모서리의 길이가{' '}
          <MathExpression equation={'\\(b\\)'} />인 정육면체를 붙여 부피가&nbsp;
          <Typography useGap={false} useSticker>
            <MathExpression equation={'\\(a^3+b^3\\)'} />
          </Typography>
          인 입체도형을 만든다.
        </>
      ),
    },
    {
      content: (
        <>
          <Typography fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' useGap={false}>
            [그림 1]
          </Typography>
          의 입체도형을 점선을 따라 분할한 후,&nbsp;
          <Typography fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' useGap={false}>
            [그림 2]
          </Typography>
          와 같이 이동하여&nbsp;
          <Typography fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' useGap={false}>
            [그림 3]
          </Typography>
          과 같이 두 개의 직육면체로 만든다.
        </>
      ),
    },
    {
      content: (
        <>
          <Typography fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' useGap={false}>
            [그림 3]
          </Typography>
          의 두 직육면체의 부피의 합을 구하면 다음과 같다.
          <Box marginLeft='60px'>
            <MathExpression equation={'\\((a-b)×a×(a+b)+b×b(a+b)=\\)'} />
            <Typography useGap={false} useSticker>
              <MathExpression equation={'\\((a+b)(a^2-ab+b^2)\\)'} />
            </Typography>
          </Box>
        </>
      ),
    },
    {
      content: (
        <>
          <Typography fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' useGap={false}>
            [그림 1]
          </Typography>
          의 입체도형의 부피와&nbsp;
          <Typography fontSize='var(--font-size-24)' weight='var(--font-weight-bold)' useGap={false}>
            [그림 3]
          </Typography>
          의 두 직육면체의 부피의 합이 같으므로 다음이 성립한다.
          <Box marginLeft='60px'>
            <MathExpression equation={'\\(a^3+b^3=\\)'} />
            <Typography useGap={false} useSticker>
              <MathExpression equation={'\\((a+b)(a^2-ab+b^2)\\)'} />
            </Typography>
          </Box>
        </>
      ),
    },
  ];

  return (
    <HContainer headerInfo={null}>
      <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
        인수분해 공식과 도형의 부피
      </Typography>

      <Box marginTop='12px'>
        <Typography>
          인수분해 공식
          <Box marginLeft='60px'>
            <MathExpression equation={`\\(a^3+b^3=(a+b)(a^2-ab+b^2)\\)`} />
          </Box>
          은 다음과 같이 직육면체 및 정육면체의 부피를 이용하여 확인할 수도 있다.
        </Typography>
      </Box>
      <Box marginTop='12px'>
        <Box hAlign='center' marginRight='0' marginBottom='24px'>
          <Image
            src='/example/HM-028-02/추D1-1-2-03-02.png'
            width='459px'
            height='150px'
            alt='한 모서리의 길이가 a인 정육면체 위에 한 모서리의 길이가 b인 정육면체를 붙인 입체도형을 분할하여 두 직육면체를 만드는 과정을 나타낸 그림이다.'
          />
        </Box>
        <Scroll tabIndex={0} height='90px'>
          <List<IListenAndAnswer>
            data={data}
            row={({ value, index }) => (
              <Box vAlign='flex-start' key={index}>
                <Box marginLeft={12}>
                  <Label value={index} size='x-small' svgWidth={24} svgHeight={24} lineColor='var(--color-grey-900)' />
                </Box>
                <Typography fontSize='var(--font-size-24)'>{value?.content}</Typography>
              </Box>
            )}
          />
        </Scroll>
      </Box>
    </HContainer>
  );
};

export default HM02802;
