import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ProfileAvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name = "Lucas Pedroso",
  size = 'lg',
  className = ''
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-20 h-20 text-xl',
    lg: 'w-28 h-28 sm:w-36 sm:h-36 text-3xl',
    xl: 'w-40 h-40 sm:w-48 sm:h-48 text-4xl'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Moldura Clean & Soft com borda cinza suave e brilho delicado em turquesa #05AD98 */}
      <div
        className={`${sizeClasses[size]} rounded-3xl bg-white p-1.5 shadow-xl shadow-slate-900/5 border-2 border-[#DDE2E2] relative overflow-hidden flex items-center justify-center`}
      >
        {!imgError ? (
          <img
            src="/Perfil.JPEG"
            alt={`Foto de ${name}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center rounded-2xl"
          />
        ) : (
          <div className="w-full h-full rounded-2xl bg-[#F0F4F4] flex flex-col items-center justify-center text-[#111827]">
            <User className="w-1/2 h-1/2 text-[#05AD98]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#878787] mt-1">
              Lucas Pedroso
            </span>
          </div>
        )}

        {/* Ponto sutil de status ativo / disponível */}
        <div
          className="absolute bottom-2 right-2 w-4 h-4 bg-[#05AD98] border-2 border-white rounded-full shadow-sm z-20"
          title="Disponível para novos projetos"
        ></div>
      </div>
    </div>
  );
};
