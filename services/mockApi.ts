
import { BATTLES } from '../constants';
import { Battle, UserProfile } from '../types';

const SLEEP = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DB_KEYS = {
    USER_PROGRESS: 'st_lab_user_progress',
    IS_LOGGED_IN: 'st_lab_auth_status',
};

const GUEST_USER: UserProfile = {
    name: '战术访客',
    rank: '初级观察员',
    avatar: '',
    tacticsMastered: 0,
    battlesAnalyzed: 0,
    learningProgress: 0,
    joinDate: '今日',
    isGuest: true
};

const AUTH_USER: UserProfile = {
    name: '分析师零号',
    rank: '高级战术研究员',
    avatar: '',
    tacticsMastered: 24,
    battlesAnalyzed: 89,
    learningProgress: 85,
    joinDate: '2023-10-12',
    isGuest: false
};

export const mockApi = {
    fetchBattles: async (): Promise<Battle[]> => {
        await SLEEP(800);
        return BATTLES;
    },

    fetchUserProfile: async (): Promise<UserProfile> => {
        await SLEEP(600);
        const isLoggedIn = localStorage.getItem(DB_KEYS.IS_LOGGED_IN) === 'true';
        if (!isLoggedIn) return GUEST_USER;

        const savedProgress = localStorage.getItem(DB_KEYS.USER_PROGRESS);
        if (savedProgress) {
            return { ...AUTH_USER, ...JSON.parse(savedProgress) };
        }
        return AUTH_USER;
    },

    login: async (): Promise<UserProfile> => {
        await SLEEP(1500); // 模拟身份验证
        localStorage.setItem(DB_KEYS.IS_LOGGED_IN, 'true');
        return AUTH_USER;
    },

    logout: async () => {
        await SLEEP(400);
        localStorage.removeItem(DB_KEYS.IS_LOGGED_IN);
    },

    updateUserProgress: async (battleId: string) => {
        await SLEEP(300);
        const current = localStorage.getItem(DB_KEYS.USER_PROGRESS);
        const progress = current ? JSON.parse(current) : { battlesAnalyzed: 0 };
        progress.battlesAnalyzed += 1;
        localStorage.setItem(DB_KEYS.USER_PROGRESS, JSON.stringify(progress));
        return progress;
    }
};
