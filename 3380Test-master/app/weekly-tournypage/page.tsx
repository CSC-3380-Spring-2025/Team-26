'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HeaderALog from '../components/headerALog';

type Post = {
  id: string;
  meal: string;
  restaurant: string;
  likes: number;
};

async function getTop16Posts(): Promise<Post[]> {
  const q = query(collection(db, 'posts'), orderBy('likes', 'desc'), limit(16));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }));

  // Shuffle the posts randomly
  for (let i = posts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [posts[i], posts[j]] = [posts[j], posts[i]];
  }

  return posts;
}

export default function WeeklyTournamentPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<Record<number, string>>({});
  const [selectedRight, setSelectedRight] = useState<Record<number, string>>({});

  useEffect(() => {
    getTop16Posts().then(setPosts);
  }, []);

  const leftSide = posts.slice(0, 8);
  const rightSide = posts.slice(8, 16);

  const handleSelect = (side: 'left' | 'right', pairIndex: number, postId: string) => {
    if (side === 'left') {
      setSelectedLeft(prev => ({ ...prev, [pairIndex]: postId }));
    } else {
      setSelectedRight(prev => ({ ...prev, [pairIndex]: postId }));
    }
  };

  const renderMatchup = (
    side: 'left' | 'right',
    postA: Post,
    postB: Post,
    pairIndex: number,
    selectedId: string | undefined
  ) => (
    <div className={`flex flex-col space-y-2 ${side === 'left' ? 'items-end' : 'items-start'}`}>
      {[postA, postB].map((post) => (
        <button
          key={post.id}
          onClick={() => handleSelect(side, pairIndex, post.id)}
          className={`border w-48 px-4 py-2 rounded text-left shadow ${
            selectedId === post.id
              ? 'bg-green-100 border-green-500'
              : 'bg-white border-gray-300 hover:bg-gray-100'
          }`}
        >
          <div className="font-semibold">{post.meal}</div>
          <div className="text-sm text-gray-500">{post.restaurant}</div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderALog />

      <main className="p-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-black">Weekly Tournament</h1>
        <p className="text-center text-gray-600 mb-8">
          Pick a winner for each matchup to advance to the next round.
        </p>

        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left side */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, i) => {
              const postA = leftSide[i * 2];
              const postB = leftSide[i * 2 + 1];
              if (!postA || !postB) return null;
              return renderMatchup('left', postA, postB, i, selectedLeft[i]);
            })}
          </div>

          {/* Center */}
          <div className="flex flex-col justify-center items-center text-xl font-semibold text-gray-600">
            <div className="text-5xl mb-4">🏆</div>
            <div>Winner</div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, i) => {
              const postA = rightSide[i * 2];
              const postB = rightSide[i * 2 + 1];
              if (!postA || !postB) return null;
              return renderMatchup('right', postA, postB, i, selectedRight[i]);
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
