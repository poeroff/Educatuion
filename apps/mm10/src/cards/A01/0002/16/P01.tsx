import styled from 'styled-components';

import { Label } from '@maidt-cntn/ui';
import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';

function P01() {
  const [dragCard, setDragCard] = useState<string | null>(null);
  const [dropCards, setDropCards] = useState<{ [key: string]: string | null }>({});

  const handleDragStart = (card: string) => {
    setDragCard(card);
  };

  const handleDrop = (target: string) => {
    if (target !== dragCard) return;
    setDropCards(prev => ({
      ...prev,
      [target]: target,
    }));

    setDragCard(null);
  };

  const scriptList = [
    <>
      <Script>
        <Number>
          2<sup>2</sup>, 2<sup>3</sup>, 2<sup>4</sup>,
        </Number>{' '}
        ...을 각각 <Number>2</Number>의 제곱, <Number>2</Number>의 세제곱, <Number>2</Number>의 네제곱, ...이라 읽고,
      </Script>
      <Script>
        이들을 통틀어 <Number>2</Number>의{' '}
        <Card
          width='122px'
          onDrop={() => handleDrop('거듭제곱')}
          onDragOver={e => e.preventDefault()}
          onClick={() => handleDrop('거듭제곱')}
          $isTarget
          $isDropped={!!dropCards['거듭제곱']}
        >
          {dropCards['거듭제곱']}
        </Card>{' '}
        (이)라고 한다.
      </Script>
    </>,
    <>
      <Script>
        <Number>
          3<sup>4</sup>
        </Number>
        에서 곱하는 수 <Number>3</Number>을 거듭제곱의{' '}
        <Card
          width='50px'
          onDrop={() => handleDrop('밑')}
          onDragOver={e => e.preventDefault()}
          onClick={() => handleDrop('밑')}
          $isTarget
          $isDropped={!!dropCards['밑']}
        >
          {dropCards['밑']}
        </Card>
        {' , '}
        <Number>3</Number>이 곱해진 개수 <Number>4</Number>를 거듭제곱의{' '}
      </Script>
      <Script>
        <Card
          width='100px'
          onDrop={() => handleDrop('지수')}
          onDragOver={e => e.preventDefault()}
          onClick={() => handleDrop('지수')}
          $isTarget
          $isDropped={!!dropCards['지수']}
        >
          {dropCards['지수']}
        </Card>{' '}
        (이)라고 한다.
      </Script>
    </>,
    <Script>
      어떤 자연수의 약수 중에서 소수인 것을 그 자연수의{' '}
      <Card
        width='98px'
        onDrop={() => handleDrop('소인수')}
        onDragOver={e => e.preventDefault()}
        onClick={() => handleDrop('소인수')}
        $isTarget
        $isDropped={!!dropCards['소인수']}
      >
        {dropCards['소인수']}
      </Card>{' '}
      (이)라고 한다.
    </Script>,
    <>
      <Script>어떤 자연수를 그 수의 소인수들만의 곱으로 나타내는 것을</Script>
      <Script>
        <Card
          width='147px'
          onDrop={() => handleDrop('소인수분해')}
          onDragOver={e => e.preventDefault()}
          onClick={() => handleDrop('소인수분해')}
          $isTarget
          $isDropped={!!dropCards['소인수분해']}
        >
          {dropCards['소인수분해']}
        </Card>{' '}
        한다고 한다.
      </Script>
    </>,
  ];

  return (
    <Container headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }} useExtend>
      <ContentsContainer>
        <Title>빈칸에 알맞은 것을 넣으시오.</Title>
        <ItemContainer>
          <Cards>
            {INIT_VALUES.map(({ width, name }) => (
              <Card
                key={name}
                width={width}
                draggable
                onDragStart={() => handleDragStart(name)}
                onClick={() => handleDragStart(name)}
                $isCurrent={dragCard === name}
                $isDropped={!!dropCards[name]}
              >
                {name}
              </Card>
            ))}
          </Cards>
          {scriptList.map((el, index) => (
            <Item key={String(index)}>
              <Label value={index + 1} background='var(--color-grey-700)' color='#fff' />
              <ScriptContainer>{el}</ScriptContainer>
            </Item>
          ))}
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 32px;
  line-height: 50px;
`;

const ItemContainer = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const Item = styled.div`
  display: flex;
  gap: 10px;

  span:first-child {
    margin-top: 7px;
  }
`;

const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Script = styled.p`
  white-space: pre-wrap;

  font-family: var(--font-SUIT);
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  sup {
    vertical-align: super;
    font-size: 0.6em;
    line-height: 1ch;
  }
`;

const Number = styled.span`
  font-family: var(--font-NOTO);
`;

const Card = styled.span<{ width: string; $isTarget?: boolean; $isCurrent?: boolean; $isDropped?: boolean }>`
  display: inline-flex;

  width: ${({ width }) => width};
  height: ${({ $isTarget }) => ($isTarget ? '52px' : '58px')};
  padding: 8px 12px;

  align-items: center;
  justify-content: center;
  vertical-align: middle;

  white-space: nowrap;

  font-family: SUIT;
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);

  border-radius: 8px;

  background-color: var(--color-yellow-100);
  box-shadow: var(--dp-1);

  ${({ $isTarget }) =>
    $isTarget &&
    `
    border: 1px solid var(--color-grey-500);
    background-color: var(--color-white);
    box-shadow: none;
  `}

  ${({ $isCurrent }) =>
    $isCurrent &&
    `
    box-shadow: var(--dp-8);
  `}

  ${({ $isTarget, $isDropped }) =>
    !$isTarget &&
    $isDropped &&
    `
    border: 1px solid var(--color-grey-400);
    box-shadow: none;
    background-color: var(--color-grey-50);
    color: var(--color-grey-600);
  `}

${({ $isTarget, $isDropped }) =>
    $isTarget &&
    $isDropped &&
    `
    border: 1px solid var(--color-yellow-300);
    box-shadow: none;
    background-color: var(--color-yellow-100);
  `}
`;

const Cards = styled.div`
  display: flex;
  align-self: center;

  gap: 26px;

  margin-bottom: 48px;
`;

const INIT_VALUES = [
  {
    name: '지수',
    width: '100px',
  },
  {
    name: '거듭제곱',
    width: '122px',
  },
  {
    name: '소인수',
    width: '98px',
  },
  {
    name: '밑',
    width: '50px',
  },
  {
    name: '소인수분해',
    width: '147px',
  },
];

export default P01;
