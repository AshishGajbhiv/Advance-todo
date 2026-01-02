import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Heatmap from './components/Heatmap';
import FocusMode from './components/FocusMode';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen relative selection:bg-primary/30">
        {/* Futuristic Background Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute top-[40%] -right-[10%] w-[30%] h-[50%] bg-indigo-500/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        </div>

        <main className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-24">
          <header className="mb-12 flex items-center justify-between">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group hover:rotate-0 transition-transform cursor-pointer">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase italic">
                  Velocity
                  <span className="text-primary font-serif">.</span>
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Objective Tracker</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-right"
            >
              <p className="text-zinc-400 text-xs font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Status: Operational</p>
            </motion.div>
          </header>

          <section className="grid gap-8">
            <Heatmap />
            <TaskInput />
            <TaskList />
          </section>

          <footer className="mt-24 pt-8 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-medium">
              Designed for Peak Performance • v1.0.0
            </p>
          </footer>
        </main>

        <FocusMode />
      </div>
    </TaskProvider>
  );
}

export default App;
