'use client'

import React from 'react';
import Link from 'next/link';
import styles from '../styles/homepage.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
	const [hasMounted, setHasMounted] = useState(false);
  
	useEffect(() => {
	  setHasMounted(true);
	}, []);
  
	if (!hasMounted) {
	  return null; // Prevents rendering on the server side to avoid hydration error
	}
	
	return (
		<div>
			{/* ビジュアルと機能紹介セクション */}
			<section>
				<div className={styles.devContainer}>
					<h2 className={styles.h2}>Baby Talk with AIについて</h2>
					<p>
						Baby Talk with AIは2歳以下のお話を始める前の子供を対象としたChat botです。<br/><br/>
						子供の名前や愛称を入力すると、明るい言葉や質問を組み合わせて英語で話しかけます。<br/><br/>
						言葉を覚えていく時期に英語に触れることで、将来の言語能力の向上を助けます。<br/><br/>
						まずはユーザー登録し、Baby Talk with AIを体験してみてください。<br/><br/>
					</p>
					<div className={styles.buttoncontainer}>
						<Link href="/login" passHref>
						<button className={styles.button}>Sign up</button>
						</Link>
					</div>
				</div>
			</section>

			<section>
				<div className={styles.devContainer}>
					<h2 className={styles.h2}>開発の経緯</h2>
					<p>
						Baby Talk with AIは育児休暇を取得した非エンジニアが独学で開発を学び、育児の合間に作成したWebアプリケーションです。<br/><br/>
						風邪をひいて声が出なくなった際に、代わりに子供に話しかけて楽しませてくれる存在が欲しいと思い、開発をスタートしました。<br/><br/>
						育児をされている方々に少しでも癒しを与え、手助けになれば幸いです。<br/><br/>
					</p>
					<img src='/samplepic.png' alt="sample picture of chat bot" className={styles.samplepic}/>
				</div>
			</section>

			<section>
				<div className={styles.devContainer}>
					<h2 className={styles.h2}>Contact</h2>
					<p>
						Baby Talk with AIを体験していただき、感想や要望がありましたら是非以下のメールアドレスにご連絡ください。<br/><br/>
						また育児✖️AIに興味があり、一緒にWebアプリケーションやデバイスの開発に携わっていただける方からのご連絡もお待ちしています。<br/><br/>
					</p>
					<div className="mt-8 flex items-center">
						babytalkai@gmail.com
					</div>
				</div>
			</section>
		</div>
  );
};