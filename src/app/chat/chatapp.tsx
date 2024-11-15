"use client";

import React, { useState } from 'react';
import styles from '../../styles/chatapp.module.css';
import OpenAI from 'openai';

const ChatApp: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [conversationCount, setConversationCount] = useState<number>(0);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async () => {
		if (!nickname) return;

		const themes = ["かわいい動物", "かっこいい乗り物", "おいしい食べ物"];
		const randomNumber = Math.floor(Math.random() * 9) + 1;
		const theme = themes[randomNumber % 3];

		setLoading(true);

		try {
			const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ nickname, theme }),
			});

			if (!response.ok) {
				throw new Error('API response was not OK');
			}
			const { message, audio } = await response.json();

			setMessage(message);
			setAudioSrc(audio);

			setConversationCount(prevCount => prevCount + 1);
		} catch (error) {
		console.error('Error generating message or audio:', error);
		setMessage('エラーが発生しました。もう一度試してください。');
		} finally {
		setLoading(false);
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
					placeholder="子供の愛称を入力してください"/>
				<button className={styles.button} onClick={handleSubmit}>
				{loading ? '生成中...' : '話しかける'}
				</button>

				<p className={styles.conversationCount}>現在の会話回数: {conversationCount}</p>

				{message && <div className="message-section"><p>{message}</p></div>}
				{audioSrc && (
					<div className={styles.audioSection}>
					<audio controls src={audioSrc}>
						Your browser does not support the audio element.
					</audio>
					</div>
				)}
		</div>
	);
}

export default ChatApp;
