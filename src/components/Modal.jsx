import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ children, isOpen, setIsOpen, tituloModal, despachar }) => {
    return (
        <BootstrapModal show={isOpen} onHide={() => setIsOpen(false)} centered>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{tituloModal}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {children}
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Cerrar
                </Button>
                <Button variant="dark" onClick={() => despachar()}>
                    Confirmar
                </Button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;