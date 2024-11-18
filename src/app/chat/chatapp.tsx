"use client";

import React, { useState } from 'react';
import styles from '../../styles/chatapp.module.css';

const ChatApp: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const [loadingAudio, setLoadingAudio] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleChatSubmit = async () => {
    if (!nickname) return;

    const themes = ["かわいい動物", "かっこいい乗り物", "おいしい食べ物"];
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const theme = themes[randomNumber % 3];

    setLoadingChat(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, theme }),
      });

      if (!response.ok) {
        throw new Error('Chat API response was not OK');
      }

      const { message } = await response.json();
      setMessage(message);
    } catch (chatError) {
      console.error('Error in chat API:', chatError);
      setMessage('会話生成に失敗しました');
    } finally {
      setLoadingChat(false);
    }
  };

  const handleAudioSubmit = async () => {
    if (!message) return;

    setLoadingAudio(true);

    try {
      const response = await fetch('/api/audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Audio API response was not OK');
      }

      const { audio } = await response.json();
      setAudioSrc(audio);
    } catch (audioError) {
      console.error('Error in audio API:', audioError);
      setAudioSrc(null);
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      <img 
        src='/frog.img.png'
        alt="A cheerful baby or AI interaction illustration" 
        className={styles.image_bounce}
      />
      <input
        className={styles.input}
        type="text"
        value={nickname}
        onChange={handleChange}
        placeholder="子供の愛称を入力してください"
      />
      <button 
        onClick={handleChatSubmit} 
        className={`${styles.button} ${loadingChat ? styles.blinking : ''}`}
        disabled={loadingChat}
      >
        {loadingChat ? '生成中...' : '話しかける'}
      </button>
      {message && (
        <div className={styles.message_section}>
          <p>{message}</p>
          <button 
            onClick={handleAudioSubmit} 
            className={`${styles.button} ${loadingAudio ? styles.blinking : ''}`}
            disabled={loadingAudio}
          >
            {loadingAudio ? '音声生成中...' : '音声を生成'}
          </button>
        </div>
      )}
      {audioSrc && (
        <div className={styles.audioSection}>
          <audio controls src={audioSrc}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
