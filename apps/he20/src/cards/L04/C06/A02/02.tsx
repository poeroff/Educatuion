import HE01603 from '@maidt-cntn/pages/HE-016-03';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

interface IHE01603Info {
  id: string;
  altText?: string[];
  textTitle?: string;
  text: string[];
  imageSrc?: string[];
  imagePosition: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Will AI-Powered Neural Implants Make Us Super-Humans?(전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C06/A02/HE2-L04-C06-A02.mp3',
    captionSrc: '/L04/C06/A02/HE2-L04-C06-A02.srt',
  };
  const title = 'Will AI-Powered Neural Implants Make Us Super-Humans?';

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: [
        '블로그 타이틀 사진으로 인체 안에 AI라는 문구와 톱니바퀴가 그려져 있는 사진이 등록되어 있음. 이미지 제목: TECH BLOG 슬라이드 텍스트: HOME REVIEW APPS AI Andy Taylor, medical journalist Posted: October 22, 15:34',
      ],
      text: [
        '\nNeuroscience has a long history of exploring treatments for disorders of the nervous system, including the brain and spinal cord. Traditionally, researchers have studied various functions of neural implants, which are medical devices like computer chips that can be implanted in the nervous system. But here’s the exciting part: with the rapid advancement of artificial intelligence (AI), researchers have begun to integrate AI into neural implants. In this post, we’ll examine the incredible benefits of AI-powered neural implants, their amazing potential for the future, and the ethical concerns surrounding them.',
      ],
      imageSrc: ['/L04/C06/A02/HE2-L04-C06-A02-01.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P2',
      altText: [
        '뇌와 컴퓨터를 연결하고 휠체어에서 일어나 걷고 있는 남성의 사진. 그 옆에 뇌 임플란트와 척추 임플란트 작동 방법이 쓰여 있는 인체 그림이 그려져 있다. 이미지 제목: How the Brain and Spinal Implants Work 슬라이드 텍스트: Brain implants send signal Spinal implant receives signal Nerve cells carry signal to legs',
        '한쪽 팔이 인공 팔로 대체된 여성이 컵을 들고 있다. 그 옆에 신체 보조기구의 역사가 기록된 연표가 있다. 이미지 제목: YOU MAY ALSO LIKE 슬라이드 텍스트: around 950-710 B.C. Wooden Toe  around1508 Götz’s Iron Hand World War I 1914-1918 World War II 1939-1945 1945 Bert Shepard’s Leg Today AI-Powered Artificial Limbs',
      ],
      text: [
        '\nFirst, let’s explore how this fascinating technology has been applied. The AI-powered neural implant has shown great promise in medical applications, offering solutions to a range of problems. For instance, neural implants are used to treat brain disorders like Parkinson’s disease. These implants electrically stimulate targeted regions of the brain at the right time with the help of AI to restore normal brain activity. In addition, paralyzed people can have the ability to walk again with the help of a “digital bridge” between two implants inserted into their brain and spine. When they think about moving their legs, the AI analyzes the brain signals and sends them to their legs through the implants. Similarly, those who have lost their arms can use artificial arms operated by the same mechanism.',
      ],
      imageSrc: ['/L04/C06/A02/HE2-L04-C06-A02-02.jpg', '/L04/C06/A02/HE2-L04-C06-A02-03.jpg'],
      imagePosition: 'both',
    },
    {
      id: 'P3',
      altText: ['뇌에 AI 칩이 심어진 여성의 그림. 사진, 책, 게임, 메신저 그림이 여성의 뇌와 연결되어 있다.'],
      text: [
        '\nThe success of AI-powered neural implants in health care is also expected to spread to other industries. Some futurists predict that these implants will become commercially available in the next 20 to 30 years and significantly change our daily lives. For example, advances in neural implant technology will make it possible to install in our brains software that can read our minds. This could enable us to play games, type social media messages, and stream music simply by thinking. There is also great potential for memory-enhancing brain implants, similar to computer memory chips. Such devices would allow us to capture and enhance memories, and even upload and download them using the digital cloud. We could look through our memories like a social media feed, vividly recall our favorite life moments, share memories with others, and back up our most valuable memories. Finally, AI-powered neural implants would revolutionize the way our brains work. The role of the brain would shift from learning and storing information to processing the vast amounts of data provided by the implants. Instead of simply memorizing information, we would be able to download knowledge, use our creativity to interpret it, and generate new ideas.',
      ],
      imageSrc: ['/L04/C06/A02/HE2-L04-C06-A02-04.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P4',
      altText: ['뭔가를 해킹하고 있는 해커의 사진. 그 옆에 여성의 옆모습 사진이 있다.'],
      text: [
        '\nBefore we can fully embrace the era of AI-powered neural implants, many tricky ethical issues should be addressed. The integration of AI technology with the human brain raises concerns about what it means to be human. Our brains are believed to be central to our identity, existence, and value as human beings. However, an over-reliance on technology may delay our natural development and create confusion about whether we are human, AI, or something in between. Another critical issue is privacy. There’s a risk that organizations or hackers could access personal data without permission through AI-connected implants. This means that our thoughts, emotions, and behaviors could be controlled by hackers. There’s an additional risk that this technology could lead to even greater social inequality, given that it may not be available to all due to its high cost. Such unequal access to the technology could intensify the division between those who can afford the implants and those who cannot.',
      ],
      imageSrc: ['/L04/C06/A02/HE2-L04-C06-A02-05.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P5',
      altText: ['3개의 댓글이 달려 있다. 이미지 제목: 3 Comments 슬라이드 텍스트: (P5 본문 두번째 단락 내용과 같음) '],
      text: [
        '\nI hope that we can overcome these challenges through careful consideration of neuroethics. This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. I think it is important to establish a prior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. This will ensure that science and technology progress in accordance with ethical principles. \nWhat do you think about this technology? Please share your opinion in the comments section below.',
      ],
      imageSrc: ['/L04/C06/A02/HE2-L04-C06-A02-06.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P6',
      text: [
        '\nEric Davis   9 minutes ago 4  \nWow, AI-powered neural implants sound incredible! \nI can’t believe that AI can help the disabled walk again and use artificial arms that move according to their thoughts!\nYumi Lee   5 minutes ago 9 \nWell, the technology sounds amazing, but I’m really worried about the privacy issues it might cause. I think it is necessary to strictly enforce privacy laws to protect the personal information of individuals. \nAndy Taylor 2 minutes ago 17 \nThank you all for sharing your thoughts. \nI’ll talk more about how to address the concerns in my next post',
      ],
      imagePosition: 'none',
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={title} info={HE01603Info} />;
};

export default P02;
