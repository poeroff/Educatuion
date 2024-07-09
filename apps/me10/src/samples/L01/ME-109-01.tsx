import { useState } from 'react';

import { BoxWrap, Box, IQuestionProps, Image, TMainHeaderInfoTypes, Typography, Scroll, Input, List, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: string[];
}

const ME10901 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''));

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Practice B',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 괄호 안의 말을 활용하여 문장을 완성해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      question: ['I', 'milk. (drink)'],
    },
    {
      question: ['Dad', 'orange juice. (drink)'],
    },
    {
      question: ['Mom and I', 'bread and tomatoes. (eat)'],
    },
    {
      question: ['Dad', 'tomatoes. (eat)'],
    },
    {
      question: ['We all', 'eggs. (have)'],
    },
  ];

  const handleInputChange = (index: number, value: string) => {
    setInputValue(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
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
      <BoxWrap useFull>
        <Box padding='30px 0'>
          <PinchZoom>
            <Image
              src='/example/ME1-L01-C09-A06.jpg'
              width='406px'
              height='352px'
              alt='식탁에서 엄마는 빵, 달걀, 커피를, 나는 빵, 토마토, 달걀, 유유를, 아빠는 고구마, 달걀, 베이컨, 바나나, 오렌지 주스를 먹으려고 한다.'
            />
          </PinchZoom>
        </Box>
        <Scroll tabIndex={0}>
          <List<IListenAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <Box vAlign='baseline'>
                <Typography>{`(${index})`}</Typography>
                <Box>
                  <Typography>{value?.question[0]}</Typography>
                  <Input
                    width='243px'
                    value={inputValue[index]}
                    onChange={e => handleInputChange(index, e.target.value)}
                    ariaLabel='답 입력란'
                    placeholder='내용을 넣어 주세요.'
                  />
                  <Typography>{value?.question[1]}</Typography>
                </Box>
              </Box>
            )}
          </List>
        </Scroll>
      </BoxWrap>
    </Container>
  );
};

export default ME10901;
