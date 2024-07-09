import { useState } from 'react';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  Image,
  EStyleFontSizes,
  ITypography,
  Tag,
  ETagLine,
  Symbol,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EMA00301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <BoxWrap flexDirection='column'>
        <Box hAlign='center' gap='12px'>
          <Label type='icon' size='small' value={3} />
          당근,가지,고구마 중에서 무게를 비교할 수 있는 채소를
        </Box>

        <Box marginLeft='5px'>2개 고르고 이유를 써 보세요.</Box>
      </BoxWrap>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const dataArr = [
    {
      leftText: '당근',
      rightTextLine1: '100원짜리',
      rightTextLine2: '동전 24개',
      imgSrc: '/example/EMA32-016-01/EC32408_01.jpg',
      imgW: '100%',
      imgH: '157px',
      alt: '저울에 당근과 100원짜리 동전 24개가 담겨 있습니다.',
    },
    {
      leftText: '가지',
      rightTextLine1: '500원짜리',
      rightTextLine2: '동전 20개',
      imgSrc: '/example/EMA32-016-01/EC32408_02.jpg',
      imgW: '100%',
      imgH: '157px',
      alt: '저울에 가지와 500원짜리 동전 20개가 담겨 있습니다.',
    },
    {
      leftText: '고구마',
      rightTextLine1: '100원짜리',
      rightTextLine2: '동전 21개',
      imgSrc: '/example/EMA32-016-01/EC32408_03.jpg',
      imgW: '100%',
      imgH: '157px',
      alt: '저울에 고구마와 100원짜리 동전 21개가 담겨 있습니다.',
    },
  ];

  const typoDefaultProps: ITypography = {
    fontFamily: 'S-Core Dream',
    color: 'var(--color-grey-900)',
    size: EStyleFontSizes['X-MEDIUM'],
    useGap: false,
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap flexDirection='column' marginTop='12px'>
        <BoxWrap marginRight={0}>
          {dataArr.map((item, index) => (
            <BoxWrap key={index} flexDirection='column'>
              <Box hAlign='space-between' vAlign='flex-end' marginLeft='20px'>
                <Typography {...typoDefaultProps} style={{ whiteSpace: 'nowrap' }}>
                  {item.leftText}
                </Typography>

                <BoxWrap flexDirection='column' alignItems='flex-end'>
                  <Typography {...typoDefaultProps}>{item.rightTextLine1}</Typography>

                  <Typography {...typoDefaultProps}>{item.rightTextLine2}</Typography>
                </BoxWrap>
              </Box>

              <Box>
                <Image src={item.imgSrc} width='100%' height='157px' alt={item.alt} />
              </Box>
            </BoxWrap>
          ))}
        </BoxWrap>

        <Box hAlign='flex-end' marginTop='24px' marginRight={0}>
          <Input width='120px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='무게를 비교할 수 있는 채소를 적어주세요.' />
          <Typography useGap={false} style={{ marginRight: '12px' }}>
            ,
          </Typography>
          <Input width='120px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='무게를 비교할 수 있는 채소를 적어주세요.' />
        </Box>

        <Box hAlign='center' marginTop='24px' marginBottom='10px' position='relative'>
          <Tag
            type={ETagLine.BLUE}
            label={'이유'}
            style={{
              backgroundColor: 'var(--color-blue-500)',
              color: 'var(--color-white)',
              border: '2px solid var(--color-white)',
              marginRight: '8px',
            }}
          />
          <Typography>( 같은 , 다른 ) 단위를 사용했기 때문입니다.</Typography>

          <Symbol type='correct' cssStyle={{ position: 'absolute', left: '29%', transform: 'translateX(4px)' }} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA00301;
