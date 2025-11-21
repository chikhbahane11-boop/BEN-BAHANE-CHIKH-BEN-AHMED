import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle2, Globe, Scale, ShieldCheck, Building2, Users2,
  HelpCircle, Play, XCircle, Trophy, Book, BookOpen, Lock, Unlock, Download,
  MessageCircle, BrainCircuit, Check, X, Lightbulb, Target, GraduationCap, MousePointerClick,
  ClipboardCheck, History, Users, Zap, Landmark, Printer
} from 'lucide-react';
import { 
  NATIONAL_VS_INTL, SOCIETY_COMPONENTS, HISTORY_EVENTS, SUBJECTS_DATA, 
  MODERN_EXAMPLES, CLASSIFICATION_GAME_ITEMS, INTRO_STORY, GLOSSARY, 
  SUMMARY_CARDS, COMPONENT_ENRICHMENT, INTRO_ENRICHMENT, 
  SUBJECTS_ENRICHMENT, MODERN_ENRICHMENT, REVIEW_CONTENT, INTRO_DEEP_DIVE, 
  COMPONENTS_DEEP_DIVE, SUBJECTS_DEEP_DIVE, MODERN_DEEP_DIVE, LEARNING_OBJECTIVES
} from '../constants';
import { LockedQuestion } from '../types';

// --- Helper Components ---

const GlossaryText: React.FC<{ text: string }> = ({ text }) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const terms = Object.keys(GLOSSARY);
  const regex = new RegExp(`(${terms.join('|')})`, 'g');
  const parts = text.split(regex);

  return (
    <>
      <span className="leading-loose text-legal-700 text-lg">
        {parts.map((part, i) => GLOSSARY[part] ? (
          <span key={i} onClick={(e) => { e.stopPropagation(); setActiveTerm(part); }} className="highlight-term font-bold text-legal-900 cursor-pointer border-b-2 border-gold-500 hover:bg-gold-100" title="تعريف">{part}</span>
        ) : part)}
      </span>
      {activeTerm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setActiveTerm(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md animate-bounce-in border-b-8 border-gold-500 relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-legal-900 mb-4 text-center">{activeTerm}</h3>
            <p className="text-legal-600 text-lg text-center">{GLOSSARY[activeTerm]}</p>
          </div>
        </div>
      )}
    </>
  );
};

const SectionCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-soft border border-white/50 p-6 md:p-8 ${className}`}>{children}</div>
);

const HandoutBox: React.FC<{ content: string, source?: string }> = ({ content, source }) => (
  <div className="my-10 group relative">
    <div className="absolute inset-0 bg-legal-800 rounded-2xl rotate-1 opacity-5"></div>
    <div className="relative bg-white border-r-4 border-legal-800 p-8 rounded-2xl shadow-lg">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 bg-legal-50 rounded-full flex items-center justify-center text-legal-800"><BookOpen size={24} /></div>
        <div>
          <h4 className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-2">إثراء أكاديمي</h4>
          <p className="text-legal-800 text-lg font-serif italic">"{content}"</p>
          {source && <span className="block text-left text-xs text-legal-400 mt-3 font-bold">{source}</span>}
        </div>
      </div>
    </div>
  </div>
);

const TeacherLockedPanel: React.FC<{ title?: string, questions: LockedQuestion[] }> = ({ title = "أسئلة التفكير العميق", questions }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'omar2016') { setIsLocked(false); setShowPassword(false); } else { alert('خطأ في الرمز'); }
  };

  return (
    <div className="mt-10 bg-white border border-legal-200 rounded-2xl overflow-hidden shadow-soft">
      <div className="bg-legal-50 p-4 border-b border-legal-100 flex justify-between items-center">
        <h3 className="font-bold text-legal-800 flex items-center gap-3 text-lg"><BrainCircuit size={20} className="text-gold-600"/> {title}</h3>
        <button onClick={() => isLocked ? setShowPassword(true) : setIsLocked(true)} className={`px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${isLocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {isLocked ? <Lock size={14} /> : <Unlock size={14} />} {isLocked ? 'مغلق' : 'مفتوح'}
        </button>
      </div>
      <div className="p-8">
        {questions.map((q, i) => (
          <div key={i} className="mb-8 last:mb-0">
            <div className="flex items-start gap-4 mb-4">
              <span className={`shrink-0 px-3 py-1 rounded-lg text-[11px] font-bold text-white ${q.type === 'critical' ? 'bg-purple-600' : 'bg-blue-600'}`}>{q.type === 'critical' ? 'تحليل' : 'فهم'}</span>
              <h4 className="font-bold text-legal-900 text-xl">{q.question}</h4>
            </div>
            <div className="relative pr-6 border-r-2 border-legal-200">
              <div className={isLocked ? 'blur-md opacity-30 select-none' : ''}>
                <div className="bg-legal-50 p-5 rounded-xl"><p className="text-legal-700 text-lg">{q.modelAnswer}</p></div>
              </div>
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={() => setShowPassword(true)} className="bg-white shadow-lg border px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2"><Lock size={14} /> كشف الإجابة</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showPassword && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowPassword(false)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm" onClick={e => e.stopPropagation()}>
            <h4 className="font-bold text-xl text-center mb-4">صلاحية الأستاذ</h4>
            <form onSubmit={handleUnlock}>
              <input type="password" autoFocus className="w-full text-center p-3 border rounded-xl mb-4" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="الرمز السري" />
              <button type="submit" className="w-full bg-legal-900 text-white py-3 rounded-xl font-bold">تأكيد</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- SECTIONS ---

export const IntroSection: React.FC = () => {
  const [showStoryReveal, setShowStoryReveal] = useState(false);
  const [revealedRows, setRevealedRows] = useState<number[]>([]);

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* LEARNING OBJECTIVES - TOP */}
      <div className="bg-white rounded-2xl p-8 shadow-soft border-l-[6px] border-gold-500 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-gold-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
        <h3 className="relative font-black text-2xl text-legal-900 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gold-100 text-gold-600 rounded-lg"><Target size={28} /></div> الأهداف التعليمية المحورية
        </h3>
        <div className="grid gap-4 relative z-10">
          {LEARNING_OBJECTIVES.map((obj, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-legal-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gold-200">
              <div className="w-10 h-10 rounded-full bg-legal-200 text-legal-600 flex items-center justify-center font-bold text-lg">{i + 1}</div>
              <p className="text-legal-700 font-bold text-lg">{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warm Up */}
      <div className="bg-gradient-to-br from-legal-900 via-legal-800 to-legal-900 text-white p-10 rounded-3xl shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-gold-300 text-sm font-bold mb-6"><BrainCircuit size={16} /> عصف ذهني</div>
          <h2 className="text-3xl font-bold mb-6">عندما تسمع كلمة "<span className="text-gold-400 underline">المجتمع الدولي</span>" ما أول كلمة تخطر ببالك؟</h2>
          <input type="text" placeholder="اكتب كلمتك هنا..." className="w-full max-w-lg mx-auto block px-6 py-4 rounded-2xl text-legal-900 text-lg font-bold outline-none shadow-lg" />
        </div>
      </div>

      {/* Story */}
      <SectionCard className="!p-0 overflow-hidden">
        <div className="bg-blue-50 p-6 flex items-center gap-3 border-b border-blue-100"><Globe size={24} className="text-blue-600"/> <h3 className="text-xl font-bold text-blue-900">{INTRO_STORY.title}</h3></div>
        <div className="p-8">
          <div className="text-lg text-legal-600 mb-8"><GlossaryText text={INTRO_STORY.scenario} /></div>
          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-legal-50 p-6 rounded-2xl"><h4 className="font-bold text-legal-800 mb-4 flex items-center gap-2"><HelpCircle className="text-gold-500"/> تساؤلات:</h4><ul className="space-y-2">{INTRO_STORY.questions.map((q,i)=><li key={i} className="text-legal-600 flex gap-2"><span className="text-gold-500">•</span>{q}</li>)}</ul></div>
             <div>
               {!showStoryReveal ? (
                 <button onClick={() => setShowStoryReveal(true)} className="w-full py-6 bg-white border-2 border-gold-400 text-gold-700 font-bold rounded-2xl hover:bg-gold-50 transition-all flex flex-col items-center justify-center gap-2"><Lightbulb size={24}/> كشف التحليل</button>
               ) : (
                 <div className="bg-green-50 border-green-100 p-6 rounded-2xl border"><h4 className="font-bold text-green-800 mb-2 flex gap-2"><CheckCircle2/> التحليل:</h4><GlossaryText text={INTRO_STORY.answer} /></div>
               )}
             </div>
          </div>
        </div>
      </SectionCard>

      <HandoutBox content={INTRO_ENRICHMENT.content} source={INTRO_ENRICHMENT.sourcePage} />
      
      {/* Table */}
      <div>
        <div className="flex justify-between mb-4 px-2"><h3 className="text-2xl font-bold text-legal-900 flex gap-3"><Scale className="text-gold-600"/> مقارنة جوهرية</h3><button onClick={() => setRevealedRows(NATIONAL_VS_INTL.map((_, i) => i))} className="text-gold-600 font-bold hover:bg-gold-50 px-3 py-1 rounded">كشف الكل</button></div>
        <div className="bg-white rounded-2xl border border-legal-200 shadow-soft overflow-hidden">
          <div className="grid grid-cols-12 bg-legal-50 border-b font-bold text-legal-700"><div className="col-span-3 p-5">المعيار</div><div className="col-span-5 p-5 border-r">الوطني</div><div className="col-span-4 p-5 border-r text-blue-800">الدولي</div></div>
          {NATIONAL_VS_INTL.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 border-b last:border-0 hover:bg-legal-50 cursor-pointer min-h-[80px]" onClick={() => setRevealedRows(prev => prev.includes(idx) ? prev : [...prev, idx])}>
              <div className="col-span-3 p-5 font-bold text-legal-500">{row.criteria}</div>
              <div className="col-span-5 p-5 border-r"><GlossaryText text={row.national} /></div>
              <div className="col-span-4 p-5 border-r relative">
                <div className={revealedRows.includes(idx) ? '' : 'opacity-0'}><GlossaryText text={row.international} /></div>
                {!revealedRows.includes(idx) && <div className="absolute inset-0 flex items-center justify-center text-xs text-legal-400 font-bold"><MousePointerClick size={14}/> اضغط للكشف</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TeacherLockedPanel questions={INTRO_DEEP_DIVE} />
    </div>
  );
};

export const ComponentsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="space-y-10 pb-12">
      <div className="bg-white p-8 rounded-2xl shadow-soft border-r-8 border-gold-500 flex items-center gap-6">
          <Building2 size={40} className="text-gold-500 hidden md:block" />
          <div><h3 className="text-xl font-bold text-legal-900 mb-2">الأركان الأربعة</h3><p className="text-legal-600 text-lg">غياب أحد هذه الأركان يعني انتفاء صفة المجتمع الدولي.</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SOCIETY_COMPONENTS.map((comp, idx) => {
          const isActive = activeCard === idx;
          return (
            <div 
              key={idx} 
              onClick={() => setActiveCard(isActive ? null : idx)}
              className={`relative p-8 rounded-3xl shadow-soft cursor-pointer transition-all duration-500 border overflow-hidden flex flex-col ${isActive ? 'bg-legal-900 text-white shadow-2xl scale-105 z-10' : 'bg-white hover:border-gold-300 hover:shadow-xl'}`}
            >
              <div className="flex justify-between mb-6"><h3 className={`text-2xl font-black ${isActive ? 'text-gold-400' : 'text-legal-900'}`}>{comp.title}</h3><span className="text-4xl font-black opacity-10">0{idx+1}</span></div>
              
              {/* HIDE DESCRIPTION WHEN ACTIVE */}
              {!isActive && (
                 <div className="mb-6 leading-relaxed text-lg text-legal-600 line-clamp-3 flex-1"><GlossaryText text={comp.description} /></div>
              )}
              
              {/* SHOW EXAMPLES WHEN ACTIVE */}
              {isActive && (
                <div className="animate-fade-in pt-4">
                  <div className="mb-6 p-6 bg-legal-800 rounded-2xl border border-legal-700">
                    <p className="text-sm font-bold text-gold-400 mb-4 flex gap-2 uppercase"><CheckCircle2 size={16}/> أمثلة تطبيقية</p>
                    <div className="flex flex-wrap gap-3">{comp.examples.map((ex, i) => <span key={i} className="bg-white/10 px-4 py-2 rounded-lg text-gray-100 border border-white/10">{ex}</span>)}</div>
                  </div>
                  <div className="flex gap-4 text-gold-100 font-medium bg-gradient-to-br from-gold-600 to-gold-700 p-6 rounded-2xl shadow-lg">
                    <Globe size={24} className="shrink-0 mt-1 text-gold-200" />
                    <span><strong className="text-white block mb-1">مثال واقعي:</strong> {comp.realWorld}</span>
                  </div>
                </div>
              )}

              {!isActive && <div className="mt-auto pt-6 border-t border-legal-50 flex justify-between items-center text-xs font-bold text-legal-400 group-hover:text-gold-600"><span>اضغط للتفاصيل</span><ArrowRight size={16} className="rotate-180"/></div>}
            </div>
          );
        })}
      </div>
      <HandoutBox content={COMPONENT_ENRICHMENT.content} source={COMPONENT_ENRICHMENT.sourcePage} />
      <TeacherLockedPanel questions={COMPONENTS_DEEP_DIVE} />
    </div>
  );
};

export const HistorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const activeEvent = HISTORY_EVENTS[activeTab];

  const renderExtraInfo = (info: string) => {
    if (info.includes('|||')) {
      const parts = info.split('|||');
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {parts.map((part, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border-2 relative ${idx === 0 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${idx === 0 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                 {idx === 0 ? 'المحطة الأولى (سومر)' : 'المحطة الثانية (مصر والحيثيين)'}
              </div>
              <div className="mt-2"><GlossaryText text={part.trim()} /></div>
            </div>
          ))}
        </div>
      );
    }
    return <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mb-10"><GlossaryText text={info} /></div>;
  };

  return (
    <div className="flex flex-col h-full pb-12">
      <div className="flex justify-between max-w-3xl mx-auto mb-10 px-4">
          {HISTORY_EVENTS.map((event, idx) => (
            <button key={idx} onClick={() => {setActiveTab(idx); setShowQuiz(false)}} className="group flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center text-xl shadow-sm transition-all ${activeTab === idx ? 'bg-legal-900 border-gold-500 text-white scale-110' : 'bg-white border-legal-200 text-legal-400'}`}>{event.icon}</div>
              <span className={`mt-3 text-sm font-bold ${activeTab === idx ? 'text-legal-900' : 'text-legal-400'}`}>{event.civilization}</span>
            </button>
          ))}
      </div>

      <SectionCard className="flex-1 relative">
        <div className={showQuiz ? 'blur-sm opacity-40 pointer-events-none' : ''}>
            <div className="mb-8 border-b pb-6"><span className="px-3 py-1 rounded-full bg-gold-100 text-gold-700 font-bold text-xs">{activeEvent.period}</span><h2 className="text-4xl font-black text-legal-900 mt-2">{activeEvent.treatyName}</h2></div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
               {Object.entries(activeEvent.details).map(([key, val], i) => key !== 'extraInfo' && (
                   <div key={i} className="bg-legal-50 rounded-xl p-5 border border-legal-100"><span className="text-xs text-legal-400 font-bold block mb-2 uppercase">{key}</span><p className="text-base font-bold text-legal-800"><GlossaryText text={val} /></p></div>
               ))}
            </div>
            {activeEvent.details.extraInfo && renderExtraInfo(activeEvent.details.extraInfo)}
            <div className="bg-legal-900 text-white rounded-2xl p-8 shadow-xl mb-8"><h4 className="font-bold text-gold-400 mb-6 text-xl flex gap-2"><Trophy/> أهم المبادئ</h4><div className="grid md:grid-cols-2 gap-4">{activeEvent.achievements.map((ach,i)=><div key={i} className="flex gap-3"><span className="w-2 h-2 bg-gold-500 rounded-full mt-2.5"></span><span className="text-legal-100">{ach}</span></div>)}</div></div>
            {activeEvent.enrichment && <HandoutBox content={activeEvent.enrichment} />}
        </div>
        {!showQuiz && <div className="absolute bottom-8 left-8"><button onClick={() => setShowQuiz(true)} className="px-8 py-4 rounded-full shadow-glow font-bold bg-gold-500 text-white flex items-center gap-2 hover:scale-105 transition-transform"><HelpCircle/> ابدأ الاختبار</button></div>}
        {showQuiz && <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl"><div className="bg-white border shadow-2xl rounded-3xl p-10 max-w-2xl w-full relative"><button onClick={() => setShowQuiz(false)} className="absolute top-6 left-6"><XCircle/></button><h3 className="text-2xl font-black mb-8">{activeEvent.quiz.question}</h3><div className="space-y-4">{activeEvent.quiz.options.map((opt,i)=><button key={i} onClick={() => alert(i === activeEvent.quiz.correctIndex ? 'صحيح!' : 'خطأ')} className="w-full text-right p-5 rounded-xl border-2 font-bold hover:border-gold-400">{opt}</button>)}</div></div></div>}
      </SectionCard>
    </div>
  );
};

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

  if (mode === 'play') {
    return (
      <div className="space-y-10 pb-12">
         <div className="bg-legal-900 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto text-center text-white relative overflow-hidden border-4 border-gold-500 min-h-[500px] flex flex-col justify-center">
          {!isFinished ? (
            <div className="animate-fade-in">
              <div className="flex justify-between text-legal-400 mb-8 text-sm font-mono px-4">
                <span>السؤال {gameIndex + 1} من {CLASSIFICATION_GAME_ITEMS.length}</span>
                <span>النقاط: {score}</span>
              </div>
              <h3 className="text-legal-300 mb-6 text-xl">ما هو التصنيف القانوني لهذا الكيان؟</h3>
              <h2 className="text-5xl font-black mb-12 text-white">{CLASSIFICATION_GAME_ITEMS[gameIndex].name}</h2>
              
              {lastFeedback ? (
                <div className={`p-6 rounded-2xl text-2xl font-bold animate-bounce-in mx-auto max-w-xl ${lastFeedback.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {lastFeedback.msg}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <button onClick={() => handleGameChoice('state')} className="p-6 bg-legal-800 hover:bg-gold-500 hover:text-legal-900 rounded-2xl font-bold text-lg transition-all border border-legal-700 hover:border-gold-400 shadow-lg">دولة (شخص أصلي)</button>
                  <button onClick={() => handleGameChoice('org')} className="p-6 bg-legal-800 hover:bg-gold-500 hover:text-legal-900 rounded-2xl font-bold text-lg transition-all border border-legal-700 hover:border-gold-400 shadow-lg">منظمة (شخص وظيفي)</button>
                  <button onClick={() => handleGameChoice('special')} className="p-6 bg-legal-800 hover:bg-gold-500 hover:text-legal-900 rounded-2xl font-bold text-lg transition-all border border-legal-700 hover:border-gold-400 shadow-lg">وضع خاص</button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 animate-fade-in">
              <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 text-legal-900 animate-bounce"><Trophy size={48} /></div>
              <h2 className="text-4xl font-black mb-4">انتهت اللعبة!</h2>
              <p className="text-2xl mb-10 text-legal-300">نتيجتك النهائية: <span className="text-gold-400 font-black">{score}</span> من {CLASSIFICATION_GAME_ITEMS.length}</p>
              <button onClick={resetGame} className="bg-white text-legal-900 px-10 py-4 rounded-full font-bold text-xl hover:bg-gold-400 transition-all shadow-lg hover:scale-105">العودة للدرس</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
       <div className="grid lg:grid-cols-3 gap-8">
        {SUBJECTS_DATA.map((subj, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-soft p-8 border border-legal-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 transition-transform group-hover:scale-110 ${idx===0?'bg-blue-600':idx===1?'bg-purple-600':'bg-teal-600'}`}>{idx===0?<Building2 size={32}/>:idx===1?<Users2 size={32}/>:<ShieldCheck size={32}/>}</div>
            <h3 className="text-2xl font-black text-legal-900 mb-3">{subj.type}</h3>
            <p className="text-legal-600 mb-6 h-16 leading-relaxed"><GlossaryText text={subj.desc} /></p>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-legal-50">{subj.elements.map((el,i)=><span key={i} className="text-xs font-bold bg-legal-50 px-3 py-1 rounded-full text-legal-600">{el}</span>)}</div>
          </div>
        ))}
       </div>
       <HandoutBox content={SUBJECTS_ENRICHMENT.content} source={SUBJECTS_ENRICHMENT.sourcePage} />
       
       <div className="bg-gradient-to-r from-legal-900 to-legal-800 rounded-3xl p-10 text-white flex flex-col md:flex-row justify-between items-center cursor-pointer shadow-2xl hover:shadow-gold-500/20 border border-legal-700 transition-all group" onClick={() => setMode('play')}>
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-black mb-2 flex items-center gap-3"><Trophy className="text-gold-500" size={32}/> لعبة الخبير الدولي</h3>
            <p className="text-legal-300 text-lg">هل يمكنك تصنيف الكيانات الدولية بشكل صحيح؟</p>
          </div>
          <div className="bg-gold-500 text-legal-900 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border-4 border-legal-800">
            <Play size={32} fill="currentColor" className="ml-1"/>
          </div>
       </div>
       
       <TeacherLockedPanel questions={SUBJECTS_DEEP_DIVE} />
    </div>
  );
};

export const ModernConnectSection: React.FC = () => (
  <SectionCard className="pb-12">
    <h3 className="text-3xl font-black text-legal-900 mb-10 flex items-center gap-4 border-b pb-6"><Globe size={32} className="text-gold-500"/> ربط الماضي بالحاضر</h3>
    <div className="space-y-4 mb-10">
      {MODERN_EXAMPLES.map((item, i) => (
        <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-legal-50 rounded-2xl border border-legal-200 hover:bg-white hover:shadow-md transition-all group">
          <div className="flex-1 text-center md:text-right">
             <span className="block text-xs font-bold text-legal-400 mb-1 tracking-wider">{item.period}</span>
             <span className="text-lg font-bold text-legal-600 group-hover:text-legal-900">{item.old}</span>
          </div>
          <ArrowRight className="text-legal-300 rotate-90 md:rotate-180" />
          <div className="flex-1 text-center md:text-left"><span className="inline-block px-5 py-2 rounded-xl bg-white border border-legal-200 text-legal-900 font-bold shadow-sm group-hover:border-gold-400">{item.new}</span></div>
        </div>
      ))}
    </div>
    <HandoutBox content={MODERN_ENRICHMENT.content} source={MODERN_ENRICHMENT.sourcePage} />
    <TeacherLockedPanel questions={MODERN_DEEP_DIVE} />
  </SectionCard>
);

export const ReviewSection: React.FC = () => {
  const [revealedTF, setRevealedTF] = useState<number[]>([]);
  const [revealedNotes, setRevealedNotes] = useState<number[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [pendingNoteIdx, setPendingNoteIdx] = useState<number | null>(null);

  const toggleRevealTF = (idx: number) => {
    if (!revealedTF.includes(idx)) setRevealedTF([...revealedTF, idx]);
  };

  const handleNoteClick = (idx: number) => {
    if (revealedNotes.includes(idx)) return;
    setPendingNoteIdx(idx);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'omar2016') {
      if (pendingNoteIdx !== null) setRevealedNotes([...revealedNotes, pendingNoteIdx]);
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
    <div className="space-y-10 pb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 rounded-3xl shadow-xl text-center"><MessageCircle size={40} className="mx-auto mb-4"/><h2 className="text-4xl font-black">المراجعة والنقاش</h2></div>
      <div className="grid lg:grid-cols-2 gap-8">
        <SectionCard>
          <h3 className="font-bold text-2xl mb-8 flex gap-2"><CheckCircle2 className="text-green-500"/> صواب أم خطأ؟</h3>
          <div className="space-y-4">
            {REVIEW_CONTENT.trueFalse.map((item, i) => {
              const isRevealed = revealedTF.includes(i);
              return (
                <div key={i} className="bg-legal-50 p-4 rounded-xl">
                  <p className="font-bold mb-4 text-lg text-legal-900">{item.statement}</p>
                  {!isRevealed ? (
                    <div className="flex gap-3">
                      <button onClick={() => toggleRevealTF(i)} className="flex-1 bg-white border-2 border-legal-200 hover:border-green-500 hover:text-green-600 py-3 rounded-xl font-bold transition-all">صواب</button>
                      <button onClick={() => toggleRevealTF(i)} className="flex-1 bg-white border-2 border-legal-200 hover:border-red-500 hover:text-red-600 py-3 rounded-xl font-bold transition-all">خطأ</button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl animate-fade-in border ${item.isTrue ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                      <div className="flex items-center gap-2 font-bold mb-2 text-xl">{item.isTrue ? <Check size={24}/> : <X size={24}/>}{item.isTrue ? 'إجابة صحيحة' : 'إجابة خاطئة'}</div>
                      <p className="font-medium">{item.correction}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>
        <SectionCard>
          <h3 className="font-bold text-2xl mb-8 flex gap-2"><Users2 className="text-blue-600"/> محاور النقاش</h3>
          <div className="space-y-6">
            {REVIEW_CONTENT.topics.map((topic, i) => {
              const isRevealed = revealedNotes.includes(i);
              return (
                <div key={i} className="bg-legal-50 p-6 rounded-xl border-r-4 border-gold-500 shadow-sm">
                  <h4 className="font-black text-xl mb-4 text-legal-900">{topic.title}</h4>
                  <ul className="space-y-3 mb-4">{topic.points.map((p, pi) => <li key={pi} className="flex items-start gap-2 text-legal-700 font-medium"><span className="text-gold-500 mt-1.5">•</span>{p}</li>)}</ul>
                  {topic.teacherNotes && (
                    <div className="mt-6 pt-4 border-t border-legal-200">
                      {!isRevealed ? (
                        <button onClick={() => handleNoteClick(i)} className="flex items-center gap-2 text-sm font-bold text-legal-400 hover:text-gold-600 transition-colors"><Lock size={14} /> كشف التوجيه الأكاديمي (للأستاذ)</button>
                      ) : (
                        <div className="bg-white p-4 rounded-xl border border-gold-200 shadow-sm animate-fade-in"><h5 className="text-xs font-bold text-gold-600 mb-2 flex items-center gap-1 uppercase tracking-wider"><Lightbulb size={14} /> توجيه أكاديمي</h5><p className="text-legal-800 leading-relaxed whitespace-pre-line">{topic.teacherNotes}</p></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
      {showPasswordModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={closeModal}>
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm transform transition-all scale-100" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 bg-legal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-legal-900"><Lock size={24} /></div>
            <h4 className="font-black text-xl text-center mb-6 text-legal-900">مصادقة الأستاذ</h4>
            <form onSubmit={handlePasswordSubmit}>
              <input type="password" autoFocus placeholder="الرمز السري" className="w-full text-center p-4 border-2 border-legal-100 rounded-xl mb-4 font-mono text-lg focus:border-gold-500 outline-none transition-colors" value={passwordInput} onChange={e => setPasswordInput(e.target.value)}/>
              <div className="flex gap-3"><button type="submit" className="flex-1 bg-legal-900 text-white py-3 rounded-xl font-bold hover:bg-legal-800 transition-colors">فتح</button><button type="button" onClick={closeModal} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">إلغاء</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const SummarySection: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="bg-legal-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Book className="text-gold-500" size={32} />
            الملخص النظري الشامل
          </h2>
          <p className="text-legal-300 text-lg">خلاصة المحاضرة في نقاط مركزة للحفظ والمراجعة.</p>
        </div>
        <button 
          onClick={() => window.print()} 
          className="bg-white text-legal-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gold-400 transition-colors shadow-lg"
        >
          <Printer size={20} />
          طباعة الملخص
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SUMMARY_CARDS.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-soft overflow-hidden border border-legal-100 hover:shadow-xl transition-shadow">
            <div className={`h-2 bg-gradient-to-r ${card.colorClass}`} />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${card.colorClass}`}>
                  <card.icon size={24} />
                </div>
                <h3 className="text-2xl font-black text-legal-900">{card.title}</h3>
              </div>
              
              <div className="space-y-6">
                {card.content.map((section, sIdx) => (
                  <div key={sIdx} className="relative">
                    {section.subtitle && <h4 className="font-bold text-legal-400 uppercase text-xs tracking-widest mb-3">{section.subtitle}</h4>}
                    
                    {section.type === 'list' && (
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-legal-700 font-medium text-lg">
                            <span className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br ${card.colorClass}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.type === 'cards' && (
                      <div className="grid gap-3">
                         {section.items.map((item, i) => {
                           const [title, desc] = item.split(':');
                           return (
                             <div key={i} className="bg-legal-50 p-4 rounded-xl border border-legal-100">
                               <span className="font-black text-legal-900 block mb-1">{title}</span>
                               {desc && <span className="text-legal-600 block">{desc}</span>}
                             </div>
                           )
                         })}
                      </div>
                    )}

                    {section.type === 'timeline' && (
                       <div className="relative border-r-2 border-legal-100 mr-3 space-y-6 py-2">
                         {section.items.map((item, i) => {
                            const [title, desc] = item.split(':');
                            return (
                              <div key={i} className="relative pr-6">
                                <span className={`absolute -right-[9px] top-2 w-4 h-4 rounded-full border-2 border-white shadow-sm bg-gradient-to-br ${card.colorClass}`} />
                                <span className="font-bold text-legal-900 block">{title}</span>
                                <span className="text-legal-600">{desc}</span>
                              </div>
                            )
                         })}
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-legal-400 text-sm mt-8 font-mono">
        تم إعداد هذا الملخص بناءً على مطبوعة د. إسالمة محمد أمين
      </div>
    </div>
  );
};

export const ExitTicket: React.FC = () => {
  const [view, setView] = useState<'student' | 'teacherAuth' | 'teacherView'>('student');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', learn: '', question: '' });
  
  // Mock database for demonstration
  const [allResponses, setAllResponses] = useState([
    { name: 'طالب 1', learn: 'الفرق بين المجتمع الدولي والوطني', question: 'هل الفيتو قانوني؟' },
    { name: 'طالب 2', learn: 'أهمية معاهدة وستفاليا', question: 'كيف نشأت الأمم المتحدة؟' }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'omar2016') {
      setView('teacherView');
      setError('');
    } else {
      setError('كلمة المرور خاطئة');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.learn && formData.question) {
        setAllResponses([...allResponses, formData]);
        setSubmitted(true);
    }
  };

  if (view === 'teacherAuth') {
    return (
      <SectionCard className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-legal-100 text-legal-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-legal-900">دخول الأستاذ</h2>
        <form onSubmit={handleLogin} className="space-y-4">
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-legal-50 border border-legal-200 rounded-xl text-center font-mono text-lg focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                placeholder="الرمز السري"
                autoFocus
            />
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-legal-900 text-white py-3 rounded-xl font-bold hover:bg-legal-800 transition-colors">دخول</button>
                <button type="button" onClick={() => setView('student')} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">رجوع</button>
            </div>
        </form>
      </SectionCard>
    );
  }

  if (view === 'teacherView') {
    return (
       <SectionCard>
         <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-black text-legal-900 flex items-center gap-3">
                <Unlock className="text-green-500" />
                ردود الطلاب ({allResponses.length})
            </h2>
            <button onClick={() => { setView('student'); setPassword(''); }} className="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">تسجيل الخروج</button>
         </div>
         <div className="grid gap-4">
            {allResponses.length === 0 && <p className="text-center text-gray-400 py-8">لا توجد ردود بعد.</p>}
            {allResponses.map((res, i) => (
                <div key={i} className="bg-legal-50 p-6 rounded-xl border border-legal-100 hover:border-gold-300 transition-colors">
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-legal-900">{res.name || 'مجهول'}</span>
                        <span className="text-xs text-legal-400 font-mono">#{i+1}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div className="bg-white p-3 rounded-lg border border-legal-200">
                            <span className="block text-xs font-bold text-green-600 mb-1">تعلمت:</span>
                            <p className="text-legal-700 text-sm">{res.learn}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-legal-200">
                            <span className="block text-xs font-bold text-red-600 mb-1">سؤال:</span>
                            <p className="text-legal-700 text-sm">{res.question}</p>
                        </div>
                    </div>
                </div>
            ))}
         </div>
       </SectionCard>
    );
  }

  if (submitted) {
    return (
      <SectionCard className="max-w-xl mx-auto text-center py-12">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-legal-900 mb-4">تم استلام بطاقتك!</h2>
        <p className="text-legal-600 text-lg mb-8">شكراً لمشاركتك الفعالة في درس اليوم.</p>
        <button onClick={() => { setSubmitted(false); setFormData({name:'', learn:'', question:''}); }} className="text-legal-400 hover:text-legal-600 underline font-bold text-sm">إرسال بطاقة أخرى</button>
        
        <div className="mt-12 pt-6 border-t border-legal-100">
            <button onClick={() => setView('teacherAuth')} className="text-xs text-legal-300 hover:text-legal-500 flex items-center gap-1 mx-auto transition-colors">
                <Lock size={12} /> بوابة الأستاذ
            </button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard className="max-w-3xl mx-auto border-t-8 border-legal-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-legal-900 mb-3 flex justify-center items-center gap-3">
            <div className="bg-gold-500 text-white p-2 rounded-lg"><ClipboardCheck size={28}/></div>
            بطاقة الخروج
        </h2>
        <p className="text-legal-500 text-lg">تذكرتك لمغادرة القاعة: شاركنا ماذا تعلمت وماذا بقي غامضاً.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-legal-700 mb-2">الاسم (اختياري)</label>
            <input 
                type="text" 
                className="w-full p-4 bg-legal-50 border-2 border-transparent focus:bg-white focus:border-gold-400 rounded-xl outline-none transition-all font-bold text-legal-800"
                placeholder="اكتب اسمك هنا..."
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-legal-700 mb-2 flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> شيء جديد تعلمته اليوم</label>
                <textarea 
                    required
                    className="w-full p-4 bg-legal-50 border-2 border-transparent focus:bg-white focus:border-green-400 rounded-xl outline-none transition-all h-32 resize-none"
                    placeholder="لخص أهم فكرة رسخت في ذهنك..."
                    value={formData.learn}
                    onChange={e => setFormData({...formData, learn: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-legal-700 mb-2 flex items-center gap-2"><HelpCircle size={16} className="text-red-500"/> سؤال أو نقطة غامضة</label>
                <textarea 
                    required
                    className="w-full p-4 bg-legal-50 border-2 border-transparent focus:bg-white focus:border-red-400 rounded-xl outline-none transition-all h-32 resize-none"
                    placeholder="ما الذي تود معرفة المزيد عنه؟"
                    value={formData.question}
                    onChange={e => setFormData({...formData, question: e.target.value})}
                />
            </div>
        </div>

        <button type="submit" className="w-full py-4 bg-legal-900 text-white text-xl font-bold rounded-2xl hover:bg-legal-800 hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-3">
            تسليم البطاقة <ArrowRight className="rotate-180" />
        </button>
      </form>

      <div className="mt-8 text-center">
        <button onClick={() => setView('teacherAuth')} className="text-xs text-legal-200 hover:text-legal-400 transition-colors">Admin Login</button>
      </div>
    </SectionCard>
  );
};