import { ChangeEvent, useState } from 'react';
import { Box, Typography, Input, Label, List, IQuestionProps, SvgIcon, BoxWrap, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM05002 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={9} />
        <Box>길이의 단위를 m로 나타내기에 알맞은 것을 찾아보세요.</Box>
      </>
    ),
  };

  const data = [
    {
      number: 'ㄱ',
      example: '막대 사탕의 길이',
      img: '../../assets/example/EM-050-02/DJC410002-1.png',
      alt: '막대 사탕 그림입니다.',
      width: '79px',
    },
    {
      number: 'ㄴ',
      example: '휴대 전화의 길이',
      img: '../../assets/example/EM-050-02/DJC410002-2.png',
      alt: '휴대 전화 그림입니다.',
      width: '117px',
    },
    {
      number: 'ㄷ',
      example: '궁궐의 높이',
      img: '../../assets/example/EM-050-02/DJC410002-3.png',
      alt: '궁궐 그림입니다.',
      width: '227px',
    },
  ];

  const [value1, setValue1] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
      useExtend
    >
      <Box display='flex' alignItems='end' flexDirection='column'>
        <Box hAlign='end'>
          <BoxWrap>
            {data.map((value, index) => (
              <Box key={`list-item-${index}`} type='dashed' padding='20px 24px' useRound width='307px' hAlign='center' flexDirection='column'>
                <Image src={value.img} alt={value.alt} width={value.width} height='120px' />
                <Box vAlign='center' key={value.number} marginTop='20px'>
                  <Label value={value?.number} />
                  <Typography>{value?.example}</Typography>
                </Box>
              </Box>
            ))}
          </BoxWrap>
        </Box>

        <Box marginTop='24px'>
          <Input width='318px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='기호를 입력하세요' />
        </Box>
      </Box>
    </Container>
  );
};

export default EM05002;
