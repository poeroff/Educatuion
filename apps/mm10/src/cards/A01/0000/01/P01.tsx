import { ESvgType, SvgIcon } from '@maidt-cntn/ui';
import Background1SVG from '@/assets/A01/0000/01/background1.svg';
import Background2SVG from '@/assets/A01/0000/01/background2.svg';

const P01 = () => {
  return (
    <div style={{ position: 'relative' }}>
      <SvgIcon type={ESvgType.IMG} style={{ position: 'absolute', left: '-40px', top: '102px' }} src={Background2SVG} />
      <SvgIcon type={ESvgType.IMG} src={Background1SVG} style={{ position: 'absolute', top: '-4px', right: '-40px', clipPath: 'inset(0 0 0 1px)' }} />
      <SvgIcon
        type={ESvgType.IMG}
        src={FILE_URL}
        alt='남학생이 새싹에 물을 주고 있고, 고양이가 나비를 잡으려고 하고 있습니다'
        style={{ position: 'absolute', left: '161px', top: '200px' }}
      />
    </div>
  );
};

export default P01;

const FILE_URL = '/A01/0000/01/A-MM1-0100-01-01.png';
