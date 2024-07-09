import { useState } from 'react';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Image,
  Input,
  Typography,
  Label,
  Button,
  SvgIcon,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import mathDegree from '../../assets/icon/math_degree.svg';

const EM40801 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '각도를 어림하고 각도기로 재어 확인해 보세요.',
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

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
      <Box marginTop='10px'>
        <Box hAlign='center' height='196px' position='relative'>
          <Box marginRight='100px' padding='24px 0'>
            <Image src='/example/EM-408-01/MC41214_1.jpg' width='206px' height='148px' alt='예각인 도형이 있습니다.' />
          </Box>

          <Box padding='51px 0'>
            <Image src='/example/EM-408-01/MC41214_2.jpg' width='289px' height='94px' alt='둔각인 도형이 있습니다.' />
          </Box>

          <Button
            width='93px'
            height='93px'
            style={{
              position: 'absolute',
              right: 0,
              top: '-11px',
              backgroundColor: 'var(--color-grey-100)',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 5px 0 6px',
              borderRadius: 0,
            }}
          >
            <Typography fontSize='var(--font-size-18)' lineHeight='18px' color='var(--color-black)' style={{ whiteSpace: 'nowrap' }}>
              교구 버튼{' '}
            </Typography>
            <Typography fontSize='var(--font-size-10)' lineHeight='18px' color='var(--color-black)'>
              (고객 검토 후 반영 예정)
            </Typography>
          </Button>
        </Box>

        <BoxWrap height='136px' marginTop='24px' flexDirection='row'>
          <BoxWrap flexDirection='column'>
            <Box hAlign='flex-end' marginRight={0} marginBottom='32px'>
              <Typography
                useGap={false}
                size={EStyleFontSizes.MEDIUM}
                color='var(--color-grey-900)'
                fontFamily='S-Core Dream'
                lineHeight='42px'
                style={{ marginRight: '12px' }}
              >
                어림한 각도 약
              </Typography>

              <Box vAlign='flex-start' gap='2px'>
                <Input width='130px' ariaLabel='어림한 각도를 적어주세요.' value={value1} onChange={e => setValue1(e.target.value)} />
                <SvgIcon src={mathDegree} size='5.5px' />
              </Box>
            </Box>

            <Box hAlign='flex-end'>
              <Typography
                useGap={false}
                size={EStyleFontSizes.MEDIUM}
                color='var(--color-grey-900)'
                fontFamily='S-Core Dream'
                lineHeight='42px'
                style={{ marginRight: '12px' }}
              >
                잰 각도 약
              </Typography>
              <Box vAlign='flex-start' gap='2px' marginRight={0}>
                <Input width='130px' ariaLabel='잰 각도를 적어주세요.' value={value2} onChange={e => setValue2(e.target.value)} />
                <SvgIcon src={mathDegree} size='5.5px' />
              </Box>
            </Box>
          </BoxWrap>

          <BoxWrap flexDirection='column' alignItems='flex-end'>
            <Box hAlign='flex-start' width='100%' marginRight={0} marginBottom='32px'>
              <Typography
                useGap={false}
                size={EStyleFontSizes.MEDIUM}
                color='var(--color-grey-900)'
                fontFamily='S-Core Dream'
                lineHeight='42px'
                style={{ marginRight: '12px' }}
              >
                어림한 각도 약
              </Typography>
              <Box vAlign='flex-start' gap='2px'>
                <Input width='130px' ariaLabel='어림한 각도를 적어주세요.' value={value3} onChange={e => setValue3(e.target.value)} />
                <SvgIcon src={mathDegree} size='5.5px' />
              </Box>
            </Box>

            <Box hAlign='flex-start' width='calc(100% - 54px)' marginRight={0}>
              <Typography
                useGap={false}
                size={EStyleFontSizes.MEDIUM}
                color='var(--color-grey-900)'
                fontFamily='S-Core Dream'
                lineHeight='42px'
                style={{ marginRight: '12px' }}
              >
                잰 각도 약
              </Typography>
              <Box vAlign='flex-start' gap='2px'>
                <Input width='130px' ariaLabel='잰 각도를 적어주세요.' value={value4} onChange={e => setValue4(e.target.value)} />
                <SvgIcon src={mathDegree} size='5.5px' />
              </Box>
            </Box>
          </BoxWrap>
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default EM40801;
