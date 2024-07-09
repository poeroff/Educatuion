import { Box, IQuestionProps, Image, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM04101 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [value1, setValue1] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={2} />
        시각을 읽어 보세요.
      </>
    ),
  };
  const BASE_URL = '/example/EM-041-01/';
  const data = [
    { margin: '', img: 'first_clock.svg', alt: '', width: '200px', height: '200px' },
    { margin: '24px', img: 'second_clock.svg', alt: '', width: '200px', height: '200px' },
    { margin: '24px', img: 'third_clock.svg', alt: '', width: '225px', height: '115px' },
  ];
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box display='flex'>
        {data.map((value, index) => {
          return (
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='end'
              type='dashed'
              marginLeft={value.margin}
              padding={'24px 17px'}
              borderRadius={16}
              height={324}
              key={`list-item-${index}`}
            >
              <Box display='flex' justifyContent='center'>
                <Image src={BASE_URL + value.img || ''} alt={value.alt} width={value.width} height={value.height} />
              </Box>
              <Box marginTop={24}>
                <Input width='52px' onChange={e => setValue(e.target.value)} ariaLabel='시를 입력해주세요.' />
                <Typography>시</Typography>
                <Input width='98px' onChange={e => setValue1(e.target.value)} ariaLabel='분을 입력해주세요.' />
                <Typography>분</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default EM04101;
