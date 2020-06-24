import React, { useState } from "react";
import axios from "axios";
import TagUsers from "./TagUsers";

const intialTagUser = {
  isTag: false,
  users: [],
  matchUsers: [],
  searchParams: "",
  loading: null,
  input: ""
};

const PostCommentForm = ({ addComment, postId, user }) => {
  const [input, setInput] = useState("");
  const [tagUser, setTagUser] = useState(intialTagUser);

  const handleChange = async e => {
    const commentInput = e.target.value;
    setInput(commentInput);
    setTagUser(tagUser => {
      return {
        ...tagUser,
        input: commentInput
      };
    });
    //Todo: tag more than one people
    //once '@' is pressed and not entered '@' before
    if (commentInput.includes("@")) {
      if (tagUser.isTag === false) {
        setTagUser(tagUser => {
          return {
            ...tagUser,
            loading: true,
            isTag: true
          };
        });
        const users = await getUsernames();
        setTagUser(tagUser => {
          return {
            ...tagUser,
            users: users,
            loading: false,
            matchUsers: users
          };
        });
      } else if (tagUser.isTag === true) {
        const regex = getRegex(commentInput);
        const usersMatch = matchUsers(tagUser.users, regex);
        setTagUser(tagUser => {
          return {
            ...tagUser,
            loading: true,
            searchParams: regex,
            matchUsers: usersMatch,
            loading: false
          };
        });
      }
    } else if (!commentInput.includes("@") && tagUser.isTag === true) {
      setTagUser(intialTagUser);
    }
  };

  const getRegex = commentInput => {
    const index = commentInput.indexOf("@");

    const regex = commentInput.slice(index + 1);
    return new RegExp(regex, "g");
  };

  const getUsernames = async () => {
    try {
      const res = await axios.get("api/users/usernames");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const matchUsers = (users, regex) => {
    return users.filter(user => user.username.match(regex));
  };

  const addTag = username => {
    setInput(input => {
      const index = input.indexOf("@");
      const expression = input.slice(index);
      return input.replace(expression, username);
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInput("");

    addComment(user, postId, input);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Write a comment'
          className='post-comment-input'
          value={input}
          onChange={handleChange}
        />
      </form>
      {tagUser.loading === false && (
        <TagUsers
          key={user._id.toString()}
          users={tagUser.matchUsers}
          addTag={addTag}
        />
      )}
    </>
  );
};

export default PostCommentForm;
