import { React, Component } from "react";
//Components
import AdminLoginForm from "./AdminLoginForm";
//svg
import wave from "../../Assets/wave.svg";
import { Backdrop } from "@mui/material";
import { Button } from "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, open: true };
    this.changeLogedState = this.changeLogedState.bind(this);
    this.handleBackdropToggle = this.handleBackdropToggle.bind(this);
  }
  changeLogedState() {
    this.setState({ logged: !this.state.logged });
  }
  handleBackdropToggle() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <div className="custom_admin_login_page d-flex flex-column align-items-center justify-content-between">
        <h1 className="display-1 mt-4">Hello Have A Nice Day!!!</h1>
        <AdminLoginForm
          changeLogedState={this.changeLogedState}
          logged={this.state.logged}
        />
        <div
          style={{
            backgroundImage: `url(${wave})`,
            height: 290,
            width: "100vw",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <Backdrop
          className="admin_login_backdrop flex-column"
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={this.state.open}
        >
          <h2 className="h2 text-danger text-center">
            Login and usage of the Admin Panel is only for authorized users.{" "}
            <br /> Any attempts to use admin panel by unauthorized personal will
            be considered as a threat and nessesary actions will be taken
          </h2>
          <Button className="d-block mt-5" onClick={this.handleBackdropToggle}>
            I am Authorized
          </Button>
        </Backdrop>
      </div>
    );
  }
}
export default Home;
