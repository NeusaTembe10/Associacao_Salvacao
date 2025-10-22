import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import InitialPage from "../Pages/InitialPage";
import ForgetPassword from "../Pages/ForgetPassword";
import {OAuthCallbackHandler} from "../Auth/OAuthCallbackHandler";
import VerificationPage from "../Pages/VerificationPage";
import Help from "../Pages/Help";
import About from "../Pages/About";
import Pregacoes from "../Pages/Pregacoes";
import VideosEAudios from "../Pages/VideosEAudios";
import Livros from "../Pages/Livros";
import Fotos from "../Pages/Fotos";
import Cruzadas from "../Pages/Cruzadas";
import Missao from "../Pages/Missao";
import Rede from "../Pages/Rede";
import Perfil from "../Pages/Perfil";
import AdminPanel from "../Admin/AdminPanel";
import AdminLogin from "../Admin/AdminLogin";
import AdminNovidade from "../Admin/AdminNovidade";
import AdminProfile from "../Admin/AdminProfile";
import CreatAcount from "../Pages/Help/CreateAcount";
import CreatetCategory from "../Pages/Help/ContetCategory";

export default function AppRoutes({
  showToast,
}: {
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/Login" element={<Login showToast={showToast} />} />
          <Route path="/Signup" element={<SignUp showToast={showToast} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<InitialPage />} />
          <Route path="/forget" element={<ForgetPassword />} key="forget" />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/pregacoes" element={<Pregacoes />} />
          <Route path="/VideosEAudios" element={<VideosEAudios />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/fotos" element={<Fotos />} />
          <Route path="/cruzadas" element={<Cruzadas />} />
          <Route path="/missao" element={<Missao />} />
          <Route path="/rede" element={<Rede />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-news" element={<AdminNovidade />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/help/create-account" element={<CreatAcount />} />
          <Route path="/auth/callback" element={<OAuthCallbackHandler showToast={showToast} />} />
          <Route path="/help/content-categories" element={<CreatetCategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
