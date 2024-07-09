import EM02301, { Idata } from '@maidt-cntn/math/pages/EM-023-01';

const P01 = () => {
  const questionText = '덧셈과 뺄셈을 하여 그림 조각을 맞추고, 색칠을 하여 그림을 완성해 보세요.';

  const tag = '활동 방법';

  const data: Idata[] = [
    {
      text: '덧셈과 뺄셈을 합니다.',
    },
    {
      text: '그림 조각을 계산 결과에 맞게 붙입니다.',
    },
    {
      text: '색칠하여 그림을 완성합니다.',
    },
  ];

  return <EM02301 questionText={questionText} tag={tag} data={data} />;
};

export default P01;
