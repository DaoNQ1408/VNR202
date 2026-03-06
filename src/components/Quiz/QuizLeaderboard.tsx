import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Clock, Medal, Loader2 } from 'lucide-react';
import { QuizService } from '../../services/quizService';
import type { HighScore } from '../../types/quiz';

interface QuizLeaderboardProps {
    quizId?: string; // reserved for future multi-quiz support
}

const MEDAL_COLORS = [
    'text-yellow-400', // 🥇 Gold
    'text-gray-400',   // 🥈 Silver
    'text-amber-600',  // 🥉 Bronze
    'text-blue-400',
    'text-purple-400',
];

const RANK_BG = [
    'from-yellow-50 to-yellow-100 border-yellow-200',
    'from-gray-50 to-gray-100 border-gray-200',
    'from-amber-50 to-amber-100 border-amber-200',
    'from-blue-50 to-blue-100 border-blue-200',
    'from-purple-50 to-purple-100 border-purple-200',
];

const RANK_ICONS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    return `${m}p ${s}s`;
}

const QuizLeaderboard: React.FC<QuizLeaderboardProps> = () => {
    const [open, setOpen] = useState(false);
    const [scores, setScores] = useState<HighScore[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to real-time updates from Firestore
        const unsubscribe = QuizService.subscribeToHighScores((newScores) => {
            setScores(newScores);
            setLoading(false);
        }, 5);

        return () => unsubscribe();
    }, []);

    return (
        <>
            {/* ── Floating Button ── */}
            <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold text-sm select-none"
                style={{ boxShadow: '0 4px 24px rgba(220,38,38,0.45)' }}
            >
                <Trophy className="w-5 h-5 flex-shrink-0" />
                <span>Bảng Điểm</span>
                {/* Live dot */}
                <span className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse inline-block" />
                    Live
                </span>
            </motion.button>

            {/* ── Modal Overlay ── */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Panel */}
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            className="fixed z-50 inset-x-4 bottom-6 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 max-h-[80vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-red-600 to-yellow-500 px-5 py-4 flex items-center justify-between flex-shrink-0">
                                <div>
                                    <h2 className="text-white font-bold text-lg flex items-center gap-2">
                                        <Trophy className="w-5 h-5" />
                                        Top 5 Bảng Điểm
                                    </h2>
                                    <p className="text-white/70 text-xs mt-0.5">Cập nhật theo thời gian thực</p>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center flex-shrink-0"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="bg-white flex-1 overflow-y-auto">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                        <Loader2 className="w-8 h-8 animate-spin text-red-400" />
                                        <p className="text-sm">Đang tải bảng điểm...</p>
                                    </div>
                                ) : scores.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                        <Trophy className="w-10 h-10 text-gray-200" />
                                        <p className="text-sm font-medium">Chưa có người chơi nào</p>
                                        <p className="text-xs text-gray-300">Hãy là người đầu tiên!</p>
                                    </div>
                                ) : (
                                    <ul className="p-4 space-y-3">
                                        {scores.map((entry, index) => (
                                            <motion.li
                                                key={entry.id ?? index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.06 }}
                                                className={`flex items-center gap-3 p-3 rounded-xl border bg-gradient-to-r ${RANK_BG[index] ?? 'from-gray-50 to-white border-gray-100'}`}
                                            >
                                                {/* Rank icon */}
                                                <span className="text-2xl w-8 text-center flex-shrink-0">
                                                    {RANK_ICONS[index]}
                                                </span>

                                                {/* Name + stats */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-gray-900 truncate text-sm">
                                                        {entry.userName}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                                                        <Clock className="w-3 h-3 flex-shrink-0" />
                                                        <span>{formatTime(entry.timeSpent)}</span>
                                                        <span>·</span>
                                                        <span>{entry.score}/{entry.totalQuestions} câu đúng</span>
                                                    </div>
                                                </div>

                                                {/* Percentage badge */}
                                                <div className="flex-shrink-0 text-right">
                                                    <span
                                                        className={`text-xl font-extrabold ${MEDAL_COLORS[index] ?? 'text-gray-400'}`}
                                                    >
                                                        {entry.percentage}%
                                                    </span>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}

                                {/* Legend */}
                                <div className="px-5 pb-4 text-center">
                                    <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                        <Medal className="w-3 h-3" />
                                        Cùng điểm → thời gian nhanh hơn xếp cao hơn
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default QuizLeaderboard;
