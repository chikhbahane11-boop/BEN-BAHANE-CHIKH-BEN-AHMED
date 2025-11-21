import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Scale, 
  ShieldCheck, 
  Building2, 
  Users2,
  Eye,
  EyeOff,
  MousePointerClick,
  HelpCircle,
  Play,
  XCircle,
  Trophy,
  Book,
  BookOpen,
  Lock,
  Unlock,
  Download,
  MessageCircle,
  BrainCircuit,
  Check,
  X,
  Lightbulb
} from 'lucide-react';
import { 
  NATIONAL_VS_INTL, 
  SOCIETY_COMPONENTS, 
  HISTORY_EVENTS, 
  SUBJECTS_DATA, 
  MODERN_EXAMPLES, 
  CLASSIFICATION_GAME_ITEMS,
  INTRO_STORY,
  GLOSSARY,
  THEORETICAL_SUMMARY,
  COMPONENT_ENRICHMENT,
  INTRO_ENRICHMENT,
  SUBJECTS_ENRICHMENT,
  MODERN_ENRICHMENT,
  REVIEW_CONTENT,
  INTRO_DEEP_DIVE,
  COMPONENTS_DEEP_DIVE,
  SUBJECTS_DEEP_DIVE,
  MODERN_DEEP_DIVE
} from '../constants';
import { LockedQuestion } from '../types';

// --- Helper: Text with Glossary ---
const GlossaryText: React.FC<{ text: string }> = ({ text }) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const terms = Object.keys(GLOSSARY);
  const regex = new RegExp(`(${terms.join('|')})`, 'g');
  
  const parts = text.split(regex);

  return (
    <>
      <span className="leading-relaxed text-legal-800 whitespace-pre-line">
        {parts.map((part, i) => {
          if (GLOSSARY[part]) {
            return (
              <span 
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveTerm(part); }}
                className="highlight-term px-1 rounded bg-yellow-50 text-legal-900 font-bold border-b-2 border-gold-500 cursor-pointer hover:bg-gold-100 transition-colors inline-block"
                title="اضغط للتعريف"
              >
                {part}
              </span>
            );
          }
          return part;
        })}
      </span>

      {/* Glossary Modal */}
      {activeTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setActiveTerm(null)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-fade-in border-t-4 border-gold-500" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-legal-900 flex items-center gap-2">
                <Book size={20} className="text-gold-500" />
                {activeTerm}
              </h3>
              <button onClick={() => setActiveTerm(null)}><XCircle className="text-legal-400 hover:text-red-500" /></button>
            </div>
            <p className="text-legal-600 text-lg leading-relaxed">{GLOSSARY[activeTerm]}</p>
          </div>
        </div>
      )}
    </>
  );
};

// --- Helper: Handout Excerpt Box ---
const HandoutBox: React.FC<{ content: string, source?: string }> = ({ content, source }) => (
  <div className="my-8 bg-legal-50 border-r-4 border-legal-400 p-6 rounded-lg shadow-inner relative overflow-hidden">
    <div className="absolute top-0 left-0 opacity-5">
      <Book size={100} />
    </div>
    <h4 className="text-sm font-bold text-legal-500 mb-2 flex items-center gap-2">
      <Book size={16} />
      مقتطف من المرجع (لإثراء المعرفة)
    </h4>
    <p className="text-legal-800 italic font-medium relative z-10">"{content}"</p>
    {source && <span className="block text-left text-xs text-legal-400 mt-2">{source}</span>}
  </div>
);

// --- Reusable Teacher Locked Panel ---
const TeacherLockedPanel: React.FC<{ title?: string, questions: LockedQuestion[] }> = ({ title = "أسئلة التفكير العميق", questions }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'omar2016') {
      setIsLocked(false);
      setShowPassword(false);
      setError('');
    } else {
      setError('كلمة المرور خاطئة');
    }
  };

  return (
    <div className="mt-8 border border-legal-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-legal-50 to-white p-4 border-b border-legal-100 flex justify-between items-center">
        <h3 className="font-bold text-legal-800 flex items-center gap-2">
          <BrainCircuit className="text-gold-500" size={20} />
          {title}
        </h3>
        <button 
          onClick={() => isLocked ? setShowPassword(true) : setIsLocked(true)}
          className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 transition-colors ${isLocked ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
        >
          {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
          {isLocked ? 'مغلق (للأستاذ)' : 'مفتوح للنقاش'}
        </button>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        {questions.map((q, i) => (
          <div key={i} className="mb-6 last:mb-0">
            <div className="flex items-start gap-3 mb-3">
              <span className={`shrink-0 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider ${q.type === 'critical' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                {q.type === 'critical' ? 'تحليل' : 'فهم'}
              </span>
              <h4 className="font-bold text-legal-900 text-lg leading-snug">{q.question}</h4>
            </div>
            
            <div className="relative mr-2 pr-4 border-r-2 border-legal-200">
              <div className={`transition-all duration-700 ${isLocked ? 'blur-md select-none opacity-40' : 'blur-0 opacity-100'}`}>
                <p className="text-legal-600 leading-relaxed bg-legal-50 p-3 rounded-lg">
                  <span className="font-bold text-gold-600 ml-2">الإجابة:</span>
                  {q.modelAnswer}
                </p>
              </div>
              
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={() => setShowPassword(true)} className="bg-white shadow-md border border-legal-200 text-legal-500 px-4 py-2 rounded-full text-sm font-bold hover:text-gold-600 hover:border-gold-400 transition-all flex items-center gap-2">
                    <Lock size={14} />
                    كشف الإجابة النموذجية
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Password Modal */}
      {showPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setShowPassword(false)}>
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h4 className="font-bold text-center mb-4 text-legal-800">مصادقة الأستاذ</h4>
            <form onSubmit={handleUnlock}>
              <input 
                type="password" 
                autoFocus
                placeholder="الرمز السري"
                className="w-full text-center p-2 border rounded-lg mb-2 font-mono"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-legal-900 text-white py-2 rounded-lg font-bold">فتح</button>
                <button type="button" onClick={() => setShowPassword(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Introduction Section (Story & Warm-up) ---
export const IntroSection: React.FC = () => {
  const [showStoryReveal, setShowStoryReveal] = useState(false);
  const [warmUpWord, setWarmUpWord] = useState('');
  const [revealedRows, setRevealedRows] = useState<number[]>([]);

  const toggleRow = (idx: number) => {
    if (revealedRows.includes(idx)) return;
    setRevealedRows([...revealedRows, idx]);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Mental Warm-up */}
      <div className="bg-gradient-to-br from-legal-900 to-legal-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-gold-400">🧠 التهيئة الذهنية</h2>
          <p className="mb-4 text-lg">عندما تسمع كلمة "<span className="font-bold text-gold-200">المجتمع الدولي</span>"، ما هي أول كلمة تخطر ببالك؟</p>
          <div className="flex gap-4 max-w-md">
            <input 
              type="text" 
              value={warmUpWord}
              onChange={(e) => setWarmUpWord(e.target.value)}
              placeholder="اكتب كلمتك هنا... (مثلاً: الأمم المتحدة، فوضى، تعاون)"
              className="flex-1 px-4 py-2 rounded-lg text-legal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
          {warmUpWord && <p className="mt-4 text-gold-200 animate-fade-in">كلمة مثيرة! هل يعبر "{warmUpWord}" عن واقع مجتمعنا الدولي اليوم؟ لنكتشف معاً.</p>}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-legal-200 overflow-hidden">
        <div className="bg-blue-50 p-6 border-b border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <Globe className="text-blue-600" />
            {INTRO_STORY.title}
          </h3>
        </div>
        <div className="p-8">
          <GlossaryText text={INTRO_STORY.scenario} />
          
          <div className="my-6 bg-legal-50 p-4 rounded-xl">
            <p className="font-bold text-legal-700 mb-3">❓ تساؤلات للنقاش:</p>
            <ul className="list-disc list-inside space-y-2 text-legal-600">
              {INTRO_STORY.questions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>

          {!showStoryReveal ? (
            <button 
              onClick={() => setShowStoryReveal(true)}
              className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <HelpCircle size={20} />
              تحليل اللغز (الربط بالواقع)
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl animate-fade-in">
              <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <CheckCircle2 size={20} />
                التحليل:
              </h4>
              <GlossaryText text={INTRO_STORY.answer} />
            </div>
          )}
        </div>
      </div>

      <HandoutBox content={INTRO_ENRICHMENT.content} source={INTRO_ENRICHMENT.sourcePage} />

      {/* Comparison Table */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-legal-800 flex items-center gap-2">
            <Scale className="text-gold-600" />
            مقارنة جوهرية: مجتمع الدولة vs المجتمع الدولي
          </h3>
          <button 
            onClick={() => setRevealedRows(NATIONAL_VS_INTL.map((_, i) => i))}
            className="text-sm text-gold-600 font-bold hover:underline"
          >
             كشف الكل
          </button>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-legal-200 shadow-sm">
          <table className="w-full text-right">
            <thead className="bg-legal-50">
              <tr>
                <th className="p-4 text-legal-700 font-bold w-1/4">المعيار</th>
                <th className="p-4 text-legal-900 font-bold bg-white/50 w-1/3">المجتمع الداخلي (الوطني)</th>
                <th className="p-4 text-legal-900 font-bold text-blue-900 bg-blue-50/50">المجتمع الدولي (اضغط للكشف)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legal-100 bg-white">
              {NATIONAL_VS_INTL.map((row, idx) => {
                const isRevealed = revealedRows.includes(idx);
                return (
                  <tr 
                    key={idx} 
                    className="hover:bg-legal-50 transition-colors cursor-pointer group"
                    onClick={() => toggleRow(idx)}
                  >
                    <td className="p-4 font-semibold text-legal-500">{row.criteria}</td>
                    <td className="p-4 text-legal-700"><GlossaryText text={row.national} /></td>
                    <td className="p-4 relative">
                      <div className={`transition-all duration-500 ${isRevealed ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}>
                        <GlossaryText text={row.international} />
                      </div>
                      {!isRevealed && <div className="absolute inset-0 flex items-center justify-center text-legal-400 text-sm">اضغط للكشف</div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Locked Panel for Intro */}
      <TeacherLockedPanel questions={INTRO_DEEP_DIVE} />
    </div>
  );
};

// --- Components Section ---
export const ComponentsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="space-y-8">
       <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gold-500 mb-6">
        <p className="text-legal-700 text-lg font-medium">
          لإطلاق مصطلح "مجتمع دولي" على أي تجمع، يجب توفر 4 أركان (مقومات) لا غنى عنها. غياب أحدها يعني انتفاء صفة المجتمع الدولي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOCIETY_COMPONENTS.map((comp, idx) => {
          const isActive = activeCard === idx;
          return (
            <div 
              key={idx} 
              onClick={() => setActiveCard(isActive ? null : idx)}
              className={`
                relative p-6 rounded-xl shadow-sm cursor-pointer transition-all duration-500 border overflow-hidden group
                ${isActive 
                  ? 'bg-legal-900 text-white border-legal-900 row-span-2 shadow-xl transform scale-[1.02]' 
                  : 'bg-white text-legal-800 border-transparent hover:border-gold-500 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-gold-400' : 'text-legal-800'}`}>
                  {comp.title}
                </h3>
                <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
              </div>
              
              {/* Detailed Description */}
              <div className={`mb-4 leading-relaxed text-sm md:text-base ${isActive ? 'text-gray-200' : 'text-legal-600 line-clamp-3'}`}>
                 <GlossaryText text={comp.description} />
              </div>
              
              <div className={`transition-all duration-500 overflow-hidden ${isActive ? 'max-h-[500px] opacity-100 mt-6 pt-6 border-t border-legal-700' : 'max-h-0 opacity-0'}`}>
                <div className="mb-4">
                  <p className="text-sm font-bold text-gold-400 mb-2">أمثلة تطبيقية:</p>
                  <div className="flex flex-wrap gap-2">
                    {comp.examples.map((ex, i) => (
                      <span key={i} className="text-xs bg-legal-700 px-2 py-1 rounded text-gray-200 border border-legal-600">{ex}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gold-400 font-medium bg-legal-800 p-3 rounded-lg">
                  <Globe size={16} />
                  <span>مثال واقعي: {comp.realWorld}</span>
                </div>
              </div>
              {!isActive && (
                <div className="mt-4 text-xs text-gold-600 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  انقر لقراءة الشرح التفصيلي <ArrowRight size={12} className="rotate-180" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <HandoutBox content={COMPONENT_ENRICHMENT.content} source={COMPONENT_ENRICHMENT.sourcePage} />
      <TeacherLockedPanel questions={COMPONENTS_DEEP_DIVE} />
    </div>
  );
};

// --- History Section ---
export const HistorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Local state for Quiz Lock only (TeacherLockedPanel handles the discussion questions)
  const [isQuizLocked, setIsQuizLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const activeEvent = HISTORY_EVENTS[activeTab];

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setShowQuiz(false);
    setSelectedOption(null);
    setQuizFeedback(null);
  };

  const handleQuizAnswer = (optIdx: number) => {
    if (quizFeedback) return;
    setSelectedOption(optIdx);
    setQuizFeedback(optIdx === activeEvent.quiz.correctIndex ? 'correct' : 'incorrect');
  };

  const handleUnlockQuiz = () => {
    if (passwordInput === 'omar2016') {
      setIsQuizLocked(false);
      setShowPasswordModal(false);
      setPasswordInput('');
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {HISTORY_EVENTS.map((event, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === idx
                ? 'bg-legal-800 text-white shadow-lg scale-105'
                : 'bg-white text-legal-500 hover:bg-legal-50 border border-legal-200'
            }`}
          >
            <span>{event.icon}</span>
            {event.civilization}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-legal-200 overflow-hidden flex-1 flex flex-col relative transition-all duration-300">
        <div className={`p-8 flex-1 ${showQuiz ? 'blur-sm opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-gold-600 font-bold tracking-wider text-sm uppercase">{activeEvent.period}</span>
                <h2 className="text-3xl font-bold text-legal-900 mt-1">{activeEvent.treatyName}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               {Object.entries(activeEvent.details).map(([key, val], i) => {
                 if (key === 'extraInfo') return null;
                 return (
                   <div key={i} className="bg-legal-50 p-4 rounded-lg border-r-2 border-legal-300">
                     <span className="text-xs text-legal-500 font-bold block mb-1 uppercase">
                       {key === 'parties' ? 'الأطراف' : key === 'topic' ? 'الموضوع' : 'الآلية/الحل'}
                     </span>
                     <p className="text-sm font-medium text-legal-800"><GlossaryText text={val} /></p>
                   </div>
                 );
               })}
            </div>

            {/* Detailed Breakdown */}
            {activeEvent.details.extraInfo && (
              <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-xl mb-8">
                 <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2"><BookOpen size={18}/> تفاصيل المحطة التاريخية</h4>
                 <GlossaryText text={activeEvent.details.extraInfo} />
              </div>
            )}

            {/* Milestones */}
            <div className="bg-legal-900 text-white rounded-xl p-6 mb-8 shadow-lg">
              <h4 className="font-bold text-gold-400 flex items-center gap-2 mb-4 text-lg">
                <Trophy size={20} />
                أهم المحطات والمبادئ المستخلصة
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeEvent.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 shrink-0" />
                    <span className="text-sm font-medium leading-relaxed">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Replaced custom locked section with generic component if questions exist */}
            {activeEvent.discussionQuestions && (
               <TeacherLockedPanel title="مناقشة تاريخية معمقة" questions={activeEvent.discussionQuestions} />
            )}

            {activeEvent.enrichment && (
              <HandoutBox content={activeEvent.enrichment} source="د. إسالمة محمد أمين - المطبوعة الجامعية" />
            )}
        </div>

        {/* Quiz Start Button */}
        {!showQuiz && (
          <div className="absolute bottom-8 left-8 z-10">
            <button 
              onClick={() => isQuizLocked ? setShowPasswordModal(true) : setShowQuiz(true)}
              className={`
                px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 transition-all transform hover:scale-105
                ${isQuizLocked 
                  ? 'bg-gray-400 text-white opacity-90' 
                  : 'bg-gold-500 hover:bg-gold-600 text-white animate-pulse'
                }
              `}
            >
              {isQuizLocked ? <Lock size={20} /> : <HelpCircle size={20} />}
              {isQuizLocked ? 'اختبار المرحلة (مغلق)' : 'ابدأ الاختبار الآن'}
            </button>
          </div>
        )}

        {/* Quiz Modal */}
        {showQuiz && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 animate-fade-in">
             <div className="bg-white border border-legal-200 shadow-2xl rounded-2xl p-8 max-w-xl w-full relative">
                <button onClick={() => setShowQuiz(false)} className="absolute top-4 left-4 text-legal-400 hover:text-legal-600"><XCircle size={24} /></button>
                <h3 className="text-xl font-bold text-legal-900 mb-6 pr-8">سؤال: {activeEvent.quiz.question}</h3>
                <div className="space-y-3 mb-6">
                  {activeEvent.quiz.options.map((option, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === activeEvent.quiz.correctIndex;
                    let btnClass = "w-full text-right p-4 rounded-xl border-2 font-medium transition-all ";
                    
                    if (selectedOption === null) btnClass += "border-legal-100 hover:border-gold-500 hover:bg-legal-50";
                    else if (isCorrect) btnClass += "border-green-500 bg-green-50 text-green-800";
                    else if (isSelected) btnClass += "border-red-500 bg-red-50 text-red-800 opacity-60";
                    else btnClass += "border-legal-100 opacity-50";

                    return (
                      <button key={i} disabled={selectedOption !== null} onClick={() => handleQuizAnswer(i)} className={btnClass}>
                        <div className="flex justify-between items-center">
                          <span>{option}</span>
                          {selectedOption !== null && isCorrect && <CheckCircle2 className="text-green-600" />}
                          {isSelected && !isCorrect && <XCircle className="text-red-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {quizFeedback && (
                  <div className={`p-4 rounded-lg text-sm ${quizFeedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <span className="font-bold block mb-1">{quizFeedback === 'correct' ? 'إجابة صحيحة!' : 'خطأ!'}</span>
                    {activeEvent.quiz.explanation}
                  </div>
                )}
             </div>
          </div>
        )}

        {/* Quiz Lock Modal */}
        {showPasswordModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
                <h3 className="font-bold text-lg mb-4 text-center flex items-center justify-center gap-2">
                  <Lock size={20} className="text-legal-800"/>
                  فتح الاختبار للطلاب
                </h3>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="الرمز السري"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-center"
                  autoFocus
                />
                <div className="flex gap-2">
                   <button onClick={handleUnlockQuiz} className="flex-1 bg-legal-900 text-white py-2 rounded-lg font-bold">فتح</button>
                   <button onClick={() => setShowPasswordModal(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg">إلغاء</button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Subjects Section ---
export const SubjectsSection: React.FC = () => {
  const [mode, setMode] = useState<'learn' | 'play'>('learn');
  const [score, setScore] = useState(0);
  const [gameIndex, setGameIndex] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{msg: string, correct: boolean} | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleGameChoice = (type: 'state' | 'org' | 'special') => {
    const item = CLASSIFICATION_GAME_ITEMS[gameIndex];
    const isCorrect = item.type === type;
    if (isCorrect) setScore(s => s + 1);
    setLastFeedback({ msg: isCorrect ? item.feedback : 'خطأ! حاول التذكر.', correct: isCorrect });
    
    setTimeout(() => {
      if (gameIndex < CLASSIFICATION_GAME_ITEMS.length - 1) {
        setGameIndex(g => g + 1);
        setLastFeedback(null);
      } else setIsFinished(true);
    }, 1500);
  };

  const resetGame = () => {
    setGameIndex(0);
    setScore(0);
    setIsFinished(false);
    setLastFeedback(null);
    setMode('learn');
  };

  if (mode === 'play') return (
    <div className="bg-legal-900 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center text-white relative overflow-hidden border-4 border-gold-500">
      {!isFinished ? (
        <>
          <div className="flex justify-between text-legal-400 mb-8 text-sm font-mono">
            <span>Item {gameIndex + 1}/{CLASSIFICATION_GAME_ITEMS.length}</span>
            <span>Score: {score}</span>
          </div>
          <h3 className="text-legal-300 mb-4">ما هو التصنيف القانوني لهذا الكيان؟</h3>
          <h2 className="text-4xl font-black mb-12">{CLASSIFICATION_GAME_ITEMS[gameIndex].name}</h2>
          
          {lastFeedback ? (
            <div className={`p-6 rounded-xl text-xl font-bold animate-bounce-in ${lastFeedback.correct ? 'bg-green-500' : 'bg-red-500'}`}>
              {lastFeedback.msg}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button onClick={() => handleGameChoice('state')} className="p-4 bg-legal-700 hover:bg-gold-500 rounded-xl font-bold transition-colors">دولة (شخص أصلي)</button>
              <button onClick={() => handleGameChoice('org')} className="p-4 bg-legal-700 hover:bg-gold-500 rounded-xl font-bold transition-colors">منظمة (شخص وظيفي)</button>
              <button onClick={() => handleGameChoice('special')} className="p-4 bg-legal-700 hover:bg-gold-500 rounded-xl font-bold transition-colors">وضع خاص</button>
            </div>
          )}
        </>
      ) : (
        <div className="py-8 animate-fade-in">
          <Trophy size={80} className="text-gold-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">انتهت اللعبة!</h2>
          <p className="text-xl mb-8">نتيجتك: {score} / {CLASSIFICATION_GAME_ITEMS.length}</p>
          <button onClick={resetGame} className="bg-gold-500 text-legal-900 px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">العودة للدرس</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SUBJECTS_DATA.map((subj, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-legal-600 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-legal-50 w-12 h-12 rounded-full flex items-center justify-center text-legal-800 mb-4">
              {idx === 0 ? <Building2 /> : idx === 1 ? <Users2 /> : <ShieldCheck />}
            </div>
            <h3 className="text-lg font-bold text-legal-900 mb-2"><GlossaryText text={subj.type} /></h3>
            <p className="text-sm text-legal-600 mb-4 h-12"><GlossaryText text={subj.desc} /></p>
            <div className="flex flex-wrap gap-2">
              {subj.elements.map((el, i) => <span key={i} className="text-xs border border-legal-200 px-2 py-1 rounded bg-white text-legal-500">{el}</span>)}
            </div>
          </div>
        ))}
      </div>
      
      <HandoutBox content={SUBJECTS_ENRICHMENT.content} source={SUBJECTS_ENRICHMENT.sourcePage} />
      
      <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-white flex items-center justify-between shadow-lg">
        <div>
          <h3 className="text-2xl font-bold mb-2">لعبة: خبير التصنيف الدولي</h3>
          <p className="opacity-90">اختبر قدرتك على التمييز بين أنواع أشخاص القانون الدولي.</p>
        </div>
        <button onClick={() => setMode('play')} className="bg-white text-gold-600 px-8 py-3 rounded-full font-bold hover:bg-legal-100 transition-colors shadow-md flex gap-2">
          <Play size={20} fill="currentColor" /> ابدأ التحدي
        </button>
      </div>

      <TeacherLockedPanel questions={SUBJECTS_DEEP_DIVE} />
    </div>
  );
};

// --- Modern Section ---
export const ModernConnectSection: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-8">
    <h3 className="text-2xl font-bold text-legal-900 mb-6 flex items-center gap-2">
      <Globe className="text-gold-500" />
      ربط الماضي بالحاضر
    </h3>
    <div className="grid gap-4 mb-8">
      {MODERN_EXAMPLES.map((item, i) => (
        <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-legal-50 rounded-lg border border-legal-100 hover:border-gold-400 transition-colors">
          <span className="font-bold text-legal-500">{item.old}</span>
          <ArrowRight className="text-legal-300 rotate-90 sm:rotate-180 my-2 sm:my-0" />
          <span className="font-bold text-legal-900 bg-white px-4 py-1 rounded shadow-sm w-full sm:w-auto text-center"><GlossaryText text={item.new} /></span>
        </div>
      ))}
    </div>
    <HandoutBox content={MODERN_ENRICHMENT.content} source={MODERN_ENRICHMENT.sourcePage} />
    <TeacherLockedPanel questions={MODERN_DEEP_DIVE} />
  </div>
);

// --- Review Section (NEW) ---
export const ReviewSection: React.FC = () => {
  const [revealedTF, setRevealedTF] = useState<number[]>([]);
  const [revealedNotes, setRevealedNotes] = useState<number[]>([]);

  // Locking state for Teacher Notes
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [pendingNoteIdx, setPendingNoteIdx] = useState<number | null>(null);

  const toggleReveal = (idx: number) => {
    setRevealedTF(prev => prev.includes(idx) ? prev : [...prev, idx]);
  };

  const handleNoteUnlockRequest = (idx: number) => {
    if (revealedNotes.includes(idx)) return;
    setPendingNoteIdx(idx);
    setShowPasswordModal(true);
  };

  const confirmUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'omar2016') {
      if (pendingNoteIdx !== null) {
        setRevealedNotes(prev => [...prev, pendingNoteIdx]);
      }
      closeModal();
    } else {
      alert('كلمة المرور خاطئة');
    }
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setPendingNoteIdx(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-lg mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 flex justify-center items-center gap-3">
          <MessageCircle size={32} />
          المراجعة والنقاش المفتوح
        </h2>
        <p className="opacity-90 text-lg">محطة لترسيخ المفاهيم وتبادل الآراء قبل الختام</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* True / False Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-legal-200">
          <h3 className="font-bold text-legal-900 mb-6 flex items-center gap-2 text-xl">
            <CheckCircle2 className="text-green-500" />
            صواب أم خطأ؟
          </h3>
          <div className="space-y-4">
            {REVIEW_CONTENT.trueFalse.map((item, idx) => {
              const isRevealed = revealedTF.includes(idx);
              return (
                <div key={idx} className="border-b border-legal-100 pb-4 last:border-0">
                  <p className="font-medium text-legal-800 mb-3 text-lg">{item.statement}</p>
                  {!isRevealed ? (
                    <div className="flex gap-3">
                      <button onClick={() => toggleReveal(idx)} className="flex-1 bg-legal-50 hover:bg-green-100 text-legal-600 hover:text-green-700 py-2 rounded-lg font-bold transition-colors border border-legal-200">صواب</button>
                      <button onClick={() => toggleReveal(idx)} className="flex-1 bg-legal-50 hover:bg-red-100 text-legal-600 hover:text-red-700 py-2 rounded-lg font-bold transition-colors border border-legal-200">خطأ</button>
                    </div>
                  ) : (
                    <div className={`p-3 rounded-lg animate-fade-in ${item.isTrue ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <div className="flex items-center gap-2 font-bold mb-1">
                        {item.isTrue ? <Check size={18}/> : <X size={18}/>}
                        {item.isTrue ? 'صحيح' : 'خطأ'}
                      </div>
                      <p className="text-sm">{item.correction}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Discussion Topics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-legal-200">
           <h3 className="font-bold text-legal-900 mb-6 flex items-center gap-2 text-xl">
            <Users2 className="text-blue-500" />
            محاور للنقاش الجماعي
          </h3>
          <div className="space-y-6">
             {REVIEW_CONTENT.topics.map((topic, idx) => {
               const isNoteRevealed = revealedNotes.includes(idx);
               return (
                 <div key={idx} className="bg-legal-50 p-5 rounded-xl border-l-4 border-gold-500">
                   <h4 className="font-bold text-legal-900 text-lg mb-3">{topic.title}</h4>
                   <ul className="space-y-2 mb-4">
                     {topic.points.map((point, pIdx) => (
                       <li key={pIdx} className="flex items-center gap-2 text-legal-600">
                         <span className="w-1.5 h-1.5 bg-legal-400 rounded-full" />
                         {point}
                       </li>
                     ))}
                   </ul>
                   
                   {/* Teacher Notes Reveal */}
                   {topic.teacherNotes && (
                     <div className="mt-4 pt-4 border-t border-legal-200">
                       {!isNoteRevealed ? (
                         <button 
                           onClick={() => handleNoteUnlockRequest(idx)}
                           className="text-xs flex items-center gap-1 text-legal-400 hover:text-gold-600 font-bold transition-colors"
                         >
                           <Lock size={12} /> كشف التوجيه الأكاديمي (للأستاذ)
                         </button>
                       ) : (
                         <div className="bg-white p-3 rounded-lg border border-gold-200 shadow-sm animate-fade-in">
                           <h5 className="text-xs font-bold text-gold-600 mb-1 flex items-center gap-1">
                             <Lightbulb size={12} />
                             توجيه أكاديمي:
                           </h5>
                           <p className="text-sm text-legal-800 leading-relaxed">{topic.teacherNotes}</p>
                         </div>
                       )}
                     </div>
                   )}
                 </div>
               );
             })}
          </div>
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm text-center">
             يفتح الأستاذ المجال للمداخلات والآراء حول هذه القضايا المعاصرة.
          </div>
        </div>
      </div>

      {/* Password Modal for Teacher Notes */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h4 className="font-bold text-center mb-4 text-legal-800 flex items-center justify-center gap-2">
              <Lock size={16} />
              مصادقة الأستاذ
            </h4>
            <form onSubmit={confirmUnlock}>
              <input 
                type="password" 
                autoFocus
                placeholder="الرمز السري"
                className="w-full text-center p-2 border rounded-lg mb-4 font-mono"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-legal-900 text-white py-2 rounded-lg font-bold">فتح</button>
                <button type="button" onClick={closeModal} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Summary Section ---
export const SummarySection: React.FC = () => (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-legal-200 overflow-hidden">
    <div className="bg-legal-800 text-white p-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <Book className="text-gold-500" />
        الملخص النظري الشامل
      </h2>
      <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors">طباعة الملخص</button>
    </div>
    <div className="p-8 bg-legal-50/50">
      <div className="prose prose-lg max-w-none text-legal-800 leading-loose font-medium">
        {THEORETICAL_SUMMARY.split('\n').map((line, i) => {
          if (line.startsWith('###')) return <h3 key={i} className="text-xl font-bold text-legal-900 mt-6 mb-3 border-b border-gold-300 pb-2 inline-block">{line.replace('###', '')}</h3>;
          if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('-')) return <p key={i} className="mr-6 mb-2 flex gap-2"><span className="text-gold-500 font-bold">•</span> {line.replace(/^[0-9.-]+\s*/, '')}</p>;
          if (line.startsWith('💡')) return <p key={i} className="mt-6 p-4 bg-gold-50 rounded-lg border border-gold-200 text-sm text-center italic font-bold text-gold-700">{line}</p>;
          return <p key={i} className="mb-2">{line}</p>;
        })}
      </div>
    </div>
  </div>
);

// --- Exit Ticket (Teacher Protected) ---
export const ExitTicket: React.FC = () => {
  const [view, setView] = useState<'student' | 'teacherAuth' | 'teacherView'>('student');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dummy responses for demo
  const responses = [
    { name: 'طالب 1', learn: 'مفهوم السيادة في وستفاليا', question: 'هل الأمم المتحدة تحد من سيادة الدول؟' },
    { name: 'طالب 2', learn: 'الفرق بين الشخص الأصلي والوظيفي', question: 'لماذا الفاتيكان له وضع خاص؟' },
  ];

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'omar2016') {
      setView('teacherView');
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  if (view === 'teacherAuth') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <Lock className="mx-auto text-legal-800 mb-4" size={48} />
        <h2 className="text-xl font-bold mb-4">دخول الأستاذ</h2>
        <form onSubmit={handleTeacherLogin}>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل الرمز السري"
            className="w-full p-3 border rounded-lg mb-4 text-center font-mono"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-legal-900 text-white py-2 rounded-lg">دخول</button>
            <button type="button" onClick={() => setView('student')} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg">عودة</button>
          </div>
        </form>
      </div>
    );
  }

  if (view === 'teacherView') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Unlock className="text-green-500" /> ردود الطلاب</h2>
          <button onClick={() => { setView('student'); setPassword(''); }} className="text-sm text-red-500 hover:underline">خروج</button>
        </div>
        <div className="space-y-4">
          {responses.map((res, i) => (
            <div key={i} className="bg-legal-50 p-4 rounded-lg border border-legal-200">
              <div className="font-bold text-legal-900 mb-2">{res.name}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-green-600 font-bold">تعلم:</span> {res.learn}</div>
                <div><span className="text-red-600 font-bold">سؤال:</span> {res.question}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl p-12 text-center shadow-sm">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-legal-900 mb-2">تم التسليم بنجاح!</h2>
        <p className="text-legal-600">شكراً لمشاركتك. سيطلع الأستاذ على تعليقك لاحقاً.</p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-sm text-legal-400 underline">إرسال رد آخر</button>
        <div className="mt-12 pt-6 border-t w-full">
          <button onClick={() => setView('teacherAuth')} className="text-xs text-gray-300 hover:text-gray-500">دخول الأستاذ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 border-t-8 border-legal-800 relative">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-legal-900">بطاقة الخروج</h2>
        <p className="text-legal-500 mt-2">تذكر: لا تخرج قبل أن تترك أثراً!</p>
      </div>
      
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <div>
          <label className="block text-sm font-bold text-legal-700 mb-2">الاسم (اختياري):</label>
          <input type="text" className="w-full p-3 rounded-xl bg-legal-50 border-transparent focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-legal-700 mb-2">✍️ أهم فكرة ترسخت لديك اليوم:</label>
          <textarea required className="w-full p-4 rounded-xl bg-legal-50 border-transparent focus:bg-white focus:ring-2 focus:ring-gold-500 transition-colors resize-none" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-bold text-legal-700 mb-2">❓ سؤال لا يزال يحيرك:</label>
          <textarea required className="w-full p-4 rounded-xl bg-legal-50 border-transparent focus:bg-white focus:ring-2 focus:ring-gold-500 transition-colors resize-none" rows={2} />
        </div>

        <button type="submit" className="w-full py-4 bg-legal-900 hover:bg-legal-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
          تسليم البطاقة <ArrowRight size={18} className="rotate-180" />
        </button>
      </form>
      
      <div className="absolute bottom-2 left-2">
        <button onClick={() => setView('teacherAuth')} className="text-[10px] text-gray-300 p-2 hover:text-gray-500">Admin</button>
      </div>
    </div>
  );
};