import DropZone from "../../../components/DropZone";
import { DropZoneContainer, InfoImageConatiner } from "./index.style";
import userImage from "../../../assets/images/img_user.png";
export default function InfoImage(props) {
	const { setFile, setImage, image } = props;

	return (
		<InfoImageConatiner>
			<DropZone setFile={setFile} setImage={setImage}>
				<DropZoneContainer>{image ? <img src={image} /> : <img id="basic-image" src={userImage} />}</DropZoneContainer>
			</DropZone>
		</InfoImageConatiner>
	);
}
