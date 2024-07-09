import { useState } from 'react';
import styled from 'styled-components';
import { Label, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import DragIcon from '@/assets/A01/0001/09/drag.svg';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';

function P01() {
  const { gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

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
    <Script>
      <span>1</span>
      보다 큰 자연수 중에서 <span>1</span>과 자기 자신만을 약수로 갖는 수를
      <Card width='254px' onDrop={() => handleDrop('소수')} onDragOver={e => e.preventDefault()} onClick={() => handleDrop('소수')} $isTarget>
        {dropCards['소수'] ? (
          <> {dropCards['소수']}</>
        ) : (
          <>
            <SvgIcon src={DragIcon} width='32px' height='32px' />
            <IconText>이곳에 드래그해 주세요.</IconText>
          </>
        )}
      </Card>{' '}
      (이)라고 한다.
    </Script>,
    <Script>
      <span>1</span>
      보다 큰 자연수 중에서 소수가 아닌 수를{' '}
      <Card width='254px' onDrop={() => handleDrop('합성수')} onDragOver={e => e.preventDefault()} onClick={() => handleDrop('합성수')} $isTarget>
        {dropCards['합성수'] ? (
          <> {dropCards['합성수']}</>
        ) : (
          <>
            <SvgIcon src={DragIcon} width='32px' height='32px' />
            <IconText>이곳에 드래그해 주세요.</IconText>
          </>
        )}
      </Card>{' '}
      (이)라고 한다.
    </Script>,
  ];

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{ text: <Title>빈칸에 알맞은 것을 넣으시오.</Title> }}
      submitDisabled={!dropCards['소수'] || !dropCards['합성수'] || pageSubmitted}
      submitLabel='완료하기'
      onSubmit={gradeSubmitPageData}
    >
      <ContentsContainer>
        <ItemContainer>
          {scriptList.map((el, index) => (
            <Item key={index}>
              <span style={{ marginTop: '5px' }}>
                <Label value={index + 1} background='var(--color-grey-700)' color='#fff' />
              </span>
              <ScriptContainer>{el}</ScriptContainer>
            </Item>
          ))}
          <Cards>
            {INIT_VALUES.map(({ width, name }) => (
              <Card
                key={name}
                width={width}
                draggable
                onDragStart={() => handleDragStart(name)}
                onClick={() => handleDragStart(name)}
                $isCurrent={dragCard === name}
              >
                {name}
              </Card>
            ))}
          </Cards>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.div`
  height: 100%;
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
`;

const ItemContainer = styled.div`
  padding: 30px 0 10px;
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const Item = styled.div`
  display: flex;
  gap: 10px;
`;

const IconText = styled.span`
  font-family: 'SUIT' !important;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  color: var(--color-grey-700);
  margin-left: 8px;
`;

const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Script = styled.div`
  font-family: var(--font-SUIT);
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  flex-wrap: wrap;
  white-space: pre-wrap;

  span {
    font-family: var(--font-NOTO);
  }
`;

const Card = styled.div<{ width: string; $isTarget?: boolean; $isCurrent?: boolean }>`
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
    border: 1px dotted var(--color-grey-500);
    background-color: var(--color-grey-50);
    box-shadow: none;
  `}

  ${({ $isCurrent }) =>
    $isCurrent &&
    `
    box-shadow: var(--dp-8);
  `}
`;

const Cards = styled.div`
  display: flex;
  align-self: center;

  gap: 26px;

  margin: 60px 0 22px;
`;

const INIT_VALUES = [
  {
    name: '소수',
    width: '254px',
  },
  {
    name: '합성수',
    width: '254px',
  },
];

export default P01;
