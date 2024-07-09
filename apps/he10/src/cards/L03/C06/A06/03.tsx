import React, { useState } from 'react';
import { TMainHeaderInfoTypes, Box, List, ListHeader, ToggleButton, Scroll, Typography, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  question: React.ReactNode;
  answer: React.ReactNode;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Turning Out: The Science of Noise-Cancellation (4)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Exploring the Technology and Its Applications',
      answer: '기술과 적용사례 살펴보기',
    },
    {
      question: 'Noise-cancelling technology is not only used in music devices.',
      answer: '노이즈 캔슬링 기술은 음악 기기에만 사용되는 것이 아닙니다.',
    },
    {
      question: 'Other fields also take advantage of this technology, such as ticket offices at tourist attractions which are often very noisy.',
      answer: '종종 매우 시끄러운 관광 명소의 매표소와 같은 다른 분야에서도 이 기술을 활용합니다.',
    },
    {
      question:
        'Microphones are installed in ticket offices to detect external noise, and an opposite sound wave is generated and transmitted through a speaker,enabling the ticket agent to hear the customer’s voice clearly.',
      answer:
        '매표소에는 외부 소음을 감지하기 위한 마이크가 설치되어 있으며 , 반대 음파가 발생되어 스피커를 통해 전달되어 매표소 직원이 고객의 목소리를 또렷하게 들을 수 있습니다',
    },
    {
      question: 'Another area in which this technology is used is drive-through fast-food restaurants and coffee shops.',
      answer: '이 기술이 사용되는 또 다른 분야는 드라이브 스루 패스트푸드 음식점과 커피숍입니다.',
    },
    {
      question: 'They use noise-cancelling headsets to improve communication between employees and customers by eliminating vehicle noise.',
      answer: '그들은 소음 제거 헤드셋을 사용하여 차량 소음을 제거함으로써 직원과 고객 간의 의사소통을 개선합니다 .',
    },
    {
      question: 'These noise-cancelling headsets help drive-through employees take orders accurately.',
      answer: '이러한 소음 제거 헤드셋은 드라이브 스루 직원이 정확하게 주문을 받는 데 도움이 됩니다.',
    },
    {
      question:
        'The same technology is also used for cars, whose audio systems generate waves to cancel out unpleasant sounds such as engine, wind, and road noise.',
      answer: '엔진 , 바람 , 도로 소음과 같은 불쾌한 소리를 상쇄하기 위해 오디오 시스템이 음파을 생성하는 자동차에도 동일한 기술이 사용됩니다.',
    },
    {
      question: 'Thanks to noise-cancelling devices, it is possible for drivers to focus on driving without being disturbed by distracting noises.',
      answer: '소음 제거 장치 덕분에 운전자는 방해가 되는 소음에 방해받지 않고 운전에 집중할 수 있습니다 .',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton
          id='toggle'
          isChecked={isOpen}
          isTranslation
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? '해석 보이기' : '해석 안 보이기'}
        />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value, index = 1 }) => (
            <BoxWrap boxGap={10}>
              <Box>
                <Typography weight={index === 1 ? 'var(--font-weight-extraBold)' : 'var(--font-weight-regular)'}>{value?.question}</Typography>
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
