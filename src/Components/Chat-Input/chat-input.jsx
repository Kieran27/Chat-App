import { useState, useContext, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useUserAuth } from "../../Auth/authentication-context.js";
import { HiEmojiHappy } from "react-icons/hi";
import ChatContext from "../../Current/current-chat-context.js";
import Picker from "emoji-picker-react";
import "./chat-input.css";

const ChatInput = ({ scrollIntoView }) => {
  const [msg, setMsg] = useState("");
  const { user } = useUserAuth();
  const { currentChat } = useContext(ChatContext);
  const msgRef = !currentChat
    ? collection(db, "messages")
    : collection(db, currentChat);
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMsg();
    clearInput();
    if (displayEmojiPicker) setEmojiPicker();
  };

  const clearInput = () => {
    setMsg("");
  };

  const addMsg = async () => {
    await addDoc(msgRef, {
      message: msg,
      timestamp: Timestamp.now(),
      userId: user.uid,
      owner: user.displayName,
      ownerImage: user.photoURL,
    });
    scrollIntoView();
  };

  const setEmojiPicker = () => {
    setDisplayEmojiPicker(
      (displayEmojiPicker) => (displayEmojiPicker = !displayEmojiPicker)
    );
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(chosenEmoji);
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    if (chosenEmoji) {
      setMsg((msg) => msg + chosenEmoji.emoji);
    }
  }, [chosenEmoji]);

  return (
    <>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          name="msg-box"
          id="msg-box"
          cols="50"
          rows="5"
          placeholder="Say something nice..."
          onChange={handleChange}
          value={msg}
          autoComplete="off"
          required
        />
        <input type="submit" value="send" />
      </form>
      <button className="btn-emoji" onClick={setEmojiPicker}>
        <HiEmojiHappy />
      </button>
      {displayEmojiPicker && (
        <div className="emoji-picker-container">
          <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} />
        </div>
      )}
    </>
  );
};

export default ChatInput;
