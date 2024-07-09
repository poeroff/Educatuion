import {
  TMainHeaderInfoTypes,
  IQuestionProps,
  Box,
  Dialog,
  PinchZoom,
  Button,
  Image,
  EStyleFontSizes,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const P01 = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const contentImage = '/L02/C07/A03/HE2-L02-C07-A03-P01.jpg';

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Design and Say',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose one of the dark patterns in the main text and make the design user-friendly. Then, describe your design.',
    size: 'medium',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} useExtend vAlign='flex-start'>
      <Box width={'100%'} hAlign={'flex-end'}>
        <Button
          label='지문보기'
          ariaLabel='지문보기'
          color={EStyleButtonTypes.SECONDARY}
          size={EStyleSizes['SMALL']}
          width='96px'
          onClick={openModal}
          useRound
        />
      </Box>

      <Box vAlign='center' hAlign={'center'} useFull>
        <PinchZoom>
          <Image src={contentImage} width='800px' height='250px' alt='' ariaDescribedby='img_desc' />
          <Box type='hidden' id='img_desc'>
            <p>알림창 팝업</p>
            <p>Are you sure you want to cancel your subscription?</p>
            <p>왼쪽 버튼 I want to keep my benefits.</p>
            <p>오른쪽 버튼 I want to give up my benefits.</p>
            <p>옆으로 향하는 화살표</p>
            <p>알람창 팝업</p>
            <p>Are you sure you want to cancel your subscription?</p>
            <p>왼쪽 버튼 Yes, cancel my subscription.</p>
            <p>오른쪽 버튼 No, stay subscribed.</p>
            <p>사람 모양 프로필 사진</p>
            <p>
              I chose “confirm-shaming” and made the design user-friendly. Before the change, users may have bought something that they didn’t want.
              But now, I have made the options clearer, so the users can choose what they want.
            </p>
          </Box>
        </PinchZoom>
      </Box>

      <Dialog width={921} height={500} isShow={isShowModal} closeLabel='지문 닫기' onClose={closeModal} useFooter={true} tabIndex={101}>
        <Box vAlign='center' width='100%' height='50px' backgroundColor='var(--color-grey-100)' marginBottom='20px' useRound>
          <Typography weight='bold'>Light Up Dark Patterns</Typography>
        </Box>
        <Scroll height='300px' tabIndex={0}>
          <Box display='flex' flexDirection='column'>
            <Typography size={EStyleFontSizes.SMALL}>
              Have you ever bought something online after seeing a message such as “Hurry! One item left!” even though you didn’t intend to buy it? Or
              have you ever felt rushed into making a purchase because of a limited-time offer? If you have, then you may have fallen prey to a dark
              pattern. Dark patterns are manipulative designs on websites and applications that trick users into making unintended decisions. These
              deceptive practices often have consequences that cause financial damages to the users.
            </Typography>
            <Typography size={EStyleFontSizes.SMALL}>
              A widely used dark pattern is the practice of “forced continuity,” which requires users to pay a membership fee after a free trial ends.
              Companies deliberately avoid informing users about the end of the free trial period or make the cancellation process complicated. As a
              result, users have to pay membership fees even if they no longer want to use the service.
            </Typography>
            <Typography size={EStyleFontSizes.SMALL}>
              Another common type of dark pattern is known as “hidden fees.” This design suddenly adds extra fees at the last step of the ordering
              process. On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the
              seller has added to increase the final cost of the order.
            </Typography>
            <Typography size={EStyleFontSizes.SMALL}>
              “Confirm-shaming” is another online trick that users should be aware of. This technique manipulates users into feeling ashamed for
              cancelling their membership or requesting a refund for an order. Companies use this to keep their members subscribed, even if it goes
              against the members’ intentions. For example, when users want to cancel their subscription, they are offered two options: “I want to
              keep my benefits” and “I want to give up my benefits.” The first option is presented in an appealing way, while the second option seems
              like a bad choice.
            </Typography>
            <Typography size={EStyleFontSizes.SMALL}>
              Dark patterns on digital platforms are becoming more complex and more prevalent. So, what is driving their growth? Over the years,
              online commerce has grown steadily, especially with the development of smart phones and other digital technologies. As the competition
              in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases. While
              these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid
              marketing strategies. Rather, they suggest that a real marketing strategy create value for both companies and customers, promoting
              positive and supportive relationships.
            </Typography>
            <Typography size={EStyleFontSizes.SMALL}>
              Dark patterns, in contrast, not only manipulate customers to act against their intentions, but they can also lead to financial losses
              and personal data leaks. To tackle this problem, extensive research across various websites and applications is being conducted to
              document the prevalence of dark patterns and come up with solutions. In addition to research, governments are actively discussing on how
              to regulate these deceptive design patterns. The EU’s Digital Service Act, which banned dark patterns on online platforms in 2022, is a
              good example of such regulation in this area. Such regulations are expected to increase, limiting companies’ deceptive marketing
              practices in the digital market. However, regulations alone may not be sufficient. As individuals, we should take steps to combat dark
              patterns and be responsible for our online shopping behavior. This includes being cautious while making purchases, reading terms and
              conditions carefully, and recognizing that companies’ interests may not be the same as our own. Developing an awareness of dark patterns
              is also essential to avoid potential harm and economic loss. Ultimately, our attention and efforts will protect us from manipulation and
              enable us to make wise decisions in this digital age.
            </Typography>
          </Box>
        </Scroll>
      </Dialog>
    </Container>
  );
};

export default P01;
