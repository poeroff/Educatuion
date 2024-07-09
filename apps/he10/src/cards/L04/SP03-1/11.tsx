import { Box, BoxWrap, EStyleFontSizes, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
interface IEngLishAndKorean {
  eng: string;
  kor: string;
}

const P11 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };
  const data: IEngLishAndKorean[] = [
    {
      eng: 'Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups.',
      kor: '재활용된 커피 찌꺼기는 커피 땔감, 의류 및 신발용 직물, 재사용할 수 있는 컵 등 다양한 용도로 사용된다.',
    },
    {
      eng: 'Coffee logs, for instance, generate more heat and burn for a longer time than wood.',
      kor: '예를 들어, 커피 땔감은 장작보다 더 많은 열을 발생시키고 더 오랫동안 탄다.',
    },
    {
      eng: 'Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection.',
      kor: '커피 찌꺼기로 만든 직물은 땀을 흡수하고 빠르게 건조되며 자외선 차단 기능을 제공한다.',
    },
    {
      eng: 'Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee.',
      kor: '커피 찌꺼기로 만든 재사용 가능한 컵은 시각적으로 매력적인 외관을 지닐 뿐만 아니라 커피의 맛도 보존한다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box background='white' useRound paddingBottom='28px' useFull marginTop='8px'>
          <Scroll tabIndex={0}>
            <Box display='flex' gap='12px' flexDirection='column' paddingBottom='10px'>
              <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <Box display='flex' maxWidth='50%'>
                  <PinchZoom pinchType={'image'}>
                    <Image size='100%' src={'/L04/SP03-1/HE1-L04-SP03-1-P11.jpg'} alt='' ariaDescribedby='img_desc' />
                    <Box type='hidden' id='img_desc'>
                      <p>커피 찌꺼기가 재활용된 예시들을 세 개의 사진으로 보여주고 있다. </p>
                      <p>왼쪽부터 연료, 섬유, 재활용 컵을 보여주는 사진</p>
                    </Box>
                  </PinchZoom>
                </Box>
              </div>
              <Typography color='var(--color-grey-900)'>{data[0].eng}</Typography>
              <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                {data[0].kor}
              </Typography>

              <Typography color='var(--color-grey-900)'>{data[1].eng}</Typography>
              <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                {data[1].kor}
              </Typography>
              <Typography color='var(--color-grey-900)'>{data[2].eng}</Typography>
              <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                {data[2].kor}
              </Typography>
              <Typography color='var(--color-grey-900)'>{data[3].eng}</Typography>
              <Typography color='var(--color-blue-900)' size={EStyleFontSizes['X-MEDIUM']}>
                {data[3].kor}
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P11;
