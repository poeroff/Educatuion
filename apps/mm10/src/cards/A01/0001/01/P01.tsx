import { SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import TitleIconSVG from '@/assets/A01/0001/01/title.svg';
import CheckIconSVG from '@/assets/A01/0001/01/check.svg';

const P01 = () => {
  return (
    <Container headerInfo={null} vAlign='start' useExtend>
      <ContentsContainer>
        <Title>
          <SvgIcon src={TitleIconSVG} width='160px' height='132px' />
          <h1>소수와 합성수</h1>
        </Title>
        <ItemContainer>
          <Tag>
            <SvgIcon src={CheckIconSVG} width='28px' height='28px' />
            <p>이 단원을 배우면</p>
          </Tag>
          <Contents>
            <ul>
              <li>소수와 합성수의 뜻을 알고, 소수를 찾을 수 있다.</li>
            </ul>
          </Contents>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
};

const ContentsContainer = styled.div`
  height: 100%;

  padding-top: 48px;

  display: flex;
  flex-direction: column;
  gap: calc(80px + 52px);
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  gap: 16px;

  h1 {
    font-weight: 700;
    font-size: 52px;
    line-height: 58px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
`;

const Tag = styled.div`
  position: absolute;
  left: 27px;
  top: -52px;

  width: 228px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  border-radius: 20px 20px 0 0;

  background-color: #839ca9;

  p {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: var(--color-white);
  }
`;

const Contents = styled.div`
  box-sizing: border-box;

  width: 100%;

  border-left: 2px solid #839ca9;
  border-top: 2px solid #839ca9;
  border-top-left-radius: 16px;

  padding: 20px;

  ul {
    display: flex;
    flex-direction: column;

    gap: 20px;
  }

  li {
    display: flex;
    align-items: center;

    gap: 18px;

    margin-left: 17px;

    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
  }

  li::before {
    content: '';

    width: 8px;
    height: 8px;

    background-color: #111;

    border-radius: 50%;
  }
`;

export default P01;
