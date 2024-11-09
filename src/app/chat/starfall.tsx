import React, { Component } from 'react';
import style from '../../styles/staranimation.module.css'

// 星の型を定義
interface Star {
    id: number;
    left: number;
}

interface State {
    stars: Star[];
}

class StarFall extends Component<{}, State> {
    private maxStars: number = 100; // 画面上に表示される星の最大数
    private interval: number | undefined;

    constructor(props: {}) {
        super(props);
        this.state = {
            stars: []
        };
    }

    componentDidMount() {
        this.interval = window.setInterval(this.addStar, 150); // 150ミリ秒ごとに新しい星を追加
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval); // コンポーネントのアンマウント時にインターバルをクリア
        }
    }

    addStar = () => {
        const newStar: Star = {
            id: Math.random(), // 星に一意のIDを割り当てる
            left: Math.random() * window.innerWidth // 画面の横幅に基づいてランダムな位置を生成
        };
        this.setState(prevState => ({
            stars: [...prevState.stars, newStar].slice(-this.maxStars) // 新しい星を追加し、古い星を削除して最大数を保持
        }));
    }

    render() {
        return (
            <div className={style.sky}>
                {this.state.stars.map(star => (
                    <div
                        key={star.id}
                        className={style.star}
                        style={{ left: `${star.left}px` }}
                    />
                ))}
            </div>
        );
    }
}

export default StarFall;
