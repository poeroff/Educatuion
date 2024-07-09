import { useState } from 'react';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Image,
  Typography,
  Input,
  EStyleFontSizes,
  TextView,
  ETextViewColor,
  TextViewTitle,
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
        <Box vAlign='center' gap='12px' marginRight={0}>
          <Label type='icon' size='small' value={2} />
          <TextViewTitle title='보기' type={ETextViewColor.DEFAULT} />
          에서 알맞은 물건을 골라 문장을 완성해 보세요.
        </Box>
      </BoxWrap>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

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
      <BoxWrap flexDirection='column' alignItems='center' marginBottom='12px'>
        <Box width='683px' paddingTop='14px' paddingBottom='30px'>
          <TextView type={ETextViewColor.DEFAULT} title={'보기'} height='190px'>
            <Box hAlign='center'>
              <BoxWrap marginRight='6px' flexDirection='column' alignItems='center'>
                <Image src='/example/EMA32-019-01/익힘53쪽비행기.jpg' width='184px' height='118px' alt='비행기 이미지 입니다.' />

                <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} style={{ padding: '4px 0' }}>
                  비행기
                </Typography>
              </BoxWrap>

              <BoxWrap marginRight='6px' flexDirection='column' alignItems='center'>
                <Image src='/example/EMA32-019-01/IB32402.jpg' width='177px' height='118px' alt='휴대전화 이미지 입니다.' />

                <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} style={{ padding: '4px 0' }}>
                  휴대 전화
                </Typography>
              </BoxWrap>

              <BoxWrap flexDirection='column' alignItems='center'>
                <Image src='/example/EMA32-019-01/익힘53쪽tv.jpg' width='177px' height='118px' alt='텔레비전 이미지 입니다.' />

                <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} style={{ padding: '4px 0' }}>
                  텔레비전
                </Typography>
              </BoxWrap>
            </Box>
          </TextView>

          <BoxWrap marginTop='24px' flexDirection='column' gap='4px'>
            <Box>
              <Input width='211px' ariaLabel='보기 에서 알맞은 물건을 적어주세요.' value={value1} onChange={e => setValue1(e.target.value)} />
              <Typography>의 무게는 약 200 g입니다.</Typography>
            </Box>

            <Box>
              <Input width='211px' ariaLabel='보기 에서 알맞은 물건을 적어주세요.' value={value2} onChange={e => setValue2(e.target.value)} />
              <Typography>의 무게는 약 10 kg입니다.</Typography>
            </Box>

            <Box>
              <Input width='211px' ariaLabel='보기 에서 알맞은 물건을 적어주세요.' value={value3} onChange={e => setValue3(e.target.value)} />
              <Typography>의 무게는 약 350 t입니다.</Typography>
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA00301;
