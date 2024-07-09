import styled from 'styled-components';
import { Box, Label } from '@maidt-cntn/ui';
import { useMemo, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';

function P01() {
  const [dragCard, setDragCard] = useState<string | null>(null);
  const [dropCards, setDropCards] = useState<{ [key: string]: string | null }>({});

  const { getValueInputData, changeInputData, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleDragStart = (value: string) => {
    setDragCard(value);
  };

  const handleDrop = (target: string) => {
    if (target !== dragCard) return;

    setDropCards(prev => ({
      ...prev,
      [target]: dragCard,
    }));

    const newList = (getValueInputData(0, 'TEXT_LIST-0') as string[]).map(item => (item === dragCard ? '' : item));
    changeInputData(0, 'TEXT_LIST-0', newList);

    setDragCard(null);
  };

  const getEmptyValue = (values: string[]) => {
    return values.length === 0 || values.some(value => value.trim() === '');
  };

  const hasEmptyValue = useMemo(() => {
    return getEmptyValue(getValueInputData(0, 'TEXT_LIST-0') as string[]);
  }, [getValueInputData]);

  // const scriptList = [
  //   <Script>
  //     두 수를 각각 소인수분해 하여 거듭제곱으로 나타낸 후, 공통인 소인수의 거듭제곱에서 지수가 작거나 같은 것을 태하여 모두 곱하면{' '}
  //     <Card
  //       width='160px'
  //       onDrop={() => handleDrop('최대공약수')}
  //       onDragOver={e => e.preventDefault()}
  //       onClick={() => handleDrop('최대공약수')}
  //       $isTarget
  //       $isDropped={!!dropCards['최대공약수']}
  //     >
  //       {dropCards['최대공약수']}
  //     </Card>{' '}
  //     을/를 구할 수 있다.
  //   </Script>,
  //   <Script>
  //     최대공약수가 1인 두 자연수를{' '}
  //     <Card
  //       width='160px'
  //       onDrop={() => handleDrop('서로소')}
  //       onDragOver={e => e.preventDefault()}
  //       onClick={() => handleDrop('서로소')}
  //       $isTarget
  //       $isDropped={!!dropCards['서로소']}
  //     >
  //       {dropCards['서로소']}
  //     </Card>{' '}
  //     (이)라고 한다.
  //   </Script>,
  //   <Script>
  //     두 수를 각각 소인수분해 하여 거듭제곱으로 나타낸 후, 공통인 소인수의 거듭제곱에서 지수가 크거나 같은 것을 택하고 공통이 아닌 소인수의 거듭제곱을
  //     모두 택하여 곱하면
  //     <Card
  //       width='160px'
  //       onDrop={() => handleDrop('최소공배수')}
  //       onDragOver={e => e.preventDefault()}
  //       onClick={() => handleDrop('최소공배수')}
  //       $isTarget
  //       $isDropped={!!dropCards['최소공배수']}
  //     >
  //       {dropCards['최소공배수']}
  //     </Card>{' '}
  //     을/를 구할 수 있다.
  //   </Script>,
  // ];

  const scriptList = [
    {
      beforeCardText: '두 수를 각각 소인수분해 하여 거듭제곱으로 나타낸 후, 공통인 소인수의 거듭제곱에서 지수가 작거나 같은 것을 택하여 모두 곱하면 ',
      dropTarget: '최대공약수',
      afterCardText: ' 을/를 구할 수 있다.',
    },
    {
      beforeCardText: '최대공약수가 1인 두 자연수를 ',
      dropTarget: '서로소',
      afterCardText: ' (이)라고 한다.',
    },
    {
      beforeCardText:
        '두 수를 각각 소인수분해 하여 거듭제곱으로 나타낸 후, 공통인 소인수의 거듭제곱에서 지수가 크거나 같은 것을 택하고 공통이 아닌 소인수의 거듭제곱을 모두 택하여 곱하면 ',
      dropTarget: '최소공배수',
      afterCardText: ' 을/를 구할 수 있다.',
    },
  ];

  return (
    <Container
      headerInfo={{ headerPattern: 'icon', iconType: 'checkLearnedEmotion' }}
      questionInfo={{ text: <Title>빈칸에 알맞은 것을 넣으시오.</Title> }}
      submitLabel='완료하기'
      onSubmit={() => gradeSubmitPageData()}
      submitDisabled={hasEmptyValue || pageSubmitted}
      useExtend
    >
      <ContentsContainer>
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
          {scriptList.map((script, index) => (
            <Item key={index}>
              <Box marginTop='7px'>
                <Label value={index + 1} background='var(--color-grey-700)' color='#fff' />
              </Box>
              <ScriptContainer>
                <Script>
                  {script.beforeCardText}
                  <Card
                    width='160px'
                    onDrop={() => handleDrop(script.dropTarget)}
                    onDragOver={e => e.preventDefault()}
                    onClick={() => handleDrop(script.dropTarget)}
                    $isTarget
                    $isDropped={!!dropCards[script.dropTarget]}
                  >
                    {dropCards[script.dropTarget]}
                  </Card>
                  {script.afterCardText}
                </Script>
              </ScriptContainer>
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
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
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
`;

const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Script = styled.p`
  flex-wrap: nowrap;
  white-space: pre-wrap;

  font-weight: 600;
  font-size: 28px;
  line-height: 52px;
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

  font-weight: 700;
  font-size: 28px;
  line-height: 42px;

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

  margin-bottom: 20px;
`;

const INIT_VALUES = [
  {
    name: '최대공약수',
    width: '160px',
  },
  {
    name: '서로소',
    width: '160px',
  },
  {
    name: '최소공배수',
    width: '160px',
  },
];

export default P01;
