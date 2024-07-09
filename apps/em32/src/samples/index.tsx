import { Demo } from '@maidt-cntn/ui';
import templates from '@/router/modules/templates';

const Demos: React.FC = () => {
  return <Demo paths={templates} name={'samples'} />;
};

export default Demos;
