import React from 'react';
import Link from 'next/link';


export default function Home() {
  return (
		<form>
		<div>
		{/* ヘッダーセクション */}
		<header>
			<h1>Baby Talk with AI</h1>
			<p>子供に寄り添った楽しいAI体験を始めましょう！</p>
		</header>

		{/* ビジュアルと機能紹介セクション */}
		<section>
			<div>
			<h2>Baby Talk with AIについて</h2>
			<p>
				AIが子供の名前や愛称で楽しく話しかけます。褒める言葉、動物のお話、そして質問を組み合わせて、子供の想像力を広げます。
			</p>
			</div>
		</section>

		{/* デモビデオ・サンプルセクション */}
		<section>
			<h2>AIとの対話を体験してみてください！</h2>
			<video controls>
			<source src="/demo.mp4" type="video/mp4" />
			Your browser does not support the video tag.
			</video>
		</section>

		{/* コール・トゥ・アクション (CTA) セクション */}
		<section>
			<h2>今すぐAIと話してみましょう！</h2>
			<Link href="/login" passHref>
			<button>無料で体験</button>
			</Link>
		</section>
		</div>
		</form>
  );
};