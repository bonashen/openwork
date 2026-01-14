import React, { useState, useEffect, useRef } from 'react';
import { 
  Command, 
  Shield, 
  Zap, 
  Layout, 
  Settings, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  FileText, 
  X, 
  Terminal, 
  Smartphone, 
  HardDrive,
  Cpu,
  MoreHorizontal,
  ArrowRight,
  Clock,
  Menu,
  Download,
  Folder,
  Plus,
  Trash2
} from 'lucide-react';

// --- Mock Data & Types ---

const MOCK_TEMPLATES = [
  { id: 1, title: "Analyze Q3 Revenue", description: "Read CSVs and generate a PDF report", icon: "bar-chart" },
  { id: 2, title: "Clean Desktop", description: "Organize screenshots into folders", icon: "folder" },
  { id: 3, title: "Summarize Meeting", description: "Process audio transcript", icon: "mic" },
];

const MOCK_RECENT_SESSIONS = [
  { id: 101, title: "Update Dependencies", status: "completed", date: "2 mins ago" },
  { id: 102, title: "Fix CSS Bug", status: "failed", date: "1 hour ago" },
  { id: 103, title: "Deploy to Prod", status: "waiting", date: "Yesterday" },
];

// --- Components ---

const Button = ({ children, variant = "primary", className = "", onClick, disabled }) => {
  const baseStyle = "px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 text-sm";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/5",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/50",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
    outline: "border border-zinc-700 text-zinc-300 hover:border-zinc-500 bg-transparent",
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    running: "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse",
    waiting: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
    stopped: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[status] || styles.stopped} flex items-center gap-1.5`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-xl rounded-2xl p-5 ${className}`}>
    {children}
  </div>
);

// --- Views ---

const OnboardingView = ({ onComplete }) => {
  const [step, setStep] = useState('mode-select'); // mode-select | working-dirs | connecting
  const [mode, setMode] = useState(null);
  const [folders, setFolders] = useState(['~/Documents/OpenWork']);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'host') {
      setStep('working-dirs');
    } else {
      startConnection(selectedMode);
    }
  };

  const startConnection = (selectedMode) => {
    setStep('connecting');
    // Simulate connection delay
    setTimeout(() => {
      onComplete(selectedMode);
    }, 2000);
  };

  const addFolder = () => {
    // Mock folder selection
    setFolders([...folders, '~/Downloads/Project_' + Math.floor(Math.random() * 100)]);
  };

  const removeFolder = (index) => {
    setFolders(folders.filter((_, i) => i !== index));
  };

  if (step === 'connecting') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-800 flex items-center justify-center animate-spin-slow">
              <div className="w-12 h-12 rounded-full border-2 border-t-white border-zinc-800 animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={20} className="text-white fill-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-medium mb-2">
              {mode === 'host' ? 'Starting OpenCode Engine...' : 'Searching for Host...'}
            </h2>
            <p className="text-zinc-500 text-sm">
              {mode === 'host' ? 'Initializing localhost:4096' : 'Verifying secure handshake'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'working-dirs') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900 to-transparent opacity-20 pointer-events-none" />
        
        <div className="max-w-md w-full z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-zinc-900 rounded-2xl mx-auto flex items-center justify-center border border-zinc-800 mb-6">
              <Shield className="text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Authorized Workspaces</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              OpenWork runs locally. For your safety, please explicitly select which folders it is allowed to access.
            </p>
          </div>

          <div className="space-y-3">
            {folders.map((folder, idx) => (
              <div key={idx} className="group flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Folder size={18} className="text-indigo-400 shrink-0" />
                  <span className="font-mono text-sm text-zinc-300 truncate">{folder}</span>
                </div>
                <button 
                  onClick={() => removeFolder(idx)}
                  className="text-zinc-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            <button 
              onClick={addFolder}
              className="w-full py-4 border border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-zinc-600 hover:bg-zinc-900/30 transition-all flex items-center justify-center gap-2 text-sm font-medium group"
            >
              <Plus size={16} className="text-zinc-600 group-hover:text-white transition-colors" /> 
              Add Authorized Folder
            </button>
          </div>

          <div className="pt-4">
             <Button onClick={() => startConnection('host')} className="w-full py-3 text-base">
               Confirm & Start Engine
             </Button>
             <p className="text-center text-xs text-zinc-600 mt-4">
               You can always change these permissions later in Settings.
             </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900 to-transparent opacity-20 pointer-events-none" />
      
      <div className="max-w-2xl w-full z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Command className="text-black" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">OpenWork</h1>
          </div>
          <h2 className="text-xl text-zinc-400 font-light">
            How would you like to run OpenWork today?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => handleModeSelect('host')}
            className="group relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-8 rounded-3xl text-left transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
              <HardDrive className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Host Mode</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Run the OpenCode engine locally on this machine. Best for desktops and laptops.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-600">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              127.0.0.1:4096
            </div>
          </button>

          <button 
            onClick={() => handleModeSelect('client')}
            className="group relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-8 rounded-3xl text-left transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
              <Smartphone className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Client Mode</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Connect to an existing OpenCode instance. Perfect for controlling tasks from your phone.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-600">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              Remote Pairing
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const SessionView = ({ session, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, planning, running, paused, completed
  const [input, setInput] = useState('');
  const [permissionRequest, setPermissionRequest] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, steps]);

  // Simulate a run flow
  const handleStart = () => {
    if (!input.trim()) return;
    
    // 1. User Message
    const userMsg = { id: 1, role: 'user', content: input };
    setMessages([userMsg]);
    setStatus('planning');
    setInput('');

    // 2. Simulate Planning (Delay)
    setTimeout(() => {
      const planMsg = { 
        id: 2, 
        role: 'assistant', 
        type: 'plan',
        content: "I'll help you analyze that. Here is the plan:" 
      };
      setMessages(prev => [...prev, planMsg]);
      
      const initialSteps = [
        { id: 1, title: 'Read data files', status: 'pending' },
        { id: 2, title: 'Process revenue metrics', status: 'pending' },
        { id: 3, title: 'Generate PDF Report', status: 'pending' },
      ];
      setSteps(initialSteps);
      setStatus('running');

      // 3. Start Execution simulation
      runStep(1, initialSteps);
    }, 1500);
  };

  const runStep = (stepId, currentSteps) => {
    // Update step to running
    const updatedSteps = currentSteps.map(s => 
      s.id === stepId ? { ...s, status: 'running' } : s
    );
    setSteps(updatedSteps);

    // Simulate work time
    setTimeout(() => {
      if (stepId === 1) {
        // PERMISSION TRAP
        setPermissionRequest({
          id: 'perm_123',
          type: 'filesystem_read',
          scope: '~/Documents/Finance/Q3',
          reason: 'I need to read the CSV files to analyze revenue.',
          stepId: 1
        });
        setStatus('paused');
      } else if (stepId === 2) {
        completeStep(stepId, updatedSteps);
        runStep(3, updatedSteps);
      } else if (stepId === 3) {
        completeStep(stepId, updatedSteps);
        finishSession();
      }
    }, 2000);
  };

  const handlePermission = (decision) => {
    const currentStepId = permissionRequest.stepId;
    setPermissionRequest(null);

    if (decision === 'deny') {
      setStatus('failed');
      setMessages(prev => [...prev, { id: 99, role: 'system', content: 'Permission denied. Task aborted.', type: 'error' }]);
      const newSteps = steps.map(s => s.id === currentStepId ? { ...s, status: 'failed' } : s);
      setSteps(newSteps);
    } else {
      // Allowed
      setStatus('running');
      // Add system log
      setMessages(prev => [...prev, { id: 98, role: 'system', content: `Permission granted: ${decision}`, type: 'audit' }]);
      completeStep(currentStepId, steps);
      // Move to next step
      runStep(2, steps);
    }
  };

  const completeStep = (id, currentSteps) => {
    const newSteps = currentSteps.map(s => 
      s.id === id ? { ...s, status: 'completed' } : s
    );
    setSteps(newSteps);
  };

  const finishSession = () => {
    setStatus('completed');
    setArtifacts([{ id: 1, name: 'Q3_Revenue_Report.pdf', size: '1.2MB' }]);
    setMessages(prev => [...prev, { id: 100, role: 'assistant', content: 'Task complete! I have generated the report below.' }]);
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white relative">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-950/80 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="!p-2 rounded-full" onClick={onBack}>
            <ArrowRight className="rotate-180 w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-sm">Session #104</h2>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-blue-500 animate-pulse' : status === 'paused' ? 'bg-amber-500' : status === 'completed' ? 'bg-emerald-500' : 'bg-zinc-600'}`}></span>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-xs">
            <Settings size={14} />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Chat & Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-2xl mx-auto space-y-6 pb-32">
            
            {/* Empty State */}
            {messages.length === 0 && (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 bg-zinc-900 rounded-3xl mx-auto flex items-center justify-center border border-zinc-800">
                  <Zap className="text-zinc-600" />
                </div>
                <h3 className="text-xl font-medium">Ready to work</h3>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                  Describe a task. I'll create a plan, ask for permissions when needed, and execute it.
                </p>
              </div>
            )}

            {/* Message Stream */}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'audit' ? (
                   <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono py-2 w-full justify-center">
                     <Shield size={12} /> {msg.content}
                   </div>
                ) : msg.type === 'error' ? (
                   <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">
                     {msg.content}
                   </div>
                ) : (
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-tr-sm shadow-xl shadow-white/5' 
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {/* Artifacts */}
            {artifacts.length > 0 && (
              <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-emerald-100">{artifacts[0].name}</div>
                    <div className="text-xs text-emerald-500/60">{artifacts[0].size}</div>
                  </div>
                </div>
                <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                  <Download size={16} />
                </Button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Right: Plan & Context (Desktop) */}
        <div className="hidden lg:flex w-80 border-l border-zinc-800 bg-zinc-925 flex-col">
          <div className="p-4 border-b border-zinc-800 font-medium text-sm text-zinc-400 flex items-center justify-between">
            <span>Execution Plan</span>
            <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">{steps.filter(s => s.status === 'completed').length}/{steps.length}</span>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {steps.length === 0 ? (
              <div className="text-zinc-600 text-sm text-center py-10 italic">Plan will appear here...</div>
            ) : (
              steps.map((step, idx) => (
                <div key={step.id} className="relative pl-6 pb-6 last:pb-0">
                  {idx !== steps.length - 1 && (
                    <div className={`absolute left-[9px] top-6 bottom-0 w-px ${step.status === 'completed' ? 'bg-emerald-500/20' : 'bg-zinc-800'}`} />
                  )}
                  <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border flex items-center justify-center bg-zinc-950 z-10 
                    ${step.status === 'completed' ? 'border-emerald-500 text-emerald-500' : 
                      step.status === 'running' ? 'border-blue-500 text-blue-500' : 
                      step.status === 'failed' ? 'border-red-500 text-red-500' : 'border-zinc-700 text-zinc-700'}`}>
                    {step.status === 'completed' ? <CheckCircle2 size={12} /> : 
                     step.status === 'running' ? <div className="w-2 h-2 rounded-full bg-current animate-pulse" /> :
                     step.status === 'failed' ? <X size={12} /> :
                     <Circle size={8} />}
                  </div>
                  <div className={`text-sm ${step.status === 'completed' ? 'text-zinc-400' : step.status === 'running' ? 'text-blue-100' : 'text-zinc-500'}`}>
                    {step.title}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950 sticky bottom-0 z-20">
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            disabled={status !== 'idle' && status !== 'completed'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder={status === 'running' ? "Task is running..." : "Ask OpenWork to do something..."}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-5 pr-14 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all disabled:opacity-50"
          />
          <button 
            disabled={!input.trim() || (status !== 'idle' && status !== 'completed')}
            onClick={handleStart}
            className="absolute right-2 top-2 p-2 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-0 disabled:scale-75"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Permission Modal Overlay */}
      {permissionRequest && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-amber-500/30 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-amber-500/10 rounded-full text-amber-500">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Permission Required</h3>
                  <p className="text-sm text-zinc-400 mt-1">OpenCode needs access to your file system to continue.</p>
                </div>
              </div>
              
              <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800 mb-6">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Reason</div>
                <p className="text-sm text-zinc-300 mb-4 italic">"{permissionRequest.reason}"</p>
                
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Scope</div>
                <div className="flex items-center gap-2 text-sm font-mono text-amber-200 bg-amber-950/30 px-2 py-1 rounded border border-amber-500/20">
                  <HardDrive size={12} />
                  {permissionRequest.scope}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full border-red-500/20 text-red-400 hover:bg-red-950/30" onClick={() => handlePermission('deny')}>
                  Deny
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" className="text-xs" onClick={() => handlePermission('session')}>
                    Once
                  </Button>
                  <Button variant="primary" className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black border-none shadow-amber-500/20" onClick={() => handlePermission('always')}>
                    Allow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardView = ({ onStartTask, isHost }) => {
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:flex flex-col justify-between bg-zinc-950">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Command size={18} className="text-black" />
            </div>
            <span className="font-bold text-lg tracking-tight">OpenWork</span>
          </div>

          <nav className="space-y-1">
            {[
              { icon: Layout, label: 'Dashboard', active: true },
              { icon: Play, label: 'Sessions' },
              { icon: FileText, label: 'Artifacts' },
              { icon: Shield, label: 'Permissions' },
            ].map((item) => (
              <button 
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${item.active ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
           {/* Host Status */}
           <div className="px-3 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
             <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-2">
               {isHost ? <Cpu size={12} /> : <Smartphone size={12} />}
               {isHost ? 'Local Engine' : 'Client Mode'}
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-sm text-emerald-500 font-mono">Healthy</span>
             </div>
           </div>

           <button className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300">
             <Settings size={18} />
             Settings
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-16 flex items-center justify-between px-6 md:px-10 border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10">
          <h1 className="text-lg font-medium">Good Morning</h1>
          <div className="md:hidden">
            <Menu className="text-zinc-400" />
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
          
          {/* Quick Action */}
          <section>
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-1 border border-zinc-800 shadow-2xl">
              <div className="bg-zinc-950 rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-white">What should we do today?</h2>
                  <p className="text-zinc-400">OpenWork can read files, run scripts, and generate reports.</p>
                </div>
                <Button onClick={onStartTask} className="w-full md:w-auto py-3 px-6 text-base shadow-white/10 shadow-lg">
                  <Play size={18} className="fill-current" />
                  New Task
                </Button>
              </div>
            </div>
          </section>

          {/* Templates */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Quick Start Templates</h3>
              <button className="text-sm text-zinc-500 hover:text-white">View all</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_TEMPLATES.map((t) => (
                <button 
                  key={t.id} 
                  onClick={onStartTask}
                  className="group p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     {t.icon === 'bar-chart' && <Layout size={20} className="text-indigo-400" />}
                     {t.icon === 'folder' && <HardDrive size={20} className="text-amber-400" />}
                     {t.icon === 'mic' && <Settings size={20} className="text-pink-400" />}
                  </div>
                  <h4 className="font-medium text-white mb-1">{t.title}</h4>
                  <p className="text-sm text-zinc-500">{t.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
             <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Recent Sessions</h3>
             <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden">
               {MOCK_RECENT_SESSIONS.map((s, i) => (
                 <div key={s.id} className={`p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors ${i !== MOCK_RECENT_SESSIONS.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                   <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-mono">
                       #{s.id}
                     </div>
                     <div>
                       <div className="font-medium text-sm text-zinc-200">{s.title}</div>
                       <div className="text-xs text-zinc-500 flex items-center gap-2">
                         <Clock size={10} /> {s.date}
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <StatusBadge status={s.status} />
                     <ChevronRight size={16} className="text-zinc-600" />
                   </div>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// --- Main App Controller ---

export default function App() {
  const [view, setView] = useState('onboarding'); // onboarding, dashboard, session
  const [mode, setMode] = useState(null); // host, client

  const handleOnboardingComplete = (selectedMode) => {
    setMode(selectedMode);
    setView('dashboard');
  };

  const handleStartTask = () => {
    setView('session');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  return (
    <div className="antialiased font-sans bg-zinc-950 min-h-screen text-zinc-100 selection:bg-white/20">
      {view === 'onboarding' && <OnboardingView onComplete={handleOnboardingComplete} />}
      {view === 'dashboard' && <DashboardView onStartTask={handleStartTask} isHost={mode === 'host'} />}
      {view === 'session' && <SessionView onBack={handleBackToDashboard} />}
    </div>
  );
}