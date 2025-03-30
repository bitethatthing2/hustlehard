import { FC } from 'react';
import BackButton from '@/components/navigation/BackButton';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  className?: string;
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  className = '',
}) => {
  return (
    <div className={`relative py-16 px-4 ${className}`}>
      {showBackButton && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <BackButton />
        </div>
      )}
      <div className="text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 