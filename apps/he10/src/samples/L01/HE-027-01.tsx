import { useState } from 'react';

import { BoxWrap, Box, TMainHeaderInfoTypes, Label, Image, EImageType, IQuestionProps, EStyleShadowedButtonTypes, Radio } from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';

const HE02701 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '2',
    text: ' Listen again. Which is NOT mentioned in the dialogue?',
  };

  const [isShow, setShow] = useState(false);
  const [radio, setRadio] = useState<number | null>(null);
  const handleRadio = (index: number) => {
    setRadio(index);
  };

  const card_arr = [
    {
      src: '/A01/0001/01/HE1-L01-C11-A02-P02-01.png',
      alt: '1. 롤러코스터를 타고 있는 사람들',
    },
    {
      src: '/A01/0001/01/HE1-L01-C11-A02-P02-02.png',
      alt: '2. 벤치에 앉아 햄버거와 감자튀김을 먹고 있는 두 여자',
      color: EStyleShadowedButtonTypes.SUCCESS,
    },
    {
      src: '/A01/0001/01/HE1-L01-C11-A02-P02-03.png',
      alt: '1. 롤러코스터를 타고 있는 사람들',
      color: EStyleShadowedButtonTypes.WARNING,
    },
    {
      src: '/A01/0001/01/HE1-L01-C11-A02-P02-04.png',
      alt: '4. 한 명이 손을 뻗어 핸드폰을 들고 있고 그 핸드폰을 바라보고 웃으며 사진을 찍고 있는 일곱명의 남녀들',
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점 하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap>
        {card_arr.map((item, index) => (
          <Radio name={'radio-question-A'} value={index - 1 === radio} onClick={() => handleRadio(index - 1)}>
            <ShadowedButton
              key={index}
              type='img'
              state={index - 1 !== radio ? EStyleShadowedButtonTypes.DEFAULT : EStyleShadowedButtonTypes.PRIMARY}
            >
              <Label value={index + 1} />
              <Box marginTop='8px'>
                <Image size='100%' src={item.src} alt={item.alt} type={EImageType.IMG} />
              </Box>
            </ShadowedButton>
          </Radio>
        ))}
      </BoxWrap>
    </Container>
  );
};

export default HE02701;
