import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Box, Typography, Input, IQuestionProps, TMainHeaderInfoTypes, Label, EStyleFontSizes, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow from '../../assets/icon/brown_arrow.png';

const EM04102 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '분과 초의 관계 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline'>
        <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={12} />
        1시 20분에서 1시 21분 사이의 시각을 읽고 초바늘이 어떻게 움직였는지 이야기해 보세요.
      </Box>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    value1: '',
    value2: '',
    value3: '',
  });

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const data = [
    {
      img: '../../assets/example/EM-041-02/MC31522.png',
      alt: '1시 20분을 가리키는 시계의 초바늘이 12를 가리키고 있습니다. 30초가 지나고',
      time: (
        <Box marginTop='10px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>1시 20분</Typography>
        </Box>
      ),
      sec: '30초',
    },
    {
      img: '../../assets/example/EM-041-02/MC31522_2.png',
      alt: '초바늘이 6을 가리키고, 29초가 지나니',
      time: (
        <Box marginTop='10px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>1시 20분</Typography>
          <Input width='52px' maxLength={2} name='value1' value={inputs.value1} onChange={handleInputChangeEvent} ariaLabel='초를 입력하세요.' />
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            초
          </Typography>
        </Box>
      ),
      sec: '29초',
    },
    {
      img: '../../assets/example/EM-041-02/MC31522_3.png',
      alt: '초바늘이 11과 12사이의 4번째 칸을 가리키고 있습니다. 그 후 1초가 지나니',
      time: (
        <Box marginTop='10px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>1시</Typography>
          <Input width='52px' maxLength={2} name='value2' value={inputs.value2} onChange={handleInputChangeEvent} ariaLabel='분을 입력하세요.' />
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            분
          </Typography>{' '}
          <Input width='52px' maxLength={2} name='value3' value={inputs.value3} onChange={handleInputChangeEvent} ariaLabel='초를 입력하세요.' />
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            초
          </Typography>
        </Box>
      ),
      sec: '1초',
    },
    {
      img: '../../assets/example/EM-041-02/MC31522_2-1.png',
      alt: '다시 초바늘이 12를 가리킵니다.',
      time: (
        <Box marginTop='10px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>1시 21분</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='start'
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      useExtend
    >
      <Box hAlign='center' flexDirection='column'>
        <Box useFull vAlign='center' gap='24px'>
          <List align='horizontal' gap={24} data={data}>
            {({ value, index }) => (
              <Box
                useRound
                type={index === 1 || index === data.length ? 'dashed' : 'line'}
                width='230px'
                height='220px'
                hAlign='center'
                flexDirection='column'
                padding='24px 0'
              >
                <ArrowBox sec={value?.sec || ''}>
                  <Image src={value?.img || ''} alt={value?.alt} width='110px' height='110px' />
                </ArrowBox>
                {value?.time}
              </Box>
            )}
          </List>
        </Box>
        <Box background='white' width='100%' borderRadius={8} marginTop='24px'>
          <Typography useGap={false}>그리기 도구 영역</Typography>
        </Box>
      </Box>
    </Container>
  );
};

const ArrowBox = styled.div<{ sec: string }>`
  position: relative;
  ${({ sec }) =>
    sec &&
    `
    &:after {
      content:'${sec}';
      width: 86px;
      height: 57px;
      
      position: absolute;
      top: 30px;
      left: 140px;

      display: flex;
      align-items: center;
      justify-content: center;
      
      background: url(${arrow});
      color: var(--color-red-700);
      font-size: 18px;
      font-weight: var(--font-weight-bold);

    }
  `}
`;

export default EM04102;
