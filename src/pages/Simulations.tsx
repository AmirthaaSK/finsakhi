import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreditCard, Smartphone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Simulations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openSimulation = (type: 'atm' | 'upi') => {
    const url = type === 'atm' ? '/atm-simulation.html' : '/upi-simulation.html';
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <motion.header
        className="px-5 pt-6 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold text-foreground">Practice Simulations</h1>
        <p className="text-muted-foreground">Learn by doing with interactive simulations</p>
      </motion.header>

      {/* Simulation Cards */}
      <div className="px-5 space-y-4">
        <motion.div
          className="glass-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => openSimulation('atm')}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <CreditCard className="text-primary" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">
                ATM Simulation
              </h3>
              <p className="text-muted-foreground mb-3">
                Learn how to use an ATM machine safely. Practice withdrawing cash, checking balance, and entering PIN securely.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Tamil</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">English</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Hindi</span>
              </div>
            </div>
          </div>
          <button className="mt-4 w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Start ATM Practice
          </button>
        </motion.div>

        <motion.div
          className="glass-card p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => openSimulation('upi')}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10">
              <Smartphone className="text-accent" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">
                UPI Payment Simulation
              </h3>
              <p className="text-muted-foreground mb-3">
                Master UPI payments with our interactive simulator. Learn to send money, check balance, and use UPI safely.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">Tamil</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">English</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">Hindi</span>
              </div>
            </div>
          </div>
          <button className="mt-4 w-full bg-accent text-accent-foreground py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors">
            Start UPI Practice
          </button>
        </motion.div>

        <motion.div
          className="glass-card p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-foreground mb-3">
            🎯 Learning Tips
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Practice multiple times to build confidence</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Try all language options to learn in your preferred language</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>These simulations use voice guidance to help you learn</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>No real money is used - practice safely!</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Simulations;
