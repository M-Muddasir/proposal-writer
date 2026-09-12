'use client';

import { useState } from 'react';

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [questions, setQuestions] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedCover, setCopiedCover] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState('muddasir');

  const generate = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setCoverLetter('');
    setQuestions([]);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, user: selectedUser }),
      });
      const data = await res.json();
      const full = data.proposal || data.error || 'Failed to generate';

      if (full.includes('---SCREENING QUESTIONS---')) {
        const [cover, qSection] = full.split('---SCREENING QUESTIONS---');
        setCoverLetter(cover.trim());

        // Parse Q/A pairs
        const parsed: { question: string; answer: string }[] = [];
        const lines = qSection.trim().split('\n');
        let currentQ = '';
        let currentA = '';
        for (const line of lines) {
          if (line.match(/^Q\d+:/)) {
            if (currentQ && currentA) {
              parsed.push({ question: currentQ, answer: currentA.trim() });
            }
            currentQ = line.replace(/^Q\d+:\s*/, '');
            currentA = '';
          } else if (line.match(/^A:/)) {
            currentA = line.replace(/^A:\s*/, '');
          } else if (currentA !== '') {
            currentA += '\n' + line;
          }
        }
        if (currentQ && currentA) {
          parsed.push({ question: currentQ, answer: currentA.trim() });
        }
        setQuestions(parsed);
      } else {
        setCoverLetter(full.trim());
        setQuestions([]);
      }
    } catch {
      setCoverLetter('Error: Could not connect to AI. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Proposal Writer</h1>
          <p className="text-slate-400">Paste an Upwork job description. Get a personalized proposal in seconds.</p>
        </div>

        {/* User Selector */}
        <div className="flex gap-3 mb-6">
          {[
            { key: 'muddasir', label: 'Muddasir' },
            { key: 'ahtisham', label: 'Ahtisham Manzoor' },
          ].map((u) => (
            <button
              key={u.key}
              onClick={() => setSelectedUser(u.key)}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                selectedUser === u.key
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full Upwork job description here including screening questions, client info, etc..."
            rows={10}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 text-white px-4 py-3 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 placeholder:text-slate-600 resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={loading || !jobDescription.trim()}
          className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 disabled:bg-slate-700 disabled:cursor-not-allowed py-3 text-sm font-bold text-white transition-colors mb-8"
        >
          {loading ? 'Generating...' : 'Generate Proposal'}
        </button>

        {/* Cover Letter */}
        {coverLetter && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-slate-300">Cover Letter</h2>
              <button
                onClick={() => copy(coverLetter, setCopiedCover)}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-1.5 text-xs font-medium text-slate-300 transition-colors"
              >
                {copiedCover ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
              <pre className="whitespace-pre-wrap text-sm text-slate-200 font-sans leading-relaxed">
                {coverLetter}
              </pre>
            </div>
          </div>
        )}

        {/* Screening Questions — each with its own copy button */}
        {questions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-emerald-400 mb-3">Screening Question Answers</h2>
            <div className="flex flex-col gap-3">
              {questions.map((q, idx) => (
                <div key={idx} className="rounded-xl border border-emerald-900 bg-slate-900 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-xs text-slate-400 flex-1">Q{idx + 1}: {q.question}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(q.answer);
                        setCopiedIdx(idx);
                        setTimeout(() => setCopiedIdx(null), 2000);
                      }}
                      className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition-colors flex-shrink-0"
                    >
                      {copiedIdx === idx ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-slate-200 font-sans leading-relaxed">
                    {q.answer}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 flex items-center justify-center gap-4 text-xs text-slate-600">
          <span>Powered by Groq AI</span>
          <span>|</span>
          <a
            href="/api/logs"
            download
            className="text-rose-500 hover:text-rose-400 underline"
          >
            Download CSV Logs
          </a>
        </div>
      </div>
    </div>
  );
}
