
import { File, Lock } from "lucide-react";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  textClass?: string;
}

const Logo = ({ size = 'md', textClass = '' }: LogoProps) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <File className={`${iconSizes[size]} text-primary`} />
        <Lock className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'} absolute bottom-0 right-0 text-primary bg-white rounded-full p-0.5`} />
      </div>
      <span className={`font-bold ${textSizes[size]} ${textClass}`}>SecureZip</span>
    </div>
  );
};

export default Logo;
