export const SkillBadge = ({ skill }: { skill: string }) => (
  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-[#4f9cf9] border border-[#4f9cf9]/20">
    {skill}
  </span>
);

export const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colors = {
    Beginner: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
    Intermediate: 'text-amber-400 border-amber-400/20 bg-amber-400/5',
    Advanced: 'text-rose-400 border-rose-400/20 bg-rose-400/5',
  };

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty}
    </span>
  );
};
