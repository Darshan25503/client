import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid mt-3 pt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h5>{auth?.user?.name}</h5>
              <h5>{auth?.user?.email}</h5>
              <h5>{auth?.user?.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
