import "./App.css";
import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Auth_Is_Ready } from "./Redux/ReduxToolkit/authSlice";
import { projectAuth, projectFirestore } from "./firebase/config";
import { useEffect, useState } from "react";
import SpinnerComponent from "./components/smallcomponents/SpinnerComponent";
import {
  errorData,
  loadingData,
  successData,
} from "./Redux/ReduxToolkit/backendDataSlice";
import {
  addBillingHistory,
  addCartHistory,
} from "./Redux/ReduxToolkit/historyOfClient";
const MainCarCarousel = React.lazy(() =>
  import("./components/MainCarCarousel")
);
const SignUp = React.lazy(() => import("./components/SignUp"));
const ClientUser = React.lazy(() => import("./components/ClientUser"));
const SingleCartDetails = React.lazy(() =>
  import("./components/ClientComponents/SingleCartDetails")
);
const CartList = React.lazy(() =>
  import("./components/ClientComponents/CartList")
);
const BillingForm = React.lazy(() =>
  import("./components/ClientComponents/BillingForm")
);
const PaymentProcess = React.lazy(() =>
  import("./components/ClientComponents/PaymentProcess")
);
const ClientBillingShowCards = React.lazy(() =>
  import("./components/ClientComponents/ClientBillingShowCards")
);
const InvoiceOrder = React.lazy(() =>
  import("./components/ClientComponents/InvoiceOrder")
);
const FavouriteList = React.lazy(() =>
  import("./components/ClientComponents/FavouriteList")
);

function App(props) {
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  useEffect(() => {
    projectAuth.onAuthStateChanged((status) => {
      props.authIsReadyDispatch(status);
    });
  }, []);
  const { authIsReady, user } = props.auth;

  useEffect(() => {
    projectFirestore.collection("ASPR").onSnapshot((snapshot) => {
      props.loadingDataDispatch();
      if (snapshot.empty) {
        props.errorDataDispatch("No Datas to Load");
      } else {
        let result = [];
        snapshot.docs.map((e) => {
          result.push({ ...e.data(), id: e.id });
        });
        props.successDataDispatch(result);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      {authIsReady ? (
        <div className="">
          <Header />
          <Switch>
            <Route exact path={"/"}>
              {!user && (
                <React.Suspense fallback={<div>ASPR_MainCarCarousel...</div>}>
                  <MainCarCarousel />
                </React.Suspense>
              )}
              {user && (
                <React.Suspense fallback={<div>ASPR_client...</div>}>
                  <Redirect to={`/client/${user.displayName}`} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/signUp"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_client...</div>}>
                  <Redirect to={`/client/${user.displayName}`} />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_SignUp...</div>}>
                  <SignUp />
                </React.Suspense>
              )}
            </Route>

            <Route exact path={"/client/:name"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_ClientUser...</div>}>
                  <ClientUser />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/cardDetails/:prod_id/:catg_name/:index_pos"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_SingleCartDetails...</div>}>
                  <SingleCartDetails />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/cartList"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_CartList...</div>}>
                  <CartList />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/billingForm"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_BillingForm...</div>}>
                  <BillingForm />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/paymentProcess"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_PaymentProcess...</div>}>
                  <PaymentProcess />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/clientBillingCards"}>
              {user && (
                <React.Suspense
                  fallback={<div>ASPR_ClientBillingShowCards...</div>}
                >
                  <ClientBillingShowCards />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/InvoiceOrder/:order_no"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_InvoiceOrder...</div>}>
                  <InvoiceOrder />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>

            <Route path={"/favouriteList"}>
              {user && (
                <React.Suspense fallback={<div>ASPR_FavouriteList...</div>}>
                  <FavouriteList />
                </React.Suspense>
              )}
              {!user && (
                <React.Suspense fallback={<div>ASPR_Home...</div>}>
                  <Redirect to={"/"} />
                </React.Suspense>
              )}
            </Route>
          </Switch>
        </div>
      ) : (
        <SpinnerComponent />
      )}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    authIsReadyDispatch: (data) => dispatch(Auth_Is_Ready(data)),
    loadingDataDispatch: () => dispatch(loadingData()),
    successDataDispatch: (data) => dispatch(successData(data)),
    errorDataDispatch: (data) => dispatch(errorData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
