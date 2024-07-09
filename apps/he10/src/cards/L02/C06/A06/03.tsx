import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Gathering of the Whakapapa (4)',
};

const questionInfo: IQuestionProps = {
  text: 'Translations',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Just before noon, we arrived at a small town called Murupara.',
    translation: '정오 직전에 우리는 무루파라라는 작은 마을에 도착했습니다.',
  },
  {
    originText: '“Where do we go now?” I asked Nani.',
    translation: '"이제 우리 어디가요?" 나는 할아버지에게 물었습니다.',
  },
  {
    originText: 'He did not reply, but he was searching inside himself, staring at the small houses.',
    translation: '그는 대답하지 않았지만 작은 집을 바라보며 자신의 내면을 탐색하고 있었습니다.',
  },
  {
    originText: 'After turning the corner, we saw an old man standing in front of a house.',
    translation: '모퉁이를 돌자 집 앞에 한 노인이 서 있는 것이 보였습니다.',
  },
  {
    originText: 'He welcomed Nani Tama with a gentle smile, but in his eyes, I saw the message, “We must hurry.”',
    translation: `그는 부드러운 미소로 타마 할아버지를 반겼는데, 그 눈에는 '서둘러야 한다'는 메시지가 담겨 있었다.`,
  },
  {
    originText: '',
    translation: '',
  },
  {
    originText: 'Now that day seems like a dream to me.',
    translation: '이제 그 날은 나에게 꿈만 같습니다.',
  },
  {
    originText: 'I remember the two old men sitting at the table and the soft sounds of the Maori words as they talked.',
    translation: '테이블에 앉아 있던 두 노인과 그들이 이야기를 나누던 마오리족 말들의 부드러운 소리가 기억납니다.',
  },
  {
    originText: 'All through the quiet afternoon and into the evening, they recalled missing names. ',
    translation: '조용한 오후부터 저녁 내내 그들은 사라진 이름을 떠올렸습니다.',
  },
  {
    originText: 'I had a strange feeling that there were other people in the room.',
    translation: '나는 방에 다른 사람이 있다는 이상한 느낌이 들었습니다.',
  },
  {
    originText: 'I felt as if people from the past were looking over the shoulders of the two old men to see if the work was correct.',
    translation: '나는 마치 과거의 사람들이 그 두 노인의 어깨 너머로 작업이 제대로 되었는지 확인하고 있는 듯한 느낌을 받았습니다.',
  },
  {
    originText: 'Finally, they stopped. It was done.',
    translation: '마침내 그들은 멈췄습니다. 작업이 끝났습니다.',
  },
  {
    originText:
      'After a moment of silence, the old man whispered to Nani, “Goodbye, friend.” Crying, they pressed their noses together to say goodbye.',
    translation: '잠시 침묵이 흐른 뒤, 노인은 할아버지에게 “안녕, 친구”라고 속삭였습니다. 그들은 울면서 코를 맞대고 작별 인사를 했습니다.',
  },
];
const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
