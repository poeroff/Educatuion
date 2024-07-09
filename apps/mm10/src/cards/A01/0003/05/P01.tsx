import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import { Box, Label } from '@maidt-cntn/ui';
import { useState } from 'react';

function P01() {
  const [show, setShow] = useState(false);

  return (
    <Container headerInfo={null} useExtend>
      <ContentsContainer>
        <ItemContainer>
          <Text>
            <p>
              {'  '}
              <span role='definition'>함께하기</span>에서 두 수를 소인수분해 하면{' '}
              <span>
                24=2<sup>3</sup>×3
              </span>
              과{' '}
              <span>
                60=2<sup>2</sup>×3×5
              </span>
              이고, 두 수의
            </p>
            <p>
              최대공약수는{' '}
              <span>
                2<sup>2</sup>×3=12
              </span>
              임을 알 수 있다.
            </p>
            <p>{'  '}따라서 소인수분해를 이용하여 두 수의 최대공약수를 다음과 같이 구할 수 있다.</p>
          </Text>
          <Box height='148px' cursor='pointer' onClick={() => setShow(true)}>
            {show && (
              <Contents>
                <ContentsRow>
                  <Label value={1} background='var(--color-grey-700)' color='#fff' />
                  <Text>
                    <p>두 수를 각각 소인수분해 하여 거듭제곱으로 나타낸다.</p>
                  </Text>
                </ContentsRow>
                <ContentsRow>
                  <Label value={2} background='var(--color-grey-700)' color='#fff' />
                  <Text>
                    <p>공통인 소인수의 거듭제곱에서 지수가 작거나 같은 것을 택한다.</p>
                  </Text>
                </ContentsRow>
                <ContentsRow>
                  <Label value={1} background='var(--color-grey-700)' color='#fff' />
                  <Label value={2} background='var(--color-grey-700)' color='#fff' />
                  <Text>
                    <p>에서 택한 것을 모두 곱한다.</p>
                  </Text>
                </ContentsRow>
              </Contents>
            )}
          </Box>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.section`
  height: 100%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  font-size: 28px;
  font-weight: 600;
  line-height: 42px;

  white-space: pre-wrap;

  span {
    font-family: NOTO;
    font-weight: 400;

    > sup {
      margin-top: 10px;
      vertical-align: super;
      font-size: 0.6em;
      line-height: 1ch;
    }
  }

  span[role='definition'] {
    font-family: SUIT;
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 38px;

  gap: 80px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const ContentsRow = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

export default P01;
