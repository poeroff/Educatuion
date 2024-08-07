import { routers } from '@/router';
import templates from '@/router/modules/templates';
import { studentAtom } from '@/stores/student';
import { Demo } from '@maidt-cntn/ui';
import { useRecoilState } from 'recoil';

// demo/develop 안에 들어가는 파일들입니다.
const Demos: React.FC = () => {
  const length = routers.length - templates.length;
  const paths = routers.slice(0, length);
  const [student, setStudent] = useRecoilState(studentAtom);
  return <Demo paths={paths} student={student} setStudent={setStudent} />;
};

export default Demos;
