import React from "react";

import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    };
  }

  handleFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleProfileUpdate = async (data) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/profile/${this.props.user.id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": window.sessionStorage.getItem("token")
          },
          body: JSON.stringify({ formInput: data })
        }
      );
      if (res.status === 200 || res.status === 304) {
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { user, toggleModal } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
          <main className="pa4 black-80 w-80">
            <Avatar
              alt="Remy Sharp"
              src="https://png.pngtree.com/svg/20161217/avatar__181424.png"
              className="profile-big-avatar"
            />
            <h2>{this.state.name}</h2>
            <h6>{`Images Submitted: ${user.entries}`}</h6>
            <h6>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</h6>
            <hr />
            <form
              className="profile-modal-container"
              noValidate
              autoComplete="off"
            >
              <TextField
                id="name"
                label="Name"
                className="profile-modal-text-field"
                defaultValue={user.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <TextField
                id="age"
                label="Age"
                className="profile-modal-text-field"
                defaultValue={user.age}
                onChange={this.handleChange("age")}
                margin="normal"
              />
              <TextField
                id="pet"
                label="Pet"
                className="profile-modal-text-field"
                defaultValue={user.pet}
                onChange={this.handleChange("pet")}
                margin="normal"
              />
              <div className="profile-modal-bottom">
                <Button
                  onClick={() => this.handleProfileUpdate({ name, age, pet })}
                  color="primary"
                >
                  Save
                </Button>
                <Button onClick={toggleModal} color="secondary">
                  Cancel
                </Button>
              </div>
            </form>
          </main>
          <div className="profile-modal-close" onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
