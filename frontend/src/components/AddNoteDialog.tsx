import { Modal, Form, Button } from "react-bootstrap";

interface AddNoteDialogProps {
  onDismiss: () => void;
}

const AddNoteDialog = ({ onDismiss }: AddNoteDialogProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton={true}>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addNoteForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialog;
