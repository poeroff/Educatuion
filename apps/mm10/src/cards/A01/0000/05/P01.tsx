import styled from 'styled-components';
import { Box, ChipButton, EChipButtonType, EStyleFontSizes, ESvgType, Rating, SvgIcon, Typography } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { MContainer } from '@maidt-cntn/ui/math';
import LineSVG from '@/assets/A01/0000/05/A-MM1-0100-05-line.svg';
import { getDefaultData, getCorrectData } from './pageData';
import { StarRating } from '@/components/StarRating';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  return (
    <MContainer headerInfo={null} onSubmit={submitPageData} submitLabel='완료하기' submitDisabled={pageSubmitted} useExtend vAlign='start'>
      <Wrapper>
        <SvgIcon type={ESvgType.IMG} src={FILE_URL} alt='학생들이 분리수거를 하고 있습니다.' width='222px' height='374px' />
        <WhiteBgWrapper>
          <ContentWrapper>
            <SvgIcon type={ESvgType.IMG} src={LineSVG} />
            <Content>
              <Typography lineHeight='42px'>
                <div className='title'>이 단원에서는</div>
                <div className='content'>소인수분해의 뜻을 알고, 소인수분해를 이용하여 최대공약수와 최소공배수를 구하는 방법을 배웁니다.</div>
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
                  <Typography className='question' size={EStyleFontSizes.SMALL}>
                    스스로 학습 목표를 설정해 보세요!
                  </Typography>
                  <div className='rate'>
                    <Typography size={EStyleFontSizes['X-SMALL']}>노력할 거야</Typography>
                    <Typography size={EStyleFontSizes['X-SMALL']}>잘할거야!</Typography>
                    <Typography size={EStyleFontSizes['X-SMALL']} style={{ whiteSpace: 'nowrap' }}>
                      아주
                      <br />잘 할거야!
                    </Typography>
                  </div>
                </div>
                <div className='tableRow'>
                  <Typography width='600px' lineHeight='40px'>
                    1. 서두르지 않고 꼼꼼하게 문제를 풀어 보겠다.
                  </Typography>
                  <StarRating
                    mainKey={0}
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
                    mainKey={1}
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
                    mainKey={2}
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
    </MContainer>
  );
};

export default P01;

const Wrapper = styled.div`
  width: 100%;

  position: relative;

  padding-bottom: 27px;
  > img {
    position: absolute;
    top: 120px;
    right: -80px;
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
    display: flex;
    background-color: #c0e4cb;
    gap: 290px;
    align-items: center;
    padding: 0 10px 0 10px;
    border-radius: 12px;
    .rate {
      display: flex;
      align-items: center;
      width: 180px;
      span {
        word-break: keep-all;
        text-align: center;
        padding: 4px 6px;
      }
    }
    .question {
      white-space: nowrap;
    }
  }
  .tableRow {
    display: flex;
    border-bottom: 1px solid #b0b6c0;
    padding: 10px 0px 10px 8px;
  }
`;

const FILE_URL = '/A01/0000/01/A-MM1-0100-05-01.png';

const ARIA_LABEL_LIST = ['노력할 거야', '잘할거야!', '아주 잘 할거야!'];
