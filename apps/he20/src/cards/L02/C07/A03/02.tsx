import {
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  Image,
  Label,
  Scroll,
  SvgIcon,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  PinchZoom,
  Dialog,
  Drawing,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import profileIcon from '@/assets/icon/profile_icon.svg';
import { useState, useEffect } from 'react';
import { L02C07A03 } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A03);
  const { userId } = useRecoilValue(studentAtom);

  const contentImage = '/L02/C07/A03/HE2-L02-C07-A03-P02-01.jpg';
  const answerImage = '/L02/C07/A03/HE2-L02-C07-A03-P02-02.jpg';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Design and Say',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose one of the dark patterns in the main text and make the design user-friendly. Then, describe your design.',
    size: 'medium',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [],
    },
  ];

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <BoxWrap>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='250px' height='220px' alt='' ariaDescribedby='img_desc1' />
            <Box type='hidden' id='img_desc1'>
              <p>계산서</p>
              <p>Order Details Confirm and Pay You’ll pay 300 dollar per ticket.</p>
              <p>Ticket Price 300 dollar</p>
              <p>Service Fee 80 dollar</p>
              <p>Total 380 dollar</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull width='calc(100% - 270px)'>
          <Box hAlign='space-between'>
            <Box vAlign='center' whiteSpace='nowrap'>
              <Label type='step' value={1} />
              <Typography size={EStyleFontSizes['X-MEDIUM']} weight={700}>
                Make the design user-friendly
              </Typography>
            </Box>
            <Button label={'지문보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='96px' useRound onClick={openModal} />
          </Box>
          <Box marginTop='8px' useFull>
            <Drawing height='175px' width='640px' />
          </Box>
        </Box>
      </BoxWrap>
      <Box vAlign='start' marginTop='20px'>
        <SvgIcon src={profileIcon} width='38px' height='50px' />
        <Box background='blue' border='none' useRound padding='0 12px' marginLeft='8px' width='calc(100% - 38px)' tabIndex={102}>
          <Typography size={EStyleFontSizes.SMALL}>
            I chose “hidden fees” and made them user-friendly. Before the change, users may have been surprised at the final step of the ordering
            process. With my changes, however, ...
          </Typography>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p02.isSubmitted && isShowAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px' tabIndex={103}>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Box hAlign='flex-left'>
              <PinchZoom>
                <Image src={answerImage} width='280px' height='150px' alt='' ariaDescribedby='img_desc2' />
                <Box type='hidden' id='img_desc2'>
                  <p>계산서</p>
                  <p>Order Details Confirm and Pay You’ll pay 300 dollar per ticket.</p>
                  <p>Plus Service Fee 80 doller.</p>
                  <p>Go Button</p>
                </Box>
              </PinchZoom>
            </Box>
          </Box>
        </Box>
      </BottomSheet>

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

export default P02;
