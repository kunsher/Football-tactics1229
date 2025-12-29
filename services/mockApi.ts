
import { BATTLES } from '../constants';
import { Battle, UserProfile } from '../types';

// 动态响应波动模拟
const getDynamicDelay = (min: number, max: number) => min + Math.random() * (max - min);
const SLEEP = (ms: number) => new Promise(resolve => setTimeout(resolve, getDynamicDelay(ms, ms + 400)));

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
    tacticsMastered: 42,
    battlesAnalyzed: 128,
    learningProgress: 92,
    joinDate: '2023-10-12',
    isGuest: false
};

export const mockApi = {
    fetchBattles: async (): Promise<Battle[]> => {
        await SLEEP(400);
        return BATTLES;
    },

    fetchUserProfile: async (): Promise<UserProfile> => {
        await SLEEP(300);
        const isLoggedIn = localStorage.getItem(DB_KEYS.IS_LOGGED_IN) === 'true';
        
        const savedProgress = localStorage.getItem(DB_KEYS.USER_PROGRESS);
        const progress = savedProgress ? JSON.parse(savedProgress) : { battlesAnalyzed: 0 };

        if (!isLoggedIn) {
            return { ...GUEST_USER, battlesAnalyzed: progress.battlesAnalyzed };
        }

        return { 
            ...AUTH_USER, 
            battlesAnalyzed: AUTH_USER.battlesAnalyzed + progress.battlesAnalyzed 
        };
    },

    login: async (): Promise<UserProfile> => {
        await SLEEP(1200); 
        localStorage.setItem(DB_KEYS.IS_LOGGED_IN, 'true');
        
        // 模拟数据迁移日志
        const savedProgress = JSON.parse(localStorage.getItem(DB_KEYS.USER_PROGRESS) || '{"battlesAnalyzed": 0}');
        console.group("Tactical Sync Hub");
        console.log("Status: Connection Established.");
        console.log("Action: Deep-merging local session data...");
        console.log(`Payload: ${savedProgress.battlesAnalyzed} records found.`);
        console.groupEnd();

        return { 
            ...AUTH_USER, 
            battlesAnalyzed: AUTH_USER.battlesAnalyzed + savedProgress.battlesAnalyzed 
        };
    },

    logout: async () => {
        await SLEEP(250);
        localStorage.removeItem(DB_KEYS.IS_LOGGED_IN);
    },

    updateUserProgress: async (battleId: string) => {
        await SLEEP(150);
        const current = localStorage.getItem(DB_KEYS.USER_PROGRESS);
        const progress = current ? JSON.parse(current) : { battlesAnalyzed: 0 };
        progress.battlesAnalyzed += 1;
        localStorage.setItem(DB_KEYS.USER_PROGRESS, JSON.stringify(progress));
        return progress;
    }
};
