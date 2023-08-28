import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotesPage from "./pages/NotesPage";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NoteFoundPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // async function has used because useEffect cannot set as async
    async function fetchLoggedInUser() {
      try {
        setUserLoading(true);
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setUserLoading(false);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        <Container className="mt-3">
          <Routes>
            <Route
              path="/"
              element={
                <NotesPage
                  loggedInUser={loggedInUser}
                  userLoaded={!userLoading}
                />
              }
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>

        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSucessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSucessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
