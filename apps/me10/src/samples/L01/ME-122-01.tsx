import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Button,
  EStyleButtonTypes,
  Image,
  EStyleSizes,
  EStyleShadowedButtonTypes,
  Checkbox,
} from '@maidt-cntn/ui';
import { Container, ShadowedButton } from '@maidt-cntn/ui/en';

const card_arr = [
  {
    name: 'lunchbox',
    src: '/example/ME-122-01/ME1-L02-C07-A02-P01-02.png',
    alt: '도시락',
    imgWidth: 93,
    imgHeight: 81,
  },
  {
    name: 'smartphone',
    src: '/example/ME-122-01/ME1-L02-C07-A02-P01-03.png',
    alt: '스마트폰',
    imgWidth: 57,
    imgHeight: 82,
  },
  {
    name: 'coins',
    src: '/example/ME-122-01/ME1-L02-C07-A02-P01-04.png',
    alt: '동전이 쌓여있는',
    imgWidth: 99,
    imgHeight: 86,
  },
  {
    name: 'bus card',
    src: '/example/ME-122-01/ME1-L02-C07-A02-P01-05.png',
    alt: '버스가 그려진 카드',
    imgWidth: 130,
    imgHeight: 86,
  },
  {
    name: 'radio',
    src: '/example/ME-122-01/ME1-L02-C07-A02-P01-06.png',
    alt: '라디오',
    imgWidth: 99,
    imgHeight: 86,
  },
  {
    name: 'tablet',
    src: '/example/ME-122-01/ME1-L02-C07-A02-P01-07.png',
    alt: '태블릿 스마트 패드',
    imgWidth: 77,
    imgHeight: 86,
  },
];

const ME12201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Match',
  };

  const questionInfo: IQuestionProps = {
    text: '본문 속 두 주인공과 관련 있는 물건을 골라 봅시다.',
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [checkBox, setCheckBox] = useState<boolean[]>(Array(card_arr.length).fill(false));
  const handleCheckBox = (index: number) => {
    const newCheckBox = [...checkBox];
    newCheckBox[index] = !newCheckBox[index];
    setCheckBox(newCheckBox);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='space-between' alignItems='flex-end'>
        <Image src='/example/ME-122-01/ME1-L02-C07-A02-P01-01.jpg' alt='본문 속 주인공 Jihun 입니다.' width='151px' height='58px' />
        <Button minWidth='100px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound />
      </Box>
      <Box useFull marginTop='24px' hAlign='center' flexWrap='wrap' padding='0 80px' gap='10px 24px'>
        {card_arr.map((item, index) => (
          <Checkbox key={index} gap={0} value={checkBox[index]} onClick={() => handleCheckBox(index)}>
            <ShadowedButton type='img' state={checkBox[index] ? EStyleShadowedButtonTypes.PRIMARY : EStyleShadowedButtonTypes.DEFAULT}>
              <Box hAlign='center' width='143px' height='40px' padding='0' background='yellow' fontSize='22px' lineHeight='32px' useRound>
                {item.name}
              </Box>
              <Box marginTop='8px' width='143px' height='88px' hAlign='center'>
                <Image src={item.src} alt={item.alt} width={item.imgWidth + 'px'} height={item.imgHeight + 'px'} />
              </Box>
            </ShadowedButton>
          </Checkbox>
        ))}
      </Box>
    </Container>
  );
};

export default ME12201;
