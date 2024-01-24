import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return <Layout></Layout>;
};

export default HomePage;
