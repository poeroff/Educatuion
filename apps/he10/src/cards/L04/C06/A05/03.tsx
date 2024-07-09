import { Box, EStyleFontSizes, List, ListHeader, Scroll, TMainHeaderInfoTypes, ToggleButton, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useState } from 'react';

interface IListenAndAnswer {
  question: React.ReactNode;
  answer: React.ReactNode;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (3)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'So, what happens to all the waste from the coffee extraction process?',
      answer: '그렇다면 커피 추출 과정에서 발생하는 모든 폐기물은 어떻게 될까요?',
    },
    {
      question: 'Spent coffee grounds (SCGs) are classified as general waste and sent to landfills.',
      answer: '사용한 커피 찌꺼기(SCG)는 일반 폐기물로 분류되어 매립지로 보내집니다.',
    },
    {
      question: 'There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2.',
      answer: '그곳에서 그것들은 분해되어 CO2보다 약 25배 더 강력한 온실가스인 메탄을 방출합니다.',
    },
    {
      question: 'Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton.',
      answer: '일부 SCG는 매립되지 않고 소각되는데, 이로 인해 톤당 338kg에 달하는 많은 양의 CO2가 배출됩니다.',
    },
    {
      question: 'However, neither of these waste management options takes into account the potential value of coffee grounds.',
      answer: '그러나 이러한 폐기물 관리 옵션 중 어느 것도 커피 찌꺼기의 잠재적 가치를 고려하지 않습니다.',
    },
    {
      question:
        'However, when paired with new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share  the food with their partner.',
      answer: '그러나 새로운 파트너와 짝을 이룬 침팬지들은 대부분 먹이를 얻는 데 실패했고, 간혹 성공하더라도 파트너와 먹이를 공유하지 않았습니다.',
    },
    {
      question: 'The bonobos, on the other hand, got along much better than the chimpanzees.',
      answer: '반면 보노보는 침팬지보다 훨씬 더 잘 어울렸습니다. ',
    },
    {
      question: 'Although the grounds contain valuable organic compounds and minerals, they are simply destroyed.',
      answer: '땅에는 귀중한 유기 화합물과 미네랄이 포함되어 있지만 쉽게 파괴됩니다.',
    },
    {
      question:
        'Fortunately, thanks to increased awareness of the coffee waste problem, companies, organizations, and governments around the world are working hard to improve the environmental impact of the coffee industry through circular economy measures.',
      answer:
        '다행히 커피 폐기물 문제에 대한 인식이 높아진 덕분에 전 세계 기업, 단체, 정부에서는 순환경제 조치를 통해 커피 산업이 환경에 미치는 영향을 개선하기 위해 열심히 노력하고 있습니다.',
    },
    {
      question: 'A circular economy promotes the reuse of resources for as long as possible, reducing waste and environmental costs.',
      answer: '순환 경제는 가능한 한 오랫동안 자원 재사용을 촉진하여 폐기물과 환경 비용을 줄입니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value }) => (
            <>
              <Box>
                <Typography>{value?.question}</Typography>
              </Box>
              <Box height='72px'>
                <Typography color={'var(--color-blue-900)'} fontSize='22px' lineHeight='32px'>
                  {isOpen && value?.answer}
                </Typography>
              </Box>
            </>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default P03;
