import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Register from "./RegisterComponent";
import Favorites from "./FavoriteComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchPostComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
  fetchFavorites,
  postFavorite,
  deleteFavorite,
  loginUser,
  logoutUser,
  registerUser,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPostComment: (dishId, rating, comment) =>
    dispatch(fetchPostComment(dishId, rating, comment)),

  fetchDishes: () => {
    dispatch(fetchDishes());
  },

  fetchComments: () => {
    dispatch(fetchComments());
  },

  fetchPromos: () => {
    dispatch(fetchPromos());
  },

  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },

  postFeedback: (feedback) => {
    dispatch(postFeedback(feedback));
  },

  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },

  fetchFavorites: () => {
    dispatch(fetchFavorites());
  },

  postFavorite: (dishId) => {
    dispatch(postFavorite(dishId));
  },

  deleteFavorite: (dishId) => {
    dispatch(deleteFavorite(dishId));
  },

  registerUser: (creds) => {
    dispatch(registerUser(creds));
  },

  loginUser: (creds) => {
    dispatch(loginUser(creds));
  },

  logoutUser: () => {
    dispatch(logoutUser());
  },
});

class Main extends Component {
  // constructor() {
  //   super();
  //   this.state = {};
  // }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          // DISHES
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          // PROMOTIONS
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          // LEADERS
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };

    // To specify the chosen specific dish
    const DishWithId = ({ match }) => {
      return (
        // CHECKING AUTHENTICATION OF THE USER
        this.props.auth.isAuthenticated ? (
          <DishDetail
            // DISHES
            dish={
              this.props.dishes.dishes.filter(
                (dish) => dish._id === match.params.dishId
              )[0]
            }
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            // COMMENTS
            comments={this.props.comments.comments.filter(
              (comment) => comment.dish === match.params.dishId
            )}
            commentsErrMess={this.props.comments.errMess}
            // COMMENTS ON A DISH
            fetchPostComment={this.props.fetchPostComment}
            // FAVORITES
            favorite={this.props.favorites.favorites?.dishes.some(
              (dish) => dish._id === match.params.dishId
            )}
            postFavorite={this.props.postFavorite}
          />
        ) : (
          <DishDetail
            // DISHES
            dish={
              this.props.dishes.dishes.filter(
                (dish) => dish._id === match.params.dishId
              )[0]
            }
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            // COMMENTS
            comments={this.props.comments.comments.filter(
              (comment) => comment.dish === match.params.dishId
            )}
            commentsErrMess={this.props.comments.errMess}
            // COMMENTS ON A DISH
            fetchPostComment={this.props.fetchPostComment}
            // FAVORITES
            favorite={false}
            postFavorite={this.props.postFavorite}
          />
        )
      );
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            (alert("Please Log-In to select your favorite items."),
            (
              <Redirect
                to={{
                  pathname: "/home",
                  state: { from: props.location },
                }}
              />
            ))
          )
        }
      />
    );

    return (
      <div>
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <div>
          <Switch>
            <Route
              exact
              path="/register"
              component={() => (
                <Register
                  auth={this.props.auth}
                  registerUser={this.props.registerUser}
                />
              )}
            />
            <Route path="/home" component={HomePage} />
            <Route
              exact
              path="/aboutus"
              component={() => <About leaders={this.props.leaders} />}
            />
            <Route
              exact
              path="/menu"
              component={() => <Menu dishes={this.props.dishes} />}
            />
            <Route path="/menu/:dishId" component={DishWithId} />
            <PrivateRoute
              exact
              path="/favorites"
              component={() => (
                <Favorites
                  auth={this.props.auth}
                  favorites={this.props.favorites}
                  deleteFavorite={this.props.deleteFavorite}
                />
              )}
            />
            <Route
              exact
              path="/contactus"
              component={() => (
                <Contact
                  resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback={this.props.postFeedback}
                />
              )}
            />
            <Redirect to="/home" />
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
