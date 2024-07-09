import HE01603 from '@maidt-cntn/pages/HE-016-03';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

interface IHE01603Info {
  id: string;
  altText?: string[];
  textTitle?: string;
  text: string[];
  imageSrc?: string[];
  imagePosition: string;
  udl?: string[];
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Light Up Dark Patterns (전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A02/HE2-L02-C06-A02.mp3',
    captionSrc: '/L02/C06/A02/HE2-L02-C06-A02.srt',
  };
  const title = 'Light Up Dark Patterns';

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: [''],
      text: [''],
      imageSrc: ['/L02/C06/A02/HE2-L02-C06-A02-01.jpg'],
      imagePosition: 'before',
      udl: [
        '패널 1:팀이 그의 휴대폰을 보며 신나서 외친다, "Wow! Free Movies!" 휴대폰 텍스트: "STREAM NATION"과 "1 WEEK FREE" 배너',
        '패널 2: 휴대폰 화면 클로즈업. 휴대폰 텍스트: "1 WEEK FREE - Auto-Renewal After the Trial" 팀이 그의 휴대폰에 입력한다. 휴대폰 텍스트: "Join Us"와 ID, Password, Email 입력란',
        '패널 3: 팀이 휴대폰에서 "Sign Up Completed" 버튼을 누른다. 팀 생각: "Oops! I must’ve pressed the wrong button. But why is it here, anyway?!"',
        '패널 4: 팀이 그의 휴대폰에서 특별 할인 행사를 본다. "Only 1 dollar?! What a deal! 휴대폰 텍스트: Limited Time Offer 00:05:58"',
        '패널 5: 주문 세부 사항을 보여주는 휴대폰 화면 클로즈업. 휴대폰 텍스트: "ORDER NOW T-shirt $1, Delivery $15, Total $16" 팀 생각: "Huh...?"',
        '패널 6: 팀이 그의 구매를 합리화한다."Well, it’s still a good price... I guess."',
        '패널 7: 6일 후, 팀이 그의 휴대폰을 보며 실망한 표정을 짓는다. 팀: "Uh... There are no good movies on this website. I’d better cancel my subscription." 휴대폰 텍스트: "STREAM NATION"',
        '패널 8: 팀이 구독을 취소하려고 한다. 휴대폰 텍스트: "Cancellation Request. Are you sure?" 두 개의 버튼: "Stay Entertained"와 "Continue My Boring Life" 팀: "Hey! My life isn’t boring!"',
        '패널 9: 팀이 충격 받고 당황해 한다. 휴대폰 텍스트: "Thank you for your order. Auto-Renewal starts now." 팀: "Nooooo!"',
      ],
    },
    {
      id: 'P2',
      altText: [
        'Last Chance 라는 화면이 떠있고 알람이 울리고 있는 노트북. Limited time offer라고 쓰여 있는 알람시계가 울리고 있다.',
        '구독 취소 과정이 그려져 있는 스마트폰 화면.',
      ],
      text: [
        '\nHave you ever bought something online after seeing a message such as "Hurry! One item left!" even though you didn’t intend to buy it? Or have you ever felt rushed into making a purchase because of a limited-time offer? If you have, then you may have fallen prey to a dark pattern. Dark patterns are manipulative designs on websites and applications that trick users into making unintended decisions. These deceptive practices often have consequences that cause financial damages to the users. \nA widely used dark pattern is the practice of "forced continuity," which requires users to pay a membership fee after a free trial ends. Companies deliberately avoid informing users about the end of the free trial period or make the cancellation process complicated. As a result, users have to pay membership fees even if they no longer want to use the service.',
      ],
      imageSrc: ['/L02/C06/A02/HE2-L02-C06-A02-02.jpg', '/L02/C06/A02/HE2-L02-C06-A02-03.jpg'],
      imagePosition: 'both',
    },
    {
      id: 'P3',
      altText: ['결제 내역이 쓰여 있는 스마트폰 화면', '낭비되는 돈을 보고 당황한 여성의 사진'],
      text: [
        '\nAnother common type of dark pattern is known as "hidden fees." This design suddenly adds extra fees at the last step of the ordering process. On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the seller has added to increase 5 the final cost of the order.\n "Confirm-shaming" is another online trick that users should be aware of. This technique manipulates users into feeling ashamed for cancelling their membership or requesting a refund for an order. Companies use this to keep their members subscribed, even if it goes against the members’ intentions. For example, when users want to cancel their subscription, they are offered two options: "I want to keep my benefits" and "I want to give up my benefits." The first option is presented in an appealing way, while the second option seems like a bad choice.',
      ],
      imageSrc: ['/L02/C06/A02/HE2-L02-C06-A02-04.jpg', '/L02/C06/A02/HE2-L02-C06-A02-05.jpg'],
      imagePosition: 'both',
    },
    {
      id: 'P4',
      altText: [
        '결제창을 보고 후회하고 있는 남성 이미지 제목: Dark Patterns: Deception or Marketing Strategy? 슬라이드 텍스트: Companies and critics hold conflicting views on this issue. No! Not again! I hit the payment button! sss...thank you, sssteve...One of my ssspecial, sssneaky dark patterns...sss...',
      ],
      text: [
        '\nDark patterns on digital platforms are becoming more complex and more prevalent. So, what is driving their growth? Over the years, online commerce has grown steadily, especially with the development of smart phones and other digital technologies. As the competition in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases. While these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid marketing strategies. Rather, they suggest that a real marketing strategy create value for both companies and customers, promoting positive and supportive relationships. ',
      ],
      imageSrc: ['/L02/C06/A02/HE2-L02-C06-A02-06.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P5',
      altText: ['책상에 앉아 회의를 하고 있는 사람들.'],
      text: [
        '\nDark patterns, in contrast, not only manipulate customers to act against their intentions, but they can also lead to financial losses and personal data leaks. To tackle this problem, extensive research across various websites and applications is being conducted to document the prevalence of dark patterns and come up with solutions. In addition to research, governments are actively discussing on how to regulate these deceptive design patterns. The EU’s Digital Service Act, which banned dark patterns on online platforms in 2022, is a good example of such regulation in this area. Such regulations are expected to increase, limiting companies’ deceptive marketing practices in the digital market. However, regulations alone may not be sufficient. As individuals, we should take steps to combat dark patterns and be responsible for our online shopping behavior. This includes being cautious while making purchases, reading terms and conditions carefully, and recognizing that companies’ interests may not be the same as our own. Developing an awareness of dark patterns is also essential to avoid potential harm and economic loss. Ultimately, our attention and efforts will protect us from manipulation and enable us to make wise decisions in this digital age.',
      ],
      imageSrc: ['/L02/C06/A02/HE2-L02-C06-A02-07.jpg'],
      imagePosition: 'after',
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={title} info={HE01603Info} />;
};

export default P02;
