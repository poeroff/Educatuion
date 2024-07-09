import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Input, Label, Symbol, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EMA3101601 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value='3' />
        길이가 높은 산부터 차례로 1, 2, 3을 써 보세요.
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <BoxWrap flexDirection='column' marginTop={10} alignItems='center' boxGap={0}>
        <BoxWrap flexDirection='column' justifyContent='center' alignItems='center' boxGap={0}>
          <BoxWrap justifyContent='space-between' alignItems='center' width='812.24px' boxGap={0}>
            <Image
              src='/example/EMA31-016-01/secenry-image_1.jpg'
              alt='바위가 솟아있는 설악산 이미지 입니다. 1km 708m'
              width='231px'
              height='240px'
            />
            <Image
              src='/example/EMA31-016-01/secenry-image_2.jpg'
              alt='철쭉 꽃이 피어있는 지리산 이미지 입니다. 1915m'
              width='246px'
              height='240px'
            />
            <ImageWrapper>
              <Image
                src='/example/EMA31-016-01/secenry-image_3.jpg'
                alt='웅덩이에 물이 고여있는 한라산 정상 이미지 입니다. 1km 947m'
                width='231px'
                height='240px'
              />
            </ImageWrapper>
          </BoxWrap>
          <TextWrap>
            <Typography fontSize='16px' lineHeight='24px' useGap={false} color='var(--color-grey-700)' style={{}}>
              출처: 한국민족문화대백과사전, 2023.
            </Typography>
          </TextWrap>
        </BoxWrap>
        <BoxWrap boxGap={241} marginTop={24} width={638}>
          <BoxWrap width='fit-content'>
            <Input
              width='52px'
              maxLength={1}
              value={value1}
              onChange={e => setValue1(e.target.value)}
              ariaLabel='길이가 높은 산부터 차례로 1, 2, 3을 적어주세요.'
            />
          </BoxWrap>
          <BoxWrap width='fit-content'>
            <Input
              width='52px'
              maxLength={1}
              value={value2}
              onChange={e => setValue2(e.target.value)}
              ariaLabel='길이가 높은 산부터 차례로 1, 2, 3을 적어주세요.'
            />
          </BoxWrap>
          <BoxWrap width='fit-content'>
            <Input
              width='52px'
              maxLength={1}
              value={value3}
              onChange={e => setValue3(e.target.value)}
              ariaLabel='길이가 높은 산부터 차례로 1, 2, 3을 적어주세요.'
            />
          </BoxWrap>
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default EMA3101601;

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  transform: translate(13px, 8px);
`;

const TextWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 8px;
  margin-right: 85px !important;
  span {
    padding-block: 4px;
  }
`;
