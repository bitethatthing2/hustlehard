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
    <div className={`relative pt-12 pb-16 px-4 ${className}`}>
      {showBackButton && (
        <div className="absolute left-4 top-8 md:left-8 z-10">
          <BackButton className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
        </div>
      )}
      <div className="text-center pt-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white font-medium text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 