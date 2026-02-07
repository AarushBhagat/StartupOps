import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { ImpossibleFuture } from './components/ImpossibleFuture';
import { ImmersiveServices } from './components/ImmersiveServices';
import { RefinedPortfolio } from './components/RefinedPortfolio';
import { RevealFooter } from './components/RevealFooter';
import { Navigation } from './components/Navigation';
import { PlanSelection } from './components/PlanSelection';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Payment } from './components/Payment';
import { Onboarding } from './components/Onboarding';
import { LeaderDashboard } from './components/LeaderDashboard';
import { TeamDashboard } from './components/TeamDashboard';
import { DashboardLayout } from './components/DashboardLayout';
import { TasksPage } from './components/TasksPage';
import { FeedbackPage } from './components/FeedbackPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { InvestorHubPage } from './components/InvestorHubPage';
import { StartupProfilePage } from './components/StartupProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { CommandPalette } from './components/CommandPalette';

type UserRole = 'leader' | 'team' | null;

interface StartupInfo {
  startupName: string;
  industry: string;
  description: string;
  stage: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState<UserRole>(null);
  const [userEmail, setUserEmail] = React.useState('');
  const [hasStartupInfo, setHasStartupInfo] = React.useState(false);
  const [startupInfo, setStartupInfo] = React.useState<StartupInfo | null>(null);
  const [needsOnboarding, setNeedsOnboarding] = React.useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

  // Command palette keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Only open command palette when authenticated
        if (isAuthenticated) {
          setIsCommandPaletteOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle plan selection
  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    
    if (planName === 'Free') {
      // Free plan: Go to signup then dashboard
      setCurrentPage('signup');
    } else {
      // Pro/Enterprise: Go to signup then payment
      setCurrentPage('signup');
    }
  };

  // Handle signup completion
  const handleSignupComplete = (plan?: string) => {
    const planToUse = plan || selectedPlan;
    
    if (planToUse === 'Free') {
      // Free plan: Go directly to dashboard
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    } else {
      // Pro/Enterprise: Go to payment
      setCurrentPage('payment');
    }
  };

  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsAuthenticated(true);
    setNeedsOnboarding(true);
    setCurrentPage('onboarding');
  };

  // Handle login
  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    
    // Check user role based on email
    if (email === 'leader@gmail.com') {
      setUserRole('leader');
      setNeedsOnboarding(true);
      setCurrentPage('onboarding');
    } else if (email === 'team@gmail.com') {
      setUserRole('team');
      setCurrentPage('dashboard');
    } else {
      // Default to leader for other emails
      setUserRole('leader');
      setNeedsOnboarding(true);
      setCurrentPage('onboarding');
    }
  };

  // Handle onboarding completion
  const handleOnboardingComplete = (hasIdea: boolean, ideaData?: StartupInfo) => {
    if (hasIdea && ideaData) {
      setHasStartupInfo(true);
      setStartupInfo(ideaData);
    } else {
      setHasStartupInfo(false);
    }
    setNeedsOnboarding(false);
    setCurrentPage('dashboard');
  };

  // Handle setup startup from dashboard
  const handleSetupStartup = () => {
    setNeedsOnboarding(true);
    setCurrentPage('onboarding');
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail('');
    setHasStartupInfo(false);
    setStartupInfo(null);
    setNeedsOnboarding(false);
    setCurrentPage('home');
    setSelectedPlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get user name based on role
  const getUserName = () => {
    if (userRole === 'leader') return 'Team Leader';
    if (userRole === 'team') return 'Team Member';
    return 'User';
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&family=Space+Grotesk:wght@300..700&display=swap');
        
        body {
          font-family: 'Manrope', sans-serif;
          background-color: #02040a;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter Tight', sans-serif;
        }
      `}</style>
      
      {/* Navigation - Only show on home and plans page */}
      {(currentPage === 'home' || currentPage === 'plans') && (
        <Navigation 
          onNavigate={scrollToSection}
          onGetStarted={() => setCurrentPage('plans')}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      
      {/* Home Page */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10 bg-[#02040a] mb-[80vh] shadow-[0_50px_100px_rgba(0,0,0,1)]">
             <div id="home">
               <Hero onGetStarted={() => setCurrentPage('plans')} />
             </div>
             
             <div className="space-y-32 pb-32">
                <div id="trusted-by">
                  <TrustedBy />
                </div>
                <div id="about">
                  <ImpossibleFuture />
                </div>
                <div id="features">
                  <ImmersiveServices />
                </div>
                <div id="success-stories">
                  <RefinedPortfolio />
                </div>
             </div>
          </div>

          <RevealFooter onGetStarted={() => setCurrentPage('plans')} />
        </motion.div>
      )}

      {/* Plan Selection Page */}
      {currentPage === 'plans' && (
        <motion.div
          key="plans"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <PlanSelection 
            onBack={() => setCurrentPage('home')} 
            onSelectPlan={handlePlanSelection}
          />
        </motion.div>
      )}

      {/* Login Page */}
      {currentPage === 'login' && (
        <motion.div
          key="login"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Login 
            onBack={() => setCurrentPage('home')}
            onLogin={handleLogin}
            onSignup={() => setCurrentPage('signup')}
          />
        </motion.div>
      )}

      {/* Signup Page */}
      {currentPage === 'signup' && (
        <motion.div
          key="signup"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Signup 
            onBack={() => setCurrentPage('plans')}
            onSignup={handleSignupComplete}
            onLogin={() => setCurrentPage('login')}
            selectedPlan={selectedPlan || undefined}
          />
        </motion.div>
      )}

      {/* Payment Page */}
      {currentPage === 'payment' && selectedPlan && (
        <motion.div
          key="payment"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Payment 
            onBack={() => setCurrentPage('signup')}
            onComplete={handlePaymentComplete}
            selectedPlan={selectedPlan}
          />
        </motion.div>
      )}

      {/* Onboarding */}
      {currentPage === 'onboarding' && isAuthenticated && userRole === 'leader' && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Onboarding 
            onComplete={handleOnboardingComplete}
          />
        </motion.div>
      )}

      {/* Dashboard - Leader */}
      {currentPage === 'dashboard' && isAuthenticated && userRole === 'leader' && (
        <motion.div
          key="leader-dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LeaderDashboard 
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            userName={getUserName()}
            hasStartupInfo={hasStartupInfo}
            startupInfo={startupInfo || undefined}
            onSetupStartup={handleSetupStartup}
          />
        </motion.div>
      )}

      {/* Dashboard - Team Member */}
      {currentPage === 'dashboard' && isAuthenticated && userRole === 'team' && (
        <motion.div
          key="team-dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TeamDashboard 
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            userName={getUserName()}
          />
        </motion.div>
      )}

      {/* Tasks Page */}
      {currentPage === 'tasks' && isAuthenticated && (
        <motion.div
          key="tasks"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout
            currentSection="tasks"
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userName={getUserName()}
            userRole={userRole || 'team'}
            startupName={startupInfo?.startupName || 'Your Startup'}
          >
            <TasksPage />
          </DashboardLayout>
        </motion.div>
      )}

      {/* Feedback Page */}
      {currentPage === 'feedback' && isAuthenticated && (
        <motion.div
          key="feedback"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout
            currentSection="feedback"
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userName={getUserName()}
            userRole={userRole || 'team'}
            startupName={startupInfo?.startupName || 'Your Startup'}
          >
            <FeedbackPage />
          </DashboardLayout>
        </motion.div>
      )}

      {/* Analytics Page */}
      {currentPage === 'analytics' && isAuthenticated && (
        <motion.div
          key="analytics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout
            currentSection="analytics"
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userName={getUserName()}
            userRole={userRole || 'team'}
            startupName={startupInfo?.startupName || 'Your Startup'}
          >
            <AnalyticsPage />
          </DashboardLayout>
        </motion.div>
      )}

      {/* Investor Hub Page - Leader Only */}
      {currentPage === 'investor-hub' && isAuthenticated && userRole === 'leader' && (
        <motion.div
          key="investor-hub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout
            currentSection="investor-hub"
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userName={getUserName()}
            userRole="leader"
            startupName={startupInfo?.startupName || 'Your Startup'}
          >
            <InvestorHubPage />
          </DashboardLayout>
        </motion.div>
      )}

      {/* Profile Page */}
      {currentPage === 'profile' && isAuthenticated && (
        <motion.div
          key="profile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout
            currentSection="profile"
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userName={getUserName()}
            userRole={userRole || 'team'}
            startupName={startupInfo?.startupName || 'Your Startup'}
          >
            <StartupProfilePage />
          </DashboardLayout>
        </motion.div>
      )}

      {/* Settings Page */}
      {currentPage === 'settings' && isAuthenticated && (
        <motion.div
          key="settings"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout
            currentSection="settings"
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
            userName={getUserName()}
            userRole={userRole || 'team'}
            startupName={startupInfo?.startupName || 'Your Startup'}
          >
            <SettingsPage />
          </DashboardLayout>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Command Palette - Accessible from all authenticated pages */}
      {isAuthenticated && (
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          userRole={userRole || 'team'}
        />
      )}
    </div>
  );
}
