import { ButtonContainer } from './index.style';

export default function Button(props) {
  const { content, handleClick } = props;
  return <ButtonContainer onClick={handleClick}>{content}</ButtonContainer>;
}
