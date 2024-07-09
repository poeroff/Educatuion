import styled from 'styled-components';
import { Box, Drawing, SvgIcon, Textarea, Typography } from '@maidt-cntn/ui';
import TogetherIcon from '@/assets/A01/0001/05/together.svg';
import { MContainer } from '@maidt-cntn/ui/math';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import { useState } from 'react';

const P01 = () => {
  const [values, setValues] = useState<{ [key: string]: string }>({ textarea1: '', textarea2: '' });
  const fileUrl = '/A01/0001/05/A-MM1-0101-05-01.png';

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });
  const handleChangeInputData = (mainKey: number, subKey: string, value: string, key: string) => {
    changeInputData(mainKey, subKey, value);
    setValues({ ...values, [key]: value });
  };

  const allAnswered = Object.values(values).every(v => v.trim() !== '');

  return (
    <MContainer
      headerInfo={null}
      questionInfo={{
        text: (
          <HeaderWrapper>
            <Typography weight='800' fontSize='36px' color='#996500'>
              <span>2</span>
            </Typography>
            <Typography weight='600' fontSize='36px' style={{ padding: '0' }}>
              소수를 어떻게 찾을 수 있을까?
            </Typography>
          </HeaderWrapper>
        ),
      }}
      submitDisabled={!allAnswered || pageSubmitted}
      onSubmit={() => gradeSubmitPageData()}
      submitLabel='완료하기'
      cardType='mainText'
    >
      <ContentWrapper>
        <QuestionText>자연수 중에서 소수를 찾는 방법을 알아보자.</QuestionText>
        <Content>
          <div style={{ width: '110px', height: '1065px' }}>
            <SvgIcon src={TogetherIcon} width='110px' height='1065px' />
          </div>
          <QuestionContainer>
            <QuestionText>
              다음은 <NumberText>1</NumberText>부터 <NumberText>50</NumberText>까지 자연수 중에서 소수를 찾는 과정이다.
            </QuestionText>
            <Description>
              <NumberTextWrapper>
                <Number>1</Number>
                <DescriptionText>1은 소수가 아니므로 지운다.</DescriptionText>
              </NumberTextWrapper>
              <NumberTextWrapper>
                <Number>2</Number>
                <DescriptionText>2에 O표를 하여 남기고, 나머지 2의 배수를 모두 지운다.</DescriptionText>
              </NumberTextWrapper>
              <NumberTextWrapper>
                <Number>3</Number>
                <DescriptionText>3에 O표를 하여 남기고, 나머지 3의 배수를 모두 지운다.</DescriptionText>
              </NumberTextWrapper>
              <NumberTextWrapper>
                <Number>4</Number>
                <DescriptionText>남은 수 중에서 처음 수에 O표를 하여 남기고, 그 수의 배수를 모두 지우는 과정을 반복한다.</DescriptionText>
              </NumberTextWrapper>
            </Description>

            <Drawing image={{ src: fileUrl ?? '', alt: '1부터 50까지의 자연수' }} width='717px' height='303px' />

            <QuestionWrapper>
              <QuestionNumber>1</QuestionNumber>
              <Box display='flex' flexDirection='column' gap='20px' width='100%'>
                <QuestionText>2에 표를 하여 남기고, 나머지 2의 배수를 지우는 이유를 말해 보자.</QuestionText>
                <Textarea
                  height='142px'
                  disabled={isSubmittedInput(0, 'TEXT-0')}
                  value={getValueInputData(0, 'TEXT-0') as string}
                  onChange={e => {
                    handleChangeInputData(0, 'TEXT-0', e.target.value, 'textarea1');
                  }}
                  placeholder=''
                />
              </Box>
            </QuestionWrapper>
            <QuestionWrapper>
              <QuestionNumber>2</QuestionNumber>
              <Box display='flex' flexDirection='column' gap='20px' width='100%'>
                <QuestionText>위에서 표를 한 수가 소수이다. 1부터 50까지 자연수 중에서 소수를 모두 써 보자.</QuestionText>
                <Textarea
                  height='58px'
                  disabled={isSubmittedInput(1, 'TEXT-0')}
                  value={getValueInputData(1, 'TEXT-0') as string}
                  onChange={e => {
                    handleChangeInputData(1, 'TEXT-0', e.target.value, 'textarea2');
                  }}
                  placeholder=''
                />
              </Box>
            </QuestionWrapper>
          </QuestionContainer>
        </Content>
      </ContentWrapper>
    </MContainer>
  );
};

export default P01;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  margin-left: -15px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 10px 67px 0;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
`;

const QuestionText = styled.span`
  font-family: 'SUIT';
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

const Description = styled.div`
  padding: 20px;

  border: 1px solid #b0b6c0;
  border-radius: 8px;
  background-color: white;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NumberTextWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Number = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #ffffff;
  background-color: #6a6d73;

  font-weight: 700;
  font-size: 24px;
  line-height: 26px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionText = styled.span`
  font-size: 26px;
  font-weight: 600;
  line-height: 39px;
  width: 700px;
`;

const Image = styled.img`
  width: 717px;
  height: 303px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: self-start;
  gap: 28px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const QuestionNumber = styled.span`
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
  text-align: center;
  color: #996500;
`;

const NumberText = styled.span`
  font-family: 'NOTO';
`;
