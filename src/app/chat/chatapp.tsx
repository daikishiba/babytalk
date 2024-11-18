"use client";

import React, { useState } from 'react';
import styles from '../../styles/chatapp.module.css';

const ChatApp: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

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
		} catch (chatError) {
			console.error('Error in chat API:', chatError);
			setMessage('会話生成に失敗しました');
		}
		finally {
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
				<button onClick={handleSubmit} className={`${styles.button} ${loading ? styles.blinking : ''}` }>
				{loading ? '生成中...' : '話しかける'}
				</button>
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
