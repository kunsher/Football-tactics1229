
import { BATTLES } from '../constants';
import { Battle, UserProfile } from '../types';

const getDynamicDelay = (min: number, max: number) => min + Math.random() * (max - min);
const SLEEP = (ms: number) => new Promise(resolve => setTimeout(resolve, getDynamicDelay(ms, ms + 400)));

const DB_KEYS = {
    USER_DB: 'st_lab_user_db', // 模拟用户数据库
    CURRENT_USER: 'st_lab_current_session',
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

// 默认预设用户
const DEFAULT_USER = {
    username: 'admin',
    password: 'password123',
    profile: {
        name: '分析师零号',
        rank: '高级战术研究员',
        avatar: '',
        tacticsMastered: 42,
        battlesAnalyzed: 128,
        learningProgress: 92,
        joinDate: '2023-10-12',
        isGuest: false
    }
};

const getDB = () => {
    const db = localStorage.getItem(DB_KEYS.USER_DB);
    return db ? JSON.parse(db) : [DEFAULT_USER];
};

export const mockApi = {
    fetchBattles: async (): Promise<Battle[]> => {
        await SLEEP(400);
        return BATTLES;
    },

    fetchUserProfile: async (): Promise<UserProfile> => {
        await SLEEP(300);
        const isLoggedIn = localStorage.getItem(DB_KEYS.IS_LOGGED_IN) === 'true';
        const sessionUser = localStorage.getItem(DB_KEYS.CURRENT_USER);
        
        if (!isLoggedIn || !sessionUser) {
            return GUEST_USER;
        }

        return JSON.parse(sessionUser);
    },

    login: async (username: string, password: string): Promise<UserProfile> => {
        await SLEEP(1200);
        const db = getDB();
        const user = db.find((u: any) => u.username === username && u.password === password);

        if (!user) {
            throw new Error('凭据无效，请检查账号密码');
        }

        localStorage.setItem(DB_KEYS.IS_LOGGED_IN, 'true');
        localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user.profile));
        return user.profile;
    },

    register: async (username: string, password: string, name: string): Promise<UserProfile> => {
        await SLEEP(1500);
        const db = getDB();
        if (db.some((u: any) => u.username === username)) {
            throw new Error('该账号已被占用');
        }

        const newProfile: UserProfile = {
            name: name,
            rank: '见习分析师',
            avatar: '',
            tacticsMastered: 0,
            battlesAnalyzed: 0,
            learningProgress: 5,
            joinDate: new Date().toISOString().split('T')[0],
            isGuest: false
        };

        db.push({ username, password, profile: newProfile });
        localStorage.setItem(DB_KEYS.USER_DB, JSON.stringify(db));
        
        // 自动登录
        localStorage.setItem(DB_KEYS.IS_LOGGED_IN, 'true');
        localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(newProfile));
        return newProfile;
    },

    updateProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
        await SLEEP(500);
        const sessionUser = localStorage.getItem(DB_KEYS.CURRENT_USER);
        if (!sessionUser) throw new Error('未登录');

        const currentProfile = JSON.parse(sessionUser);
        const updatedProfile = { ...currentProfile, ...updates };
        
        localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(updatedProfile));
        return updatedProfile;
    },

    logout: async () => {
        await SLEEP(250);
        localStorage.removeItem(DB_KEYS.IS_LOGGED_IN);
        localStorage.removeItem(DB_KEYS.CURRENT_USER);
    },

    updateUserProgress: async (battleId: string) => {
        await SLEEP(150);
        const sessionUser = localStorage.getItem(DB_KEYS.CURRENT_USER);
        if (sessionUser) {
            const profile = JSON.parse(sessionUser);
            profile.battlesAnalyzed += 1;
            profile.learningProgress = Math.min(100, profile.learningProgress + 2);
            localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(profile));
            return profile;
        }
        return null;
    }
};
