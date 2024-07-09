import styled from 'styled-components';
import { EStyleFontSizes, ESvgType, Rating, SvgIcon, Typography, Input } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/math';
import LineSVG from '@/assets/A01/0099/04/A-MM1-010099-04-line.svg';
import RightBgSVG from '@/assets/A01/0099/04/A-MM1-010099-04-1.svg';
import { getCorrectData, getDefaultData } from './pageData';
import { StarRating } from '@/components/StarRating';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: number | string) => {
    changeInputData(mainKey, subKey, value);
  };

  return (
    <Container headerInfo={null} onSubmit={submitPageData} useScroll useExtend submitLabel='완료하기' submitDisabled={pageSubmitted}>
      <Wrapper>
        <img alt='background' src={RightBgSVG} width='222px' height='374px' />
        <WhiteBgWrapper>
          <ContentWrapper>
            <img alt='line' src={LineSVG} />
            <Content>
              <Typography>
                <div className='title'>내가 설정한 학습 목표</div>
                <ItemContainer>
                  <Item>
                    <Question>1. 서두르지 않고 꼼꼼하게 문제를 풀어보겠다.</Question>
                    <Input
                      status={'enable'}
                      width='175px'
                      value={getValueInputData(0, 'TEXT-0') as string}
                      onChange={event => {
                        handleChangeInputData(0, 'TEXT-0', event?.target.value);
                      }}
                    />
                  </Item>
                  <Item>
                    <Question>2. 여러가지 방법으로 문제를 해결하도록 하겠다.</Question>
                    <Input
                      status={'enable'}
                      width='175px'
                      value={getValueInputData(1, 'TEXT-0') as string}
                      onChange={event => {
                        handleChangeInputData(1, 'TEXT-0', event?.target.value);
                      }}
                    />
                  </Item>
                  <Item>
                    <Question>3. 틀린 문제에 대해 풀이를 확인하기 전에 한 번 더 고민하여 풀어보겠다.</Question>
                    <Input
                      status={'enable'}
                      width='175px'
                      value={getValueInputData(2, 'TEXT-0') as string}
                      onChange={event => handleChangeInputData(2, 'TEXT-0', event?.target.value)}
                    />
                  </Item>
                </ItemContainer>
              </Typography>
            </Content>
          </ContentWrapper>
          <ContentWrapper>
            <SvgIcon type={ESvgType.IMG} src={LineSVG} />
            <Content>
              <Typography>
                <div className='title'>학습 목표 설정</div>
              </Typography>
              <TableWrapper>
                <div className='tableHeader'>
                  <Typography className='question'>스스로 학습 목표를 설정해 보세요!</Typography>
                  <div className='rate'>
                    <Typography size={EStyleFontSizes['X-SMALL']}>노력할 거야</Typography>
                    <Typography size={EStyleFontSizes['X-SMALL']}>잘할거야!</Typography>
                    <Typography size={EStyleFontSizes['X-SMALL']}>아주 잘 할 거야!</Typography>
                  </div>
                </div>
                <div className='tableRow'>
                  <Typography width='600px' lineHeight='40px'>
                    1. 서두르지 않고 꼼꼼하게 문제를 풀어 보겠다.
                  </Typography>
                  <StarRating
                    mainKey={3}
                    subKey='NUMBER-0'
                    count={3}
                    gap={37}
                    ariaLabelList={ARIA_LABEL_LIST}
                    changeInputData={changeInputData}
                    getValueInputData={getValueInputData}
                    isSubmittedInput={isSubmittedInput}
                  />
                </div>
                <div className='tableRow'>
                  <Typography width='600px' lineHeight='40px'>
                    2. 여러 가지 방법으로 문제를 해결하도록 하겠다.
                  </Typography>
                  <StarRating
                    mainKey={4}
                    subKey='NUMBER-0'
                    count={3}
                    gap={37}
                    ariaLabelList={ARIA_LABEL_LIST}
                    changeInputData={changeInputData}
                    getValueInputData={getValueInputData}
                    isSubmittedInput={isSubmittedInput}
                  />
                </div>
                <div className='tableRow'>
                  <Typography width='600px' lineHeight='40px'>
                    3. 틀린 문제에 대해 풀이를 확인하기 전에 한번 더 고민하며 풀어 보겠다.
                  </Typography>
                  <StarRating
                    mainKey={5}
                    subKey='NUMBER-0'
                    count={3}
                    gap={37}
                    ariaLabelList={ARIA_LABEL_LIST}
                    changeInputData={changeInputData}
                    getValueInputData={getValueInputData}
                    isSubmittedInput={isSubmittedInput}
                  />
                </div>
              </TableWrapper>
            </Content>
          </ContentWrapper>
        </WhiteBgWrapper>
      </Wrapper>
    </Container>
  );
};

export default P01;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  > img {
    position: absolute;
    top: 94px;
    right: 0px;
  }
`;

const WhiteBgWrapper = styled.section`
  position: relative;
  width: 875px;
  border-radius: 0px 40px 40px 0px;
  background-color: white;
  padding: 30px 0px 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  z-index: 2;
  & > img {
    position: absolute;
    right: -150px;
    top: 30px;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const Content = styled.div`
  & > span {
    padding-left: 20px;
    margin-top: -4px;
    border-left: 2px solid #f37259;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .title {
      color: #f37259;
    }
    .content {
      width: 580px;
      word-break: keep-all;
    }
  }
`;

const TableWrapper = styled.div`
  padding-top: 20px;
  width: 804px;

  .tableHeader {
    height: 60px;
    display: flex;
    background-color: #c0e4cb;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0px 4px 20px;
    border-radius: 12px;

    & > span {
      font-family: SUIT;
      font-size: 20px;
      font-weight: 600;
      line-height: 40px;
    }
    .rate {
      display: flex;
      align-items: center;
      width: 215px;
      span {
        word-break: keep-all;
        text-align: center;
        padding: 4px 10px;
        font-family: SUIT;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }
    }
    .question {
      white-space: nowrap;
    }
  }
  .tableRow {
    display: flex;
    /* justify-content: space-between; */
    /* padding: 0px 25px 0px 0px; */
    /* align-items: center; */
    border-bottom: 1px solid #b0b6c0;
    padding: 10px 0px 10px 8px;
    /* span {
      display: inline-block;
      width: 587px;
      font-size: var(--font-size-24);
      word-break: keep-all;
      padding: 8px 10px;
    } */
  }
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 788px;
  height: 218px;
`;

const Item = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  min-height: 57px;

  > input {
    width: 175px;
    height: 57px;
  }
`;

const Question = styled.div`
  width: 540px;
  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  text-align: left;
`;

const ARIA_LABEL_LIST = ['노력할 거야', '잘할거야!', '아주 잘 할거야!'];
