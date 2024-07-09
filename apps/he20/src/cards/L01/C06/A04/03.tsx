import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

interface ITextAndTranslation {
  text: string;
  translation: string;
}

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Volunteering at an Animal Sanctuary (2)',
};

const questionInfo: IQuestionProps = {
  text: 'Translations',
  size: 'medium',
};

const data: IListenAndAnswer[] = [
  {
    originText: `July 29, Monday\n\rOur club arrived at the Free Animals sanctuary.`,
    translation: `7월 29일 월요일\n\r우리 클럽은 Free Animals sanctuary에 도착했다. `,
  },
  {
    originText: `Jane, the staff member in charge of animal care, welcomed us with a big smile and gave us a tour of the facility.`,
    translation: `동물들을 보살피는 일을 담당하고 있는 직원인 Jane은 우리를 환한 웃음으로 맞아 주고 우리에게 시설을 안내해 주었다. `,
  },
  {
    originText: `It was amazing to see bears and elephants moving freely in a large field.`,
    translation: `넓은 벌판을 돌아다니는 곰과 코끼리를 보는 것은 정말 멋졌다.`,
  },
  {
    originText: `Our tasks for the day included cleaning the shelter and preparing food for the animals.`,
    translation: `오늘 우리의 임무는 동물들의 집을 청소하고 음식을 준비하는 것도 있었다.`,
  },
  {
    originText: `While cleaning the habitats, we checked if there were any hazards that could harm the animals. `,
    translation: `동물들의 집을 청소하는 동안 우리는 동물들에게 해를 입힐 만한 것이 없는지 확인했다. `,
  },
  {
    originText: `Then, we helped prepare the food by cutting up fruits and vegetables and dividing them into several large baskets.`,
    translation: `그리고 나서 과일과 야채를 자르고 큰 바구니에 나눠담으면서 먹이 준비하는 것을 도왔다. `,
  },
  {
    originText: `For old elephants with weak teeth, we chopped bananas instead of the sugarcane that they usually eat.`,
    translation: `이가 약한 나이든 코끼리를 위해서는 코끼리가 보통먹는 사탕수수 대신에 바나나를 잘라두었다. `,
  },
  {
    originText: `Spending the whole day helping out with the animals was an incredible experience for me. `,
    translation: `동물들을 도우면서 하루를 보낸 것은 멋진 경험이었다. `,
  },
  {
    originText: `It was a rewarding experience, and I was impressed with the attention the staff members gave to all the animals.`,
    translation: `그것은 보람있었고 그 곳 직원들이 모든 동물들에게 쏟는 애정이 인상 깊었다. `,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
