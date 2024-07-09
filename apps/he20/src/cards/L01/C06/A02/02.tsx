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
    headerText: `Volunteering at an Animal Sanctuary(전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A02/HE2-L01-C06-A02.mp3',
    captionSrc: '/L01/C06/A02/HE2-L01-C06-A02.srt',
  };
  const title = 'Volunteering at an Animal Sanctuary';

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: [
        "Care for Animals, Let's Go!라는 문구가 적혀있는 사진. 사진 속에서 한 여성이 'VOLUNTEER'이라고 쓰인 티셔츠를 입고 엄지 손가락을 들어올린채 웃고 있다. 그 옆에 코끼리와 곰 그림이 있다. 슬라이드 텍스트: 'Care for Animals, Let's Go!'",
      ],
      text: [
        '\nAs the leader of our school club Care for Animals, I organized a volunteer trip to an animal sanctuary for my club members. An animal sanctuary is a special place where rescued, injured, or abused animals can live in a safe and caring environment. All the club members and I agreed that the sanctuary would be the perfect place to learn about animal care. Excited for a new experience, we set out to volunteer.',
      ],
      imageSrc: ['/L01/C06/A02/HE2-L01-C06-A02-01.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P2',
      altText: ['벽을 청소하고 있는 여성의 사진과 과일을 손질하고 있는 사람들의 사진. 그 아래로 들판을 걷고 있는 코끼리 사진이 있다.'],
      text: [
        '\nJuly 29, Monday\n Our club arrived at the Free Animals sanctuary. Jane, the staff member in charge of animal care, welcomed us with a big smile and gave us a tour of the facility. It was amazing to see bears and elephants moving freely in a large field. Our tasks for the day included cleaning the shelter and preparing food for the animals. While cleaning the habitats, we checked if there were any hazards that could harm the animals. Then, we helped prepare the food by cutting up fruits and vegetables and dividing them into several large baskets. For old elephants with weak teeth, we chopped bananas instead of the sugarcane that they usually eat. Spending the whole day helping out with the animals was an incredible experience for me. It was a rewarding experience, and I was impressed with the attention the staff members gave to all the animals.',
      ],
      imageSrc: ['/L01/C06/A02/HE2-L01-C06-A02-02.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P3',
      altText: [
        '철장에 갇힌 새끼 곰의 사진. 그 옆으로 Bears Around the World라고 쓰인 세계지도가 있다. Brown Bear, Polar Bear, American Black Bear, Andean Bear, Giant Panda, Asiatic Black Bear, Sloth Bear, Sun Bear의 서식지가 표시되어 있다. 슬라이드 텍스트:  Bears Around the World Brown Bear Polar Bear American Black Bear Andean Bear Giant Panda Asiatic Black Bear Sloth Bear Sun Bear',
        '허니 로그 피더를 가지고 놀고 있는 곰의 사진 아래에 Ben is so cute!라는 문구가 적혀있다. 그 아래로 들판을 걷고 있는 곰 두 마리의 사진이 있다. 슬라이드 텍스트: Ben is so cute!',
      ],
      text: [
        '\nJuly 30, Tuesday\n Today, we did something special for Ben and Lily. These two baby bears were rescued after they had been raised illegally in a tiny cage on a farm for many years. To help the bears restore their natural instincts, we carried out some special activities known as “behavioral enrichment.” For example, we made honey-log feeders for the bears. First, we made several holes in a log and filled them with honey. Then, we hung the honey-log feeders on trees near the bears’ habitat. As bears are intelligent and curious creatures, they can become bored and stressed when lacking mental and physical stimulation. The honey-log feeders stimulate their natural curiosity and keep them as active as they would be in the wild. After a while, Ben and Lily approached the feeders and started eating the honey inside. They are so cute!',
      ],
      imageSrc: ['/L01/C06/A02/HE2-L01-C06-A02-03.jpg', '/L01/C06/A02/HE2-L01-C06-A02-04.jpg'],
      imagePosition: 'both',
    },
    {
      id: 'P4',
      altText: ['코끼리의 발을 향하고 있는 막대기와 발을 들어올리고 있는 코끼리의 사진.'],
      text: [
        '\nJuly 31, Wednesday\n This morning, we had the opportunity to learn about animal treatment thanks to Molly, an elderly elephant. After spending 25 years carrying tourists along rough roads, she developed a twisted spine and foot pain. In order to support Jane in taking care of Molly’s foot, we took part in positive reinforcement training, which involves using rewards to encourage desirable behaviors. When I gently touched her foot with a pole and called out, “foot,” she lifted it. We then rewarded her with a sweet piece of watermelon, her favorite fruit. This training helps reduce the stress that animals experience during controlled situations, such as treatment or a health examination. The good news is Molly seems to be adapting well, and I expect her to get better soon.',
      ],
      imageSrc: ['/L01/C06/A02/HE2-L01-C06-A02-05.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P5',
      altText: ['새에게 주사기로 물을 주는 사진. 그 옆에 So sad!라고 적힌 말풍선이 있다. 슬라이드 텍스트: So sad!TT'],
      text: [
        '\nAugust 1, Thursday\n On the last day, we were called to the rescue center due to a sudden emergency. Some dehydrated birds had fallen out of the sky in the city and were brought to the center. Following the veterinarian’s guidance, we provided water to the birds while the vets treated their broken wings and legs and injected them with vitamins for a speedy recovery. It was shocking that this type of accident happens every year since the high temperatures dry up water sources in the city. Caring for the birds, I couldn’t help but reflect on the impact of human activities on climate change and how it harms animals.',
      ],
      imageSrc: ['/L01/C06/A02/HE2-L01-C06-A02-06.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P6',
      text: [
        "\nSaying goodbye to the animals and staff, I felt grateful for the opportunity to volunteer. From this experience, I learned the importance of treating animals with respect and care. I also came to realize that humans are just another kind of animal and share the Earth with all other living creatures. To improve animal welfare, I’ll work hard with Care for Animals members. Hopefully, I'll have the chance to volunteer at another sanctuary next summer.",
      ],
      imagePosition: 'none',
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={title} info={HE01603Info} />;
};

export default P02;
