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

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Will AI-Powered Neural Implants Make Us Super-Humans?(5)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A07/HE2-L04-C06-A07-P01.mp3',
    captionSrc: '/L04/C06/A07/HE2-L04-C06-A07-P01.srt',
  };

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: [''],
      text: [
        'I hope that we can overcome these challenges through careful consideration of neuroethics. This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. I think it is important to establish aprior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. This will ensure thatscience and technology progress in accordance with ethical principles. \n What do you think about this technology? Please share your opinion in the comments section below.',
      ],
      imageSrc: ['/L04/C06/A07/HE2-L04-C06-A07-P01.jpg'],
      imagePosition: 'after',
      udl: [
        '인터넷 게시글에 작성된 세 개의 코멘트 ​프로필 사진 옆에 그 사람이 작성한 코멘트가 있다.(오래된 순)',
        '작성자 : Eric Davis 작성 시각 : 9 minutes ago 공감 수 : 4 작성 글: Wow, AI-powered neural implants sound incredible! I can’t believe that AI can help the disabled walk again and use artificial arms that move according to their thoughts!',
        '작성자 : Yumi Lee 작성 시각 : 5 minutes ago 공감 수 : 9 작성 글: Well, the technology sounds amazing, but I’m really worried about the privacy issues it might cause. I think it is necessary to strictly enforce privacy laws to protect the personal information of individuals.',
        '작성자 : Andy Taylor 작성 시각 : 2 minutes ago 공감 수 : 17 작성 글: Thank you all for sharing your thoughts. I’ll talk more about how to address the concerns in my next post.',
      ],
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} info={HE01603Info} title={''} />;
};

export default P01;
