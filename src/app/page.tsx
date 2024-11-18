'use client'

import React from 'react';
import Link from 'next/link';
import styles from '../styles/homepage.module.css';
import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react'

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
					<h2 className={styles.h2}>Baby Talk AIについて</h2>
					<p>
						Baby Talk AIは2歳以下のお話を始める前のお子さんを対象としたChat botです。<br/>
						<br/>
						お子さんの名前や愛称を入力すると、明るい言葉や質問を組み合わせて日本語と英語で話しかけます。
					</p>
					<img src='/samplepic.png' alt="sample picture of chat bot" className={styles.samplepic}/>
				</div>
			</section>

			<section>
				<div className={styles.devContainer}>
					<h2 className={styles.h2}>開発の経緯</h2>
					<p>
						Baby Talk AIは育児休暇を取得した非エンジニアが知識ゼロから開発を学び、育児の合間に作成したWebアプリケーションです。<br/><br/>
						育児中に風邪を引いて声が出なくなった際に子供に話しかけてくれるAIが欲しいと思い、開発をスタートしました。<br/><br/>育児をされている方々に少しでも癒しを与え、手助けになれば幸いです。<br/>
						<br/>
						まずはユーザー登録し、Baby Talk AIを体験してみてください！<br/>
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
					<h2 className={styles.h2}>今後の展望</h2>
					<p>
						初めての開発を通じて、AIは育児領域で様々な価値を提供できる可能性があると感じています。<br/><br/>
						例えば数年後には子供のお気に入りのおもちゃにLLMが搭載され、子供と話してくれるようになるのではないでしょうか。<br/>
						<br/>
						Baby Talk AIを体験していただき、感想や要望がありましたら是非以下のメールアドレスにご連絡ください。<br/><br/>
						また育児✖️AIに興味があり、一緒にWebアプリケーションやデバイスの開発に携わっていただける方からのご連絡もお待ちしています。<br/>
						<br/>
					</p>
					<div className="mt-8 flex items-center">
						<a href="mailto:babytalkai@gmail.com" className="text-blue-600 hover:underline">
							babytalkai@gmail.com
						</a>
					</div>
				</div>
			</section>
		</div>
  );
};