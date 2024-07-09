import { Box, IQuestionProps, Image, BoxWrap, Input, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, Unit } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM42201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: <>각도의 합과 차를 구해보세요.</>,
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
      useExtend
    >
      <BoxWrap justifyContent='center' paddingTop={10}>
        <BoxWrap width='650px' marginRight='unset' useFull flexDirection='column' alignItems='flex-start'>
          <Image
            src='../../assets/example/EM-416-01/MC41217.jpg'
            alt='각도를 나타내는 각이 두 개 있습니다. 하나는 100도, 다른 하나는 35도 입니다.'
            width='650px'
            height='235px'
          />
        </BoxWrap>

        <Box height='296px' width='249px' hAlign='center' flexDirection='column'>
          <Box vAlign='center' flexDirection='column'>
            <Box display='inline-flex'>
              <Typography>합</Typography>
              <Input
                value={value1}
                width='130px'
                onChange={e => {
                  setValue1(e.target.value);
                }}
                ariaLabel='각도의 합을 적어주세요.'
              />
              <Unit unit={'degree'} height={50} />
            </Box>

            <Box display='inline-flex' marginTop='32px'>
              <Typography>차</Typography>
              <Input
                value={value2}
                width='130px'
                onChange={e => {
                  setValue2(e.target.value);
                }}
                ariaLabel='각도의 차를 적어주세요.'
              />
              <Unit unit={'degree'} height={50} />
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default EM42201;
