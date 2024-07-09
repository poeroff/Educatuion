import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C03A10P01 from '@/Pages/EEL01C03A10P01';
const EE40L01C01A10P01 = () => {
  const list = ['a', 'i'];

  const imgInfo = {
    imgSrc: '/L01/C03/A10/EE4-L01-C03-A10-P01.png',
    width: '268px',
    height: '258px',
    alt: '사과',
  };

  const solutionInfo = [
    {
      label: '답안',
      value: getCorrectData(1)[0].inputDatas[0][0].value,
    },
    {
      label: '대본',
      value: 'apple, apple',
    },
    {
      label: '해설',
      value: JSON.stringify(getSolutionData(1)[0].text),
    },
  ];

  const PageInfo = {
    headerText: 'Mission 3_Quiz 1',
    questionText: '잘 듣고, 알맞은 첫소리 글자를 고른 후, 오른쪽에 써 봅시다.',
    mainKey: 1,
    pageNum: 1,
    subkey: 'NUMBER-01',
    audioSrc: '/L01/C03/A10/EE4-L01-C03-A10-P01.mp3',
    srtSrc: '/L01/C03/A10/EE4-L01-C03-A10-P01.srt',
    data: list,
  };

  return (
    <EEL01C03A10P01
      pageInfo={PageInfo}
      imgInfo={imgInfo}
      solutionInfo={solutionInfo}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default EE40L01C01A10P01;
