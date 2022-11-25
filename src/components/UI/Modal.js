import style from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
	return <div className={style.backdrop} onClick={props.onClick} />;
};
const ModalOverlay = (props) => {
	return (
		<div className={style.modal}>
			<div className={style.content}>{props.children}</div>
		</div>
	);
};
function Modal(props) {
	const portalDiv = document.getElementById('modal');
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.onBackDropClick} />,
				portalDiv
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalDiv
			)}
		</>
	);
}

export default Modal;
