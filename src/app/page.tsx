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

    const trajectories: Record<number, { to: number; label: string; color: string }> = {
      1: { to: 2, label: "Stabiliser", color: "#f59e0b" },
      2: { to: 3, label: "Moderniser", color: "#3b82f6" },
      3: { to: 5, label: "Optimiser", color: "#8b5cf6" },
      4: { to: 6, label: "Accélérer", color: "#06b6d4" },
      5: { to: 6, label: "Accélérer", color: "#10b981" },
      6: { to: 7, label: "Exceller", color: "#059669" },
    };

    const nextTrajectory = trajectories[result.cluster.id];

    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-4 px-6 shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              {t('results.title')}
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => changeLocale(locale === 'fr' ? 'en' : 'fr')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 uppercase"
              >
                {locale === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary text-sm"
              >
                {t('common.newEvaluation')}
              </button>
            </div>
          </div>
        </div>

        <div className="min-h-screen py-6 md:py-12 pt-24 md:pt-32">
          <div className="w-full">

          <div className="max-w-7xl mx-auto px-4 mb-8 animate-fade-in">
            <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Votre Diagnostic DORA</h2>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 mb-3 md:mb-4">Votre cluster</h3>
                <div
                  className="rounded-lg md:rounded-xl p-3 md:p-6 text-white mb-4 md:mb-6 shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${result.cluster.color}dd, ${result.cluster.color})` 
                  }}
                >
                  <h3 className="text-xl md:text-3xl font-bold mb-2">
                    Cluster {result.cluster.id}
                  </h3>
                  <p className="text-base md:text-xl font-semibold mb-2 md:mb-4">{result.cluster.name}</p>
                  <p className="text-sm md:text-lg opacity-95 leading-snug">{result.cluster.description}</p>
                </div>

                {nextTrajectory && (
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">Trajectoire d'amélioration</h3>
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
                            {nextTrajectory.label}
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
                      <p className="text-xs md:text-sm text-slate-700 leading-snug">
                        Prochaine étape : <strong>Cluster {nextTrajectory.to}</strong> - Concentrez-vous sur les recommandations ci-dessous pour progresser vers cette trajectoire d'amélioration.
                      </p>
                    </div>
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">Recommandations</h3>
                  {result.cluster.id === 1 && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-5 rounded-lg">
                      <h4 className="font-semibold text-red-900 text-sm mb-2">Priorités urgentes</h4>
                      <ul className="mt-2 text-red-800 space-y-2 text-sm">
                        <li>• Stabiliser les systèmes (infrastructure critique)</li>
                        <li>• Réduire la charge réactive immédiatement</li>
                        <li>• Mettre en place du support et des ressources</li>
                        <li>• Initier une amélioration continue progressive</li>
                      </ul>
                    </div>
                  )}
                  {result.cluster.id === 2 && (
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 p-5 rounded-lg">
                      <h4 className="font-semibold text-orange-900 text-sm mb-2">Plan de modernisation</h4>
                      <ul className="mt-2 text-orange-800 space-y-2 text-sm">
                        <li>• Réduire la dépendance aux systèmes hérités</li>
                        <li>• Automatiser les processus répétitifs</li>
                        <li>• Implémenter une stratégie d'extraction progressive</li>
                        <li>• Former l'équipe aux nouvelles technologies</li>
                      </ul>
                    </div>
                  )}
                  {result.cluster.id === 3 && (
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-5 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 text-sm mb-2">Optimisation des processus</h4>
                      <ul className="mt-2 text-yellow-800 space-y-2 text-sm">
                        <li>• Analyser et simplifier les workflows</li>
                        <li>• Réduire les approbations non-critiques</li>
                        <li>• Automatiser les tâches manuelles</li>
                        <li>• Mettre en place l'observabilité</li>
                      </ul>
                    </div>
                  )}
                  {result.cluster.id === 4 && (
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-5 rounded-lg">
                      <h4 className="font-semibold text-purple-900 text-sm mb-2">Augmenter la cadence</h4>
                      <ul className="mt-2 text-purple-800 space-y-2 text-sm">
                        <li>• Accélérer le lead time des déploiements</li>
                        <li>• Améliorer la stabilité opérationnelle</li>
                        <li>• Mettre en place le continuous deployment</li>
                        <li>• Réduire la variabilité des changements</li>
                      </ul>
                    </div>
                  )}
                  {result.cluster.id === 5 && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-5 rounded-lg">
                      <h4 className="font-semibold text-green-900 text-sm mb-2">Accélérer sans compromettre</h4>
                      <ul className="mt-2 text-green-800 space-y-2 text-sm">
                        <li>• Augmenter la fréquence de déploiement graduellement</li>
                        <li>• Investir dans l'automatisation</li>
                        <li>• Renforcer le feedback client</li>
                        <li>• Partager les bonnes pratiques</li>
                      </ul>
                    </div>
                  )}
                  {result.cluster.id === 6 && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-5 rounded-lg">
                      <h4 className="font-semibold text-blue-900 text-sm mb-2">Consolider et partager</h4>
                      <ul className="mt-2 text-blue-800 space-y-2 text-sm">
                        <li>• Documenter et partager les meilleures pratiques</li>
                        <li>• Former d'autres équipes</li>
                        <li>• Chercher des micro-améliorations</li>
                        <li>• Maintenir le momentum</li>
                      </ul>
                    </div>
                  )}
                  {result.cluster.id === 7 && (
                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 p-5 rounded-lg">
                      <h4 className="font-semibold text-emerald-900 text-sm mb-2">Excellence continue</h4>
                      <ul className="mt-2 text-emerald-800 space-y-2 text-sm">
                        <li>• Maintenir la culture de qualité</li>
                        <li>• Partager l'expertise avec l'organisation</li>
                        <li>• Explorer les innovations futures</li>
                        <li>• Mesurer continuellement</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Radar du cluster</h3>
                <RadarChart cluster={result.cluster} />

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Détails du cluster</h3>
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
                            📊 Performance
                          </h4>
                          <ul className="space-y-2 text-xs">
                            <li className="flex justify-between">
                              <span className="text-slate-600">Équipe:</span>
                              <strong className="text-slate-800">{result.cluster.characteristics.teamPerformance}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">Produit:</span>
                              <strong className="text-slate-800">{result.cluster.characteristics.productPerformance}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">Delivery:</span>
                              <strong className="text-slate-800">{result.cluster.characteristics.softwareDelivery}</strong>
                            </li>
                          </ul>
                        </div>
                        
                        <div 
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: `${result.cluster.color}15` }}
                        >
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-3" style={{ color: result.cluster.color }}>
                            💚 Bien-être
                          </h4>
                          <ul className="space-y-2 text-xs">
                            <li className="flex justify-between">
                              <span className="text-slate-600">Burnout:</span>
                              <strong className="text-slate-800">{result.cluster.characteristics.burnout}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">Friction:</span>
                              <strong className="text-slate-800">{result.cluster.characteristics.friction}</strong>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-slate-600">Stabilité:</span>
                              <strong className="text-slate-800">{result.cluster.characteristics.systemStability}</strong>
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

  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const remainingQuestions = totalQuestions - answeredCount;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-4 px-6 shadow-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">{t('common.progression')}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => changeLocale(locale === 'fr' ? 'en' : 'fr')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 uppercase"
              >
                {locale === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
              </button>
              <span className="text-sm font-semibold text-blue-600">
                {answeredCount}/{totalQuestions} • {remainingQuestions} {t('common.remaining')}{remainingQuestions !== 1 && locale === 'fr' ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="min-h-screen py-12 px-4 pt-32">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-slate-900 mb-3">
              {t('home.title')}
            </h1>
          </div>



        <div className="card mb-8 animate-slide-up">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Progression</span>
              <span className="text-sm font-semibold text-primary-600">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

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
