import HE01603 from '@maidt-cntn/pages/HE-016-03';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

interface IHE01603Info {
  id: string;
  altText?: string[];
  text: string[];
  imageSrc?: string[];
  imagePosition: string;
}

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Gathering of the Whakapapa (전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C06/A02/HE1-L02-C06-A02.mp3',
    captionSrc: '/L02/C06/A02/HE1-L02-C06-A02.srt',
  };
  const title = 'Gathering of the Whakapapa';

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: ['휴대폰으로 영상 통화 중인 아들 너머로 할아버지가 그 모습을 바라보고 있다.'],
      text: [
        '\nThe phone rang, and it was my dad calling from my hometown, Waituhi. “Can you take a week off?” he asked. “Your Nani Tama wants you here.” “But Dad!” I answered. “My boss won’t let me take any more time off.” The phone went silent, and then I heard my grandfather say faintly, “I need your help, Grandson. I must go to Murupara to finish the whakapapa. Drive me there. Hurry, I may not have much time.” I just knew I had no choice. “All right, Nani,” I replied with a sigh. “I’ll  come.”',
      ],
      imageSrc: ['/L02/C06/A02/HE1-L02-C06-A02-01.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P2',
      altText: [
        '집과 일대기가 화재에 의해 불타고 있다.',
        '할아버지가 와카파파의 일대기를 쓰고 있다. 할아버지가 나에게 무루파라로 태워다 줄 것을 부탁하고 있다.',
      ],
      text: [
        '\nFor some time, my grandfather had been busy writing down the village genealogy, known as the whakapapa. The whakapapa had been in his old house. But then came the night of the fire, which ran through the house and destroyed our past. In only one night, everything we knew was gone. Nani Tama, in despair, went to stay with his daughter, my Auntie Hiraina. Trying to find a way out of the ashes of the past, Nani began to write the whakapapa again with his shaky hands. He chanted the names of the ancestors, joining the past to the present once more. The village went quiet and listened to his chanting. His voice traveled along the lines of our genealogy, searching back across the centuries. Sometimes, there were lines that were difficult to remember. Then his voice suddenly stopped in the middle of the chant. The village waited in worried silence until the next name burst out of his mouth. It took Nani Tama almost two years to gather most of the whakapapa, but there were still missing names he needed to fill in. Now, he wanted me to drive him to Murupara to finish his work.',
      ],
      imageSrc: ['/L02/C06/A02/HE1-L02-C06-A02-02.jpg', '/L02/C06/A02/HE1-L02-C06-A02-03.jpg'], //TODO : 기획에서 파일명 확인 필요
      imagePosition: 'both',
    },
    {
      id: 'P3',
      altText: ['내가 운전하는 자동차 뒤에 이모와 할아버지가 타고 노래를 부르고 있다.'],
      text: [
        '\nWhen I arrived at Auntie’s place, I was shocked to see how thin Nani Tama was. “Look, Nani,” I said. “I’m not taking you anywhere. You could die on me!” Nani looked at me in anger. “You want me to die here in this room? Looking at these four walls? When the whakapapa is not yet finished?” The old man held on tightly to the side of the bed and cried out as he stood up. Every slow, painful step hurt him, but he tried to walk. I could not help but carry him to the car, and we set off with Auntie. We traveled all night, mostly in silence, listening to Nani chanting in the darkness. It was strange but wonderful to hear him. Sometimes, he burst into a song that he had taught Auntie. They sang together, lifting up their voices to send the song flying like a bird through the sky.',
      ],
      imageSrc: ['/L02/C06/A02/HE1-L02-C06-A02-04.jpg'], //TODO : 기획에서 파일명 확인 필요
      imagePosition: 'after',
    },
    {
      id: 'P4',
      altText: ['할아버지와 한 노인이 책상 위에 책을 펴놓고 진지하게 이야기하고 있다.'],
      text: [
        '\nJust before noon, we arrived at a small town called Murupara. “Where do we go now?” I asked Nani. He did not reply, but he was searching inside himself, staring at the small houses. Then, at a street corner, he told us to turn. After turning the corner, we saw an old man standing in front of a house. He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We must hurry.”',
        '\n\nNow that day seems like a dream to me. I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked. All through the quiet afternoon and into the evening, they recalled missing names. I had a strange feeling that there were other people in the room. I felt as if people from the past were looking over the shoulders of the two old men to see if the work was correct. Finally, they stopped. It was done. After a moment of silence, the old man whispered to Nani, “Goodbye, friend.” Crying, they pressed their noses together to say goodbye.',
      ],
      imageSrc: ['/L02/C06/A02/HE1-L02-C06-A02-05.jpg'], //TODO : 기획에서 파일명 확인 필요
      imagePosition: 'after',
    },
    {
      id: 'P5',
      altText: [
        '나무 집 앞에서 할아버지가 이모가 잡고 있는 의자에 앉아 책을 읽어주고 있다. 나를 포함한 여러 명의 사람들이 이를 귀담아 듣고 있고, 뒤에는 석양이 지고 있다.',
      ],
      text: [
        '\nIt was early morning and still dark when we returned to Auntie’s place. All the lights were on, and the village people were waiting for us. Smiling, Nani Tama lifted up the whakapapa and offered it to the village. Our hearts were full because our grandfather had saved our past for us. Our Nani Tama smiled again. His smile grew tired. He sighed. “At last, I may go now.” Then, he closed his eyes. “No, Dad!” Auntie Hiraina cried. The sun burst across the hills.',
      ],
      imageSrc: ['/L02/C06/A02/HE1-L02-C06-A02-06.jpg'], //TODO : 기획에서 파일명 확인 필요
      imagePosition: 'after',
    },
  ];
  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={title} info={HE01603Info} />;
};

export default P02;
