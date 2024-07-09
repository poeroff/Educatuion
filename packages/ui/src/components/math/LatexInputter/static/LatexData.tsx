import { LatexInputterButtonType } from './LatexInputterData';

import PlusIcon from '../assets/icon/latex/icon_plus.svg';
import MinusIcon from '../assets/icon/latex/icon_minus.svg';
import MultiplyIcon from '../assets/icon/latex/icon_multiply.svg';
import DivideIcon from '../assets/icon/latex/icon_divide.svg';
import EqualIcon from '../assets/icon/latex/icon_equal.svg';
import PlusMinusIcon from '../assets/icon/latex/icon_pm.svg';
import MinusPlusIcon from '../assets/icon/latex/icon_mp.svg';
import NotEqualIcon from '../assets/icon/latex/icon_neq.svg';
import GreaterIcon from '../assets/icon/latex/icon_greater.svg';
import LessIcon from '../assets/icon/latex/icon_less.svg';
import LeqIcon from '../assets/icon/latex/icon_leq.svg';
import GeqIcon from '../assets/icon/latex/icon_geq.svg';
import DegreeIcon from '../assets/icon/latex/icon_degree.svg';
import FracIcon from '../assets/icon/latex/icon_frac.svg';
import PowerIcon from '../assets/icon/latex/icon_power.svg';
import SubscriptIcon from '../assets/icon/latex/icon_subscript.svg';
import SqrtIcon from '../assets/icon/latex/icon_sqrt.svg';
import VertIcon from '../assets/icon/latex/icon_vert.svg';
import ParenthesesIcon from '../assets/icon/latex/icon_parentheses.svg';
import CurlyBracketsIcon from '../assets/icon/latex/icon_curlybrackets.svg';
import PrimeIcon from '../assets/icon/latex/icon_prime.svg';
import CaseIcon from '../assets/icon/latex/icon_case.svg';
import MatrixIcon from '../assets/icon/latex/icon_matrix.svg';
import PermutationIcon from '../assets/icon/latex/icon_permutation.svg';
import CombinationIcon from '../assets/icon/latex/icon_combination.svg';
import FactorialIcon from '../assets/icon/latex/icon_factorial.svg';
import EmptySetIcon from '../assets/icon/latex/icon_empty_set.svg';
import CapIcon from '../assets/icon/latex/icon_cap.svg';
import CupIcon from '../assets/icon/latex/icon_cup.svg';
import SubsetIcon from '../assets/icon/latex/icon_subset.svg';
import NotSubsetIcon from '../assets/icon/latex/icon_not_subset.svg';
import InIcon from '../assets/icon/latex/icon_in.svg';
import NotInIcon from '../assets/icon/latex/icon_not_in.svg';
import BarIcon from '../assets/icon/latex/icon_bar.svg';
import CdotsIcon from '../assets/icon/latex/icon_cdots.svg';
import NecessaryIcon from '../assets/icon/latex/icon_necessary.svg';
import SufficientIcon from '../assets/icon/latex/icon_sufficient.svg';
import NecessarySufficientIcon from '../assets/icon/latex/icon_necessary_sufficient.svg';
import CompositeFunctionIcon from '../assets/icon/latex/icon_composite_function.svg';
import ComplexNumberIcon from '../assets/icon/latex/icon_complex_number.svg';
import DotIcon from '../assets/icon/latex/icon_dot.svg';
import EquivIcon from '../assets/icon/latex/icon_equiv.svg';
import SimIcon from '../assets/icon/latex/icon_sim.svg';
import NotIcon from '../assets/icon/latex/icon_not.svg';
import SinIcon from '../assets/icon/latex/icon_sin.svg';
import CosIcon from '../assets/icon/latex/icon_cos.svg';
import TanIcon from '../assets/icon/latex/icon_tan.svg';
import ParallelIcon from '../assets/icon/latex/icon_parallel.svg';
import OrthogonalIcon from '../assets/icon/latex/icon_orthogonal.svg';
import OverrightarrowIcon from '../assets/icon/latex/icon_overrightarrow.svg';
import OverleftrightarrowIcon from '../assets/icon/latex/icon_overleftrightarrow.svg';
import OverlineIcon from '../assets/icon/latex/icon_overline.svg';
import OverarcIcon from '../assets/icon/latex/icon_overarc.svg';
import AngleIcon from '../assets/icon/latex/icon_angle.svg';
import SquareIcon from '../assets/icon/latex/icon_square.svg';
import TrinalgeIcon from '../assets/icon/latex/icon_triangle.svg';
import PointIcon from '../assets/icon/latex/icon_point.svg';
import PiIcon from '../assets/icon/latex/icon_pi.svg';
import ThetaIcon from '../assets/icon/latex/icon_theta.svg';
import AlphaIcon from '../assets/icon/latex/icon_alpha.svg';
import BetaIcon from '../assets/icon/latex/icon_beta.svg';
import GammaIcon from '../assets/icon/latex/icon_gamma.svg';
import OmegaIcon from '../assets/icon/latex/icon_omega.svg';
import VarpiIcon from '../assets/icon/latex/icon_varpi.svg';
import ColonIcon from '../assets/icon/latex/icon_colon.svg';
import PowerSqrtIcon from '../assets/icon/latex/icon_powersqrt.svg';

import MatrixInputter from '../components/Inputter/MatrixInputter';

export const LatexDataList: LatexInputterButtonType = {
  더하기: {
    icon: PlusIcon,
    latex: '+',
    mathquill: '+',
  },
  빼기: {
    icon: MinusIcon,
    latex: '-',
    mathquill: '-',
  },
  곱하기: { icon: MultiplyIcon, latex: '\\times', mathquill: '\\times' },
  나누기: { icon: DivideIcon, latex: '\\div', mathquill: '\\div' },
  등호: { icon: EqualIcon, latex: '=', mathquill: '=' },
  플러스마이너스: { icon: PlusMinusIcon, latex: '\\pm', mathquill: '\\pm' },
  마이너스플러스: { icon: MinusPlusIcon, latex: '\\mp', mathquill: '\\mp' },
  '부등호, 같지않다': {
    icon: NotEqualIcon,
    latex: '\\neq',
    mathquill: '\\neq',
  },
  작다: { icon: LessIcon, latex: '<', mathquill: '<' },
  크다: { icon: GreaterIcon, latex: '>', mathquill: '>' },
  '같거나 작다': { icon: LeqIcon, latex: '\\leq', mathquill: '\\leq' },
  '같거나 크다': { icon: GeqIcon, latex: '\\geq', mathquill: '\\geq' },
  분수: {
    icon: FracIcon,
    latex: '\\frac\\placeholder{}\\placeholder{}',
    mathquill: '\\frac{}{}',
  },
  각도: {
    icon: DegreeIcon,
    latex: '\\placeholder{}^{\\circ}',
    mathquill: '{}\\degree',
    mathml: '^\\circ',
  },
  위첨자: {
    icon: PowerIcon,
    latex: '\\placeholder{}^\\placeholder{}',
  },
  아래첨자: {
    icon: SubscriptIcon,
    latex: '\\placeholder{}_\\placeholder{}',
  },
  '루트, 제곱근': {
    icon: SqrtIcon,
    latex: '\\sqrt\\placeholder{}',
    mathquill: '\\sqrt{}',
  },
  절댓값: {
    icon: VertIcon,
    latex: '\\lvert\\placeholder{}\\rvert',
    mathquill: '\\vert{}\\vert',
  },
  괄호: { icon: ParenthesesIcon, latex: '(\\placeholder{})' },
  중괄호: {
    icon: CurlyBracketsIcon,
    latex: '\\lbrace\\placeholder{}\\rbrace',
  },
  프라임: {
    icon: PrimeIcon,
    latex: '\\placeholder{}\\prime',
    mathquill: '{}\\prime',
  },
  경우: {
    icon: CaseIcon,
    latex: `\\left\\{\\begin{matrix}
    \\placeholder{} \\\\ \\placeholder{}
    \\end{matrix}\\right.
    `,
  },
  행렬: {
    icon: MatrixIcon,
    latex: `\\begin{pmatrix}
            \\placeholder{}&\\placeholder{} \\\\
            \\placeholder{}&\\placeholder{}
            \\end{pmatrix}`,
    children: {
      component: <MatrixInputter />,
    },
  },
  순열: {
    icon: PermutationIcon,
    latex: '_\\placeholder{}P_\\placeholder{}',
    mathquill: '_{}\\mathrm{P}_{}\\space',
  },
  조합: {
    icon: CombinationIcon,
    latex: '_\\placeholder{}C_\\placeholder{}',
    mathquill: '_{}\\mathrm{C}_{}\\space',
  },
  팩토리얼: {
    icon: FactorialIcon,
    latex: '\\placeholder{}!',
    mathquill: '{}!',
  },
  공집합: {
    icon: EmptySetIcon,
    latex: '\\varnothing',
    mathquill: '\\varnothing',
  },
  교집합: { icon: CapIcon, latex: '\\cap', mathquill: '\\cap' },
  합집합: { icon: CupIcon, latex: '\\cup', mathquill: '\\cup' },
  진부분집합: {
    icon: SubsetIcon,
    latex: '\\subset',
    mathquill: '\\subset',
  },
  '진부분집합이 아니다': {
    icon: NotSubsetIcon,
    latex: '\\not\\subset',
    mathquill: '\\notsubset',
  },
  '원소가 속한다': {
    icon: InIcon,
    latex: '\\in',
    mathquill: '\\in',
  },
  '원소가 속하지 아니한다': {
    icon: NotInIcon,
    latex: '\\notin',
    mathquill: '\\notin',
  },
  '수직 막대': { icon: BarIcon, latex: '|', mathquill: '|' },
  '중간점 기호': {
    icon: CdotsIcon,
    latex: '\\cdots',
    mathquill: '\\cdots',
  },
  '필요 조건': { icon: NecessaryIcon, latex: '\\to', mathquill: '\\to' },
  '충분 조건': {
    icon: SufficientIcon,
    latex: '\\implies',
    mathquill: '\\implies',
  },
  '필요 충분 조건': {
    icon: NecessarySufficientIcon,
    latex: '\\iff',
    mathquill: '\\iff',
  },
  '합성 함수': {
    icon: CompositeFunctionIcon,
    latex: '\\circ',
    mathquill: '\\circ',
  },
  '복소수 단위': {
    icon: ComplexNumberIcon,
    latex: '\\placeholder{}^{-1}',
    mathquill: '{}^{-1}',
  },
  '순환 소수': {
    icon: DotIcon,
    latex: '\\dot{\\placeholder{}}',
    mathquill: '\\dot{}',
  },
  합동: { icon: EquivIcon, latex: '\\equiv', mathquill: '\\equiv' },
  닮음: { icon: SimIcon, latex: '\\sim', mathquill: '\\sim' },
  부정: { icon: NotIcon, latex: '\\neg' },
  사인: { icon: SinIcon, latex: '\\sin', mathquill: '\\sin' },
  코사인: { icon: CosIcon, latex: '\\cos', mathquill: '\\cos' },
  탄젠트: { icon: TanIcon, latex: '\\tan', mathquill: '\\tan' },
  '평행, 비례': { icon: ParallelIcon, latex: '//', mathquill: '//' },
  직교: { icon: OrthogonalIcon, latex: '\\bot', mathquill: '\\bot' },
  '반직선, 벡터': {
    icon: OverrightarrowIcon,
    latex: '\\overrightarrow{\\placeholder{}}',
    mathquill: '\\overrightarrow{}',
  },
  직선: {
    icon: OverleftrightarrowIcon,
    latex: '\\overleftrightarrow{\\placeholder{}}',
    mathquill: '\\overleftrightarrow{}',
  },
  선분: {
    icon: OverlineIcon,
    latex: '\\overline{\\placeholder{}}',
    mathquill: '\\overline{}',
  },
  호: {
    icon: OverarcIcon,
    latex: '\\overgroup{\\placeholder{}}',
  },
  각: { icon: AngleIcon, latex: '\\angle', mathquill: '\\angle' },
  사각형: { icon: SquareIcon, latex: '\\square', mathquill: '□' },
  삼각형: {
    icon: TrinalgeIcon,
    latex: '\\triangle',
    mathquill: '\\triangle',
  },
  소수점: { icon: PointIcon, latex: '.', mathquill: '.' },
  파이: { icon: PiIcon, latex: '\\pi', mathquill: '\\pi' },
  세타: { icon: ThetaIcon, latex: '\\theta', mathquill: '\\theta' },
  알파: { icon: AlphaIcon, latex: '\\alpha', mathquill: '\\alpha' },
  베타: { icon: BetaIcon, latex: '\\beta', mathquill: '\\beta' },
  감마: { icon: GammaIcon, latex: '\\gamma', mathquill: '\\gamma' },
  '허근, 오메가': {
    icon: OmegaIcon,
    latex: '\\omega',
    mathquill: '\\omega',
  },
  켤레근: { icon: VarpiIcon, latex: '\\varpi', mathquill: '\\varpi' },
  내분: { icon: ColonIcon, latex: ':' },
  '거듭 제곱근': { icon: PowerSqrtIcon, latex: '\\sqrt[\\placeholder{}]\\placeholder{}' },
};
