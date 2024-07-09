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
  Textarea,
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
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P05 = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A03);
  const { userId } = useRecoilValue(studentAtom);

  const contentImage = '/L02/C07/A03/HE2-L02-C07-A03-P04-01.jpg';

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
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: e.target.value } }));
    changeData('P05', 1, 1, e.target.value);
  };

  const handleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };

  const handleSubmit = () => {
    if (!cardData.p05.isSubmitted) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p05.answer1,
            },
          ],
        },
      ];
      submitData('P05', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P05');
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
      submitBtnColor={
        cardData.p05.isSubmitted
          ? isShowAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : !isNotEmptyString(cardData.p05.answer1)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p05.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={cardData.p05.isSubmitted ? false : !isNotEmptyString(cardData.p05.answer1)}
      onSubmit={cardData.p05.isSubmitted ? handleShowAnswer : handleSubmit}
    >
      <BoxWrap>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='250px' height='220px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>커뮤니티 사이트 창</p>
              <p>메뉴 Home Search Settings Help About Us Settings Account</p>
              <p>상세 메뉴 Profile Subscription Subscription</p>
              <p>상세 메뉴 Monthly Plan Payment Info History Cancel Subscription</p>
              <p>메뉴 추가</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull width='calc(100% - 270px)'>
          <Box hAlign='space-between'>
            <Box vAlign='center' whiteSpace='nowrap'>
              <Label type='step' value={2} />
              <Typography size={EStyleFontSizes['X-MEDIUM']} weight={700}>
                Describe your design
              </Typography>
            </Box>
            <Button label={'지문보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='96px' useRound onClick={openModal} />
          </Box>
          <Box marginTop='8px' useFull>
            <Textarea
              height='175px'
              width='640px'
              ariaLabel='답란'
              placeholder='내용을 넣어 주세요.'
              value={cardData.p05.answer1}
              onChange={handleInputChange}
              readOnly={cardData.p05.isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>
      <Box vAlign='start' marginTop='20px'>
        <SvgIcon src={profileIcon} width='38px' height='50px' />
        <Box background='blue' border='none' useRound padding='0 12px' marginLeft='8px' width='calc(100% - 38px)' tabIndex={102}>
          <Typography>I chose “forced continuity” and made it user-friendly. Before ...</Typography>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData.p05.isSubmitted && isShowAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' tabIndex={103}>
            <Typography size={EStyleFontSizes.SMALL}>
              I chose “ forced continuity” and made it user-friendly. Before the change, the cancellation process was complicated. However, I have
              made the “cancel” button easy to find so that the users can end the trial whenever they want.
            </Typography>
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

export default P05;
