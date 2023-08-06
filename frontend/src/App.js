import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
import MyBlog from "./components/MyBlog";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ShowBlog from "./components/ShowBlog";
import EditBlog from "./components/EditBlog";
import { useAuthContext } from "./hooks/useAuthContext";
import UserProfile from "./components/UserProfile";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { user } = useAuthContext();
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/my-blogs" element={<MyBlog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={"/"} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route path="/blogs/:id" element={<ShowBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
