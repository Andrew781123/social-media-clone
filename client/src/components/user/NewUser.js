import React from "react";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import { createUser } from "../../Redux/actions/authActions";

const NewUser = props => {
  const { user, createUser } = props;
  console.log(`user state: ${user}`);

  return (
    <div className='new-user-form-container'>
      <UserForm
        title='Create new user'
        username={user.username}
        headColor={user.icon.headColor}
        bodyColor={user.icon.bodyColor}
        action={createUser}
        history={props.history}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
