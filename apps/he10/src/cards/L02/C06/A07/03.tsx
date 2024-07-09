import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Gathering of the Whakapapa (5)',
};

const questionInfo: IQuestionProps = {
  text: 'Translations',
  size: 'medium',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'It was early morning and still dark when we returned to Auntie’s place.',
    translation: '우리가 이모의 집으로 돌아왔을 때는 이른 아침이었고 아직 어두웠습니다.',
  },
  {
    originText: 'All the lights were on, and the village people were waiting for us. Smiling,',
    translation: '모든 불이 켜져 있었고 마을 사람들이 우리를 웃으면서 기다리고 있었습니다.',
  },
  {
    originText: 'Nani Tama lifted up the whakapapa and offered it to the village.',
    translation: '타마 할아버지는 와카파파를 들어올려 마을에 바쳤습니다.',
  },
  {
    originText: 'Our hearts were full because our grandfather had saved our past for us. ',
    translation: '할아버지가 우리의 과거를 우리를 위해 구해 주셨기 때문에 우리의 마음은 가득 찼습니다.',
  },
  {
    originText: 'Our Nani Tama smiled again.',
    translation: '우리의 할아버지 타마가 또 웃었습니다.',
  },
  {
    originText: 'His smile grew tired.',
    translation: '그의 미소는 지쳐갔습니다.',
  },
  {
    originText: 'He sighed. “At last, I may go now.” Then, he closed his eyes.',
    translation: '그는 한숨을 쉬었다. “드디어 이제 갈 수 있겠네요.” 그리고 그는 눈을 감았습니다.',
  },
  {
    originText: '“No, Dad!” Auntie Hiraina cried.',
    translation: '“안 돼요, 아빠!” 히라이나 이모가 외쳤습니다.',
  },
  {
    originText: 'The sun burst across the hills.',
    translation: '태양이 언덕 너머로 지고 있었습니다.',
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
