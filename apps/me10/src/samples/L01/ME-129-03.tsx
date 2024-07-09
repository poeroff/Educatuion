import { useState } from 'react';
import { Box, BoxWrap, Drawing, IQuestionProps, PinchZoom, TMainHeaderInfoTypes, Typography, Image, TextView, ETextViewColor } from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

const ME12903 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meFunActivity',
  };

  const questionInfo: IQuestionProps = {
    text: '세 가지 초능력을 가진 슈퍼 히어로를 그리고, 짝에게 소개해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
      useExtend
    >
      <Box padding='unset'>
        <Box useFull padding='unset'>
          <Box display='flex' height={367}>
            <BoxWrap flexDirection='column' paddingRight={24}>
              <Box height={367}>
                <Drawing />
              </Box>
            </BoxWrap>

            <BoxWrap flexDirection='column'>
              <Box width={508} display='flex' flexDirection='column' fontSize='var(--font-size-18)'>
                <Box display='inline-flex'>
                  {/* <PinchZoom> */}
                  <Box paddingRight={18} alignContent='center'>
                    <PinchZoom>
                      <Image
                        src='/example/ME1-L03-C09-A07-P01.png'
                        height='158px'
                        width='172px'
                        alt='식탁에서 엄마는 빵, 달걀, 커피를, 나는 빵, 토마토, 달걀, 유유를, 아빠는 고구마, 달걀, 베이컨, 바나나, 오렌지 주스를 먹으려고 한다.'
                      />
                    </PinchZoom>
                  </Box>

                  <Box height={250}>
                    <Balloon place='left' backgroundColor='var(--color-green-50)' isShadow whiteSpace={false}>
                      <Typography useGap={false} fontSize='var(--font-size-24)'>
                        My superhero is Niffler. He can find coins anywhere. He can hide all the shiny things in his pocket. He can fly.
                      </Typography>
                    </Balloon>
                  </Box>
                </Box>
              </Box>
              <TextView height='184px' type={ETextViewColor.DEFAULT} title={'Idea Bank'} themeColor={'var(--color-green-700)'}>
                <BoxWrap useFull boxGap={0} flexWrap='wrap' justifyContent='center' fontSize='24px'>
                  <Box textWrap='nowrap' margin='0 25px 10px'>
                    fly
                  </Box>
                  <Box textWrap='nowrap' margin='0 25px 10px'>
                    climb walls
                  </Box>
                  <Box textWrap='nowrap' margin='0 25px'>
                    travel through time
                  </Box>
                  <Box textWrap='nowrap' margin='0 25px'>
                    read minds
                  </Box>
                </BoxWrap>
              </TextView>
            </BoxWrap>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME12903;
