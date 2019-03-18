import React from "react";
import { connect } from "react-redux";

class UserHeader extends React.Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>;
  }
}

const mapStateToProps = (state, myOwnProps) => {
  return { user: state.users.find(user => user.id === myOwnProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
