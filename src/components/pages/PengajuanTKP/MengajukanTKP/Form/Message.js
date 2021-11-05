import React from "react";
import propTypes from "prop-types";

const Message = ({ msg }) => {
  return (
    <div>
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        {msg}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

Message.propTypes = {
  msg: propTypes.string.isRequired,
};

export default Message;
