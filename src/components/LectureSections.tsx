import React, { useState, useEffect } from 'react';
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
  ClipboardCheck,
  ExternalLink,
  History
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
  GOOGLE_FORM_URL,
  GOOGLE_FORM_RESPONSES_URL,
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

// --- Helper: Rich Text (Ultra Safe Version) ---
const RichGlossaryText: React.FC<{ text: string }> = ({ text }) => {
  if (!text || typeof text !== 'string') return <span className="text-gray-400 text-xs">...</span>;

  const lines = text.split('\n');
  
  return (
    <div className="space-y-3">
      {lines.map((line, lineIdx) => {
        let content = line.trim();
        if (!content) return null; 
        
        // Handle List Item
        const isList = content.startsWith('* ');
        if (isList) content = content.substring(2);

        // Handle Bold (**text**)
        const parts = content.split(/(\*\*.*?\*\*)/g);
        
        return (
          <div key={lineIdx} className={`${isList ? 'flex items-start gap-3 mr-2' : ''}`}>
            {isList && <div className="w-2 h-2 rounded-full bg-gold-500 mt-2.5 shrink-0 shadow-sm" />}
            <span className={`text-legal-700 leading-relaxed ${isList ? 'text-base' : 'text-lg'}`}>
               {parts.map((part, partIdx) => {
                 if (part.startsWith('**') && part.endsWith('**')) {
                   const cleanPart = part.substring(2, part.length - 2);
                   return <strong key={partIdx} className="text-legal-900 font-bold bg-gold-50 px-1 rounded"><GlossaryText text={cleanPart} /></strong>;
                 }
                 return <GlossaryText key={partIdx} text={part} />;
               })}
            </span>
          </div>
        );
      })}
    </div>
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
                      <div className={`transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-2'}`}>
                        <div className="text-lg text-blue-900 font-medium leading-relaxed">
                            <GlossaryText text={row.international} />
                        </div>
                      </div>
                      {!isRevealed && (
                          <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-legal-200 text-legal-400 shadow-sm group-hover:scale-105 transition-transform">
                                  اضغط للكشف
                              </span>
                          </div>
                      )}
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
    <div className="space-y-10">
       <div className="bg-gradient-to-r from-white to-legal-50 p-8 rounded-2xl shadow-soft border-r-4 border-gold-500 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 -rotate-12 transform translate-x-10 -translate-y-4">
             <Scale size={120} />
        </div>
        <p className="text-legal-800 text-xl font-serif leading-loose relative z-10">
          لإطلاق مصطلح <span className="font-bold text-legal-900">"مجتمع دولي"</span> على أي تجمع، يجب توفر <span className="text-gold-600 font-bold bg-gold-50 px-2 rounded">4 أركان (مقومات)</span> لا غنى عنها. غياب أحدها يعني انتفاء صفة المجتمع الدولي.
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
                relative p-8 rounded-2xl shadow-card cursor-pointer transition-all duration-500 border overflow-hidden group
                ${isActive 
                  ? 'bg-legal-900 text-white border-legal-900 md:col-span-2 shadow-2xl scale-[1.01]' 
                  : 'bg-white text-legal-800 border-transparent hover:border-gold-200 hover:shadow-lg hover:-translate-y-1'
                }
              `}
            >
              <span className={`absolute top-4 left-6 text-6xl font-black opacity-5 font-serif transition-colors ${isActive ? 'text-white' : 'text-legal-900'}`}>
                  0{idx + 1}
              </span>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-gold-500 text-legal-900' : 'bg-legal-50 text-gold-600 group-hover:bg-gold-50'}`}>
                    {idx === 0 ? <Globe size={24} /> : idx === 1 ? <Users2 size={24}/> : idx === 2 ? <ShieldCheck size={24}/> : <Scale size={24}/>}
                </div>
                <h3 className={`text-2xl font-bold font-serif ${isActive ? 'text-gold-400' : 'text-legal-900'}`}>
                  {comp.title}
                </h3>
              </div>
              
              {!isActive && (
                <div className="mb-4 leading-loose text-base text-legal-600 line-clamp-3 relative z-10 font-medium">
                   {/* Don't show full text when closed to keep it clean */}
                </div>
              )}
              
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isActive ? 'max-h-[800px] opacity-100 pt-4' : 'max-h-0 opacity-0'}`}>
                {/* Description Text shown ONLY when active */}
                {isActive && (
                  <div className="mb-8 leading-loose text-lg text-gray-300 relative z-10 font-medium border-b border-legal-700 pb-6">
                     <GlossaryText text={comp.description} />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div>
                         <p className="text-sm font-bold text-gold-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                             <Check size={16}/> أمثلة تطبيقية:
                         </p>
                         <div className="flex flex-wrap gap-3">
                            {comp.examples.map((ex, i) => (
                            <span key={i} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-gray-100 border border-white/10 transition-colors backdrop-blur-sm">
                                {ex}
                            </span>
                            ))}
                         </div>
                    </div>
                    
                    <div className="bg-legal-800/50 p-6 rounded-xl border border-legal-700 backdrop-blur-sm">
                        <div className="flex items-start gap-3 text-base text-gray-200 font-medium leading-relaxed">
                            <Globe size={20} className="text-gold-500 mt-1 shrink-0" />
                            <span><strong className="text-gold-400 block mb-1">واقعنا اليوم:</strong> {comp.realWorld}</span>
                        </div>
                    </div>
                </div>
              </div>
              
              {!isActive && (
                <div className="mt-6 pt-4 border-t border-legal-50 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                   <span className="text-xs font-bold text-legal-400">اضغط للمزيد</span>
                   <div className="text-xs text-gold-600 font-bold flex items-center gap-1 bg-gold-50 px-3 py-1 rounded-full">
                     عرض التفاصيل <ArrowRight size={12} className="rotate-180" />
                   </div>
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
  const [isQuizLocked, setIsQuizLocked] = useState(false); 

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

  const renderExtraInfo = (text?: string) => {
    if (!text) return null;
    
    // Check for separator
    const hasSeparator = text.includes('|||');
    
    if (hasSeparator) {
        const parts = text.split('|||');
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 font-bold text-xl font-serif">1</div>
                    <RichGlossaryText text={parts[0]} />
                </div>
                <div className="bg-amber-50 border border-amber-100 p-8 rounded-2xl flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4 font-bold text-xl font-serif">2</div>
                    <RichGlossaryText text={parts[1]} />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-8 rounded-2xl mb-10 shadow-sm">
             <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-xl font-serif"><BookOpen size={24} className="text-blue-500"/> تفاصيل المحطة التاريخية</h4>
             <RichGlossaryText text={text} />
        </div>
    );
  };

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide shrink-0 px-1">
        {HISTORY_EVENTS.map((event, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-3 text-base shadow-sm ${
              activeTab === idx
                ? 'bg-legal-900 text-white shadow-xl scale-105 ring-2 ring-gold-500 ring-offset-2'
                : 'bg-white text-legal-500 hover:bg-legal-50 border border-legal-100'
            }`}
          >
            <span className="text-xl">{event.icon}</span>
            <span className={activeTab === idx ? 'text-gold-400' : ''}>{event.civilization}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-soft border border-legal-100 overflow-hidden flex-1 flex flex-col relative transition-all duration-300">
        <div className={`p-8 sm:p-12 flex-1 overflow-y-auto ${showQuiz ? 'blur-sm opacity-50 pointer-events-none' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-legal-100">
              <div>
                <span className="text-gold-600 font-bold tracking-widest text-xs uppercase bg-gold-50 px-3 py-1 rounded-full mb-3 inline-block">{activeEvent.period}</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-legal-900 mt-1 font-serif">{activeEvent.treatyName}</h2>
              </div>
              <div className="mt-4 md:mt-0 opacity-10">
                 <History size={64} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
               {Object.entries(activeEvent.details).map(([key, val], i) => {
                 if (key === 'extraInfo') return null;
                 return (
                   <div key={i} className="bg-legal-50/50 p-6 rounded-2xl border border-legal-100 hover:border-gold-200 transition-colors">
                     <span className="text-xs text-legal-400 font-bold block mb-2 uppercase tracking-wide">
                       {key === 'parties' ? 'الأطراف' : key === 'topic' ? 'الموضوع' : 'الآلية/الحل'}
                     </span>
                     <p className="text-base font-bold text-legal-800 leading-relaxed font-serif"><GlossaryText text={val} /></p>
                   </div>
                 );
               })}
            </div>

            {/* Detailed Breakdown */}
            {renderExtraInfo(activeEvent.details.extraInfo)}

            {/* Milestones */}
            <div className="bg-legal-900 text-white rounded-2xl p-8 mb-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h4 className="font-bold text-gold-400 flex items-center gap-3 mb-6 text-xl relative z-10 font-serif">
                <Trophy size={24} />
                أهم المحطات والمبادئ المستخلصة
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {activeEvent.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-gold-500 mt-2.5 shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <span className="text-base font-medium leading-relaxed text-gray-100">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modern Impact */}
            {activeEvent.modernImpact && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-8 shadow-sm">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <Globe size={18} />
                  الأثر في عالمنا اليوم:
                </h4>
                <p className="text-green-900 leading-relaxed font-medium">
                  <GlossaryText text={activeEvent.modernImpact} />
                </p>
              </div>
            )}

            {activeEvent.discussionQuestions && (
               <TeacherLockedPanel title="مناقشة تاريخية معمقة" questions={activeEvent.discussionQuestions} />
            )}

            {activeEvent.enrichment && (
              <HandoutBox content={activeEvent.enrichment} source="د. إسالمة محمد أمين - المطبوعة الجامعية" />
            )}
        </div>

        {/* Quiz Start Button */}
        {!showQuiz && (
          <div className="absolute bottom-10 left-10 z-10">
            <button 
              onClick={() => isQuizLocked ? {} : setShowQuiz(true)}
              className={`
                px-8 py-4 rounded-full shadow-glow font-bold flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95
                ${isQuizLocked 
                  ? 'bg-gray-400 text-white opacity-90 cursor-not-allowed' 
                  : 'bg-gold-500 hover:bg-gold-600 text-white'
                }
              `}
            >
              <span className="bg-white/20 p-1 rounded-full">{isQuizLocked ? <Lock size={18} /> : <HelpCircle size={18} />}</span>
              <span className="text-lg">{isQuizLocked ? 'اختبار المرحلة (مغلق)' : 'اختبر معلوماتك الآن'}</span>
            </button>
          </div>
        )}

        {/* Quiz Modal */}
        {showQuiz && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 animate-fade-in bg-white/60 backdrop-blur-sm">
             <div className="bg-white border border-legal-100 shadow-2xl rounded-3xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto ring-4 ring-legal-50">
                <button onClick={() => setShowQuiz(false)} className="absolute top-6 left-6 text-legal-400 hover:text-red-500 bg-legal-50 p-2 rounded-full transition-colors"><X size={20} /></button>
                
                <span className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-2 block">سؤال التقييم</span>
                <h3 className="text-2xl font-bold text-legal-900 mb-8 pr-8 leading-snug font-serif">{activeEvent.quiz.question}</h3>
                
                <div className="space-y-4 mb-8">
                  {activeEvent.quiz.options.map((option, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === activeEvent.quiz.correctIndex;
                    let btnClass = "w-full text-right p-5 rounded-2xl border-2 font-medium transition-all text-lg flex justify-between items-center group ";
                    
                    if (selectedOption === null) btnClass += "border-legal-100 hover:border-gold-400 hover:bg-gold-50 hover:shadow-md text-legal-700";
                    else if (isCorrect) btnClass += "border-green-500 bg-green-50 text-green-900 shadow-sm";
                    else if (isSelected) btnClass += "border-red-500 bg-red-50 text-red-900 shadow-sm";
                    else btnClass += "border-legal-100 opacity-40 grayscale";

                    return (
                      <button key={i} disabled={selectedOption !== null} onClick={() => handleQuizAnswer(i)} className={btnClass}>
                        <span>{option}</span>
                        {selectedOption !== null && isCorrect && <CheckCircle2 className="text-green-600" size={24} />}
                        {isSelected && !isCorrect && <XCircle className="text-red-600" size={24} />}
                        {selectedOption === null && <div className="w-4 h-4 rounded-full border-2 border-legal-300 group-hover:border-gold-500"></div>}
                      </button>
                    );
                  })}
                </div>
                {quizFeedback && (
                  <div className={`p-6 rounded-2xl text-base animate-slide-up ${quizFeedback === 'correct' ? 'bg-green-100 text-green-900 border border-green-200' : 'bg-red-100 text-red-900 border border-red-200'}`}>
                    <span className="font-bold text-lg mb-2 flex items-center gap-2">
                        {quizFeedback === 'correct' ? <CheckCircle2 size={20}/> : <XCircle size={20}/>}
                        {quizFeedback === 'correct' ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                    </span>
                    <p className="opacity-90 leading-relaxed">{activeEvent.quiz.explanation}</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Subjects Section (ROBUST VERSION) ---
export const SubjectsSection: React.FC = () => {
  const [mode, setMode] = useState<'learn' | 'play'>('learn');
  const [score, setScore] = useState(0);
  const [gameIndex, setGameIndex] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{msg: string, correct: boolean} | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // CRITICAL FIX: Ensure game data exists
  const hasGameItems = CLASSIFICATION_GAME_ITEMS && CLASSIFICATION_GAME_ITEMS.length > 0;

  if (!hasGameItems) {
    return <div className="p-10 text-center text-legal-500">جاري تحميل بيانات اللعبة...</div>;
  }

  const handleGameChoice = (type: 'state' | 'org' | 'special') => {
    // Safety check
    if (gameIndex >= CLASSIFICATION_GAME_ITEMS.length) return;

    const item = CLASSIFICATION_GAME_ITEMS[gameIndex];
    const isCorrect = item.type === type;
    
    if (isCorrect) setScore(s => s + 1);
    
    setLastFeedback({ 
      msg: isCorrect ? item.feedback : 'إجابة خاطئة! حاول التذكر.', 
      correct: isCorrect 
    });
    
    setTimeout(() => {
      if (gameIndex < CLASSIFICATION_GAME_ITEMS.length - 1) {
        setGameIndex(g => g + 1);
        setLastFeedback(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameIndex(0);
    setScore(0);
    setIsFinished(false);
    setLastFeedback(null);
    setMode('learn');
  };

  // RENDER GAME MODE
  if (mode === 'play') {
    // Safety guard for rendering current item
    const currentItem = CLASSIFICATION_GAME_ITEMS[gameIndex];

    return (
      <div className="bg-orange-900 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-3xl mx-auto text-center text-white relative overflow-hidden border-4 border-orange-500/50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        {!isFinished && currentItem ? (
          <div className="relative z-10">
            <div className="flex justify-between text-orange-200 mb-10 text-sm font-mono tracking-wider">
              <span>Question {gameIndex + 1} / {CLASSIFICATION_GAME_ITEMS.length}</span>
              <span className="text-orange-400">Score: {score}</span>
            </div>
            
            <div className="mb-12">
               <h3 className="text-orange-200 mb-6 text-lg font-light">ما هو التصنيف القانوني لهذا الكيان؟</h3>
               <h2 className="text-5xl font-black mb-4 font-serif text-white drop-shadow-lg">{currentItem.name}</h2>
            </div>
            
            {lastFeedback ? (
              <div className={`p-8 rounded-2xl text-2xl font-bold animate-bounce-in shadow-xl ${lastFeedback.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {lastFeedback.msg}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <button onClick={() => handleGameChoice('state')} className="p-6 bg-white/10 hover:bg-orange-500 hover:text-white rounded-2xl font-bold text-lg transition-all border border-white/10 hover:shadow-glow hover:-translate-y-1">دولة <span className="block text-xs font-normal opacity-70 mt-1">شخص أصلي</span></button>
                <button onClick={() => handleGameChoice('org')} className="p-6 bg-white/10 hover:bg-orange-500 hover:text-white rounded-2xl font-bold text-lg transition-all border border-white/10 hover:shadow-glow hover:-translate-y-1">منظمة <span className="block text-xs font-normal opacity-70 mt-1">شخص وظيفي</span></button>
                <button onClick={() => handleGameChoice('special')} className="p-6 bg-white/10 hover:bg-orange-500 hover:text-white rounded-2xl font-bold text-lg transition-all border border-white/10 hover:shadow-glow hover:-translate-y-1">وضع خاص <span className="block text-xs font-normal opacity-70 mt-1">حالة استثنائية</span></button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-10 animate-fade-in relative z-10">
            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
                <Trophy size={48} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 font-serif">انتهى التحدي!</h2>
            <p className="text-2xl mb-12 text-orange-200">نتيجتك النهائية: <span className="font-mono font-bold text-white text-3xl mx-2">{score}</span> من {CLASSIFICATION_GAME_ITEMS.length}</p>
            <button onClick={resetGame} className="bg-white text-orange-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-100 transition-colors shadow-lg">العودة للدرس</button>
          </div>
        )}
      </div>
    );
  }

  // RENDER LEARN MODE
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {SUBJECTS_DATA.map((subj, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-card p-8 border-t-4 border-legal-600 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
            <div className="bg-legal-50 w-16 h-16 rounded-2xl flex items-center justify-center text-legal-800 mb-6 group-hover:bg-legal-900 group-hover:text-gold-500 transition-colors">
              {idx === 0 ? <Building2 size={32} /> : idx === 1 ? <Users2 size={32} /> : <ShieldCheck size={32} />}
            </div>
            <h3 className="text-xl font-bold text-legal-900 mb-3 font-serif"><GlossaryText text={subj.type} /></h3>
            <p className="text-sm text-legal-600 mb-6 h-16 leading-relaxed font-medium"><GlossaryText text={subj.desc} /></p>
            <div className="flex flex-wrap gap-2">
              {subj.elements.map((el, i) => <span key={i} className="text-xs border border-legal-200 px-3 py-1.5 rounded-full bg-legal-50 text-legal-600 font-bold">{el}</span>)}
            </div>
          </div>
        ))}
      </div>
      
      <HandoutBox content={SUBJECTS_ENRICHMENT.content} source={SUBJECTS_ENRICHMENT.sourcePage} />
      
      {/* Game Card Wrapper */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden group">
            <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-6 md:mb-0">
            <h3 className="text-3xl font-bold mb-3 font-serif text-white">لعبة: خبير التصنيف الدولي</h3>
            <p className="opacity-90 text-lg max-w-md leading-relaxed">تحدَّ نفسك واختبر قدرتك على التمييز بين أنواع أشخاص القانون الدولي في 60 ثانية.</p>
            </div>
            <button onClick={() => setMode('play')} className="bg-white text-orange-700 px-10 py-4 rounded-2xl font-bold hover:bg-orange-50 hover:scale-105 transition-all shadow-glow flex gap-3 items-center text-lg">
            <Play size={24} fill="currentColor" /> ابدأ التحدي
            </button>
        </div>
      </div>

      <TeacherLockedPanel questions={SUBJECTS_DEEP_DIVE} />
    </div>
  );
};

// --- Modern Section (ROBUST VERSION) ---
export const ModernConnectSection: React.FC = () => {
  // Safety check for modern examples
  if (!MODERN_EXAMPLES || MODERN_EXAMPLES.length === 0) {
    return <div className="p-10 text-center text-legal-500">جاري تحميل المحتوى...</div>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-soft p-10 border border-legal-100">
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-legal-100">
          <div className="bg-green-100 p-3 rounded-xl text-green-700">
              <Globe size={32} />
          </div>
          <div>
              <h3 className="text-3xl font-bold text-legal-900 font-serif">ربط الماضي بالحاضر</h3>
              <p className="text-legal-500 text-sm mt-1">كيف تحولت مبادئ الأجداد إلى قوانين الأحفاد؟</p>
          </div>
      </div>

      <div className="grid gap-6 mb-10">
         {/* Using Green header style from the Python PDF */}
         <div className="grid grid-cols-1 md:grid-cols-2 bg-green-800 text-white p-4 rounded-xl font-bold text-center mb-2 shadow-sm">
             <div>المبدأ القديم (الأصل التاريخي)</div>
             <div className="hidden md:block">التطبيق المعاصر (اليوم)</div>
         </div>

        {MODERN_EXAMPLES.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-green-50 rounded-2xl border border-green-100 hover:border-green-300 hover:bg-white hover:shadow-md transition-all group">
            <div className="flex flex-col sm:w-1/3">
              <span className="font-bold text-green-800 text-lg group-hover:text-green-900 transition-colors font-serif">
                {/* Use safe text renderer */}
                <GlossaryText text={item.old || ""} />
              </span>
              <span className="text-[11px] text-green-600 font-bold uppercase tracking-wider mt-1">{item.period || ""}</span>
            </div>
            
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-green-200 text-green-300 my-4 sm:my-0 shadow-sm group-hover:border-green-400 group-hover:text-green-600 transition-colors">
                <ArrowRight className="rotate-90 sm:rotate-180" size={20} />
            </div>
            
            <div className="sm:w-1/2 text-left">
              <span className="font-bold text-white bg-green-700 px-6 py-3 rounded-xl shadow-sm inline-block w-full sm:w-auto text-center text-lg">
                {/* Use safe text renderer */}
                <GlossaryText text={item.new || ""} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <HandoutBox content={MODERN_ENRICHMENT.content} source={MODERN_ENRICHMENT.sourcePage} />
      <TeacherLockedPanel questions={MODERN_DEEP_DIVE} />
    </div>
  );
};

// --- Review Section ---
export const ReviewSection: React.FC = () => {
  const [revealedTF, setRevealedTF] = useState<number[]>([]);
  const [revealedNotes, setRevealedNotes] = useState<number[]>([]);

  const toggleReveal = (idx: number) => {
    setRevealedTF(prev => prev.includes(idx) ? prev : [...prev, idx]);
  };

  const handleNoteUnlockRequest = (idx: number) => {
    if (revealedNotes.includes(idx)) return;
    setRevealedNotes(prev => [...prev, idx]);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 rounded-3xl shadow-soft mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <h2 className="text-4xl font-bold mb-3 flex justify-center items-center gap-4 font-serif relative z-10">
          <MessageCircle size={36} className="text-blue-300" />
          المراجعة والنقاش المفتوح
        </h2>
        <p className="opacity-80 text-xl font-light relative z-10">محطة لترسيخ المفاهيم وتبادل الآراء قبل الختام</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* True / False Activity */}
        <div className="bg-white p-8 rounded-3xl shadow-card border border-legal-100 flex flex-col h-full">
          <h3 className="font-bold text-legal-900 mb-8 flex items-center gap-3 text-2xl font-serif border-b border-legal-100 pb-4">
            <CheckCircle2 className="text-green-500" size={28} />
            صواب أم خطأ؟
          </h3>
          <div className="space-y-6 flex-1">
            {REVIEW_CONTENT.trueFalse.map((item, idx) => {
              const isRevealed = revealedTF.includes(idx);
              return (
                <div key={idx} className="border-b border-legal-50 pb-6 last:border-0 last:pb-0">
                  <p className="font-medium text-legal-800 mb-4 text-lg leading-snug">{item.statement}</p>
                  {!isRevealed ? (
                    <div className="flex gap-4">
                      <button onClick={() => toggleReveal(idx)} className="flex-1 bg-gray-50 hover:bg-green-100 text-gray-600 hover:text-green-700 py-3 rounded-xl font-bold transition-all border border-gray-200 hover:border-green-300">صواب</button>
                      <button onClick={() => toggleReveal(idx)} className="flex-1 bg-gray-50 hover:bg-red-100 text-gray-600 hover:text-red-700 py-3 rounded-xl font-bold transition-all border border-gray-200 hover:border-red-300">خطأ</button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl animate-fade-in border flex gap-4 ${item.isTrue ? 'bg-green-50 text-green-900 border-green-200' : 'bg-red-50 text-red-900 border-red-200'}`}>
                      <div className="mt-1">
                         {item.isTrue ? <Check size={24}/> : <X size={24}/>}
                      </div>
                      <div>
                          <div className="font-bold text-base mb-1">{item.isTrue ? 'إجابة صحيحة' : 'إجابة خاطئة'}</div>
                          <p className="text-sm opacity-90">{item.correction}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Discussion Topics */}
        <div className="bg-white p-8 rounded-3xl shadow-card border border-legal-100 flex flex-col h-full">
           <h3 className="font-bold text-legal-900 mb-8 flex items-center gap-3 text-2xl font-serif border-b border-legal-100 pb-4">
            <Users2 className="text-blue-500" size={28} />
            محاور للنقاش الجماعي
          </h3>
          <div className="space-y-8 flex-1">
             {REVIEW_CONTENT.topics.map((topic, idx) => {
               const isNoteRevealed = revealedNotes.includes(idx);
               return (
                 <div key={idx} className="bg-legal-50 p-6 rounded-2xl border-l-4 border-gold-500 hover:bg-white hover:shadow-md transition-all">
                   <h4 className="font-bold text-legal-900 text-xl mb-4 font-serif">{topic.title}</h4>
                   <ul className="space-y-3 mb-6">
                     {topic.points.map((point, pIdx) => (
                       <li key={pIdx} className="flex items-center gap-3 text-legal-700">
                         <div className="w-1.5 h-1.5 bg-legal-400 rounded-full shrink-0" />
                         <span className="text-base">{point}</span>
                       </li>
                     ))}
                   </ul>
                   
                   {/* Teacher Notes Reveal */}
                   {topic.teacherNotes && (
                     <div className="mt-4 pt-4 border-t border-legal-200/50">
                       {!isNoteRevealed ? (
                         <button 
                           onClick={() => handleNoteUnlockRequest(idx)}
                           className="text-xs flex items-center gap-2 text-legal-500 hover:text-gold-600 font-bold transition-colors bg-white px-3 py-1.5 rounded-full border border-legal-200 shadow-sm"
                         >
                           <Unlock size={12} /> كشف التوجيه الأكاديمي (مفتوح)
                         </button>
                       ) : (
                         <div className="bg-gold-50/50 p-4 rounded-xl border border-gold-100 shadow-sm animate-fade-in">
                           <h5 className="text-xs font-bold text-gold-700 mb-2 flex items-center gap-1 uppercase tracking-wider">
                             <Lightbulb size={14} />
                             توجيه أكاديمي
                           </h5>
                           <p className="text-base text-legal-800 leading-relaxed font-serif">{topic.teacherNotes}</p>
                         </div>
                       )}
                     </div>
                   )}
                 </div>
               );
             })}
          </div>
          <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm text-center font-bold">
             يفتح الأستاذ المجال للمداخلات والآراء حول هذه القضايا المعاصرة.
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Summary Section ---
export const SummarySection: React.FC = () => (
  <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-legal-200 overflow-hidden print:shadow-none print:border-none">
    <div className="bg-legal-900 text-white p-10 flex items-center justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      <div className="relative z-10">
          <h2 className="text-3xl font-bold flex items-center gap-4 font-serif">
            <Book className="text-gold-500" size={32} />
            الملخص النظري الشامل
          </h2>
          <p className="text-legal-400 mt-2 text-sm pr-12">خلاصة المحاضرة للمراجعة والحفظ</p>
      </div>
      <button className="relative z-10 text-sm bg-white/10 hover:bg-white text-white hover:text-legal-900 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2" onClick={() => window.print()}>
          <FileText size={16} /> طباعة
      </button>
    </div>
    
    <div className="p-10 bg-gray-50/50 grid gap-10">
      {SUMMARY_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100 group hover:border-legal-300 transition-colors">
            <div className={`bg-gradient-to-r ${card.colorClass} p-5 text-white flex items-center gap-4`}>
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold font-serif">{card.title}</h3>
            </div>
            <div className="p-8 space-y-8">
              {card.content.map((section, idx) => (
                <div key={idx}>
                  {section.subtitle && <h4 className="font-bold text-legal-800 mb-4 border-b-2 border-legal-100 pb-2 inline-block text-lg font-serif">{section.subtitle}</h4>}
                  
                  {section.type === 'timeline' ? (
                    <div className="space-y-6 border-r-[3px] border-legal-100 pr-6 mr-2">
                      {section.items.map((item, i) => {
                        const [title, desc] = item.split(':');
                        return (
                          <div key={i} className="relative">
                            <div className="absolute top-2 -right-[31px] w-4 h-4 rounded-full bg-white border-[3px] border-legal-300 shadow-sm" />
                            <p className="text-base text-legal-600 leading-loose">
                              <strong className="text-legal-900 block text-lg mb-1">{title}</strong> {desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : section.type === 'cards' ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {section.items.map((item, i) => (
                         <div key={i} className="bg-legal-50 hover:bg-white hover:shadow-md p-5 rounded-xl text-base text-legal-700 leading-relaxed border border-legal-100 transition-all">
                           {item}
                         </div>
                       ))}
                     </div>
                  ) : (
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-legal-700 leading-loose group/item hover:bg-legal-50 p-2 rounded-lg transition-colors">
                           <div className="w-2 h-2 bg-gold-500 rounded-full mt-2.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                           <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// --- Exit Ticket (Teacher Protected) ---
export const ExitTicket: React.FC = () => {
  const [view, setView] = useState<'student' | 'teacherAuth' | 'teacherView'>('student');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-soft p-10 text-center border border-legal-100 mt-10">
        <div className="w-16 h-16 bg-legal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-legal-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-6 font-serif">دخول الأستاذ</h2>
        <form onSubmit={handleTeacherLogin}>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل الرمز السري"
            className="w-full p-4 border rounded-xl mb-6 text-center font-mono text-lg focus:ring-2 focus:ring-legal-500 focus:border-legal-500 outline-none"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-4 font-bold bg-red-50 p-2 rounded-lg">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-legal-900 hover:bg-legal-800 text-white py-3 rounded-xl font-bold transition-colors">دخول</button>
            <button type="button" onClick={() => setView('student')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold transition-colors">عودة</button>
          </div>
        </form>
      </div>
    );
  }

  if (view === 'teacherView') {
    return (
      <div className="bg-white rounded-3xl shadow-soft p-10 max-w-3xl mx-auto text-center border border-legal-100 mt-10">
        <div className="flex justify-between items-center mb-10 border-b border-legal-100 pb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3 font-serif"><Unlock className="text-green-500" /> لوحة تحكم الأستاذ</h2>
          <button onClick={() => { setView('student'); setPassword(''); }} className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors">تسجيل خروج</button>
        </div>
        
        <div className="py-12 bg-legal-50/50 rounded-2xl border border-legal-200 border-dashed">
          <p className="text-xl text-legal-600 mb-8 font-medium">اضغط أدناه لمشاهدة ردود الطلاب الحقيقية في Google Forms</p>
          <a 
            href={GOOGLE_FORM_RESPONSES_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-green-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30 hover:-translate-y-1"
          >
            <FileText size={28} />
            <span className="text-lg">فتح صفحة الردود (Excel)</span>
          </a>
        </div>
      </div>
    );
  }

  // Student View
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-soft p-10 border-t-8 border-legal-800 relative text-center mt-10">
      <div className="mb-10">
        <div className="w-24 h-24 bg-legal-50 text-legal-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ClipboardCheck size={48} className="text-legal-800" />
        </div>
        <h2 className="text-4xl font-bold text-legal-900 font-serif mb-4">بطاقة الخروج</h2>
        <p className="text-legal-500 text-xl font-light">شاركنا ما تعلمته اليوم واترك بصمتك!</p>
      </div>
      
      <div className="py-8 px-4">
        <a 
            href={GOOGLE_FORM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-6 bg-legal-900 hover:bg-legal-800 text-white text-2xl font-bold rounded-2xl transition-all shadow-xl shadow-legal-900/20 flex items-center justify-center gap-4 hover:scale-[1.02] transform duration-200 group"
        >
            <span>اضغط هنا لملء الاستمارة</span>
            <ExternalLink size={28} className="text-gold-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
        <p className="text-sm text-legal-400 mt-6 font-medium bg-legal-50 inline-block px-4 py-2 rounded-full">سيفتح النموذج في نافذة جديدة</p>
      </div>
      
      <div className="mt-16 pt-8 border-t border-legal-100 flex justify-center">
        <button onClick={() => setView('teacherAuth')} className="text-xs text-legal-300 hover:text-legal-600 p-2 flex items-center gap-2 transition-colors font-bold uppercase tracking-widest">
           <Lock size={12} /> Teacher Access
        </button>
      </div>
    </div>
  );
};