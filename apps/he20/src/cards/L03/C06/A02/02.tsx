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
    headerText: `From Shadows to Spotlights (전체 읽기)`,
  };
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C06/A02/HE2-L03-C06-A02.mp3',
    captionSrc: '/L03/C06/A02/HE2-L03-C06-A02.srt',
  };
  const title = 'From Shadows to Spotlights';

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: ['사람들을 바라보며 뭔가를 설명하고 있는 여성과 설명을 듣고 있는 세 명의 사람들의 사진.'],
      text: [
        '\nWelcome to the Dream Art Gallery! I’m Isabel Williams, the docent for the From Shadows to Spotlights exhibit. Today, you’re going to meet three amazing artists who never gave up on their art, despite challenges in their lives. Each artist has a unique painting style and story that has made their work highly valued. Let’s explore each artist’s life and artwork.',
      ],
      imageSrc: ['/L03/C06/A02/HE2-L03-C06-A02-01.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P2',
      altText: [
        'Bill Traylor의 그림 세 점. (으르렁거리고 있는 개의 그림, 개를 산책시키고 있는 모자를 쓴 사람의 그림, 지갑을 들고 있는 여성과 우산을 들고 있는 남성의 그림) 이미지 제목: Bill Traylor 슬라이드 텍스트: Mean Dog Man and Large Dog Woman with Purse and Man with Umbrella',
      ],
      text: [
        '\nThe first artist we’re going to examine is Bill Traylor. Traylor was born into slavery in the U.S. in 1853 and spent his early life working on a cotton farm in Alabama. Although he became a free man after the American Civil War, he still had to face racial discrimination, working for very low wages on the farm. Later, when he was around 70 years old, Traylor moved to the city of Montgomery, Alabama, where he found a job in a factory. It wasn’t until he was 85 years old and became too ill to work that he turned to drawing to express his life experiences. Now, we’re going to look at some of his paintings, starting with Mean Dog and Man and Large Dog. Traylor had a strong fear of dogs because they had often been used on farms to watch and hunt slaves. His fear of dogs is expressed strongly in these pieces. In contrast, Woman with Purse and Man with Umbrella portrays the free lives of African Americans that he observed on the streets of Montgomery. Using simple shapes and colors, Traylor captured complex moments in American history from slavery to freedom. As a result, he’s now considered an important figure in American folk art.',
      ],
      imageSrc: ['/L03/C06/A02/HE2-L03-C06-A02-02.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P3',
      altText: [
        'Maud Lewis의 그림 세 점. (배와 갈매기가 그려진 항구의 그림, 눈밭을 달리고 있는 붉은 썰매의 그림, 한 쌍의 소의 그림) 이미지 제목: Maud Lewis 슬라이드 텍스트: Edge of Digby Harbor Red Sleigh Pair of Oxen',
      ],
      text: [
        '\nNext, we have Maud Lewis, a renowned artist known for her heart-warming paintings. Born in a small Canadian town in 1903, Lewis suffered from physical weaknesses such as distorted shoulders and fingers. This limited her mobility and caused her to drop out of school. To make a living, she began to paint and sell Christmas cards. When her parents passed away, Lewis went to live with her aunt in Digby, Nova Scotia, where she met her future husband, Everett Lewis. After marrying, the couple spent the rest of their lives there, and Lewis continued to paint. She often depicted the Digby landscapes in paintings such as Edge of Digby Harbor. Her artwork used a mixture of bright and vivid oil paints and simple forms, generating an original, innovative style. Although her physical limitations confined her to a small cottage, her talent and imagination were both limitless. In Red Sleigh, red maple leaves appear on a special winter landscape, and Pair of Oxen shows decorated cows standing in a flower field. With these features, Lewis’ paintings create a magical quality, like that of a fairy tale. As her paintings gradually gained popularity, her story inspired many people and was later made into books and movies. Maud Lewis expressed her love for the world through her paintings and became an iconic figure in Canadian folk art.',
      ],
      imageSrc: ['/L03/C06/A02/HE2-L03-C06-A02-03.jpg'],
      imagePosition: 'before',
    },
    {
      id: 'P4',
      altText: [
        "Anna Ancher의 그림 세 점. (주방에서 일하는 여성의 그림, 바느질하는 여성의 그림, 햇살이 들어오는 파란 방 창가에 서 있는 여성의 그림) 그리고 그 그림을 감상하고 있는 두 여성의 사진. 이미지 제목: Anna Ancher 슬라이드 텍스트: The Maid in the Kitchen Sewing Fisherman's Wife Sunlight in the Blue Room'",
      ],
      text: [
        '\nNow let’s take a look at the final artist of this exhibition: Anna Ancher, a famous painter from Denmark. When observing her paintings, you may notice a common theme—they all feature female figures. Born in Skagen, Denmark, in 1859, she later moved to Copenhagen to attend a private painting school. After that, she even studied abroad in Paris, which was unusual for women at the time. Thanks to her mother’s encouragement, she was able to take advantage of these opportunities. Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on household duties. Ancher differed from other artists of that era, who depicted women as still life subjects. In contrast, she showcased them as active participants in everyday tasks, as seen in her works The Maid in the Kitchen and Sewing Fisherman’s Wife. She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark. In her painting Sunlight in the Blue Room, the reflection of the sunlight on the blue wall is stunningly portrayed. Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent. Her paintings continue to amaze us to this day.',
      ],
      imageSrc: ['/L03/C06/A02/HE2-L03-C06-A02-04.jpg'],
      imagePosition: 'before',
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={title} info={HE01603Info} />;
};

export default P02;
