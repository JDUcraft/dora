'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { questions, DiagnosticAnswers } from '@/data/questions';
import { Question } from '@/components/Question';
import { RadarChart } from '@/components/RadarChart';
import { PositioningMatrix } from '@/components/PositioningMatrix';
import { ImprovementTrajectory } from '@/components/ImprovementTrajectory';
import { calculateClusterMatch } from '@/lib/diagnostic';
import '@/styles/globals.css';

export default function Home() {
  const { t, locale, changeLocale } = useTranslation();
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      alert(t('home.alertIncomplete', { answered: answeredCount, total: questions.length }));
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted) {
    const result = calculateClusterMatch(answers);

    const trajectories: Record<number, { to: number; color: string }> = {
      1: { to: 2, color: "#f59e0b" },
      2: { to: 3, color: "#3b82f6" },
      3: { to: 5, color: "#8b5cf6" },
      4: { to: 6, color: "#06b6d4" },
      5: { to: 6, color: "#10b981" },
      6: { to: 7, color: "#059669" },
    };

    const nextTrajectory = trajectories[result.cluster.id];

    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-4 px-6 shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={handleReset}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {t('common.newEvaluation')}
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 absolute left-1/2 transform -translate-x-1/2">
              {t('results.title')}
            </h1>
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value as 'fr' | 'en')}
              className="text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg px-3 py-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>

        <div className="min-h-screen py-6 md:py-12 pt-24 md:pt-32">
          <div className="w-full">

          <div className="max-w-7xl mx-auto px-4 mb-8 animate-fade-in">
            <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">{t('results.diagnostic')}</h2>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 mb-3 md:mb-4">{t('results.yourCluster')}</h3>
                <div
                  className="rounded-lg md:rounded-xl p-3 md:p-6 text-white mb-4 md:mb-6 shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${result.cluster.color}dd, ${result.cluster.color})` 
                  }}
                >
                  <h3 className="text-xl md:text-3xl font-bold mb-2">
                    {t('results.cluster', { id: result.cluster.id })}
                  </h3>
                  <p className="text-base md:text-xl font-semibold mb-2 md:mb-4">{t(`clusters.${result.cluster.id}.name`)}</p>
                  <p className="text-sm md:text-lg opacity-95 leading-snug">{t(`clusters.${result.cluster.id}.description`)}</p>
                </div>

                {nextTrajectory && (
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">{t('results.trajectory')}</h3>
                    <div 
                      className="p-3 md:p-5 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: `${nextTrajectory.color}15`,
                        borderColor: nextTrajectory.color 
                      }}
                    >
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <div
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-sm md:text-base font-bold shadow-md"
                          style={{ backgroundColor: result.cluster.color }}
                        >
                          C{result.cluster.id}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="40" height="20" viewBox="0 0 40 20">
                            <defs>
                              <marker
                                id="arrowhead-inline"
                                markerWidth="8"
                                markerHeight="6"
                                refX="7"
                                refY="3"
                                orient="auto"
                              >
                                <polygon points="0 0, 8 3, 0 6" fill={nextTrajectory.color} />
                              </marker>
                            </defs>
                            <line
                              x1="2"
                              y1="10"
                              x2="38"
                              y2="10"
                              stroke={nextTrajectory.color}
                              strokeWidth="3"
                              markerEnd="url(#arrowhead-inline)"
                            />
                          </svg>
                          <span 
                            className="font-bold text-sm px-2 py-1 rounded"
                            style={{ color: nextTrajectory.color }}
                          >
                            {t(`trajectories.${result.cluster.id}`)}
                          </span>
                        </div>
                        <div
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-sm md:text-base font-bold shadow-md"
                          style={{ 
                            backgroundColor: result.cluster.id === 7 ? result.cluster.color : '#666'
                          }}
                        >
                          C{nextTrajectory.to}
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-slate-700 leading-snug" dangerouslySetInnerHTML={{ __html: t('results.nextStep', { to: nextTrajectory.to }) }} />
                    </div>
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">{t('results.recommendations')}</h3>
                  {(() => {
                    const colorMap: Record<number, { from: string; to: string; border: string; title: string; text: string }> = {
                      1: { from: 'from-red-50', to: 'to-red-100', border: 'border-red-500', title: 'text-red-900', text: 'text-red-800' },
                      2: { from: 'from-orange-50', to: 'to-orange-100', border: 'border-orange-500', title: 'text-orange-900', text: 'text-orange-800' },
                      3: { from: 'from-yellow-50', to: 'to-yellow-100', border: 'border-yellow-500', title: 'text-yellow-900', text: 'text-yellow-800' },
                      4: { from: 'from-purple-50', to: 'to-purple-100', border: 'border-purple-500', title: 'text-purple-900', text: 'text-purple-800' },
                      5: { from: 'from-green-50', to: 'to-green-100', border: 'border-green-500', title: 'text-green-900', text: 'text-green-800' },
                      6: { from: 'from-blue-50', to: 'to-blue-100', border: 'border-blue-500', title: 'text-blue-900', text: 'text-blue-800' },
                      7: { from: 'from-emerald-50', to: 'to-emerald-100', border: 'border-emerald-500', title: 'text-emerald-900', text: 'text-emerald-800' },
                    };
                    const colors = colorMap[result.cluster.id];
                    const items = [0, 1, 2, 3].map(i => t(`recommendations.${result.cluster.id}.items.${i}`));
                    return (
                      <div className={`bg-gradient-to-r ${colors.from} ${colors.to} border-l-4 ${colors.border} p-5 rounded-lg`}>
                        <h4 className={`font-semibold ${colors.title} text-sm mb-2`}>{t(`recommendations.${result.cluster.id}.title`)}</h4>
                        <ul className={`mt-2 ${colors.text} space-y-2 text-sm`}>
                          {items.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">{t('results.clusterRadar')}</h3>
                <RadarChart cluster={result.cluster} />

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('results.clusterDetails')}</h3>
                  <div
                    className="rounded-lg border-2 shadow-md"
                    style={{ borderColor: result.cluster.color }}
                  >
                    <div className="p-5">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div 
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: `${result.cluster.color}15` }}
                        >
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-3" style={{ color: result.cluster.color }}>
                            {t('results.performanceTitle')}
                          </h4>
                          <ul className="space-y-2 text-xs">
                            <li className="flex justify-between">
                              <span className="text-slate-600">{t('results.team')}</span>
                              <strong className="text-slate-800">{t(`characteristics.teamPerformance.${result.cluster.characteristics.teamPerformance}`)}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">{t('results.product')}</span>
                              <strong className="text-slate-800">{t(`characteristics.productPerformance.${result.cluster.characteristics.productPerformance}`)}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">{t('results.delivery')}</span>
                              <strong className="text-slate-800">{t(`characteristics.softwareDelivery.${result.cluster.characteristics.softwareDelivery}`)}</strong>
                            </li>
                          </ul>
                        </div>
                        
                        <div 
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: `${result.cluster.color}15` }}
                        >
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-3" style={{ color: result.cluster.color }}>
                            {t('results.wellbeingTitle')}
                          </h4>
                          <ul className="space-y-2 text-xs">
                            <li className="flex justify-between">
                              <span className="text-slate-600">{t('results.burnout')}</span>
                              <strong className="text-slate-800">{t(`characteristics.burnout.${result.cluster.characteristics.burnout}`)}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">{t('results.friction')}</span>
                              <strong className="text-slate-800">{t(`characteristics.friction.${result.cluster.characteristics.friction}`)}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">{t('results.stability')}</span>
                              <strong className="text-slate-800">{t(`characteristics.systemStability.${result.cluster.characteristics.systemStability}`)}</strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

            <div className="max-w-7xl mx-auto px-4 mb-8 animate-fade-in">
              <PositioningMatrix />
            </div>

            <div className="max-w-7xl mx-auto px-4 mb-8 animate-fade-in">
              <ImprovementTrajectory />
            </div>
          </div>
        </div>
      </>
    );
  }



  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-4 px-6 shadow-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 absolute left-1/2 transform -translate-x-1/2">
            {t('home.title')}
          </h1>
          <div className="flex items-center gap-4 ml-auto">
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value as 'fr' | 'en')}
              className="text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg px-3 py-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="min-h-screen py-12 px-4 pt-24">
        <div className="max-w-3xl mx-auto">



        <div className="card mb-8 animate-slide-up">
          <form className="space-y-10">
            {['performance', 'stability', 'quality', 'wellbeing'].map((theme) => {
              const themeQuestions = questions.filter(q => q.category === theme);
              const themeColors = {
                performance: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-600' },
                stability: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-600' },
                quality: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-600' },
                wellbeing: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-600' },
              };
              const colors = themeColors[theme as keyof typeof themeColors];

              return (
                <div key={theme} className={`p-6 rounded-xl border-2 ${colors.border} ${colors.bg}`}>
                  <h3 className={`text-lg font-bold uppercase tracking-wide mb-6 ${colors.text}`}>
                    {t(`categories.${theme}`)}
                  </h3>
                  <div className="space-y-6">
                    {themeQuestions.map((question) => (
                      <div key={question.id}>
                        <Question
                          question={t(`questions.${question.id}.question`)}
                          answers={question.answers.map((a, idx) => ({
                            ...a,
                            text: t(`questions.${question.id}.answers.${idx + 1}`)
                          }))}
                          selected={answers[question.id]}
                          onChange={(value) => handleAnswerChange(question.id, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </form>

          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full btn-primary mt-8 text-lg py-4"
          >
            {t('home.submitButton')}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
