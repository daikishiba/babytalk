'use client'

import React from 'react';
import Link from 'next/link';
import styles from '../styles/homepage.module.css'
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
		<div className={styles.homepageContainer}>
			{/* ビジュアルと機能紹介セクション */}
			<section>
				<div>
					<h2>Baby Talk AIについて</h2>
					<p>
						Baby Talk AIは2歳以下のお話を始める前の子供に話しかけるChat botです。<br/>
						子供の名前や愛称で楽しく話しかけ、褒める言葉、動物のお話、質問を組み合わせて、子供の想像力を広げます。
					</p>
				</div>
			</section>

			<section>
				<div>
					<h2>Baby Talk AI開発の経緯</h2>
					<p>
						
					</p>
				</div>
			</section>

			{/* デモビデオ・サンプルセクション */}
			<section>
				<div>
					<h2>AIとの対話を体験してみてください！</h2>
					<video controls>
					<source src="/demo.mp4" type="video/mp4" />
					Your browser does not support the video tag.
					</video>
				</div>
			</section>

			{/* コール・トゥ・アクション (CTA) セクション */}
			<section>
				<h2>今すぐAIと話してみましょう！</h2>
				<Link href="/login" passHref>
				<button>無料で体験</button>
				</Link>
			</section>
		</div>
  );
};