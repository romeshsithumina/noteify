import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, Form, Button } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { AiOutlineClose } from "react-icons/ai";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSucessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSucessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSucessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title className="font-bold">Login</Modal.Title>
        <AiOutlineClose
          size={21}
          onClick={onDismiss}
          className="cursor-pointer"
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500"
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSucessful: (user: User) => void;
}

export default LoginModal;
