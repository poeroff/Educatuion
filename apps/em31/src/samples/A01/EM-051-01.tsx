import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Image, Box, Input, Typography, Label, IQuestionProps, List } from '@maidt-cntn/ui';

const EM05101 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='2' type='icon' />
        현태와 아라가 가진 두 수의 차는 얼마인지 구해 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value, setValue] = useState<string>('');
  const data = [
    {
      name: '현태',
      image: '../../assets/example/EM-051-01/DJC410004-1.png',
      alt: '남자아이 그림입니다.',
      number: 315,
    },
    {
      name: '아라',
      image: '../../assets/example/EM-051-01/DJC410004-2.png',
      alt: '여자아이 그림입니다.',
      number: 749,
    },
  ];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='flex-start'
    >
      <Box vAlign='center' flexDirection='column'>
        <Box marginBottom='24px'>
          <List align='horizontal' data={data} gap={120}>
            {({ value, index = 1 }) => (
              <Box width='274px' vAlign='center' flexDirection='column' gap='8px'>
                <Typography>{value?.name}</Typography>
                <Image src={value?.image || ''} alt={value?.alt} height='180px' />
                <Box useRound hAlign='center' width='100%' backgroundColor='var(--color-grey-50)' padding='12px 0'>
                  <Typography>{value?.number}</Typography>
                </Box>
              </Box>
            )}
          </List>
        </Box>
        <Input
          width='263px'
          ariaLabel='답을 입력하세요.'
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
      </Box>
    </Container>
  );
};

export default EM05101;
