import { Box, BoxWrap, IAudioPlayerProps, Image, PinchZoom, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A05/HE2-L02-C06-A05-P01.mp3',
    captionSrc: '/L02/C06/A05/HE2-L02-C06-A05-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box flexDirection={'column'} width='346px' vAlign='center' justifyContent={'center'} useFull>
          <PinchZoom>
            <Image src={'/L02/C06/A05/HE2-L02-C06-A05-P01-01.jpg'} height='240px' ariaDescribedby={'img_desc'} />
            <Box type='hidden' id={'img_desc'}>
              결제 내역이 쓰여 있는 스마트폰 화면 You'll pay $300 per ticket. Ticket Price $300 Service Fee $80 Total $380 구독을 취소할 것인지 묻는
              선택창이 떠있는 스마트폰 화면 Are you sure you want to cancel your subscription? I want to keep my benefits. I want to give up my
              benefits.
            </Box>
          </PinchZoom>
          <PinchZoom>
            <Image src={'/L02/C06/A05/HE2-L02-C06-A05-P01-02.jpg'} height='160px' alt={'낭비되는 돈을 보며 당황하는 여성의 사진'} />
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll height='100%' tabIndex={0}>
            <Typography>
              Another common type of dark pattern is known as “hidden fees.” This design suddenly adds extra fees at the last step of the ordering
              process. On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the
              seller has added to increase 5 the final cost of the order.
            </Typography>
            <br />
            <br />
            <Typography>
              “Confirm-shaming” is another online trick that users should be aware of. This technique manipulates users into feeling ashamed for
              cancelling their membership or requesting a refund for an order. Companies use this to keep their members subscribed, even if it goes
              against the members' intentions. For example, when users want to cancel their subscription, they are offered two options: “I want to
              keep my benefits” and “I want to give up my benefits.” The first option is presented in an appealing way, while the second option seems
              like a bad choice.
            </Typography>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
