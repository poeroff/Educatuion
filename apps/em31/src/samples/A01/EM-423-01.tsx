import { Box, Label, IQuestionProps, Image, BoxWrap, EChipButtonType, ChipButton, Input } from '@maidt-cntn/ui';
import { Container, Unit } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM42201 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        <Box vAlign='center'>삼각자 2개로 만들어지는 각도를 구해 보세요.</Box>
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
    >
      <BoxWrap boxGap={24} justifyContent='center'>
        <BoxWrap width='273px' height='296px' marginRight={73} useFull flexDirection='column' alignItems='flex-start'>
          <Image
            src='../../assets/example/EM-423-01/MC41227.jpg'
            alt='삼각자 2개가 있습니다. 한 삼각자의 세 각은 60도, 30도, 직각이며 다른 한 삼각자의 세 각은 45도, 45도, 직각입니다.'
            width='278px'
            height='240px'
          />
        </BoxWrap>

        <Box height='296px' width='249px' marginRight={32} hAlign='center' flexDirection='column'>
          <Image
            src='../../assets/example/EM-423-01/MC41227-1.jpg'
            alt='삼각자의 45도 부분과 다른 삼각자의 30도 부분이 이어져 있습니다.'
            width='205px'
            height='220px'
          />
          <Box vAlign='center' marginTop={'24px'}>
            <Input
              value={value1}
              width='98px'
              onChange={e => {
                setValue1(e.target.value);
              }}
              ariaLabel='각 45도와 각 30도의 합'
            />
            <Unit unit={'degree'} height={50} />
          </Box>
        </Box>

        <Box hAlign='center' height={296} width='188px' flexDirection='column'>
          <Image
            src='../../assets/example/EM-423-01/MC41227-2.jpg'
            alt='삼각자의 45도 부분과 다른 삼각자의 60도 부분이 겹쳐져 있습니다.'
            width='155px'
            height='220px'
          />
          <Box vAlign='center' marginTop={'24px'}>
            <Input
              value={value2}
              width='98px'
              onChange={e => {
                setValue2(e.target.value);
              }}
              ariaLabel='각 60도와 각 45도의 차'
            />
            <BoxWrap marginLeft='2px' height={52}>
              <Unit unit={'degree'} height={50} />
            </BoxWrap>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default EM42201;
