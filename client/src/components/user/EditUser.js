import React from "react";
import UserForm from "./UserForm";
import { connect } from "react-redux";
import { editUser } from "../../Redux/actions/authActions";

const EditUser = props => {
  const { user, editUser } = props;

  return (
    <div className='new-user-form-container'>
      <UserForm
        title='Edit Profile'
        userId={user._id.toString()}
        username={user.username}
        headColor={user.icon.headColor}
        bodyColor={user.icon.bodyColor}
        action={editUser}
        history={props.history}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  editUser: user => dispatch(editUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
