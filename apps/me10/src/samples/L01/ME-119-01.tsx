import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, TMainHeaderInfoTypes, Textarea, Typography } from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

const ME11901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Sombody, Help!: Step1',
  };

  const questionInfo: IQuestionProps = {
    text: '그림 속 상황에서 다른 사람에게 어떤 도움을 요청할지 생각해 봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} onSubmit={() => {}} submitLabel='완료하기' vAlign='center'>
      <BoxWrap>
        <Box width={290}>
          <BalloonWrapper>
            <Balloon place='bottom' backgroundColor='var(--color-blue-100)' isShadow>
              <Typography fontSize='24px'>I don’t have toilet paper.</Typography>
            </Balloon>
          </BalloonWrapper>
          <BoxWrap justifyContent='center' marginBottom={10}>
            <Image src={'/example/ME1-L03-C04-A02-P01-01.png'} height='180px' alt='휴지가 남아있지 않은 휴지심과 화장실 문 이미지 입니다.' />
          </BoxWrap>
          <Textarea height='94px' placeholder='내용을 넣어 주세요.' ariaLabel='그림 속 상황에서 어떤 도움을 요청할 지 적어주세요.' />
        </Box>
        <Box width={290}>
          <BalloonWrapper>
            <Balloon place='bottom' backgroundColor='var(--color-red-50)' isShadow>
              <Typography fontSize='24px'>It’s too hot in here.</Typography>
            </Balloon>
          </BalloonWrapper>
          <BoxWrap justifyContent='center' marginBottom={10}>
            <Image
              src={'/example/ME1-L03-C04-A02-P01-02.png'}
              height='180px'
              alt='한쪽 다리에 깁스를 한 채 책상 앞 의자에 앉아 더워하는 여자아이 이미지 입니다.'
            />
          </BoxWrap>
          <Textarea height='94px' placeholder='내용을 넣어 주세요.' ariaLabel='그림 속 상황에서 어떤 도움을 요청할 지 적어주세요.' />
        </Box>
        <Box width={290}>
          <BalloonWrapper>
            <Balloon place='bottom' backgroundColor='var(--color-yellow-100)' isShadow>
              <Typography fontSize='24px'>I don’t understand this math problem.</Typography>
            </Balloon>
          </BalloonWrapper>
          <BoxWrap justifyContent='center' marginBottom={10}>
            <Image src={'/example/ME1-L03-C04-A02-P01-03.png'} height='180px' alt='수식을 떠올리며 고민하는 여자아이 이미지 입니다.' />
          </BoxWrap>
          <Textarea height='94px' placeholder='내용을 넣어 주세요.' ariaLabel='그림 속 상황에서 어떤 도움을 요청할 지 적어주세요.' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default ME11901;

const BalloonWrapper = styled.div`
  height: 105px;
  margin-bottom: 16px;
  & > * {
    width: 100% !important;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: wrap !important;
  }
`;
