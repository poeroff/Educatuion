import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, List, ListHeader, Typography, ToggleButton, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

interface IListenAndAnswer {
  question: string;
  answer: string;
}

const P03 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (3)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      question: 'Another common type of dark pattern is known as “hidden fees.”',
      answer: '다크 패턴의 또 다른 일반적인 유형은 "숨겨진 수수료"로 알려져 있습니다.',
    },
    {
      question: 'This design suddenly adds extra fees at the last step of the ordering process.',
      answer: '이 디자인은 주문 프로세스의 마지막 단계에서 갑자기 추가 수수료를 추가합니다.',
    },
    {
      question:
        'On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the seller has added to increase 5 the final cost of the order.',
      answer:
        '마지막 페이지에서 소비자는 추가 요금을 발견하고 깜짝 놀라게 됩니다, 판매자가 추가한 배송비나 처리 수수료와 같은 추가 요금으로 인해 주문의 최종 비용이 5 주문의 최종 비용.',
    },
    {
      question: '“Confirm-shaming” is another online trick that users should be aware of.',
      answer: '“확인 사기”는 사용자가 주의해야 하는 또 다른 온라인 사기 수법입니다. 주의해야 합니다.',
    },
    {
      question: 'This technique manipulates users into feeling ashamed for cancelling their membership or requesting a refund for an order.',
      answer: '이 수법은 사용자가 부끄러움을 느끼도록 유도하여 멤버십을 취소하거나 회원 가입을 취소하거나 주문에 대한 환불을 요청하도록 유도합니다.',
    },
    {
      question: 'Companies use this to keep their members subscribed, even if it goes against the members’ intentions.',
      answer: '기업은 회원의 의도에 반하더라도 회원을 계속 가입시키기 위해 이 수법을 사용합니다. 회원의 의도에 반하는 경우에도 이를 사용합니다.',
    },
    {
      question:
        'For example, when users want to cancel their subscription, they are offered two options: “I want to keep my benefits” and “I want to give up my benefits.”',
      answer:
        '예를 들어 다음과 같은 경우 사용자가 구독을 취소하고자 하는 경우 두 가지 옵션이 제공됩니다: "혜택을 유지하고 싶습니다."와 "혜택을 포기하고 싶습니다. 내 혜택을 포기하고 싶습니다."',
    },
    {
      question: 'The first option is presented in an appealing way, while the second option seems like a bad choice.',
      answer: '첫 번째 옵션은 매력적인 방식으로 제시되는 반면, 두 번째 옵션은 나쁜 선택처럼 보입니다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Scroll height={'330px'} tabIndex={0}>
        <List<IListenAndAnswer>
          data={data}
          row={({ value }) => (
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
