import React, { useState } from 'react';
import { TMainHeaderInfoTypes, Box, List, ListHeader, ToggleButton, Scroll, Typography, EStyleFontSizes, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: React.ReactNode;
  answer: React.ReactNode;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (1)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'As the leader of our school club Care for Animals, I organized a volunteer trip to an animal sanctuary for my club members.',
      answer: '우리 학교 클럽 Care for Animals 의 리더로서, 나는 우리 클럽 멤버들을 위한 자원봉사여행을 sanctuary 로 가기로 조직했다.',
    },
    {
      question: 'An animal sanctuary is a special place where rescued, injured, or abused animals can live in a safe and caring environment.',
      answer:
        'animal sanctuary는 구조되거나 부상을 입었거나 학대를 당한 동물들이 안전하고 보살핌을 받을 수 있는 환경에서 살 수 있는 특별한 장소이다.',
    },
    {
      question: 'All the club members and I agreed that the sanctuary would be the perfect place to learn about animal care.',
      answer: '모든 클럽 멤버들과 나는 sanctuary가 동물보호에 대해 배울 수 있는 완벽한 장소라는 것에 동의했다. ',
    },
    {
      question: 'Excited for a new experience, we set out to volunteer.',
      answer: '새로운 경험에 들떠서 우리는 자원봉사를 떠났다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0} topHeight={80}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box>
                <Typography>{value?.question}</Typography>
                <Box height='72px'>
                  <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                    {isOpen ? value?.answer : ''}
                  </Typography>
                </Box>
              </Box>
            </BoxWrap>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default P03;
