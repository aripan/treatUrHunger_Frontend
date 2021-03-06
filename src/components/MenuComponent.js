import React from "react";
import Intro from "./IntroComponent";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderMenuItem({ dish }) {
  return (
    <Card>
      <Link to={`/menu/${dish._id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle className="dishName">{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const Menu = (props) => {
  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div key={dish._id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Intro />
          <Loading />
        </div>
      </div>
    );
  } else if (props.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <Intro />
          <div className="col-12 m-4">
            <h4>{props.dishes.errMess}</h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Intro />
          <Breadcrumb className="breadcrumb-fontStyle">
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
        <div className="row mb-2 ">{menu}</div>
      </div>
    );
  }
};

export default Menu;
