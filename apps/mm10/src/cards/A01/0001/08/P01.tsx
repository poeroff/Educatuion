import styled from 'styled-components';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import { Box, Typography, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import GradeCheck from '@/components/gradeCheck';

const P01 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });
  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const allQuestionAnswered = [...Array(4).keys()].every((_, idx) => (getValueInputData(idx, 'TEXT-0') as string).trim() !== '');

  return (
    <Container
      useExtend
      vAlign='start'
      headerInfo={{ headerPattern: 'icon', iconType: 'formativeTest' }}
      questionInfo={{
        text: (
          <HeaderWrapper>
            <Typography weight='800' fontSize='36px' color='#996500' style={{ padding: '0 14px 0 8px' }}>
              <span style={{ position: 'relative' }}>
                1
                <GradeCheck isGradeAll />
              </span>
            </Typography>
            <Typography weight='600' fontSize='36px' style={{ padding: '0' }}>
              다음 수가 소수이면 'ㅅ'으로, 합성수이면 'ㅎ'을&nbsp;
            </Typography>
            <Box width='42px' height='42px' border='1px solid #8D9299' borderRadius='8px' backgroundColor='#ffffff' />
            <Typography weight='600' fontSize='36px' style={{ padding: '0' }}>
              &nbsp;안에 써넣으시오.
            </Typography>
          </HeaderWrapper>
        ),
      }}
      submitLabel='채점하기'
      submitDisabled={pageSubmitted || !allQuestionAnswered}
      onSubmit={() => gradeSubmitPageData()}
    >
      <ContentWrapper>
        <Content>
          <TextBoxWrapper>
            <TextBox>
              <Text>
                <span>(1)</span>
                &nbsp;13
              </Text>
              <Input
                width='142px'
                inputSize='small'
                value={getValueInputData(0, 'TEXT-0') as string}
                onChange={e => handleChangeInputData(0, 'TEXT-0', e.target.value)}
                disabled={isSubmittedInput(0, 'TEXT-0')}
              />
            </TextBox>
            <TextBox>
              <Text>
                <span>(2)</span>
                &nbsp;15
              </Text>
              <Input
                width='142px'
                inputSize='small'
                value={getValueInputData(1, 'TEXT-0') as string}
                onChange={e => handleChangeInputData(1, 'TEXT-0', e.target.value)}
                disabled={isSubmittedInput(1, 'TEXT-0')}
              />
            </TextBox>
          </TextBoxWrapper>
          <TextBoxWrapper>
            <TextBox>
              <Text>
                <span>(3)</span>
                &nbsp;17
              </Text>
              <Input
                width='142px'
                inputSize='small'
                value={getValueInputData(2, 'TEXT-0') as string}
                onChange={e => handleChangeInputData(2, 'TEXT-0', e.target.value)}
                disabled={isSubmittedInput(2, 'TEXT-0')}
              />
            </TextBox>
            <TextBox>
              <Text>
                <span>(4)</span>
                &nbsp;25
              </Text>
              <Input
                width='142px'
                inputSize='small'
                value={getValueInputData(3, 'TEXT-0') as string}
                onChange={e => handleChangeInputData(3, 'TEXT-0', e.target.value)}
                disabled={isSubmittedInput(3, 'TEXT-0')}
              />
            </TextBox>
          </TextBoxWrapper>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default P01;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  white-space: nowrap;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  gap: 38px;
  flex-direction: column;
  padding: 30px 0 0 22px;
`;

const TextBoxWrapper = styled.div`
  display: flex;
  gap: 174px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  font-weight: 400;
  font-family: 'NOTO';
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  figure {
    transform: translate(0px, 10px);
  }

  span {
    font-family: 'SUIT';
    font-weight: 500;
    position: relative;
  }
`;
