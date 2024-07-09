import { useState } from 'react';
import { Box, EImageType, IQuestionProps, Image, Label, List, Radio, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM10601 = () => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const [isShow, setShow] = useState<boolean>(false);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='18' type='icon' />
        단추를 기준에 따라 분류한 것입니다. 분류한 기준이 무엇인지 찾아 색칠해 보세요.
      </>
    ),
  };

  const words = ['크기', '색깔', '모양'];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
    >
      <Box hAlign='center' marginBottom='24px'>
        <Image
          type={EImageType.IMG}
          src='../../assets/example/EM-106-01/DJC3100091.jpg'
          width='340px'
          height='191px'
          alt='크기가 서로 같은 단추가 2개씩 3묶음이 있고, 가장 왼쪽 묶음은 빨간색과 노란색 단추, 그 다음 묶음은 노란색과 초록색 단추, 가장 오른쪽 묶음은 녹색 단추 2개가 그려진 그림입니다.'
        />
      </Box>
      <List gap={24} data={words} align='horizontal'>
        {({ value }) => (
          <Radio name='radio-group' onClick={() => setSelectedValue(value)} value={selectedValue === value}>
            <Box
              width='290px'
              height='80px'
              border={`2px solid ${selectedValue === value ? 'var(--color-blue-300)' : 'var(--color-yellow-300)'}`}
              boxShadow={selectedValue === value ? '0px 4px 4px 0px #00000040' : 'none'}
              background={selectedValue === value ? 'var(--color-blue-50)' : 'transparent'}
              useRound
              hAlign='center'
            >
              <Typography fontSize='var(--font-size-32)' lineHeight='42px'>
                {value}
              </Typography>
            </Box>
          </Radio>
        )}
      </List>
    </Container>
  );
};

export default EM10601;
