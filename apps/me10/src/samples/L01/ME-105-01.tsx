import { useState } from 'react';

import { IQuestionProps, TMainHeaderInfoTypes, Image, Box, Input, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME10501 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''));

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Talk to Play: Find a Person',
  };

  const questionInfo: IQuestionProps = {
    text: '활동을 직접 해 봅시다.',
  };

  const imgData = [
    { title: 'mint chocolate', src: `../../assets/example/mintchocolate.png`, alt: '' },
    { title: 'baseball', src: `../../assets/example/baseball.png`, alt: '' },
    { title: 'English', src: `../../assets/example/english.png`, alt: '' },
    { title: 'dogs', src: `../../assets/example/dogs.png`, alt: '' },
    { title: `today's lunch`, src: `../../assets/example/lunch.png`, alt: '' },
    {
      title: (
        <>
          our school
          <br /> uniform
        </>
      ),
      src: `../../assets/example/uniform.png`,
      alt: '',
    },
    { title: 'rainy day', src: `../../assets/example/ME1-L01-C03-A02-P01-16.png`, alt: '' },
    { title: 'tteokbokki', src: `../../assets/example/ME1-L01-C03-A02-P01-12.png`, alt: '' },
    { title: 'birds', src: `../../assets/example/ME1-L01-C03-A02-P01-15.png`, alt: '' },
  ];

  const handleInputChange = (index: number, value: string) => {
    setInputValue(prevValue => prevValue.map((prevValue, i) => (i === index ? value : prevValue)));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={() => {
        setIsOpen(!isOpen);
      }}
      submitLabel='완료하기'
    >
      <Box display='flex' flexWrap='wrap' gap='10px'>
        {imgData.map((item, index) => {
          return (
            <Box position='relative' width='253px' height='212px' key={index}>
              <Box
                position='absolute'
                left='50%'
                top='6px'
                transform='translateX(-50%)'
                backgroundColor='rgba(255,255,255, 0.7)'
                borderRadius='8px'
                width='max-content'
              >
                <Typography lineHeight='42px' weight='var(--font-weight-bold)' align='center'>
                  {item.title}
                </Typography>
              </Box>
              <Box position='absolute' bottom='6px' left='50%' transform='translateX(-50%)'>
                <Input
                  width='243px'
                  placeholder='내용을 넣어 주세요.'
                  ariaLabel='답변 입력란'
                  value={inputValue[index]}
                  onChange={e => handleInputChange(index, e.target.value)}
                />
              </Box>
              <Image src={item.src} alt={item.alt} size='100%' />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default ME10501;
