interface Props {
  text: string;
}
const BaseTableHeader: React.FC<Props> = ({ text }) => {
  return <span>{text}</span>;
};

export default BaseTableHeader;
