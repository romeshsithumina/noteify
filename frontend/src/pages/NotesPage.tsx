import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/user";
import UserLoadingView from "../components/form/UserLoadingView";

interface NotesPageProps {
  loggedInUser: User | null;
  userLoaded: boolean;
}

const NotesPage = ({ loggedInUser, userLoaded }: NotesPageProps) => {
  return (
    <Container className="mt-2 flex flex-col align-middle">
      <>
        {userLoaded ? (
          loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )
        ) : (
          <UserLoadingView />
        )}
      </>
    </Container>
  );
};

export default NotesPage;
