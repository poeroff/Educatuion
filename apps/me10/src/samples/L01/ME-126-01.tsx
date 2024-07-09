import { useState } from 'react';

import { Box, Typography, TMainHeaderInfoTypes, IQuestionProps, Image, List, Input, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME12601 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''));

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mePractice',
    headerText: 'B',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 괄호 안의 말을 활용하여 문장을 완성해 봅시다.',
  };

  const data = [
    {
      content1: 'Up is the',
      content2: 'movie of the four movies.',
      point: 'old',
    },
    {
      content1: 'Frozen is',
      content2: 'movie of the four movies.',
      point: 'long',
    },
    {
      content1: 'Inside Out is',
      content2: 'movie of the four movies.',
      point: 'short',
    },
    {
      content1: 'Toy Story 4 is',
      content2: 'movie of the four movies.',
      point: 'interesting',
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
      useExtend
      vAlign='flex-start'
    >
      <Box>
        <Box hAlign='center'>
          <Image
            src='/example/ME-126-01/ME1-L07-C09-A06-P01.png'
            alt='4 개 영화 소개 도표
Up (2009) running time 96
min. 별 4 개
Frozen (2013) running time
108 min. 별 3 개
Inside Out (2015) running
time 95 min. 별 4 개
Toy Story 4 (2019) running
time 100 min. 별 5 개'
            width='926px'
            height='191px'
          />
        </Box>
        <Box marginTop={24}>
          <Scroll height='197px' tabIndex={0}>
            <List data={data}>
              {({ value, index = 1 }) => (
                <Box vAlign='baseline'>
                  <Box padding='4px 12px'>({index})</Box>
                  <Box>
                    <Typography>{value?.content1}</Typography>
                    <Input
                      width='271px'
                      placeholder='내용을 넣어 주세요.'
                      ariaLabel='괄호 입력란'
                      value={inputValue[index]}
                      onChange={e => handleInputChange(index, e.target.value)}
                    />
                    <Typography>{value?.content2}&nbsp;</Typography>
                    <Typography color='var(--color-blue-600)'>({value?.point})</Typography>
                  </Box>
                </Box>
              )}
            </List>
          </Scroll>
        </Box>{' '}
      </Box>
    </Container>
  );
};

export default ME12601;
