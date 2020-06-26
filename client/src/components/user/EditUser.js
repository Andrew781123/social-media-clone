import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { connect } from "react-redux";
import { editUser, cancelIconEdit } from "../../Redux/actions/authActions";

const EditUser = props => {
  const { user, editUser, cancelIconEdit, loading } = props;

  const [initialIcon, setInitialIcon] = useState({
    headColor: "",
    bodyColor: ""
  });

  useEffect(() => {
    //set initialIcon after user is loaded
    setInitialIcon({ ...user.icon });
  }, [loading, user.icon]);

  const handleCancel = () => {
    cancelIconEdit(initialIcon);
    props.history.push("/");
  };

  return (
    <div className='new-user-form-container'>
      {loading === false && (
        <UserForm
          title='Edit Profile'
          userId={user._id.toString()}
          username={user.username}
          headColor={user.icon.headColor}
          bodyColor={user.icon.bodyColor}
          action={editUser}
          history={props.history}
          isCancel={true}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  editUser: user => dispatch(editUser(user)),
  cancelIconEdit: icon => dispatch(cancelIconEdit(icon))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
