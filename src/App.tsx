import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Bot, Radio, Users, User, ExternalLink, Globe } from 'lucide-react';
import { translations, Language } from './translations';

// Extend Window interface for Telegram WebApp
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}

const BOTS = [
  { name: "Cherry KO", username: "Cherry_KoBot", image: "https://firebasestorage.googleapis.com/v0/b/fire-applet-prod.firebasestorage.app/o/artifacts%2FiS5hI5t83fWpC7sZtH7f.png?alt=media" },
  { name: "Debby_Yoixx", username: "Debby_YoixxBot", image: "https://firebasestorage.googleapis.com/v0/b/fire-applet-prod.firebasestorage.app/o/artifacts%2FS2eL2y89kL0eD5fG2hJ4.png?alt=media" },
  { name: "Nwe Friends", username: "leomatch_globalbot", image: "https://firebasestorage.googleapis.com/v0/b/fire-applet-prod.firebasestorage.app/o/artifacts%2FgJ0nN0r9mK3uO7sP6dJ8.png?alt=media" },
  { name: "Victoria", username: "Victoria_MMBot", image: "https://firebasestorage.googleapis.com/v0/b/fire-applet-prod.firebasestorage.app/o/artifacts%2FF0cE0r84uM2uO7sP6dJ8.png?alt=media" },
  { name: "Group Card", username: "Groups2026Bot", image: "https://firebasestorage.googleapis.com/v0/b/fire-applet-prod.firebasestorage.app/o/artifacts%2FmS2eL2y89kL0eD5fG2hJ4.png?alt=media" },
  { name: "TikTok Video", username: "TikTok_Download_2026Bot", image: "https://firebasestorage.googleapis.com/v0/b/fire-applet-prod.firebasestorage.app/o/artifacts%2FkS1hI5t83fWpC7sZtH7f.png?alt=media" }
];

const CHANNELS = [
  { name: "𝐒𝐭𝐚𝐫𝐝𝐮𝐬𝐭 𝐋𝐨𝐯𝐞 ᰔ", link: "https://t.me/Stardust_Love2026", desc: "Channel" },
  { name: "𝐂𝐡𝐞𝐫𝐫𝐲 𝐒𝐭𝐨𝐫𝐲 ❀", link: "https://t.me/Cherry_Story_Story2026", desc: "Story Channel" },
  { name: "𝐋𝐮𝐦𝐢𝐧𝐨𝐮𝐬 𝐥𝐨𝐯𝐞 ᰔ", link: "https://t.me/Cute_Couple_pf_2026", desc: "Premium Profile Channel" }
];

const GROUPS = [
  { name: "𝐌𝐢𝐝𝐧𝐢𝐠𝐡𝐭 𝐂𝐫𝐞𝐰 𝐅𝐚𝐦𝐢𝐥𝐲🌌", link: "https://t.me/Midnight_Crew_Family" },
  { name: "𝐇𝐞𝐚𝐫𝐭𝐨𝐩𝐢𝐚", link: "https://t.me/HeartopiaGroups" },
  { name: "𝐓𝐡𝐞 𝐁𝐨𝐭 𝐁𝐚𝐫 𝐅𝐚𝐦𝐢𝐥𝐲 🌸", link: "https://t.me/Cherry_Ko_official" },
  { name: "𝐌𝐲 𝐃𝐚𝐲 𝐅𝐚𝐦𝐢𝐥𝐲", link: "https://t.me/MyDayFamily" }
];

type View = 'home' | 'bots' | 'channels' | 'groups' | 'profile';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);

  const t = translations[lang];

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user) setTgUser(user);
    }
  }, []);

  const openLink = (url: string) => {
    window.location.href = url;
  };

  const navItems = [
    { id: 'bots', icon: Bot, label: t.bots },
    { id: 'channels', icon: Radio, label: t.channels },
    { id: 'groups', icon: Users, label: t.groups },
    { id: 'profile', icon: User, label: t.myProfile },
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-sky-500 text-white select-none overflow-hidden">
      
      {/* Background blobs for 3D effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-400/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="glass relative z-20 px-4 py-3 flex items-center justify-between mx-3 mt-3 rounded-2xl">
        <button onClick={() => setView('home')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold">D</div>
          <span className="font-black text-xl tracking-tighter">DENSTAR1K</span>
        </button>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-xl bg-white/5 active:scale-90 transition-transform"
        >
          <Globe size={20} className={isMenuOpen ? "text-purple-400" : "text-white"} />
        </button>
      </header>

      {/* Language Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="glass w-full max-w-xs p-3 rounded-3xl relative z-10">
              <div className="flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
                {(Object.keys(translations) as Language[]).map((l) => (
                  <button
            key={l}
            onClick={() => { setLang(l); setIsMenuOpen(false); }}
            className={`w-full p-4 rounded-2xl text-left transition-colors flex items-center justify-between ${lang === l ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}
          >
            <span className="font-bold uppercase tracking-wider text-sm">
              {l === 'en' ? 'English' : 
               l === 'my' ? 'မြန်မာစာ' : 
               l === 'ru' ? 'Русский' : 
               l === 'zh' ? '中文' : 
               l === 'es' ? 'Español' :
               l === 'fr' ? 'Français' :
               l === 'de' ? 'Deutsch' :
               l === 'it' ? 'Italiano' :
               l === 'pt' ? 'Português' :
               l === 'ja' ? '日本語' :
               l === 'ko' ? '한국어' :
               l === 'ar' ? 'العربية' :
               l === 'hi' ? 'हिन्दी' :
               l === 'bn' ? 'বাংলা' :
               l === 'vi' ? 'Tiếng Việt' :
               l === 'th' ? 'ไทย' :
               l === 'id' ? 'Bahasa Indonesia' :
               l === 'tr' ? 'Türkçe' :
               l === 'el' ? 'Ελληνικά' :
               l === 'nl' ? 'Nederlands' :
               l === 'sv' ? 'Svenska' :
               l === 'pl' ? 'Polski' :
               l === 'fa' ? 'فارسی' :
               l === 'he' ? 'עברית' :
               l === 'uk' ? 'Українська' :
               l === 'ms' ? 'Bahasa Melayu' :
               'Română'}
            </span>
            {lang === l && <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
          </button>
        ))}
      </div>
    </div>
  </motion.div>
)}
</AnimatePresence>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-3 pt-4 pb-32 custom-scrollbar">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 pt-4"
            >
              <div className="glass-card p-6 rounded-[30px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl -mr-16 -mt-16" />
                <h2 className="text-xl font-bold mb-3 leading-snug bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {t.welcome.split('.')[0]}.
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {t.welcome.split('.').slice(1).join('.')}
                </p>
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 italic">
                  <p className="text-purple-400">@debb_yoixx • <span className="text-white/40">{t.owner}</span></p>
                  <p className="text-blue-400">@RuleNo001 • <span className="text-white/40">{t.coOwner}</span></p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'bots' && (
            <motion.div
              key="bots"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-2 gap-4"
            >
              {BOTS.map((bot) => (
                <div 
                  key={bot.username}
                  onClick={() => openLink(`https://t.me/${bot.username}`)}
                  className="glass-card p-5 rounded-[32px] flex flex-col items-center gap-4 active:scale-95 transition-transform group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 p-1 border border-white/10 group-hover:border-purple-500/50 transition-colors overflow-hidden">
                    <img 
                      src={bot.image || `https://api.dicebear.com/7.x/shapes/svg?seed=${bot.name}`} 
                      className="w-full h-full object-cover rounded-xl" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div className="text-center w-full">
                    <p className="font-bold text-sm truncate">{bot.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Visit Bot</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {view === 'channels' && (
            <motion.div
              key="channels"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {CHANNELS.map((ch) => (
                <div 
                  key={ch.link}
                  onClick={() => openLink(ch.link)}
                  className="glass-card p-6 rounded-[32px] flex items-center justify-between active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <Radio size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{ch.name}</h3>
                      <p className="text-sm text-white/40">{ch.desc}</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-white/20" />
                </div>
              ))}
            </motion.div>
          )}

          {view === 'groups' && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {GROUPS.map((gr) => (
                <div 
                  key={gr.link}
                  onClick={() => openLink(gr.link)}
                  className="glass-card p-6 rounded-[32px] flex items-center justify-between active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Users size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">{gr.name}</h3>
                      <p className="text-sm text-white/40">Community Group</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-white/20 ml-2" />
                </div>
              ))}
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 flex flex-col items-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="w-40 h-40 rounded-[48px] glass p-2 relative z-10 overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={tgUser?.photo_url || `https://api.dicebear.com/7.x/big-smile/svg?seed=${tgUser?.first_name || 'User'}`} 
                    alt="User"
                    className="w-full h-full object-cover rounded-[40px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <h2 className="text-2xl font-black mb-1">{tgUser?.first_name || 'Anonymous'}</h2>
                <p className="text-white/60 font-medium">@{tgUser?.username || 'user'}</p>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 max-w-sm mt-4">
                <div className="glass-card p-5 rounded-3xl text-center">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Status</p>
                  <p className="font-bold text-sm truncate">Verified User</p>
                </div>
                <div className="glass-card p-5 rounded-3xl text-center">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Account ID</p>
                  <p className="font-bold text-sm truncate">{tgUser?.id || '---'}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-6 left-6 right-6 z-40">
        <div className="glass p-2 rounded-[32px] flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as View)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 nav-active rounded-2xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={20} className="relative z-10" />
                <span className="relative z-10 text-[9px] font-bold uppercase tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
