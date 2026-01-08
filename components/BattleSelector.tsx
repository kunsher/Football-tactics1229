
import React from 'react';
import type { Battle } from '../types';

interface BattleSelectorProps {
  battles: Battle[];
  selectedId: string;
  onSelect: (battle: Battle) => void;
}

export const BattleSelector: React.FC<BattleSelectorProps> = ({ battles, selectedId, onSelect }) => {
  return (
    <div className="relative group">
      <select 
        value={selectedId}
        onChange={(e) => {
            const battle = battles.find(b => b.id === e.target.value);
            if (battle) onSelect(battle);
        }}
        className="appearance-none bg-gray-800/80 border border-white/10 text-white text-sm font-bold py-2 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer backdrop-blur-md shadow-lg"
      >
        {battles.map(b => (
          <option key={b.id} value={b.id} className="bg-gray-900">{b.title}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};
