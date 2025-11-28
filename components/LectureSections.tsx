
import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Scale, 
  ShieldCheck, 
  Building2, 
  Users2,
  HelpCircle,
  Play,
  XCircle,
  Trophy,
  Book,
  BookOpen,
  Lock,
  Unlock,
  MessageCircle,
  BrainCircuit,
  Check,
  X,
  Lightbulb,
  Target,
  FileText,
  ClipboardCheck
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
  COMPONENT_ENRICHMENT,
  INTRO_ENRICHMENT,
  SUBJECTS_ENRICHMENT,
  MODERN_ENRICHMENT,
  REVIEW_CONTENT,
  INTRO_DEEP_DIVE,
  COMPONENTS_DEEP_DIVE,
  SUBJECTS_DEEP_DIVE,
  MODERN_DEEP_DIVE,
  SUMMARY_CARDS,
  LEARNING_OBJECTIVES
} from '../constants';
import { LockedQuestion } from '../types';

// Utility to escape special characters for Regex
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

// --- Helper: Text with Glossary (Ultra Safe Version) ---
const GlossaryText: React.FC<{ text: string }> = ({ text }) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  // Safety Check: If text is missing or not a string, render nothing or fallback
  if (!text || typeof text !== 'string') return null;

  const terms = Object.keys(GLOSSARY);
  if (terms.length === 0) return <>{text}</>;

  // Escape terms to prevent regex errors with parentheses or special chars
  const escapedTerms = terms.map(escapeRegExp);
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'g');
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
                className="highlight-term px-1 rounded bg-yellow-50 text-legal-900 font-bold border-b-2 border-gold-500 cursor-pointer hover:bg-gold-100 transition-colors inline-block relative z-10"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-legal-900/40 backdrop-blur-md" onClick={() => setActiveTerm(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-bounce-in border-t-4 border-gold-500" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 border-b border-legal-100 pb-2">
              <h3 className="text-2xl font-bold text-legal-900 flex items-center gap-2 font-serif">
                <Book size={24} className="text-gold-500" />
                {activeTerm}
              </h3>
              <button onClick={() => setActiveTerm(null)}><XCircle className="text-legal-400 hover:text-red-500 transition-colors" /></button>
            </div>
            <p className="text-legal-700 text-lg leading-loose font-serif">{GLOSSARY[activeTerm]}</p>
          </div>
        </div>
      )}
    </>
  );
};

// --- Helper: Handout Excerpt Box ---
const HandoutBox: React.FC<{ content: string, source?: string }> = ({ content, source }) => (
  <div className="my-8 bg-[#fffdf5] border border-gold-200 rounded-xl shadow-soft p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold-100 to-transparent opacity-50 rounded-bl-3xl"></div>
    <div className="absolute top-4 left-4 opacity-10">
      <Book size={80} className="text-legal-800" />
    </div>
    <h4 className="text-sm font-bold text-gold-700 mb-3 flex items-center gap-2 font-serif tracking-wide">
      <Book size={16} />
      مقتطف من المرجع (لإثراء المعرفة)
    </h4>
    <p className="text-legal-800 text-xl font-serif leading-loose relative z-10 px-4 py-2 border-r-4 border-gold-300 bg-white/50 rounded-l-lg">
      "{content}"
    </p>
    {source && <span className="block text-left text-xs font-bold text-legal-400 mt-4 font-mono tracking-tighter">{source}</span>}
  </div>
);

// --- Reusable Teacher Locked Panel (OPEN BY DEFAULT) ---
const TeacherLockedPanel: React.FC<{ title?: string, questions: LockedQuestion[] }> = ({ title = "أسئلة التفكير العميق", questions }) => {
  const [isLocked, setIsLocked] = useState(false); // Default Open

  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-8 border border-legal-100 rounded-2xl overflow-hidden shadow-soft bg-white group hover:border-gold-200 transition-colors">
      <div className="bg-gradient-to-r from-legal-50/80 to-white p-5 border-b border-legal-100 flex justify-between items-center">
        <h3 className="font-bold text-legal-800 flex items-center gap-3 text-lg">
          <div className="bg-white p-2 rounded-lg shadow-sm text-gold-600">
             <BrainCircuit size={20} />
          </div>
          {title}
        </h3>
        <button 
          onClick={() => setIsLocked(!isLocked)}
          className={`text-xs px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all shadow-sm ${isLocked ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}
        >
          {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
          {isLocked ? 'مغلق (للأستاذ)' : 'مفتوح للنقاش'}
        </button>
      </div>

      <div className="p-6 bg-white">
        {questions.map((q, i) => (
          <div key={i} className="mb-8 last:mb-0">
            <div className="flex items-start gap-4 mb-4">
              <span className={`shrink-0 px-3 py-1 rounded-lg text-[11px] font-bold text-white uppercase tracking-wider shadow-sm mt-1 ${q.type === 'critical' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                {q.type === 'critical' ? 'تحليل' : 'فهم'}
              </span>
              <h4 className="font-bold text-legal-900 text-lg leading-relaxed font-serif">{q.question}</h4>
            </div>
            
            <div className="relative mr-4 pr-6 border-r-2 border-legal-100">
               {/* Answer Visibility Logic: No blur if unlocked */}
              <div className={`transition-all duration-300 ${isLocked ? 'blur-sm select-none opacity-20' : 'blur-0 opacity-100'}`}>
                <div className="text-legal-700 leading-relaxed bg-green-50/50 p-5 rounded-xl border border-green-100/50">
                  <span className="font-bold text-green-700 ml-2 block mb-2 text-sm flex items-center gap-2">
                    <CheckCircle2 size={16}/> الإجابة النموذجية:
                  </span>
                  {q.modelAnswer}
                </div>
              </div>
              
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={() => setIsLocked(false)} className="bg-white shadow-lg border border-legal-100 text-legal-600 px-6 py-2.5 rounded-full text-sm font-bold hover:text-gold-600 hover:border-gold-300 transition-all flex items-center gap-2 transform hover:scale-105">
                    <Lock size={16} />
                    كشف الإجابة النموذجية
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Introduction Section ---
export const IntroSection: React.FC = () => {
  const [showStoryReveal, setShowStoryReveal] = useState(false);
  const [warmUpWord, setWarmUpWord] = useState('');
  const [revealedRows, setRevealedRows] = useState<number[]>([]);

  const toggleRow = (idx: number) => {
    if (revealedRows.includes(idx)) return;
    setRevealedRows([...revealedRows, idx]);
  };

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Official Academic Header */}
      <div className="text-center space-y-3 mb-12 pb-10 border-b border-legal-200 bg-white p-10 rounded-3xl shadow-soft relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-legal-50 rounded-bl-[100px] -z-0"></div>
         <div className="absolute top-0 left-0 w-32 h-32 bg-legal-50 rounded-br-[100px] -z-0"></div>
         
         <div className="relative z-10">
            <h2 className="font-serif font-bold text-legal-900 text-2xl sm:text-3xl tracking-wide mb-2">الجمهورية الجزائرية الديمقراطية الشعبية</h2>
            <h3 className="font-serif text-legal-600 text-lg sm:text-xl">وزارة التعليم العالي والبحث العلمي</h3>
            
            <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-6 rounded-full opacity-80"></div>
            
            <div className="space-y-1">
                <h3 className="font-serif font-bold text-legal-800 text-xl sm:text-2xl">جامعة التكوين المتواصل ديدوش مراد</h3>
                <h3 className="font-serif text-legal-600 text-lg sm:text-xl">مركز تمنراست - ملحقة عين صالح</h3>
            </div>
            
            <div className="mt-8 space-y-2 border-t border-legal-50 pt-6 w-fit mx-auto px-10">
                 <h3 className="font-serif font-bold text-legal-800 text-xl">مقياس: المجتمع الدولي</h3>
                 <h3 className="font-serif text-legal-600 text-lg">الموسم الدراسي: 2025/2026</h3>
            </div>
            
            <div className="mt-8 inline-block relative group">
                <div className="absolute inset-0 bg-gold-200 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <span className="relative bg-white text-legal-900 px-10 py-3 rounded-full font-bold shadow-card border border-legal-100 inline-flex items-center gap-3 text-sm sm:text-base font-sans">
                  <span className="text-gold-600 font-extrabold">إعداد الأستاذ:</span> الشيخ بن بحان
                </span>
            </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-white rounded-2xl shadow-soft border-l-8 border-gold-500 p-8 flex flex-col md:flex-row items-center gap-8 transform hover:translate-x-1 transition-transform duration-300">
        <div className="bg-gold-50 p-6 rounded-full text-gold-600 shrink-0 shadow-inner">
          <Target size={40} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-legal-900 mb-4 font-serif">الأهداف التعليمية المحورية:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEARNING_OBJECTIVES.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-legal-700">
                <CheckCircle2 size={20} className="text-green-500 mt-1 shrink-0" />
                <span className="font-medium">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mental Warm-up */}
      <div className="bg-gradient-to-br from-legal-900 via-legal-800 to-legal-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity duration-1000"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-gold-400 font-serif flex items-center gap-3">
            <span className="bg-white/10 p-2 rounded-lg"><BrainCircuit size={28}/></span>
            التهيئة الذهنية
          </h2>
          <p className="mb-6 text-xl leading-relaxed text-gray-200">عندما تسمع كلمة "<span className="font-bold text-gold-300 border-b-2 border-gold-500/50">المجتمع الدولي</span>"، ما هي أول كلمة تخطر ببالك؟</p>
          <div className="flex gap-4 max-w-lg">
            <input 
              type="text" 
              value={warmUpWord}
              onChange={(e) => setWarmUpWord(e.target.value)}
              placeholder="اكتب كلمتك هنا..."
              className="flex-1 px-6 py-4 rounded-xl text-legal-900 focus:outline-none focus:ring-4 focus:ring-gold-500/30 text-lg shadow-inner font-bold placeholder:font-normal"
            />
          </div>
          {warmUpWord && <p className="mt-6 text-gold-200 animate-fade-in text-lg font-medium flex items-center gap-2"><Lightbulb size={20} className="text-gold-400"/> كلمة مثيرة! هل يعبر "{warmUpWord}" عن واقعنا اليوم؟</p>}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-3xl shadow-soft border border-legal-100 overflow-hidden">
        <div className="bg-blue-50/50 p-8 border-b border-blue-100 flex items-center gap-4">
           <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Globe size={32} />
           </div>
          <h3 className="text-2xl font-bold text-blue-900 font-serif">
            {INTRO_STORY.title}
          </h3>
        </div>
        <div className="p-8 sm:p-10">
          <div className="prose prose-lg max-w-none text-legal-700 font-serif text-xl leading-loose">
             <GlossaryText text={INTRO_STORY.scenario} />
          </div>
          
          <div className="my-8 bg-legal-50 border border-legal-100 p-6 rounded-2xl">
            <p className="font-bold text-legal-800 mb-4 text-lg flex items-center gap-2">
                <HelpCircle className="text-gold-500" /> تساؤلات للنقاش:
            </p>
            <ul className="space-y-3 text-legal-600">
              {INTRO_STORY.questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-legal-400 rounded-full mt-2.5"></div>
                      <span className="text-lg">{q}</span>
                  </li>
              ))}
            </ul>
          </div>

          {!showStoryReveal ? (
            <button 
              onClick={() => setShowStoryReveal(true)}
              className="w-full py-5 bg-gold-500 hover:bg-gold-600 text-white font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-gold-500/20 flex items-center justify-center gap-3 group"
            >
              <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
              تحليل اللغز (الربط بالواقع)
            </button>
          ) : (
            <div className="bg-green-50 border border-green-100 p-8 rounded-2xl animate-fade-in shadow-inner">
              <h4 className="font-bold text-green-800 mb-4 flex items-center gap-3 text-xl">
                <CheckCircle2 size={28} className="text-green-600" />
                التحليل:
              </h4>
              <div className="text-lg text-green-900 leading-relaxed font-serif">
                 <GlossaryText text={INTRO_STORY.answer} />
              </div>
            </div>
          )}
        </div>
      </div>

      <HandoutBox content={INTRO_ENRICHMENT.content} source={INTRO_ENRICHMENT.sourcePage} />

      {/* Comparison Table */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-legal-800 flex items-center gap-3 font-serif">
            <span className="bg-gold-100 p-2 rounded-lg text-gold-700"><Scale size={24} /></span>
            مقارنة جوهرية: مجتمع الدولة vs المجتمع الدولي
          </h3>
          <button 
            onClick={() => setRevealedRows(NATIONAL_VS_INTL.map((_, i) => i))}
            className="text-sm bg-white border border-legal-200 px-4 py-2 rounded-lg text-legal-600 font-bold hover:text-gold-600 hover:border-gold-300 transition-colors shadow-sm"
          >
             كشف الكل
          </button>
        </div>
        
        <div className="overflow-hidden rounded-2xl border border-legal-200 shadow-soft bg-white">
          <table className="w-full text-right border-collapse">
            <thead className="bg-legal-50 border-b border-legal-200">
              <tr>
                <th className="p-5 text-legal-600 font-bold w-1/4 text-sm uppercase tracking-wider">المعيار</th>
                <th className="p-5 text-legal-900 font-bold bg-white/50 w-1/3 text-lg font-serif">المجتمع الداخلي (الوطني)</th>
                <th className="p-5 text-blue-900 font-bold bg-blue-50/30 text-lg font-serif">المجتمع الدولي (اضغط للكشف)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legal-100">
              {NATIONAL_VS_INTL.map((row, idx) => {
                const isRevealed = revealedRows.includes(idx);
                return (
                  <tr 
                    key={idx} 
                    className="hover:bg-legal-50/50 transition-colors cursor-pointer group"
                    onClick={() => toggleRow(idx)}
                  >
                    <td className="p-5 font-semibold text-legal-500 group-hover:text-gold-600 transition-colors">{row.criteria}</td>
                    <td className="p-5 text-legal-800 font-medium text-lg leading-relaxed"><GlossaryText text={row.national} /></td>
                    <td className="p-5 relative bg-blue-50/10 group-hover:bg-blue-50/30 transition-colors">
                      <div className={`transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm -translate-y-2'}`}>
                        <GlossaryText text={row.international} />
                      </div>
                      {!isRevealed && <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-bold text-sm tracking-widest bg-white/50 backdrop-blur-sm">اضغط للكشف</div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <TeacherLockedPanel questions={INTRO_DEEP_DIVE} />
    </div>
  );
};

// --- Components Section ---
export const ComponentsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="bg-white p-8 rounded-2xl shadow-soft border-l-8 border-gold-500 mb-8 flex items-start gap-4">
        <Lightbulb className="text-gold-500 shrink-0 mt-1" size={24} />
        <p className="text-legal-700 text-lg font-serif leading-loose">
          لإطلاق مصطلح "<span className="font-bold text-legal-900">مجتمع دولي</span>" على أي تجمع، يجب توفر 4 أركان (مقومات) لا غنى عنها. غياب أحدها يعني انتفاء صفة المجتمع الدولي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SOCIETY_COMPONENTS.map((comp, idx) => {
          const isActive = activeCard === idx;
          return (
            <div 
              key={idx} 
              onClick={() => setActiveCard(isActive ? null : idx)}
              className={`
                relative p-8 rounded-3xl shadow-sm cursor-pointer transition-all duration-500 border overflow-hidden group
                ${isActive 
                  ? 'bg-legal-900 text-white border-legal-900 row-span-2 shadow-2xl scale-[1.02] z-10' 
                  : 'bg-white text-legal-800 border-legal-100 hover:border-gold-300 hover:shadow-lg'
                }
              `}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold font-serif transition-colors ${isActive ? 'text-gold-400' : 'text-legal-800'}`}>
                  {comp.title}
                </h3>
                <span className={`text-4xl font-black opacity-10 ${isActive ? 'text-white' : 'text-legal-900'}`}>0{idx + 1}</span>
              </div>
              
              <div className={`mb-4 leading-relaxed text-lg transition-colors ${isActive ? 'text-gray-200' : 'text-legal-600'}`}>
                 <GlossaryText text={comp.description} />
              </div>
              
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isActive ? 'max-h-[600px] opacity-100 mt-8 pt-8 border-t border-legal-800' : 'max-h-0 opacity-0'}`}>
                <div className="mb-6">
                  <p className="text-sm font-bold text-gold-500 mb-3 uppercase tracking-wider">أمثلة تطبيقية:</p>
                  <div className="flex flex-wrap gap-3">
                    {comp.examples.map((ex, i) => (
                      <span key={i} className="text-sm bg-legal-800 px-3 py-1.5 rounded-lg text-gray-200 border border-legal-700 shadow-sm">{ex}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gold-300 font-medium bg-white/5 p-4 rounded-xl border border-white/10">
                  <Globe size={20} className="shrink-0" />
                  <span className="leading-relaxed">مثال واقعي: {comp.realWorld}</span>
                </div>
              </div>
              
              {!isActive && (
                <div className="mt-6 flex justify-end">
                    <span className="text-xs font-bold text-gold-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      انقر للتفاصيل <ArrowRight size={14} className="rotate-180" />
                    </span>
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

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {HISTORY_EVENTS.map((event, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`
              snap-start px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-3 border-2
              ${activeTab === idx
                ? 'bg-legal-900 text-white border-legal-900 shadow-lg scale-105'
                : 'bg-white text-legal-500 hover:bg-legal-50 border-transparent hover:border-legal-200'
              }
            `}
          >
            <span className="text-xl">{event.icon}</span>
            <span className="font-serif">{event.civilization}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-soft border border-legal-200 overflow-hidden flex-1 flex flex-col relative transition-all duration-500">
        <div className={`p-8 md:p-10 flex-1 transition-all duration-500 ${showQuiz ? 'blur-md opacity-30 pointer-events-none scale-95' : 'scale-100'}`}>
            <div className="flex items-center justify-between mb-8 border-b border-legal-100 pb-6">
              <div>
                <span className="inline-block bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-2 font-mono">{activeEvent.period}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-legal-900 font-serif">{activeEvent.treatyName}</h2>
              </div>
              <div className="text-6xl opacity-10 grayscale">{activeEvent.icon}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
               {Object.entries(activeEvent.details).map(([key, val], i) => {
                 if (key === 'extraInfo') return null;
                 return (
                   <div key={i} className="bg-legal-50/50 p-6 rounded-2xl border border-legal-100 hover:border-gold-200 transition-colors">
                     <span className="text-xs text-legal-400 font-bold block mb-2 uppercase tracking-widest">
                       {key === 'parties' ? 'الأطراف' : key === 'topic' ? 'الموضوع' : 'الآلية/الحل'}
                     </span>
                     <p className="text-base font-medium text-legal-800 leading-snug"><GlossaryText text={val} /></p>
                   </div>
                 );
               })}
            </div>

            {/* Detailed Breakdown */}
            {activeEvent.details.extraInfo && (
              <div className="bg-[#f0f9ff] border border-blue-100 p-8 rounded-2xl mb-10 shadow-inner">
                 <h4 className="font-bold text-blue-900 mb-6 flex items-center gap-2 text-lg">
                    <BookOpen size={20} className="text-blue-500"/> تفاصيل المحطة التاريخية
                 </h4>
                 <div className="text-blue-900 leading-loose text-lg">
                    <GlossaryText text={activeEvent.details.extraInfo} />
                 </div>
              </div>
            )}

            {/* Milestones */}
            <div className="bg-legal-900 text-white rounded-2xl p-8 mb-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-transparent"></div>
              <h4 className="font-bold text-gold-400 flex items-center gap-3 mb-6 text-xl font-serif">
                <Trophy size={24} />
                أهم المبادئ المستخلصة
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeEvent.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <span className="text-sm md:text-base font-medium leading-relaxed text-gray-200">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {activeEvent.discussionQuestions && (
               <TeacherLockedPanel title="مناقشة تاريخية معمقة" questions={activeEvent.discussionQuestions} />
            )}

            {activeEvent.enrichment && (
              <HandoutBox content={activeEvent.enrichment} source="د. إسالمة محمد أمين - المطبوعة الجامعية" />
            )}
        </div>

        {/* Quiz Start Button */}
        {!showQuiz && (
          <div className="sticky bottom-0 left-0 p-8 bg-gradient-to-t from-white via-white to-transparent z-10 flex justify-end">
            <button 
              onClick={() => setShowQuiz(true)}
              className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg group"
            >
              <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
              اختبر فهمك لهذه المرحلة
            </button>
          </div>
        )}

        {/* Quiz Modal Overlay */}
        {showQuiz && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-white/50 backdrop-blur-md animate-fade-in">
             <div className="bg-white border border-legal-200 shadow-2xl rounded-3xl p-8 max-w-2xl w-full relative">
                <button onClick={() => setShowQuiz(false)} className="absolute top-6 left-6 text-legal-400 hover:text-red-500 transition-colors bg-legal-50 p-2 rounded-full"><XCircle size={24} /></button>
                
                <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-lg text-xs font-bold mb-4">سؤال تفاعلي</span>
                <h3 className="text-2xl font-bold text-legal-900 mb-8 font-serif leading-relaxed pr-12">{activeEvent.quiz.question}</h3>
                
                <div className="space-y-4 mb-8">
                  {activeEvent.quiz.options.map((option, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === activeEvent.quiz.correctIndex;
                    let btnClass = "w-full text-right p-5 rounded-2xl border-2 font-medium transition-all text-lg flex justify-between items-center ";
                    
                    if (selectedOption === null) btnClass += "border-legal-100 hover:border-gold-400 hover:bg-legal-50 text-legal-700";
                    else if (isCorrect) btnClass += "border-green-500 bg-green-50 text-green-900 shadow-inner";
                    else if (isSelected) btnClass += "border-red-500 bg-red-50 text-red-900 opacity-60";
                    else btnClass += "border-legal-100 text-legal-400 opacity-40";

                    return (
                      <button key={i} disabled={selectedOption !== null} onClick={() => handleQuizAnswer(i)} className={btnClass}>
                        <span>{option}</span>
                        {selectedOption !== null && isCorrect && <CheckCircle2 className="text-green-600 animate-bounce-in" size={24} />}
                        {isSelected && !isCorrect && <XCircle className="text-red-600 animate-shake" size={24} />}
                      </button>
                    );
                  })}
                </div>
                {quizFeedback && (
                  <div className={`p-6 rounded-2xl text-base animate-fade-in border flex gap-4 ${quizFeedback === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <div className={`mt-1 ${quizFeedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                         {quizFeedback === 'correct' ? <CheckCircle2 size={24}/> : <XCircle size={24}/>}
                    </div>
                    <div>
                        <span className="font-bold block mb-2 text-lg">{quizFeedback === 'correct' ? 'أحسنت! إجابة دقيقة.' : 'للأسف، إجابة خاطئة.'}</span>
                        <p className="leading-relaxed opacity-90">{activeEvent.quiz.explanation}</p>
                    </div>
                  </div>
                )}
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
    }, 2000);
  };

  const resetGame = () => {
    setGameIndex(0);
    setScore(0);
    setIsFinished(false);
    setLastFeedback(null);
    setMode('learn');
  };

  if (mode === 'play') return (
    <div className="bg-legal-900 rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center text-white relative overflow-hidden border-4 border-gold-500 animate-fade-in">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      {!isFinished ? (
        <div className="relative z-10">
          <div className="flex justify-between text-legal-400 mb-12 font-mono text-sm border-b border-legal-800 pb-4">
            <span>Question {gameIndex + 1} / {CLASSIFICATION_GAME_ITEMS.length}</span>
            <span className="text-gold-400 font-bold">Score: {score}</span>
          </div>
          
          <div className="mb-12">
            <span className="text-legal-400 text-sm uppercase tracking-widest mb-4 block">صنف الكيان التالي</span>
            <h2 className="text-5xl font-black mb-6 font-serif">{CLASSIFICATION_GAME_ITEMS[gameIndex].name}</h2>
          </div>
          
          {lastFeedback ? (
            <div className={`p-8 rounded-2xl text-2xl font-bold animate-bounce-in shadow-xl ${lastFeedback.correct ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              <div className="flex flex-col items-center gap-4">
                  {lastFeedback.correct ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                  {lastFeedback.msg}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button onClick={() => handleGameChoice('state')} className="group p-6 bg-legal-800 hover:bg-gold-500 rounded-2xl font-bold transition-all hover:-translate-y-2 border border-legal-700 hover:border-gold-400">
                <Building2 size={32} className="mx-auto mb-4 text-legal-500 group-hover:text-legal-900 transition-colors" />
                <span className="group-hover:text-legal-900">دولة (شخص أصلي)</span>
              </button>
              <button onClick={() => handleGameChoice('org')} className="group p-6 bg-legal-800 hover:bg-gold-500 rounded-2xl font-bold transition-all hover:-translate-y-2 border border-legal-700 hover:border-gold-400">
                <Users2 size={32} className="mx-auto mb-4 text-legal-500 group-hover:text-legal-900 transition-colors" />
                <span className="group-hover:text-legal-900">منظمة (شخص وظيفي)</span>
              </button>
              <button onClick={() => handleGameChoice('special')} className="group p-6 bg-legal-800 hover:bg-gold-500 rounded-2xl font-bold transition-all hover:-translate-y-2 border border-legal-700 hover:border-gold-400">
                <ShieldCheck size={32} className="mx-auto mb-4 text-legal-500 group-hover:text-legal-900 transition-colors" />
                <span className="group-hover:text-legal-900">وضع خاص</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 animate-fade-in relative z-10">
          <Trophy size={100} className="text-gold-400 mx-auto mb-8 animate-bounce" />
          <h2 className="text-4xl font-bold mb-6 font-serif">انتهت اللعبة!</h2>
          <p className="text-2xl mb-12 text-gray-300">نتيجتك النهائية: <span className="text-gold-400 font-bold text-4xl mx-2">{score}</span> / {CLASSIFICATION_GAME_ITEMS.length}</p>
          <button onClick={resetGame} className="bg-white text-legal-900 px-10 py-4 rounded-full font-bold hover:bg-gold-400 transition-colors text-lg shadow-lg">العودة للدرس</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {SUBJECTS_DATA.map((subj, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-soft p-8 border-t-8 border-legal-600 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="bg-legal-50 w-16 h-16 rounded-2xl flex items-center justify-center text-legal-800 mb-6 group-hover:bg-legal-900 group-hover:text-gold-400 transition-colors shadow-sm">
              {idx === 0 ? <Building2 size={32} /> : idx === 1 ? <Users2 size={32} /> : <ShieldCheck size={32} />}
            </div>
            <h3 className="text-xl font-bold text-legal-900 mb-3 font-serif"><GlossaryText text={subj.type} /></h3>
            <p className="text-base text-legal-600 mb-6 h-20 leading-relaxed"><GlossaryText text={subj.desc} /></p>
            <div className="flex flex-wrap gap-2 pt-6 border-t border-legal-50">
              {subj.elements.map((el, i) => <span key={i} className="text-xs font-bold border border-legal-200 px-2.5 py-1 rounded-md bg-white text-legal-500">{el}</span>)}
            </div>
          </div>
        ))}
      </div>
      
      <HandoutBox content={SUBJECTS_ENRICHMENT.content} source={SUBJECTS_ENRICHMENT.sourcePage} />
      
      <div className="bg-gradient-to-r from-gold-500 to-amber-600 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10 mb-6 md:mb-0 text-center md:text-right">
          <h3 className="text-3xl font-bold mb-3 font-serif">لعبة: خبير التصنيف الدولي</h3>
          <p className="opacity-90 text-lg text-amber-100">هل يمكنك التمييز بين الدول والمنظمات والكيانات الخاصة؟</p>
        </div>
        <button onClick={() => setMode('play')} className="relative z-10 bg-white text-amber-700 px-8 py-4 rounded-2xl font-bold hover:bg-legal-900 hover:text-gold-400 transition-colors shadow-lg flex gap-3 items-center group">
          <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform"/> ابدأ التحدي
        </button>
      </div>

      <TeacherLockedPanel questions={SUBJECTS_DEEP_DIVE} />
    </div>
  );
};

// --- Modern Section ---
export const ModernConnectSection: React.FC = () => (
  <div className="bg-white rounded-3xl shadow-soft p-10 animate-fade-in">
    <div className="flex items-center gap-4 mb-10 border-b border-legal-100 pb-6">
        <div className="bg-gold-100 p-3 rounded-2xl text-gold-600">
            <Globe size={32} />
        </div>
        <h3 className="text-3xl font-bold text-legal-900 font-serif">
        ربط الماضي بالحاضر
        </h3>
    </div>

    <div className="grid gap-6 mb-12">
      {MODERN_EXAMPLES.map((item, i) => (
        <div key={i} className="flex flex-col md:flex-row items-stretch md:items-center bg-legal-50 rounded-2xl border border-legal-100 overflow-hidden hover:border-gold-300 transition-colors group">
          <div className="flex-1 p-6 flex items-center justify-between md:justify-start gap-4 bg-white/50">
             <span className="text-legal-400 text-xs font-mono font-bold">{item.period}</span>
             <span className="font-bold text-legal-600 text-lg group-hover:text-legal-900 transition-colors">{item.old}</span>
          </div>
          
          <div className="bg-gold-100 text-gold-600 p-2 flex items-center justify-center">
             <ArrowRight className="rotate-90 md:rotate-180" size={20} />
          </div>

          <div className="flex-1 p-6 bg-white font-bold text-legal-900 text-lg flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
             <GlossaryText text={item.new} />
          </div>
        </div>
      ))}
    </div>
    <HandoutBox content={MODERN_ENRICHMENT.content} source={MODERN_ENRICHMENT.sourcePage} />
    <TeacherLockedPanel questions={MODERN_DEEP_DIVE} />
  </div>
);

// --- Review Section ---
export const ReviewSection: React.FC = () => {
  const [revealedTF, setRevealedTF] = useState<number[]>([]);
  const [revealedNotes, setRevealedNotes] = useState<number[]>([]);

  const toggleReveal = (idx: number) => {
    setRevealedTF(prev => prev.includes(idx) ? prev : [...prev, idx]);
  };

  const toggleNote = (idx: number) => {
      setRevealedNotes(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-10 rounded-3xl shadow-xl mb-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-4 font-serif">
            <MessageCircle size={36} className="text-blue-300" />
            المراجعة والنقاش المفتوح
            </h2>
            <p className="opacity-90 text-xl font-light text-blue-100">محطة لترسيخ المفاهيم وتبادل الآراء قبل الختام</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* True / False Activity */}
        <div className="bg-white p-8 rounded-3xl shadow-soft border border-legal-200">
          <h3 className="font-bold text-legal-900 mb-8 flex items-center gap-3 text-2xl font-serif">
            <CheckCircle2 className="text-green-500" size={28} />
            صواب أم خطأ؟
          </h3>
          <div className="space-y-6">
            {REVIEW_CONTENT.trueFalse.map((item, idx) => {
              const isRevealed = revealedTF.includes(idx);
              return (
                <div key={idx} className="border-b border-legal-100 pb-6 last:border-0 last:pb-0">
                  <p className="font-bold text-legal-800 mb-4 text-lg leading-relaxed">{item.statement}</p>
                  {!isRevealed ? (
                    <div className="flex gap-4">
                      <button onClick={() => toggleReveal(idx)} className="flex-1 bg-legal-50 hover:bg-green-100 text-legal-600 hover:text-green-700 py-3 rounded-xl font-bold transition-colors border border-legal-200 shadow-sm">صواب</button>
                      <button onClick={() => toggleReveal(idx)} className="flex-1 bg-legal-50 hover:bg-red-100 text-legal-600 hover:text-red-700 py-3 rounded-xl font-bold transition-colors border border-legal-200 shadow-sm">خطأ</button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl animate-fade-in border flex gap-3 ${item.isTrue ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                      <div className="mt-1">
                        {item.isTrue ? <Check size={20}/> : <X size={20}/>}
                      </div>
                      <div>
                        <span className="font-bold block mb-1">{item.isTrue ? 'إجابة صحيحة' : 'إجابة خاطئة'}</span>
                        <p className="text-sm opacity-90 leading-relaxed">{item.correction}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Discussion Topics */}
        <div className="bg-white p-8 rounded-3xl shadow-soft border border-legal-200">
           <h3 className="font-bold text-legal-900 mb-8 flex items-center gap-3 text-2xl font-serif">
            <Users2 className="text-blue-500" size={28} />
            محاور للنقاش الجماعي
          </h3>
          <div className="space-y-6">
             {REVIEW_CONTENT.topics.map((topic, idx) => {
               const isNoteRevealed = revealedNotes.includes(idx);
               return (
                 <div key={idx} className="bg-legal-50 p-6 rounded-2xl border-l-4 border-gold-500">
                   <h4 className="font-bold text-legal-900 text-xl mb-4 font-serif">{topic.title}</h4>
                   <ul className="space-y-3 mb-6">
                     {topic.points.map((point, pIdx) => (
                       <li key={pIdx} className="flex items-start gap-3 text-legal-700">
                         <span className="w-1.5 h-1.5 bg-legal-400 rounded-full mt-2.5 shrink-0" />
                         <span className="text-lg leading-relaxed">{point}</span>
                       </li>
                     ))}
                   </ul>
                   
                   {topic.teacherNotes && (
                     <div className="mt-4 pt-4 border-t border-legal-200/50">
                       <button 
                         onClick={() => toggleNote(idx)}
                         className="text-xs flex items-center gap-2 text-legal-500 hover:text-gold-600 font-bold transition-colors mb-2"
                       >
                         {isNoteRevealed ? <Lock size={12} className="text-red-400"/> : <Unlock size={12} className="text-green-400"/>}
                         {isNoteRevealed ? 'إخفاء التوجيه' : 'كشف التوجيه الأكاديمي'}
                       </button>
                       
                       {isNoteRevealed && (
                         <div className="bg-white p-5 rounded-xl border border-gold-200 shadow-sm animate-fade-in">
                           <h5 className="text-sm font-bold text-gold-600 mb-3 flex items-center gap-2">
                             <Lightbulb size={16} />
                             توجيهات للأستاذ:
                           </h5>
                           <div className="text-base text-legal-800 leading-loose">
                               <GlossaryText text={topic.teacherNotes} />
                           </div>
                         </div>
                       )}
                     </div>
                   )}
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Summary Section ---
export const SummarySection: React.FC = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-legal-900 text-white p-8 rounded-3xl shadow-lg text-center">
        <h2 className="text-3xl font-bold flex justify-center items-center gap-3 font-serif">
        <Book className="text-gold-500" />
        الملخص النظري الشامل
        </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUMMARY_CARDS.map((card) => (
            <div key={card.id} className="bg-white rounded-xl shadow-sm border border-legal-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${card.colorClass}`} />
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-legal-50 text-legal-800`}>
                            <card.icon size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-legal-900 font-serif">{card.title}</h3>
                    </div>
                    <div className="space-y-4">
                        {card.content.map((sect, idx) => (
                            <div key={idx}>
                                {sect.subtitle && <h4 className="font-bold text-sm text-legal-500 uppercase tracking-wider mb-2">{sect.subtitle}</h4>}
                                <ul className="space-y-2">
                                    {sect.items.map((item, i) => (
                                        <li key={i} className="text-legal-700 text-sm flex items-start gap-2">
                                            <span className="text-gold-500 mt-1.5">•</span>
                                            <span><GlossaryText text={item} /></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
  </div>
);

// --- Exit Ticket ---
export const ExitTicket: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-soft p-10 border-t-8 border-legal-900 relative animate-fade-in text-center">
      <div className="mb-10">
        <div className="w-20 h-20 bg-legal-50 rounded-full flex items-center justify-center mx-auto mb-6 text-legal-900">
            <ClipboardCheck size={40} />
        </div>
        <h2 className="text-3xl font-bold text-legal-900 font-serif mb-3">بطاقة الخروج الرقمية</h2>
        <p className="text-legal-500 text-lg">شاركنا فهمك اليوم لنحسن من تجربتك التعليمية</p>
      </div>
      
      <div className="space-y-6">
         <p className="text-legal-700 leading-relaxed">
             يرجى ملء النموذج القصير التالي لتوثيق حضورك وتقييم مدى استيعابك للمحاضرة.
         </p>

         <a 
           href="https://docs.google.com/forms/d/e/1FAIpQLSfHhXyQ0HwA8Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1/viewform?embedded=true&hl=ar" 
           target="_blank" 
           rel="noreferrer"
           className="block w-full py-5 bg-legal-900 hover:bg-gold-500 hover:text-legal-900 text-white font-bold rounded-2xl transition-all shadow-lg text-xl flex items-center justify-center gap-3"
         >
           فتح بطاقة الخروج (Google Form) <ArrowRight size={20} className="rotate-180" />
         </a>
      </div>
      
      <div className="mt-8 pt-8 border-t border-legal-100 flex justify-center">
          <a href="https://docs.google.com/forms/d/1QddyRLlfbx3fT2OtDcMZL5qGgk9IUbgixPMGxK6VRv8/edit#responses" target="_blank" rel="noreferrer" className="text-xs text-legal-400 hover:text-legal-600 flex items-center gap-1">
             <Lock size={10} /> لوحة تحكم الأستاذ (الردود)
          </a>
      </div>
    </div>
  );
};
