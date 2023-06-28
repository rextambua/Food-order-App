import React, {Fragment} from 'react';
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";


const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = props => {
    return (
        <div>
            <div className={classes.modal}>{props.children}</div>
        </div>
    )
}

function Modal(props) {

const portalElements = document.getElementById('overlays')

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElements)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElements)}

        </Fragment>
    );
}

export default Modal;