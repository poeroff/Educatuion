import {
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  PinchZoom,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';

interface IListData {
  path: string;
  alt: string;
  number: string;
}

const SAMPLE_DATA: IListData[] = [
  {
    path: '/example/ME-123-02/ME1-L06-C07-A02-P01-01.png',
    alt: "'Tommorrow's presentation: What do you want to be' 라고 적힌 칠판앞에 서있는 남성 이미지 입니다.",
    number: '1',
  },
  {
    path: '/example/ME-123-02/ME1-L06-C07-A02-P01-05.png',
    alt: "고민하는 아이의 뒤로 남자와 여자, 여자아이의 이미지 입니다. 그 아래에 'Dad and my systers know the answer, but I don't' 라고 적혀있습니다.",
    number: '5',
  },
  {
    path: '/example/ME-123-02/ME1-L06-C07-A02-P01-04.png',
    alt: "놀란표정으로 손을 뻗은 아이가 'I know the answer now. Thank you, Mom'라고 말하고 있는 이미지 입니다.",
    number: '3',
  },
  {
    path: '/example/ME-123-02/ME1-L06-C07-A02-P01-03.png',
    alt: "여성이 아이 어깨에 한 손을 올리고 'Don't worry. I don't know my dream job'라고 말하는 이미지 입니다.",
    number: '4',
  },
  {
    path: '/example/ME-123-02/ME1-L06-C07-A02-P01-02.png',
    alt: "아이가 친구들 앞에서 'Who do I want to be? I want to be me '라고 말하는 이미지 입니다.",
    number: '2',
  },
];

const ME12302 = () => {
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''));

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Put in Order',
  };

  const questionInfo: IQuestionProps = {
    text: '본문의 내용과 일치하도록 순서대로 빈칸에 번호를 써 봅시다. ',
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValue(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' onSubmit={() => {}} submitLabel='채점하기'>
      <Box alignSelf='flex-end'>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문 보기' useRound onClick={() => {}} />
      </Box>
      <BoxWrap flexWrap='wrap' justifyContent='center' rowGap={10}>
        {SAMPLE_DATA.map((data, index) => {
          const { path, alt, number } = data as IListData;
          return (
            <BoxWrap width='fit-content' key={index} marginRight={index == 2 ? '0px' : '24px'} flexDirection='column' alignItems='center' rowGap={8}>
              <PinchZoom>
                <Image src={path} width='225px' height='220px' alt={alt} />
              </PinchZoom>
              {index == 0 ? (
                <Input width='52px' tabIndex={index} textAlign='center' value={number} readOnly />
              ) : (
                <Input
                  width='52px'
                  tabIndex={index}
                  textAlign='center'
                  value={inputValue[index]}
                  ariaLabel='본문의 순서에 맞게 번호를 적어주세요.'
                  onChange={e => handleInputChange(index, e.target.value)}
                />
              )}
            </BoxWrap>
          );
        })}
      </BoxWrap>
    </Container>
  );
};

export default ME12302;
